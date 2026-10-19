const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));
products.forEach((p, i) => {
  if ((p.title || '').includes('RØDECaster Pro II')) {
    console.log('#' + i + ' id=' + p.id + ' score=' + p.score);
    console.log('   desc_es (' + (p.desc_es || '').length + '): ' + (p.desc_es || '').slice(0, 90));
    console.log('   stores: ' + Object.keys(p.stores || {}).join(','));
  }
});
