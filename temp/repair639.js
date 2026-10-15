const fs = require('fs');
const bf = 'C:/Users/Daniel/projects/topmusiciangear/build-guides.js';
let b = fs.readFileSync(bf, 'utf8');

// --- reparar la entrada 639: urls quedo colgando fuera del objeto ---
const roto = `    639: {
    prices: {
      amazon: "$4,699.99",
      zzounds: "$4,499.99",
      gear4music: "£4,290.00",
      andertons: "£4,290.00"
    },
    na: ["musicstore"]
  },
    urls: {`;
const bien = `    639: {
    prices: {
      amazon: "$4,699.99",
      zzounds: "$4,499.99",
      gear4music: "£4,290.00",
      andertons: "£4,290.00"
    },
    na: ["musicstore"],
    urls: {`;
if (b.includes(roto)) { b = b.replace(roto, bien); console.log('639: urls reenganchado dentro del objeto'); }
else console.log('!! no encontre el bloque roto de 639');

// --- limpiar los parametros de Google Ads de las imagenes ---
const pf = 'C:/Users/Daniel/projects/topmusiciangear/data/products.json';
const P = JSON.parse(fs.readFileSync(pf, 'utf8'));
const arr = Array.isArray(P) ? P : P.products;
let n = 0;
arr.forEach(p => {
  if (p.img && /\?_gl=|_gcl_aw|utm_|gclid=/.test(p.img)) {
    const antes = p.img;
    p.img = p.img.split('?')[0];
    if (p.img !== antes) { n++; console.log('id ' + p.id + ' ' + p.title + ' -> ' + p.img); }
  }
});
console.log('\nimagenes limpiadas: ' + n);

fs.writeFileSync(bf, b, 'utf8');
fs.writeFileSync(pf, JSON.stringify(P, null, 2), 'utf8');

// --- verificacion ---
console.log('\n--- verificacion ---');
const b2 = fs.readFileSync(bf, 'utf8');
const i = b2.indexOf('\n    639:');
console.log('entrada 639:\n' + b2.slice(i, i + 620));
// comprobar que TEST_SHOP_BTN sigue siendo un objeto valido: ejecutar el fichero
// no es viable (hace I/O), asi que se comprueba el balance de llaves del bloque
const ini = b2.indexOf('const TEST_SHOP_BTN = {');
const fin = b2.indexOf('\n};', ini);
const bloque = b2.slice(ini, fin);
let lvl = 0, min = 0;
for (const ch of bloque) { if (ch === '{') lvl++; else if (ch === '}') { lvl--; if (lvl < min) min = lvl; } }
console.log('\nbalance de llaves del bloque TEST_SHOP_BTN: ' + lvl + ' (min ' + min + ') -> ' + (lvl === 0 && min === 0 ? 'OK' : 'ROTO'));
const P2 = JSON.parse(fs.readFileSync(pf, 'utf8'));
const A2 = Array.isArray(P2) ? P2 : P2.products;
console.log('productos: ' + A2.length);
console.log('imagenes sucias que quedan: ' + A2.filter(p => /\?_gl=|_gcl_aw|utm_|gclid=/.test(p.img || '')).length);