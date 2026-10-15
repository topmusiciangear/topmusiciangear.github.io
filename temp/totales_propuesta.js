const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const arr = JSON.parse(fs.readFileSync(BASE + 'data/products.json', 'utf8'));
const list = Array.isArray(arr) ? arr : arr.products;
const byId = {}; list.forEach(p => byId[p.id] = p);
const src = fs.readFileSync(BASE + 'build-guides.js', 'utf8');
const ini = src.indexOf('const TEST_SHOP_BTN = {');
const bloque = src.slice(ini, src.indexOf('\n};', ini));
function emp(t, i) { let d = 0; for (let j = i; j < t.length; j++) { if (t[j] === '{') d++; else if (t[j] === '}') { d--; if (!d) return j; } } return -1; }
function entrada(id) {
  const m = new RegExp('(?:^|\\n)(\\s*)' + id + ':\\s*\\{').exec(bloque);
  if (!m) return null;
  const i0 = m.index + m[1].length;
  return bloque.slice(i0, emp(bloque, i0 + (m[0].length - m[1].length) - 1) + 1).replace(/\s+/g, ' ');
}

console.log('=== LOS DOS PRODUCTOS NUEVOS ===\n');
[16, 674].forEach(id => {
  const p = byId[id];
  console.log('id ' + id + ' · ' + p.title + '  (catálogo $' + p.price + ')');
  console.log('   tiendas: ' + Object.keys(p.stores || {}).join(', '));
  console.log('   mapa: ' + (entrada(id) || 'SIN ENTRADA -> sin precios en los botones'));
  console.log('');
});

// totales correctos
const NIV = {
  'Nivel 1 · Esencial': [['Scarlett 2i2', 15, 1], ['NT1 Signature', 297, 1], ['ATH-M20x', 609, 1], ['K&M 210/2', 58, 1], ['Paneles G4M', 170, 1], ['KRK Rokit 5 G5', 633, 2]],
  'Nivel 2 · Productor Pro': [['SSL 2+ MKII', 18, 1], ['NT1 5th Gen', 3, 1], ['ATH-M50x', 25, 1], ['K&M 210/2', 58, 1], ['Paneles G4M', 170, 1], ['JBL 305P MkII', 116, 2]],
  'Nivel 3 · Definitivo': [['Apollo Twin X Gen 2', 16, 1], ['Neumann TLM 102', 674, 1], ['MDR-7506', 26, 1], ['K&M 210/2', 58, 1], ['Paneles G4M', 170, 1], ['KRK Rokit 7 G5', 20, 2]]
};

console.log('=== LOS TRES NIVELES CON LA ESTRUCTURA QUE PROPUESES ===\n');
const tot = {};
Object.entries(NIV).forEach(([n, items]) => {
  let s = 0;
  console.log('■ ' + n);
  items.forEach(([nombre, id, m]) => { const c = byId[id].price * m; s += c; console.log('   ' + nombre.padEnd(20) + (m > 1 ? 'x' + m + '  ' : '     ') + '$' + c); });
  console.log('   ' + '-'.repeat(32));
  console.log('   TOTAL'.padEnd(24) + '$' + Math.round(s));
  tot[n] = Math.round(s);
  console.log('');
});

console.log('=== COMPARACION CON LA TABLA ACTUAL ===\n');
const actual = [1003, 1113, 1393];
const nuevo = [tot['Nivel 1 · Esencial'], tot['Nivel 2 · Productor Pro'], tot['Nivel 3 · Definitivo']];
console.log('  Nivel 1   actual $' + actual[0] + '   nuevo $' + nuevo[0] + '   ' + (nuevo[0] - actual[0] === 0 ? 'igual' : (nuevo[0] > actual[0] ? '+' : '') + '$' + (nuevo[0] - actual[0])));
console.log('  Nivel 2   actual $' + actual[1] + '   nuevo $' + nuevo[2 - 1] + '   ' + (nuevo[1] - actual[1] > 0 ? '+' : '') + '$' + (nuevo[1] - actual[1]));
console.log('  Nivel 3   actual $' + actual[2] + '   nuevo $' + nuevo[2] + '   +$' + (nuevo[2] - actual[2]) + '  (+' + Math.round((nuevo[2] - actual[2]) / actual[2] * 100) + '%)');

console.log('\n  saltos:');
console.log('    actual : $' + (actual[1] - actual[0]) + '  y  $' + (actual[2] - actual[1]));
console.log('    nuevo  : $' + (nuevo[1] - nuevo[0]) + '  y  $' + (nuevo[2] - nuevo[1]));

console.log('\n  tu cifra para el Nivel 2: $930  ->  real $' + nuevo[1] + '  (faltan $' + (nuevo[1] - 930) + ')');
