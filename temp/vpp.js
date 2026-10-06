const fs = require('fs');
const p = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
for (const id of [565,566,567,568,569,570,571,572,140,141]) {
  const pr = p.find(x => x.id === id);
  if (!pr) { console.log(id, 'MISSING'); continue; }
  console.log('=== ' + id + ' ' + pr.name);
  console.log('  image:', pr.image);
  console.log('  links:', JSON.stringify(pr.links || pr.storeLinks || pr.urls || null));
  console.log('  keys:', Object.keys(pr).join(','));
  if (pr.desc) console.log('  desc:', pr.desc.slice(0, 200));
  if (pr.desc_es) console.log('  desc_es:', pr.desc_es.slice(0, 200));
}
