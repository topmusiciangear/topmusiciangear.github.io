// Update fx-plugins featuredProducts to include all 13 products
const fs = require('fs');
const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const g = G.find(x => x.id === 'fx-plugins');

const P = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const titles = g.productTable.columns.map(c => c.title);
const ids = titles.map(t => {
  const p = P.find(x => x.title === t);
  return p ? p.id : null;
}).filter(x => x !== null);

g.featuredProducts = ids;
fs.writeFileSync('data/guides.json', JSON.stringify(G, null, 2));
console.log('fx-plugins featuredProducts updated:', ids.join(', '));