const fs = require('fs');
const keys = ['1179b98613', '9cbc7cb3fe', '603d3f77a9', '59e1c43c7e'];
const products = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const guides = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const deals = JSON.parse(fs.readFileSync('data/deals.json', 'utf8'));

for (const k of keys) {
  const rel = 'img/products/' + k + '.webp';
  const p = products.filter(x => (x.img || '').includes(rel));
  const g = guides.filter(x => (x.image || '').includes(rel));
  const d = deals.filter(x => (x.img || '').includes(rel));
  console.log(k + ':');
  p.forEach(x => console.log('   producto ' + x.id + ' ' + x.title));
  g.forEach(x => console.log('   guia ' + x.id));
  d.forEach(x => console.log('   oferta ' + x.title));
  if (!p.length && !g.length && !d.length) console.log('   (sin uso)');
}
