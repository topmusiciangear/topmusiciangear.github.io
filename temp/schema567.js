const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const P = require(DIR + 'data/products.json');
const p567 = P.find(x => x.id === 567);
console.log(JSON.stringify(p567, null, 1));
const ids = P.map(x => x.id);
console.log('max id:', Math.max(...ids));
