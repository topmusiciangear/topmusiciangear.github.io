const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const arr = JSON.parse(fs.readFileSync(BASE + 'data/products.json', 'utf8'));
const list = Array.isArray(arr) ? arr : arr.products;
const byId = {}; list.forEach(p => byId[p.id] = p);

const g = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8'));
const guia = g.find(x => x.id === 'starter-studio');

console.log('=== PRECIOS DE CATALOGO ===');
const IDS = { 'Scarlett 2i2': 15, 'SM57': 5, 'NT1 5th Gen': 3, 'NT1 Signature': 297,
  'SSL 2+ MKII': 18, 'ATH-M20x': 609, 'ATH-M50x': 25, 'MDR-7506': 26, 'Rokit 7 G5': 20,
  'K&M 210/2': 58, 'paneles G4M': 170, 'pop filter': 39, 'Mogami': 167 };
Object.entries(IDS).forEach(([k, id]) => {
  const p = byId[id];
  console.log('  ' + k.padEnd(16) + 'id ' + String(id).padStart(4) + '  $' + (p ? p.price : '?'));
});

// los tres montajes segun la tabla
const filas = guia.productTable.rows;
function col(r) { return filas.find(x => (x.label || '').toLowerCase().includes(r.toLowerCase())); }

console.log('\n=== LOS TRES MONTAJES SEGUN LA TABLA ===');
['interfaz', 'micrófono', 'auriculares', 'monitores', 'accesorios', 'tratamiento', 'total']
  .forEach(r => {
    const f = col(r);
    if (!f) return;
    console.log('  ' + (f.label_es || f.label).padEnd(24) +
      f.values.map(v => (v.value_es || v.value)).join('  |  '));
  });

// precio de los botones segun TEST_SHOP_BTN
const src = fs.readFileSync(BASE + 'build-guides.js', 'utf8');
const ini = src.indexOf('const TEST_SHOP_BTN = {');
const bloque = src.slice(ini, src.indexOf('\n};', ini));
function emp(t, i) { let d = 0; for (let j = i; j < t.length; j++) { if (t[j] === '{') d++; else if (t[j] === '}') { d--; if (!d) return j; } } return -1; }
function preciosDe(id) {
  const m = new RegExp('(?:^|\\n)(\\s*)' + id + ':\\s*\\{').exec(bloque);
  if (!m) return {};
  const i0 = m.index + m[1].length;
  const f = emp(bloque, i0 + (m[0].length - m[1].length) - 1);
  const ent = bloque.slice(i0, f + 1);
  const pm = /prices:\s*\{([\s\S]*?)\}/.exec(ent);
  const o = {};
  if (pm) [...pm[1].matchAll(/(\w+):\s*"([^"]+)"/g)].forEach(x => o[x[1]] = x[2]);
  return o;
}

console.log('\n=== BOTONES: SM57 vs NT1 Signature ===');
console.log('  SM57 (id 5)           : ' + JSON.stringify(preciosDe(5)));
console.log('  NT1 Signature (id 297): ' + JSON.stringify(preciosDe(297)));

// recalculo del montaje Basico
console.log('\n=== RECALCULO DEL MONTAJE BASICO ===');
const base = [
  ['Scarlett 2i2', 15], ['microfono (actual SM57)', 5], ['K&M 210/2', 58],
  ['ATH-M20x', 609], ['paneles G4M 4-pack', 170]
];
let suma = 0;
base.forEach(([k, id]) => { const v = byId[id].price; suma += v; console.log('  ' + k.padEnd(24) + '$' + v); });
console.log('  ' + '-'.repeat(32));
console.log('  ' + 'SUMA ACTUAL'.padEnd(24) + '$' + suma + '   (la guia dice ~$485)');

const sig = byId[297].price;
console.log('\n  quitando SM57 ($' + byId[5].price + ') y poniendo NT1 Signature ($' + sig + '):');
console.log('  ' + 'NUEVO TOTAL'.padEnd(24) + '$' + (suma - byId[5].price + sig));

// con el precio del boton Amazon
const pz = preciosDe(297);
const amz = (pz.amazon || '').replace(/[^0-9.]/g, '');
if (amz) console.log('  con precio Amazon ($' + amz + '):            $' + (suma - byId[5].price + Number(amz)));
