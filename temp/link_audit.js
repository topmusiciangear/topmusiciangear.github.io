const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const P = require(DIR + 'data/products.json');
[571, 572, 141, 140, 565, 573, 567, 570].forEach(id => {
  const p = P.find(x => x.id === id);
  console.log('=== ' + id + ' ' + p.title + ' ===');
  Object.keys(p.stores || {}).forEach(k => console.log('  ' + k + ': ' + p.stores[k].slice(0, 110)));
});
