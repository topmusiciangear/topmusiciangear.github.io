// ¿Cuadran los tres totales con el catalogo?
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const arr = JSON.parse(fs.readFileSync(BASE + 'data/products.json', 'utf8'));
const list = Array.isArray(arr) ? arr : arr.products;
const byId = {}; list.forEach(p => byId[p.id] = p);
const g = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8'));
const guia = g.find(x => x.id === 'starter-studio');

const t = guia.productTable;
console.log('=== TABLA ACTUAL ===\n');
t.rows.forEach(r => {
  console.log('  ' + (r.label_es || r.label).padEnd(24) +
    r.values.map(v => (v.value_es || v.value)).join('  |  '));
});

// los tres montajes segun catalogo
const MONT = {
  'Basico $545': [['Scarlett 2i2', 15], ['microfono', null], ['K&M 210/2', 58], ['ATH-M20x', 609], ['paneles', 170]],
  'Profesional $816': [['Scarlett 2i2', 15], ['microfono', null], ['K&M 210/2', 58], ['ATH-M50x', 25], ['paneles', 170]],
  'Definitivo $905': [['SSL 2+ MKII', 18], ['microfono', null], ['K&M 210/2', 58], ['MDR-7506', 26], ['paneles', 170], ['Rokit 7 G5 x2', 'x2']]
};

console.log('\n\n=== SUMA REAL DE CADA MONTAJE (precio de catalogo) ===\n');

function suma(ids, micId, conPares) {
  let s = 0; const filas = [];
  ids.forEach(([nombre, id]) => {
    let v;
    if (nombre === 'microfono') v = byId[micId].price;
    else if (id === 'x2') v = byId[20].price * 2;
    else v = byId[id].price;
    s += v; filas.push([nombre, v]);
  });
  return { s, filas };
}

const CASOS = [
  ['Basico', [15, 58, 609, 170], 297, false, 545],
  ['Profesional', [15, 58, 25, 170], 3, false, 816],
  ['Definitivo', [18, 58, 26, 170], 297, true, 905],
  ['Definitivo', [18, 58, 26, 170], 3, true, 905]
];

CASOS.forEach(([nombre, ids, mic, pares, tabla]) => {
  const { s, filas } = suma(ids, mic, pares);
  console.log('\n' + nombre + '  (micro: ' + byId[mic].title + ')');
  filas.forEach(([n, v]) => console.log('    ' + n.padEnd(16) + '$' + v));
  console.log('    ' + '-'.repeat(22));
  console.log('    SUMA'.padEnd(18) + '$' + s + '   |  la tabla dice ~$' + tabla +
    (s === tabla ? '   CUADRA' : '   >>> NO CUADRA (dif ' + (tabla - s) + ')'));
});
