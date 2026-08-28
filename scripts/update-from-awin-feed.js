/**
 * update-from-awin-feed.js
 *
 * Actualiza precios y URLs de gear4music en el sitio a partir de un feed CSV de AWIN.
 *
 * USO:
 *   node scripts/update-from-awin-feed.js --feed <path.csv|path.csv.gz> [--apply]
 *
 *   --feed   Ruta al CSV (o .gz) descargado de AWIN. Si se omite, descarga desde FEED_URL.
 *   --apply  Aplica los cambios. Si se omite, hace un dry-run (solo reporta).
 *
 * CÓMO FUNCIONA:
 *  - Parsea el CSV de AWIN (con campos entrecomillados).
 *  - Índice por código de producto gear4music = último segmento de merchant_deep_link
 *    (coincide con la URL `ued=` almacenada en data/products.json).
 *  - Para cada producto del sitio con tienda gear4music:
 *      * Si hay match por código:
 *          - ACTUALIZA la URL gear4music en products.json al cread.php de AWIN
 *            usando merchant_deep_link del feed (formato consistente con el resto del sitio).
 *          - ACTUALIZA el precio gear4music (prices.gear4music) en TEST_SHOP_BTN
 *            dentro de build-guides.js, formateado "£X.XX".
 *  - Solo aplica cambios con coincidencia por código (seguro). El matcheo por nombre
 *    está deliberadamente DESACTIVADO por los falsos positivos que genera.
 *
 * DESPUÉS de --apply:
 *   node temp/gen-shop-buttons.js   (regenera js/shop-buttons.js)
 *   y bumpear la versión en index.html.
 */

const fs = require('fs');
const http = require('https');
const zlib = require('zlib');

const AWIN_AFFID = '2891111';
const AWIN_MID = '1117';
const FEED_URL = process.env.AWIN_FEED_URL || '';

const PRODUCTS_FILE = 'data/products.json';
const BUILD_FILE = 'build-guides.js';

// ---------- CSV parser (maneja campos entrecomillados y comas internas) ----------
function parseCSV(text) {
  const rows = [];
  let row = [], cur = '', inQ = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQ) {
      if (ch === '"') { if (text[i + 1] === '"') { cur += '"'; i++; } else inQ = false; }
      else cur += ch;
    } else {
      if (ch === '"') inQ = true;
      else if (ch === ',') { row.push(cur); cur = ''; }
      else if (ch === '\n') { row.push(cur); rows.push(row); row = []; cur = ''; }
      else if (ch === '\r') { /* skip */ }
      else cur += ch;
    }
  }
  if (cur !== '' || row.length) { row.push(cur); rows.push(row); }
  return rows;
}

function loadFeedCsv(feedArg) {
  let buf;
  if (feedArg) {
    buf = fs.readFileSync(feedArg);
  } else if (FEED_URL) {
    console.log('Descargando feed desde AWIN...');
    buf = downloadBuf(FEED_URL);
  } else {
    throw new Error('No se indicó --feed ni AWIN_FEED_URL.');
  }
  // detect gzip magic
  let text;
  if (buf[0] === 0x1f && buf[1] === 0x8b) text = zlib.gunzipSync(buf).toString('utf8');
  else text = buf.toString('utf8');
  return parseCSV(text);
}

function downloadBuf(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        http.get(res.headers.location, (r2) => {
          const chunks = []; r2.on('data', (c) => chunks.push(c));
          r2.on('end', () => resolve(Buffer.concat(chunks)));
        }).on('error', reject); return;
      }
      const chunks = []; res.on('data', (c) => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    }).on('error', reject);
  });
}

const g4mCode = (url) => String(url || '').trim().split('/').filter(Boolean).pop() || '';
const decodeUed = (url) => {
  try { const m = url.match(/[?&]ued=([^&]*)/); if (m) return decodeURIComponent(m[1]); } catch (e) {}
  return url;
};
const buildAwinCread = (deepLink) =>
  'https://www.awin1.com/cread.php?awinmid=' + AWIN_MID + '&awinaffid=' + AWIN_AFFID +
  '&ued=' + encodeURIComponent(deepLink);

// ---------- Precio: devolver "£X.XX" ----------
function fmtPriceGbp(searchPrice, currency) {
  const cur = (currency || '').toUpperCase();
  const n = parseFloat(searchPrice);
  if (isNaN(n)) return null;
  const s = n.toFixed(2);
  if (cur === 'EUR' || cur === '€') return '€' + s;
  return '£' + s; // gear4music feed en GBP
}

