const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));
[1038, 1039, 472].forEach(id => {
  const p = products.find(x => x.id === id);
  if (!p) { console.log(id + ': NOT FOUND'); return; }
  const dup = p.brand + ' ' + p.brand + ' ';
  if (p.title.startsWith(dup)) { p.title = p.title.slice(dup.length - p.brand.length - 1); }
  console.log(id + ': [' + p.brand + '] [' + p.title + '] img=' + (p.img ? 'Y' : 'N') + ' pb=' + (p.stores && p.stores.pluginboutique ? 'Y' : 'search'));
});
fs.writeFileSync(B + 'data/products.json', JSON.stringify(products, null, 2), 'utf8');
// check all 1001-1039 + 472 for dupe brands and missing img
const issues = [];
products.forEach(p => {
  if ((p.id >= 1001 && p.id <= 1039) || p.id === 472) {
    if (p.title.startsWith(p.brand + ' ' + p.brand)) issues.push(p.id + ' dupe brand');
    if (!p.img) issues.push(p.id + ' no img');
  }
});
console.log(issues.length ? 'ISSUES: ' + issues.join(', ') : 'ALL CLEAN (1001-1039 + 472)');
