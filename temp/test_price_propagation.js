// Verifica que un precio corregido se propaga a TODAS las guias donde aparece
// el producto (regla fija del usuario, 30/09/2026).
//
// Uso: node temp/test_price_propagation.js            -> sitio local (guides/)
//      node temp/test_price_propagation.js live       -> produccion (topmusiciangear.com)
const fs = require('fs');
const path = require('path');
const { pricesOf } = require('./row_check.js');

const LIVE = process.argv[2] === 'live';
const ORIGIN = 'https://topmusiciangear.com';

let fail = 0;
const ok = (c, m) => { if (!c) fail++; console.log((c ? 'ok   ' : 'FAIL ') + m); };

const products = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));

const CASES = [
  { id: 53,  store: 'gear4music', token: 'Audient-iD14',           want: '\u00a3175' },
  { id: 54,  store: 'gear4music', token: 'MOTU-M2',                 want: '\u00a3226' },
  { id: 157, store: 'gear4music', token: 'Squier-Classic-Vibe-60s', want: '\u00a3419' },
  { id: 157, store: 'musicstore', token: 'art-BAS0010203',         want: '\u20ac488' },
  { id: 156, store: 'musicstore', token: 'art-BAS0011248',         want: '\u20ac1,799' },
  { id: 156, store: 'andertons', token: 'professional-II-jazz-bass-v-in', want: '\u00a31,599' },
];
const STALE = ['\u00a3178.75', '\u00a3213.50', '\u20ac354.12', 'art-BAS0011257'];
const label = c => 'id ' + String(c.id).padEnd(3) + c.store.padEnd(11) + c.want.padEnd(9);

const pages = fs.readdirSync('guides').filter(f => f.endsWith('.html')).map(f => ({ name: f }));

async function getHtml(p) {
  if (!LIVE) return fs.readFileSync(path.join('guides', p.name), 'utf8');
  const res = await fetch(ORIGIN + '/guides/' + p.name + '?cb=' + Math.floor(Math.random() * 1e9),
    { headers: { 'cache-control': 'no-cache' } });
  return res.ok ? await res.text() : '';
}

async function main() {
  // 1) un solo importe por (tienda, producto) en TODO el sitio + presencia EN/ES
  for (const c of CASES) {
    const where = new Map();   // importe -> Set(paginas)
    for (const p of pages) {
      const html = await getHtml(p);
      if (!html) continue;
      for (const r of pricesOf(html, c.store, c.token).rows) {
        const amt = r.price || '(sin precio)';
        if (!where.has(amt)) where.set(amt, new Set());
        where.get(amt).add(p.name);
      }
    }
    const keys = [...where.keys()].sort();
    ok(keys.length === 1 && keys[0] === c.want,
      label(c) + '-> un solo importe en todo el sitio: ' + (keys.join(' / ') || 'NINGUNA fila encontrada'));
    const hit = where.get(c.want);
    if (hit) {
      const en = [...hit].filter(f => !f.includes('_es')).length;
      const es = [...hit].filter(f => f.includes('_es')).length;
      ok(en > 0 && es > 0, '   en ' + hit.size + ' guias (EN ' + en + ' / ES ' + es + '): ' +
        [...hit].map(f => f.replace('.html', '')).slice(0, 5).join(', ') + (hit.size > 5 ? ', ...' : ''));
    }
  }

  // 2) valores viejos borrados de todo el sitio
  for (const s of STALE) {
    let n = 0, sample = '';
    for (const p of pages) {
      const html = await getHtml(p);
      if (!html) continue;
      const c = html.split(s).length - 1;
      if (c) { n += c; if (!sample) sample = p.name; }
    }
    ok(n === 0, 'sin "' + s + '" en ninguna guia (ocurrencias: ' + n + (sample ? ', ej. ' + sample : '') + ')');
  }

  // 3) URL de MS de id 156 = variante Olympic White pedida, en en_OE/EUR
  const ms156 = products.find(p => p.id === 156).stores.musicstore;
  ok(/art-BAS0011248-000$/.test(ms156) && ms156.includes('musicstore.com%2Fen_OE%2FEUR'),
    'products.json id 156 musicstore = variante Olympic White en en_OE/EUR');

  // 4) id 440 conserva su precio propio (compartia €1,847.90 con 156 antes del arreglo)
  ok(fs.readFileSync('build-guides.js', 'utf8').includes('\u20ac1,847.90'),
    'id 440 mantiene musicstore \u20ac1,847.90 (no se toco por error)');

  console.log('\n' + (LIVE ? 'PRODUCCION' : 'LOCAL') + ': ' + (fail ? fail + ' FALLOS' : 'ALL PASS'));
  process.exit(fail ? 1 : 0);
}

main();
