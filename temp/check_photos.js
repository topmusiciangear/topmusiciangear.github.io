const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
const g = guides.find(x => x.id === 'best-headphones-for-mixing');
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));

g.sections.forEach((s, i) => {
  const imgs = (s.products || []).map(p => {
    const pr = products.find(x => x.id === p);
    return pr && pr.img ? 'CON FOTO' : 'SIN FOTO';
  });
  console.log('[' + i + '] ' + s.heading);
  console.log('     products=' + JSON.stringify(s.products) + '  -> ' + imgs.join(', '));
});
