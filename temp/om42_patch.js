const fs = require('fs');

// ---------- products.json: id 453 (Martin OM-42) ----------
{
  const f = 'data/products.json';
  const raw = fs.readFileSync(f, 'utf8');
  const data = JSON.parse(raw);
  const p = data.find(x => x.id === 453);
  if (!p) throw new Error('id 453 no encontrado');

  p.stores.musicstore = 'https://www.musicstore.com/en_OE/EUR/Martin-Guitars-OM-42-Standard-Series-000-Form-sol-Spruce-Top-Case/art-GIT0000224-000';

  // zzounds y gear4music siguen sin enlace propio verificado: se mantienen excluidos.
  p.excludeStores = (p.excludeStores || []).filter(s => s !== 'musicstore');

  const nl = /\n$/.test(raw);
  fs.writeFileSync(f, JSON.stringify(data, null, 2) + (nl ? '\n' : ''), 'utf8');
  console.log('products.json 453 MS ->', p.stores.musicstore);
  console.log('products.json 453 excludeStores ->', JSON.stringify(p.excludeStores));
}

// ---------- build-guides.js: MS EUR 6,599 ----------
{
  const f = 'build-guides.js';
  let s = fs.readFileSync(f, 'utf8');
  const old = s.slice(s.indexOf('  453: {'), s.indexOf('  454: {'));
  if (!old.includes('andertons')) throw new Error('bloque 453 inesperado:\n' + old);
  const next = [
    '  453: {',
    '    prices: {',
    '      andertons: "£6,799.00",',
    '      musicstore: "€6,599.00"',
    '    },',
    '    oos: ["amazon"]',
    '  },',
    ''
  ].join('\n');
  s = s.replace(old, next);
  fs.writeFileSync(f, s, 'utf8');
  console.log('build-guides.js 453 -> MS €6,599');
}

// ---------- pb_verify_data.js ----------
{
  const f = 'temp/pb_verify_data.js';
  let s = fs.readFileSync(f, 'utf8');
  const anchor = "  // Martin D-28 estandar:";
  if (!s.includes(anchor)) throw new Error('ancla no encontrada');
  s = s.replace(anchor,
    "  // Martin OM-42: Music Store entra con GIT0000224-000 (30/09/2026).\n" +
    "  '453': { 'prices.musicstore': [undefined, '€6,599.00'] },\n" + anchor);
  fs.writeFileSync(f, s, 'utf8');
  console.log('pb_verify_data.js: id 453 anadido');
}
