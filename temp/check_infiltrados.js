const fs = require('fs');
const guides = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const g = guides.find(x => x.id === 'best-interface');
if (!g) { console.log('NO EXISTE best-interface'); process.exit(0); }
console.log('titulo:', g.title);
const cols = (g.productTable?.columns || []).map(c => c.title);
console.log('\nTABLA (' + cols.length + '):');
cols.forEach(c => console.log('  - ' + c));
const vpc = (g.verdictProsCons || []).map(v => v.name);
console.log('\nVEREDICTOS (' + vpc.length + '):');
vpc.forEach(v => console.log('  - ' + v));
console.log('\nSECCIONES con products:');
(g.sections || []).forEach(s => {
  if (!s) { console.log('  NULL SECTION!'); return; }
  console.log('  [' + JSON.stringify(s.products) + '] ' + String(s.heading).slice(0, 60));
});
// Infiltrados: en secciones/veredictos pero NO en tabla, y viceversa
const inTable = new Set(cols);
const inVpc = new Set(vpc);
const secIds = new Set();
const products = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/products.json', 'utf8'));
const arr = Array.isArray(products) ? products : products.products;
const byId = {};
arr.forEach(p => byId[p.id] = p.title);
(g.sections || []).forEach(s => { if (s && s.products) s.products.forEach(id => secIds.add(id)); });
console.log('\n--- Secciones usan IDs:', [...secIds].map(id => id + '=' + (byId[id] || '?')).join(', '));
// Nombres de secciones -> productos?
console.log('\nEn veredictos pero NO en tabla:');
vpc.filter(v => !inTable.has(v)).forEach(v => console.log('  - ' + v));
console.log('\nEn tabla pero NO en veredictos:');
cols.filter(c => !inVpc.has(c)).forEach(c => console.log('  - ' + c));