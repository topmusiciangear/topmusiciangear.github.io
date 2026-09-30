// Verifica que un precio corregido se propaga a TODAS las guias donde aparece
// el producto (regla fija del usuario, 30/09/2026).
//
// Las filas de tienda van pre-stampadas en el HTML estatico como:
//   <a data-store="<store>" href="<affiliate url>"> ... <span ...>Approx.</span> £799</span> ...
// El href lleva el slug/art del producto, asi que sirve de clave inequivoca:
// se busca la fila de esa tienda que contiene ese token y se lee su importe.
//
// Uso: node temp/test_price_propagation.js
const fs = require('fs');
const path = require('path');

let fail = 0;
const ok = (c, m) => { if (!c) fail++; console.log((c ? 'ok   ' : 'FAIL ') + m); };

const products = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const guides = fs.readdirSync('guides').filter(f => f.endsWith('.html'));

// token identificativo dentro del href de la tienda (slug o art-XXXX)
const CASES = [
  { id: 53,  store: 'gear4music', token: 'Audient-iD14',          want: '\u00a3175' },
  { id: 54,  store: 'gear4music', token: 'MOTU-M2',                want: '\u00a3226' },
  { id: 157, store: 'gear4music', token: 'Squier-Classic-Vibe-60s', want: '\u00a3419' },
  { id: 157, store: 'musicstore', token: 'art-BAS0010203',        want: '\u20ac488' },
  { id: 156, store: 'musicstore', token: 'art-BAS0011248',        want: '\u20ac1,799' },
];
// valores que no deben aparecer en ninguna guia tras la correccion
const STALE = ['\u00a3178.75', '\u00a3213.50', '\u20ac354.12', 'art-BAS0011257'];

const label = c => 'id ' + String(c.id).padEnd(3) + c.store.padEnd(11) + c.want.padEnd(9);

// 1) importes distintos que se encuentran para cada fila (store, token)
for (const c of CASES) {
  const amounts = new Map();   // importe -> Set(guias)
  for (const f of guides) {
    const html = fs.readFileSync(path.join('guides', f), 'utf8');
    const re = new RegExp('<a data-store="' + c.store + '" href="[^"]*' + c.token + '[^"]*"[\\s\\S]{0,6000}?</a>', 'g');
    for (const row of html.match(re) || []) {
      // el importe se pinta como "...</span> £799</span>" (puede haber espacio antes)
      const m = row.match(/>\s*([\u00a3\u20ac$][\d.,]+)\s*</);
      const amt = m ? m[1] : '(sin importe)';
      if (!amounts.has(amt)) amounts.set(amt, new Set());
      amounts.get(amt).add(f);
    }
  }
  const keys = [...amounts.keys()].sort();
  ok(keys.length === 1 && keys[0] === c.want,
    label(c) + '-> un solo importe en todo el sitio: ' + (keys.join(' / ') || 'NINGUNA fila encontrada'));
  const where = amounts.get(c.want);
  if (where) {
    const en = [...where].filter(f => !f.includes('_es')).length;
    const es = [...where].filter(f => f.includes('_es')).length;
    ok(en > 0 && es > 0, '   presente en ' + where.size + ' guias (EN ' + en + ' / ES ' + es + '): ' +
      [...where].map(f => f.replace('.html', '')).slice(0, 6).join(', ') + (where.size > 6 ? ', ...' : ''));
  }
}

// 2) valores viejos borrados de todo el sitio
for (const s of STALE) {
  let n = 0, sample = '';
  for (const f of guides) {
    const html = fs.readFileSync(path.join('guides', f), 'utf8');
    const c = html.split(s).length - 1;
    if (c) { n += c; if (!sample) sample = f; }
  }
  ok(n === 0, 'sin "' + s + '" en ninguna guia (ocurrencias: ' + n + (sample ? ', ej. ' + sample : '') + ')');
}

// 3) el href de MS de id 156 en products.json es la variante pedida
const ms156 = products.find(p => p.id === 156).stores.musicstore;
ok(/art-BAS0011248-000$/.test(ms156) && ms156.includes('musicstore.com%2Fen_OE%2FEUR'),
  'products.json id 156 musicstore = variante Olympic White en en_OE/EUR');

// 4) id 440 conserva su precio propio (compartia €1,847.90 con 156 antes del arreglo)
const src = fs.readFileSync('build-guides.js', 'utf8');
ok(src.includes('\u20ac1,847.90'), 'id 440 mantiene musicstore \u20ac1,847.90 (no se toco por error)');

console.log(fail ? '\n' + fail + ' FAILURES' : '\nALL PASS');
process.exit(fail ? 1 : 0);
