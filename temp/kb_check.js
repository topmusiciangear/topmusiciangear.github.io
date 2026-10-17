const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
const bg = fs.readFileSync(B + 'build-guides.js', 'utf8');
[1013, 1014, 1015].forEach(id => {
  const p = products.find(x => x.id === id);
  console.log('=== ' + id + ' ' + p.brand + ' | ' + p.title + ' | price=' + p.price);
  console.log('  image: ' + (p.image || p.img || 'NINGUNA'));
  console.log('  stores: ' + JSON.stringify(p.stores));
  const m = bg.match(new RegExp('\\n' + id + ': [^\n]+'));
  console.log('  TEST: ' + (m ? m[0].trim() : 'SIN ENTRADA'));
  const where = [];
  guides.forEach(g => {
    const s = JSON.stringify(g);
    if ((g.featuredProducts || []).includes(id) || (g.products || []).includes(id)) where.push(g.id + ' [featured/products]');
    if (g.sections && g.sections.some(x => (x.products || []).includes(id))) where.push(g.id + ' [section]');
  });
  console.log('  en guias: ' + (where.length ? where.join(', ') : 'NINGUNA'));
});