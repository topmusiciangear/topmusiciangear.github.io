const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const g = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8')).find(x => x.id === 'usb-mics');
const cols = g.productTable.columns.map(c => c.title);

let total = 0, cells = 0;
console.log('=== CELDAS "Not published" POR FILA ===');
g.productTable.rows.forEach(function (r) {
  const blanks = [];
  r.values.forEach(function (v, i) {
    total++;
    const val = (v.value || '').trim();
    if (/^Not published/i.test(val)) { blanks.push(i); cells++; }
  });
  if (blanks.length) {
    console.log('  ' + r.label.padEnd(28) + blanks.length + '/10   ' + blanks.map(i => cols[i].split(' ').slice(0, 2).join(' ')).join(', '));
  }
});
console.log('\n  TOTAL celdas de la tabla: ' + total);
console.log('  TOTAL "Not published"  : ' + cells + '  (' + Math.round(cells / total * 100) + '% de la tabla)');

console.log('\n=== POR PRODUCTO: cuantas celdas sin dato ===');
cols.forEach(function (c, i) {
  let n = 0, which = [];
  g.productTable.rows.forEach(function (r) {
    const v = r.values[i];
    if (/^Not published/i.test((v.value || '').trim())) { n++; which.push(r.label); }
  });
  console.log('  ' + c.slice(0, 30).padEnd(32) + n + ' huecos' + (n ? '   (' + which.join(', ') + ')' : '   [completo]'));
});

console.log('\n=== FABRICANTES QUE SI PUBLICAN ESTOS DATOS (candidatos a rellenar) ===');
const byId = {}; JSON.parse(fs.readFileSync(BASE + 'data/products.json', 'utf8')).forEach(p => byId[p.id] = p);
const IDS = [194, 195, 286, 299, 3, 666, 670, 252, 291, 276];
IDS.forEach(function (id, i) {
  const p = byId[id];
  const n = g.productTable.rows.filter(r => /^Not published/i.test((r.values[i].value || '').trim())).length;
  console.log('  ' + (p.brand || '?').padEnd(14) + c_title(i) + '   ' + n + ' huecos');
});
function c_title(i) { return cols[i].slice(0, 30).padEnd(32); }