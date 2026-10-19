const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
const g = guides.find(x => x.id === 'best-headphones-for-mixing');
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));

const mm = products.find(p => p.id === 1050);
const ndh = products.find(p => p.id === 424);

console.log('MM-500 id:', mm && mm.id, '| NDH 30 id:', ndh && ndh.id);

// Cada seccion puede llevar products: [ids]. Asignar el producto a su seccion
g.sections.forEach((s, i) => {
  if (/Audeze MM-500/i.test(s.heading || '')) { s.products = [mm.id]; console.log('  seccion ' + i + ' <- MM-500'); }
  if (/Neumann NDH 30/i.test(s.heading || '')) { s.products = [ndh.id]; console.log('  seccion ' + i + ' <- NDH 30'); }
});

// featuredProducts (por si la pagina los usa)
const fp = (g.featuredProducts || []);
if (!fp.includes(mm.id)) fp.push(mm.id);
if (!fp.includes(ndh.id)) fp.push(ndh.id);
g.featuredProducts = fp;

console.log('featuredProducts:', g.featuredProducts);

fs.writeFileSync(B + 'data/guides.json', JSON.stringify(guides, null, 2), 'utf8');
console.log('Escrito.');
