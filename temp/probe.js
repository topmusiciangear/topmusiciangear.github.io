const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const p = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));
p.filter(x => (x.title || '').includes('Komplete 26')).forEach(x => {
  console.log('id=' + x.id + '  precio=' + x.price + '  score=' + x.score);
  console.log('   title: "' + x.title + '"');
  console.log('   title_es: "' + (x.title_es || '') + '"');
  console.log('   stores: ' + Object.keys(x.stores || {}).join(','));
});
