const fs = require('fs');
const P = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const p = P.find(x => x.id === 546);
p.stores.andertons = 'https://www.andertons.co.uk/fender-american-professional-II-jazz-bass-v-in-3-colour-sunburst-with-rosewood-fingerboard/';
fs.writeFileSync('data/products.json', JSON.stringify(P, null, 2));
console.log('stores 546: ' + Object.keys(P.find(x => x.id === 546).stores).join(','));
