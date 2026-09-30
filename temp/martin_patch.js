const fs = require('fs');

// ---------- products.json: id 104 (Martin D-28 estandar) ----------
{
  const f = 'data/products.json';
  const raw = fs.readFileSync(f, 'utf8');
  const data = JSON.parse(raw);
  const p = data.find(x => x.id === 104);
  if (!p) throw new Error('id 104 no encontrado');

  // Enlace directo de G4M (sin el awin1 wrapper y sin el fragmento #6f3a/embedded/).
  // Confirmado: "Martin D-28 Satin #3019954", £3,199 en stock, IVA incl.
  p.stores.gear4music = 'https://www.gear4music.com/Guitar-and-Bass/Martin-D-28-Satin-3019954/7W31';

  // zZounds NO se toca: el SKU que envio el usuario (MRTD28MD) es del D-28 Modern Deluxe (id 452).
  const ex = new Set(p.excludeStores || []);
  ex.add('zzounds');           // sigue sin oferta propia verificada
  p.excludeStores = [...ex];

  const nl = /\n$/.test(raw);
  fs.writeFileSync(f, JSON.stringify(data, null, 2) + (nl ? '\n' : ''), 'utf8');
  console.log('products.json 104 G4M ->', p.stores.gear4music);
  console.log('products.json 104 excludeStores ->', JSON.stringify(p.excludeStores));
}

// ---------- build-guides.js: G4M £3,199 y sale de oos ----------
{
  const f = 'build-guides.js';
  let s = fs.readFileSync(f, 'utf8');
  const before = s;
  const old = s.slice(
    s.indexOf('  104: {'),
    s.indexOf('  105: {') > -1 ? s.indexOf('  105: {') : s.indexOf('  105:')
  );
  if (!old.includes('gear4music')) throw new Error('bloque 104 inesperado:\n' + old);
  const next = [
    '  104: {',
    '    prices: {',
    '      amazon: "$3,499.99",',
    '      andertons: "£3,599.00",',
    '      musicstore: "€3,499.00",',
    '      gear4music: "£3,199.00"',
    '    },',
    '    urls: {',
    '      zzounds: "https://www.zzounds.com/a--925521/item--MRTD28"',
    '    },',
    '    oos: ["zzounds"]',
    '  },'
  ].join('\n') + '\n';
  s = s.replace(old, next);
  if (s === before) throw new Error('sin cambios en build-guides.js');
  fs.writeFileSync(f, s, 'utf8');
  console.log('build-guides.js 104 -> G4M £3,199 en stock; zZounds sigue oos');
}

// ---------- pb_verify_data.js ----------
{
  const f = 'temp/pb_verify_data.js';
  let s = fs.readFileSync(f, 'utf8');
  const anchor = "  '464': { 'prices.musicstore'";
  if (!s.includes(anchor)) throw new Error('ancla no encontrada en pb_verify_data');
  s = s.replace(anchor,
    "  // Martin D-28 estandar: G4M pasa a £3,199 y sale de oos (30/09/2026).\n" +
    "  '104': { 'prices.gear4music': [undefined, '\u00a33,199.00'] },\n" + anchor);
  fs.writeFileSync(f, s, 'utf8');
  console.log('pb_verify_data.js: id 104 anadido a la lista blanca');
}
