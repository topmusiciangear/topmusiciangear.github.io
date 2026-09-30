const fs = require('fs');

// ---------- products.json: id 323 (Akai MPK Mini MK4 / IV) ----------
{
  const f = 'data/products.json';
  const raw = fs.readFileSync(f, 'utf8');
  const data = JSON.parse(raw);
  const p = data.find(x => x.id === 323);
  if (!p) throw new Error('id 323 no encontrado');

  // El catalogo no tenia enlace de zZounds en stores: se anade el real del MK4/IV.
  // AKAMPKMINI3 era el MK3 (joystick, OLED, 0.75 kg) y figura "No longer available".
  p.stores.zzounds = 'https://www.zzounds.com/item--AKAMPKMINI4';

  const nl = /\n$/.test(raw);
  fs.writeFileSync(f, JSON.stringify(data, null, 2) + (nl ? '\n' : ''), 'utf8');
  console.log('products.json 323 zzounds ->', p.stores.zzounds);
}

// ---------- build-guides.js ----------
{
  const f = 'build-guides.js';
  let s = fs.readFileSync(f, 'utf8');
  const old = s.slice(s.indexOf('  323: {'), s.indexOf('  324: {'));
  if (!old.includes('musicstore')) throw new Error('bloque 323 inesperado:\n' + old);
  const next = [
    '  323: {',
    '    prices: {',
    '      amazon: "$99.00",',
    '      zzounds: "$99.99",',
    '      andertons: "£91.00",',
    '      gear4music: "£91.30",',
    '      musicstore: "€99.00"',
    '    },',
    '  },',
    ''
  ].join('\n');
  s = s.replace(old, next);
  fs.writeFileSync(f, s, 'utf8');
  console.log('build-guides.js 323 -> MS €99.00 (antes €105.04) | zZounds URL al MK4');
}

// ---------- pb_verify_data.js ----------
{
  const f = 'temp/pb_verify_data.js';
  let s = fs.readFileSync(f, 'utf8');
  const anchor = "  // SJ-200:";
  if (!s.includes(anchor)) throw new Error('ancla no encontrada');
  s = s.replace(anchor,
    "  // Akai MPK Mini MK4: MS baja a €99 y zZounds pasa a AKAMPKMINI4 (el anterior era el MK3) (30/09/2026).\n" +
    "  '323': {\n" +
    "    'prices.musicstore': ['€105.04', '€99.00'],\n" +
    "    'urls.zzounds': ['https://www.zzounds.com/item--AKAMPKMINI3', undefined]\n" +
    "  },\n" + anchor);
  fs.writeFileSync(f, s, 'utf8');
  console.log('pb_verify_data.js: id 323 anadido');
}
