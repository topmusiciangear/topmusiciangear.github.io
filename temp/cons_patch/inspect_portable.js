const g = require('../../data/guides.json');
const arr = Array.isArray(g) ? g : (g.guides || []);
const pi = arr.find(x => x && x.id === 'portable-interfaces');
if (!pi) { console.log('portable-interfaces NOT FOUND'); process.exit(0); }
console.log('=== verdictProsCons ===');
for (const v of (pi.verdictProsCons || [])) {
  console.log(' * name=' + v.name + ' | img=' + JSON.stringify(v.image || v.img || null));
}
console.log('=== productTable rows ===');
const rows = Array.isArray(pi.productTable) ? pi.productTable : (pi.featuredProducts || []);
for (const r of (Array.isArray(pi.productTable) ? pi.productTable : [])) {
  console.log(' * ' + JSON.stringify(r));
}
console.log('=== featuredProducts ===');
for (const r of (pi.featuredProducts || [])) {
  console.log(' * ' + JSON.stringify(r));
}
console.log('=== sections names ===');
for (const s of (pi.sections || [])) {
  console.log(' * section: ' + JSON.stringify(s.title || s.heading || s.name || '?'));
}
