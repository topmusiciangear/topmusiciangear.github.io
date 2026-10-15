// De donde sale el $930 y cuanto esta cada cosa con precio de catalogo vs precio de boton
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const arr = JSON.parse(fs.readFileSync(BASE + 'data/products.json', 'utf8'));
const list = Array.isArray(arr) ? arr : arr.products;
const byId = {}; list.forEach(p => byId[p.id] = p);
const src = fs.readFileSync(BASE + 'build-guides.js', 'utf8');
const ini = src.indexOf('const TEST_SHOP_BTN = {');
const bloque = src.slice(ini, src.indexOf('\n};', ini));
function emp(t, i) { let d = 0; for (let j = i; j < t.length; j++) { if (t[j] === '{') d++; else if (t[j] === '}') { d--; if (!d) return j; } } return -1; }
function amazon(id) {
  const m = new RegExp('(?:^|\\n)(\\s*)' + id + ':\\s*\\{').exec(bloque);
  if (!m) return null;
  const e = bloque.slice(m.index + m[1].length, emp(bloque, m.index + m[1].length + (m[0].length - m[1].length) - 1) + 1);
  const a = /amazon:\s*"\$([\d,.]+)"/.exec(e);
  return a ? Number(a[1].replace(/[^0-9.]/g, '')) : null;
}

const N2 = [['SSL 2+ MKII', 18, 1], ['NT1 5th Gen', 3, 1], ['ATH-M50x', 25, 1], ['K&M 210/2', 58, 1], ['Paneles G4M', 170, 1], ['JBL 305P MkII', 116, 2]];

console.log('=== EL NIVEL 2, PRECIO A PRECIO ===\n');
console.log('  producto'.padEnd(24) + 'catálogo    Amazon(x2)');
let cat = 0, amz = 0, amzSinStand = 0;
N2.forEach(([n, id, m]) => {
  const c = byId[id].price;
  const a = amazon(id);
  cat += c * m;
  if (a) amz += a * m;
  else amz += c * m;
  const aSin = a === null ? c : a;
  amzSinStand += aSin * m;
  console.log('  ' + n.padEnd(22) + ('$' + c).padStart(6) + (m > 1 ? '  $' + (c * m) : '') +
    '   ' + (a === null ? '(sin Amazon)' : '$' + a + (m > 1 ? ' -> $' + (a * m) : '')));
});
console.log('  ' + '-'.repeat(56));
console.log('  ' + 'TOTAL con catálogo'.padEnd(24) + '$' + cat);
console.log('  ' + 'TOTAL con precio Amazon'.padEnd(24) + '$' + amz.toFixed(2).replace(/\.00$/, ''));
console.log('  ' + 'TOTAL Amazon SIN el soporte'.padEnd(24) + '$' + (amzSinStand - (amazon(58) || 0)).toFixed(2).replace(/\.00$/, ''));

console.log('\n\n=== DE DONDE SALE EL $930 ===\n');
const ss = amazon(18), nt = amazon(3), m5 = amazon(25), jbl = amazon(116);
console.log('  SSL 2+ MKII Amazon      $' + ss);
console.log('  NT1 5th Gen Amazon      $' + nt);
console.log('  ATH-M50x Amazon         $' + m5);
console.log('  JBL 305P x2 (Amazon)    $' + jbl + ' x2 = $' + jbl * 2);
console.log('  ' + '-'.repeat(34));
console.log('  suma                    $' + (ss + nt + m5 + jbl * 2));
console.log('\n  >>> ' + (ss + nt + m5 + jbl * 2).toFixed(2).replace(/\.00$/, '') + ' es tu $930.');
console.log('  O sea: usaste el precio de Amazon (no el de catálogo) y NO contaste');
console.log('  ni el soporte K&M ni los paneles acústicos.');

console.log('\n\n=== Y SI EL NIVEL 3 ES "LO DEFINITIVO", TIENE PRECIO IMPORTANTE? ===\n');
console.log('  Comparando con la competencia que vimos posicionando:\n');
const COMP = [
  ['Hyperbits', 477, 1500, 3000],
  ['Tools 4 Music', 350, 1200, 3500],
  ['jhbrandt', 650, 2000, 6000]
];
COMP.forEach(([n, a, b, c]) => {
  console.log('  ' + n.padEnd(14) + '$' + String(a).padStart(5) + ' -> $' + String(b).padStart(5) + ' -> $' + String(c).padStart(5) +
    '   salto medio->top: x' + (c / b).toFixed(1));
});
console.log('\n  nuestra propuesta: $1.003 -> $1.223 -> $2.523   salto medio->top: x' + (2523 / 1223).toFixed(1));
console.log('\n  O sea: si, el salto del medio al definitivo multiplica por ~2.');
console.log('  Es exactamente lo que hace la competencia. Tenias razon en ese punto.');
