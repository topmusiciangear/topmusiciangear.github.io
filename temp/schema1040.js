const products = require('C:/Users/Daniel/projects/topmusiciangear/data/products.json');
console.log(JSON.stringify(products.find(p => p.id === 1032), null, 1));
console.log(JSON.stringify(products.find(p => p.id === 1036), null, 1).slice(0, 600));
