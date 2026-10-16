const products = require('C:/Users/Daniel/projects/topmusiciangear/data/products.json');
const guides = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
const ids = new Set();
guides.filter(g => g.category === 'plugins').forEach(g => (g.featuredProducts || []).forEach(id => ids.add(id)));
console.log('productos en guias plugins: ' + ids.size);
[...ids].sort((a, b) => a - b).forEach(id => {
  const p = products.find(x => x.id === id);
  if (!p) { console.log(id + ': NO EXISTE'); return; }
  const first = p.brand.toLowerCase().split(' ')[0];
  const has = p.title.toLowerCase().includes(first) || p.title.toLowerCase().includes(p.brand.toLowerCase());
  console.log(id + ' | brand=[' + p.brand + '] title=[' + p.title + '] | marca: ' + (has ? 'SI' : 'NO'));
});
