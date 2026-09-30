const fs = require('fs');
const g = JSON.parse(fs.readFileSync('temp/guide_everyroom.json', 'utf8'));

console.log('=== productTable: estructura ===');
const pt = g.productTable;
Object.keys(pt).forEach(k => {
  const v = pt[k];
  console.log('  ' + k.padEnd(24) + (Array.isArray(v) ? 'array[' + v.length + ']' : typeof v === 'string' ? 'string len=' + v.length : typeof v));
});
console.log('\n--- productTable completo (recorte) ---');
console.log(JSON.stringify(pt, null, 1).slice(0, 3000));

console.log('\n=== verdictProsCons: ' + g.verdictProsCons.length + ' entradas ===');
g.verdictProsCons.forEach((v, i) => {
  console.log('  [' + i + '] ' + (v.title || v.name || JSON.stringify(v).slice(0, 60)));
});
