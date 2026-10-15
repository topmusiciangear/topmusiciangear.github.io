// Localizar SE Electronics X1 R y ver su imagen actual
const fs = require('fs');
const p = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/products.json', 'utf8'));
const arr = Array.isArray(p) ? p : (p.products || Object.values(p));

const hits = arr.filter(x => /x1\s*r/i.test(x.name || '') || /se electronics/i.test(x.name || ''));
console.log('=== COINCIDENCIAS ===');
hits.forEach(x => {
  console.log('\nid: ' + x.id);
  console.log('  name: ' + x.name);
  console.log('  image: ' + JSON.stringify(x.image));
  console.log('  imageAlt: ' + JSON.stringify(x.imageAlt));
  ['imgUrl', 'img', 'photo', 'imageUrl'].forEach(k => { if (x[k]) console.log('  ' + k + ': ' + JSON.stringify(x[k])); });
  console.log('  claves: ' + Object.keys(x).join(', '));
});
