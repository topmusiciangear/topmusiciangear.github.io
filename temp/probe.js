const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
const g = guides.find(x => x.id === 'fix-clipping-scarlett');

console.log('verdictProsCons:', JSON.stringify(g.verdictProsCons || [], null, 1));
console.log('featuredProducts:', g.featuredProducts);
console.log('products:', g.products);
console.log('productTable:', JSON.stringify(g.productTable));
console.log('verdict:', g.verdict ? 'SI' : 'vacio');
console.log('verdict_es:', g.verdict_es ? 'SI' : 'vacio');
console.log('conclusion:', g.conclusion ? 'SI' : 'vacio');
console.log('conclusion_es:', g.conclusion_es ? 'SI' : 'vacio');