// ---------- Main ----------
(async function main() {
  const args = process.argv.slice(2);
  let feedArg = args.find(a => a.startsWith('--feed='));
  if (feedArg) feedArg = feedArg.split('=').slice(1).join('=');
  else {
    const i = args.indexOf('--feed');
    if (i !== -1 && args[i + 1]) feedArg = args[i + 1];
  }
  const apply = args.includes('--apply');

  const rows = loadFeedCsv(feedArg);
  const header = rows[0];
  const colIdx = Object.fromEntries(header.map((x, i) => [x, i]));
  const hasCol = (c) => colIdx[c] !== undefined;

  // build feed index by gear4music product code
  const feedByCode = new Map();
  for (let i = 1; i < rows.length; i++) {
    const r = rows[i];
    const deep = r[colIdx['merchant_deep_link']] || '';
    const code = g4mCode(deep);
    if (!code) continue;
    if (!feedByCode.has(code)) feedByCode.set(code, {
      deep,
      aw: r[colIdx['aw_deep_link']] || '',
      name: r[colIdx['product_name']] || '',
      price: r[colIdx['search_price']] || '',
      currency: r[colIdx['currency']] || '',
      display: r[colIdx['display_price']] || ''
    });
  }

  const products = JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf8'));
  let candidates = [], matched = 0;
  for (const p of products) {
    const st = p.stores || {};
    if (!st.gear4music) continue;
    const code = g4mCode(decodeUed(st.gear4music));
    if (feedByCode.has(code)) { candidates.push(p); matched++; }
  }
  console.log(`Feed rows: ${rows.length - 1} | productos del sitio con g4m: ${products.filter(p => (p.stores || {}).gear4music).length} | match por código: ${matched}`);

  // ------ Plan de cambios ------
  const productJsonChanges = [];
  const priceChanges = []; // {id, newPrice}
  const build = fs.readFileSync(BUILD_FILE, 'utf8');

  for (const p of candidates) {
    const code = g4mCode(decodeUed((p.stores || {}).gear4music));
    const f = feedByCode.get(code);
    if (!f) continue;

    const newUrl = buildAwinCread(f.deep);
    if (newUrl !== (p.stores || {}).gear4music) {
      productJsonChanges.push({ id: p.id, title: p.title, code, from: (p.stores || {}).gear4music, to: newUrl });
    }

    const newPrice = fmtPriceGbp(f.price, f.currency);
    if (newPrice) priceChanges.push({ id: p.id, title: p.title, code, price: newPrice, feedDisplay: f.display });
  }

  console.log('\n=== PRODUCTOS A ACTUALIZAR (URL) ===');
  productJsonChanges.forEach(c => console.log(`  #${c.id} ${c.title} [${c.code}]` + (apply ? ' -> URL actualizada' : ' -> pendiente')));
  console.log('\n=== PRECIOS gear4music ===');
  priceChanges.forEach(c => console.log(`  #${c.id} ${c.title}: ${c.price}  (feed: ${c.feedDisplay})` + (apply ? ' -> aplicado' : ' -> pendiente')));

  if (productJsonChanges.length === 0 && priceChanges.length === 0) {
    console.log('\nNada que actualizar con este feed.');
    return;
  }
  if (!apply) { console.log('\nDRY-RUN (no se escribió nada). Usá --apply para aplicar.'); return; }

  // ------ Aplicar ------
  if (productJsonChanges.length) {
    const byId = new Map(products.map(p => [p.id, p]));
    for (const c of productJsonChanges) { const p = byId.get(c.id); if (p) (p.stores.gear4music = c.to); }
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2));
    console.log(`\nproducts.json actualizado (${productJsonChanges.length} URLs).`);
  }

  if (priceChanges.length) {
    let out = build;
    for (const c of priceChanges) {
      const key = '"' + c.price + '"';
      // match entry:  ID: { prices: { ... } }  (una sola línea según el formato del proyecto)
      const re = new RegExp('(\\b' + c.id + ': \\{ prices: \\{ )(.*?)( \\})', 's');
      out = out.replace(re, (m, p1, body, p3) => {
        if (/\bgear4music\s*:/.test(body)) {
          return p1 + body.replace(/gear4music\s*:\s*"[^"]*"/, 'gear4music: ' + key) + p3;
        }
        return p1 + 'gear4music: ' + key + ', ' + body + p3;
      });
    }
    fs.writeFileSync(BUILD_FILE, out);
    console.log(`\nbuild-guides.js actualizado (${priceChanges.length} precios).`);
    console.log('Recordá regenerar: node temp/gen-shop-buttons.js y bumpear versión en index.html');
  }
})();
