const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '..', 'guides');
const en = fs.readFileSync(path.join(dir, 'best-beginner-electric-guitar.html'), 'utf8');
const es = fs.readFileSync(path.join(dir, 'best-beginner-electric-guitar_es.html'), 'utf8');

const proModels = ['American Professional II', 'Les Paul Standard', 'RG550', 'McCarty'];
proModels.forEach(m => console.log('EN contains "' + m + '":', en.indexOf(m) > -1));
proModels.forEach(m => console.log('ES contains "' + m + '":', es.indexOf(m) > -1));

console.log('---');
const names = { 462: 'Squier Sonic Stratocaster HT', 463: 'Ibanez Gio GRG121DX', 464: 'Yamaha Revstar Element RSE20' };
Object.keys(names).forEach(id => {
  console.log(names[id], 'in EN page:', en.indexOf(names[id]) > -1);
});

// verify prices for the new products in the rendered shop buttons
const productData = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'products.json'), 'utf8'));
[462, 463, 464].forEach(id => {
  const p = productData.find(v => v.id === id);
  const priceChecks = Object.entries(p.stores).map(([store, url]) => {
    const hasUrl = en.indexOf(url) > -1;
    return store + ':' + (hasUrl ? 'URL' : 'missing');
  });
  console.log('id', id, priceChecks.join(' '));
});