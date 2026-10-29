const p = require('../data/products.json');
const prod = p.find(x=>x.id===15);
console.log(JSON.stringify(prod.facts,null,2));
