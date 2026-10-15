// 1) Definitivo: NT1 Signature -> NT1 5th Generation
// 2) recalcular los TRES totales desde la tabla (el del Definitivo estaba mal)
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const F = BASE + 'data/guides.json';
const arr = JSON.parse(fs.readFileSync(BASE + 'data/products.json', 'utf8'));
const list = Array.isArray(arr) ? arr : arr.products;
const byId = {}; list.forEach(p => byId[p.id] = p);

const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const guia = g.find(x => x.id === 'starter-studio');
const t = guia.productTable;

// ── 1) microfono del Definitivo ──
const mic = t.rows.find(r => r.label === 'Microphone');
mic.values[2].value = 'Rode NT1 5th Generation (condenser)';
mic.values[2].value_es = 'Rode NT1 5th Generation (condensador)';
console.log('ok  tabla · microfono col 3 -> Rode NT1 5th Generation');

// ── 2) recalcular los totales leyendo la tabla ──
const PRECIOS = [
  ['Focusrite Scarlett 2i2 4th Gen', 15, 1],
  ['SSL 2+ MKII', 18, 1],
  ['Rode NT1 Signature (condenser)', 297, 1],
  ['Rode NT1 5th Generation (condenser)', 3, 1],
  ['Audio-Technica ATH-M20x', 609, 1],
  ['Audio-Technica ATH-M50x', 25, 1],
  ['Sony MDR-7506', 26, 1],
  ['KRK Rokit 7 G5 (pair)', 20, 2],
  ['K&M 210/2 Mic Stand', 58, 1],
  ['G4M Acoustics Squarewave Acoustic Treatment Panels (4-Pack)', 170, 1]
];
function precioCelda(txt) {
  const limpio = txt.replace(/\(.*?\)/g, '').replace(/^\s*|\s*$/g, '');
  for (const [nombre, id, mult] of PRECIOS) {
    const base = nombre.replace(/\s*\(.*?\)/g, '');
    if (limpio.toLowerCase() === base.toLowerCase()) return byId[id].price * mult;
  }
  return null;
}

const nuevos = [];
console.log('\n=== RECALCULO DE LOS TRES TOTALES ===\n');
for (let c = 0; c < t.columns.length; c++) {
  let suma = 0; const falta = [];
  t.rows.forEach(r => {
    if (r.label === 'Total') return;
    const txt = r.values[c].value_es || r.values[c].value;
    const v = precioCelda(txt);
    if (v === null) { if (!/^Solo auriculares/i.test(txt) && !/recomendado/i.test(txt)) falta.push(r.label); }
    else suma += v;
  });
  const antes = t.rows.find(r => r.label === 'Total').values[c].value;
  nuevos.push(suma);
  console.log('  ' + (t.columns[c].title_es).padEnd(30) + 'antes ' + antes.padEnd(8) + '-> ahora ~$' + suma +
    (String(antes).replace(/[^0-9]/g, '') === String(suma) ? '   (igual)' : '   CORREGIDO'));
  if (falta.length) console.log('      filas sin precio: ' + falta.join(', '));
}

// escribir los totales
const filaT = t.rows.find(r => r.label === 'Total');
nuevos.forEach((v, c) => {
  filaT.values[c].value = '~$' + v;
  filaT.values[c].value_es = '~$' + v;
});

fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\n  totales escritos: ' + JSON.stringify(nuevos));

// ── 3) ¿es matematicamente posible un Definitivo por debajo de $1.000? ──
console.log('\n\n=== ¿PUEDE EL DEFINITIVO BAJAR DE $1.000? ===\n');
const [, , nt15, , , , , rok, , pan] = PRECIOS.map(p => p[1]);
const baseDef = {
  'NT1 5th Gen': byId[3].price,
  'MDR-7506': byId[26].price,
  'paneles': byId[170].price,
  'Rokit 7 G5 x2': byId[20].price * 2
};
let s = 0;
Object.entries(baseDef).forEach(([k, v]) => { s += v; console.log('  ' + k.padEnd(16) + '$' + v); });
console.log('  ' + '-'.repeat(22));
console.log('  ' + 'subtotal'.padEnd(16) + '$' + s);
console.log('\n  Con la Scarlett 2i2 ($' + byId[15].price + '): $' + (s + byId[15].price));
console.log('  Con la SSL 2+ MKII  ($' + byId[18].price + '): $' + (s + byId[18].price));
console.log('\n  Sin el par de monitores (solo auriculares): $' + (s - baseDef['Rokit 7 G5 x2'] + byId[18].price));
