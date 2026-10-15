// Catalogo vs Amazon, linea por linea, en los tres niveles
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

const NIV = {
  'Nivel 1 · Esencial': [[15, 1], [297, 1], [609, 1], [58, 1], [170, 1], [633, 2]],
  'Nivel 2 · Productor Pro': [[18, 1], [3, 1], [25, 1], [58, 1], [170, 1], [116, 2]],
  'Nivel 3 · Definitivo': [[16, 1], [674, 1], [26, 1], [58, 1], [170, 1], [20, 2]]
};

console.log('=== CATALOGO vs AMAZON, LINEA POR LINEA ===\n');
const res = {};
Object.entries(NIV).forEach(([n, items]) => {
  let cat = 0, amz = 0;
  console.log('■ ' + n);
  console.log('   producto'.padEnd(36) + 'catálogo      Amazon      nota');
  items.forEach(([id, m]) => {
    const c = byId[id].price;
    const a = amazon(id);
    const usa = a === null ? c : a;
    cat += c * m; amz += usa * m;
    const nota = a === null ? 'sin Amazon -> catalogo' : (a !== c ? 'distinto' : 'igual');
    console.log('   ' + byId[id].title.slice(0, 34).padEnd(36) +
      ('$' + c).padStart(6) + (m > 1 ? '(x' + m + ')' : '    ') +
      (a === null ? '   —   ' : ('$' + a).padStart(6) + (m > 1 ? '(x' + m + ')' : '    ')) +
      '   ' + nota);
  });
  console.log('   ' + '-'.repeat(70));
  console.log('   ' + 'TOTAL'.padEnd(36) + ('$' + Math.round(cat)).padStart(10) + ('$' + Math.round(amz)).padStart(12));
  res[n] = { cat: Math.round(cat), amz: Math.round(amz) };
  console.log('');
});

console.log('=== LO QUE DIJISTE QUE QUEDABA ===\n');
console.log('  $1.003 / $1.077 / $2.377');
console.log('\n  calculado:');
console.log('    Nivel 1  ' + res['Nivel 1 · Esencial'].cat + ' (cat) / ' + res['Nivel 1 · Esencial'].amz + ' (Amazon)');
console.log('    Nivel 2  ' + res['Nivel 2 · Productor Pro'].cat + ' (cat) / ' + res['Nivel 2 · Productor Pro'].amz + ' (Amazon)');
console.log('    Nivel 3  ' + res['Nivel 3 · Definitivo'].cat + ' (cat) / ' + res['Nivel 3 · Definitivo'].amz + ' (Amazon)');

console.log('\n  >>> con Amazon: $' + res['Nivel 1 · Esencial'].amz + ' / $' + res['Nivel 2 · Productor Pro'].amz + ' / $' + res['Nivel 3 · Definitivo'].amz);
