const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));
[1033, 1034].forEach(id => {
  const users = [];
  guides.forEach(g => {
    const refs = [...(g.featuredProducts || [])];
    (g.sections || []).forEach(s => (s.products || []).forEach(p => refs.push(p)));
    if (refs.includes(id)) users.push(g.id);
  });
  console.log(id + ' usado en: ' + users.join(','));
});
const p = products.find(x => x.id === 1034);
p.title = 'FabFilter Mastering Bundle';
fs.writeFileSync(B + 'data/products.json', JSON.stringify(products, null, 2), 'utf8');
console.log('1034.title renombrado');
