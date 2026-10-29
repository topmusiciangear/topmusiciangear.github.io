const p = require('../data/products.json');
const sample = p.find(x => x.facts);
if (!sample) { console.log('No facts'); process.exit(0); }
console.log('Sample product', sample.id, sample.title);
console.log(JSON.stringify(sample.facts, null, 2));

const ids = p.filter(x => x.facts).map(x => x.id);
console.log('Products with facts:', ids.length);
console.log(ids.slice(0,20).join(', '));
