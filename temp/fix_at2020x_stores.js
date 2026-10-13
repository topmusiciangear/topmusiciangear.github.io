const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';

// ---------- 1) products.json: anadir MS + Andertons (los URLs correctos del -X, no del XP) ----------
const pj = BASE + 'data/products.json';
const prods = JSON.parse(fs.readFileSync(pj, 'utf8'));
const p = prods.find(x => x.id === 291);

p.stores.musicstore = 'https://www.musicstore.com/en_OE/EUR/Audio-Technica-AT2020USB-X-USB-Condenser-Mic-with-Stand-Black-/art-REC0016176-000';
p.stores.andertons = 'https://www.andertons.co.uk/audio-technica-at2020usb-x-cardioid-condenser-mic-with-headphone-amp/';

fs.writeFileSync(pj, JSON.stringify(prods, null, 2));
console.log('products.json 291 stores ->');
Object.keys(p.stores).forEach(k => console.log('  ' + k.padEnd(12) + p.stores[k]));

// ---------- 2) build-guides.js TEST_SHOP_BTN 291 ----------
const bj = BASE + 'build-guides.js';
let s = fs.readFileSync(bj, 'utf8');
const needle = '\n  291: {';
const i = s.indexOf(needle);
if (i === -1) throw new Error('bloque 291 no encontrado');
const b = s.indexOf('{', i);
let depth = 0, k = b;
while (k < s.length) {
  if (s[k] === '{') depth++;
  else if (s[k] === '}') { depth--; if (depth === 0) break; }
  k++;
}
let end = k + 1;
if (s[end] === ',') end++;

const newBlock = `
  291: {
    prices: {
      amazon: "$168.00",
      zzounds: "$169.00",
      andertons: "£111.00",
      musicstore: "€135.00"
    },
    urls: {
      // G4M sigue en la fila pero SIN precio (agotado); la URL real se conserva para
      // que la fila "Agotado" enlace a la ficha del producto, no a la home.
      gear4music: "https://www.gear4music.com/Recording-and-Computers/Audio-Technica-AT2020USBX-Cardioid-Condenser-Microphone/528M",
      musicstore: "https://www.musicstore.com/en_OE/EUR/Audio-Technica-AT2020USB-X-USB-Condenser-Mic-with-Stand-Black-/art-REC0016176-000",
      andertons: "https://www.andertons.co.uk/audio-technica-at2020usb-x-cardioid-condenser-mic-with-headphone-amp/"
    },
    oos: [
      "gear4music",
      "zzounds"
    ]
  },`;

s = s.substring(0, i) + newBlock + s.substring(end);
fs.writeFileSync(bj, s);
new (require('vm').Script)(s, { filename: 'build-guides.js' });
console.log('\nSYNTAX OK\nTEST_SHOP_BTN 291 ->\n' + newBlock);

// ---------- 3) auditoria: precios del 291 citados a mano en otras guias ----------
const guides = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8'));
console.log('\n=== 291 citado a mano en otras guias (prosa/tablas) ===');
guides.forEach(function (g) {
  const hits = [];
  function walk(o, path) {
    if (typeof o === 'string') {
      if (/AT2020USB-X\b/i.test(o) && /\$|€|£/.test(o) && !/AT2020USB-XP/.test(o)) hits.push(path + ' :: ' + o.slice(0, 130));
      // tablas: celda cuyo texto menciona el producto por columna
    } else if (Array.isArray(o)) {
      o.forEach((v, i2) => walk(v, path + '[' + i2 + ']'));
    } else if (o && typeof o === 'object') {
      Object.keys(o).forEach(k2 => walk(o[k2], path + '.' + k2));
    }
  }
  // caso especial: columnas de tabla cuyo titulo es el producto
  if (g.productTable) {
    const ci = g.productTable.columns.findIndex(c => /^Audio-Technica AT2020USB-X$/i.test(c.title));
    if (ci > -1) {
      g.productTable.rows.forEach(function (r) {
        const v = r.values[ci];
        if (v && /[\$€£]/.test(v.value || '')) hits.push(g.id + ' / tabla "' + r.label + '" col' + ci + ' = ' + v.value);
      });
    }
  }
  walk(g, g.id);
  const uniq = Array.from(new Set(hits));
  if (uniq.length) uniq.forEach(h => console.log('  ' + h));
});
console.log('\n(Los botones se renderizan en runtime desde TEST_SHOP_BTN, asi que los nuevos');
console.log(' precios ya se propagan solos a todas las guias EN y ES sin tocar las paginas.)');