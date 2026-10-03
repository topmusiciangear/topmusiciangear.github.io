const fs = require('fs');
// Guide cover budget-pa-systems
let t = fs.readFileSync('data/guides.json', 'utf8');
let i = t.indexOf('"id": "budget-pa-systems"');
let imgIdx = t.indexOf('"image":', i);
let endIdx = t.indexOf(',', imgIdx);
t = t.slice(0, imgIdx) + '"image": "https://r2.gear4music.com/media/104/1045200/1200/preview.jpg",' + t.slice(endIdx + 1);
// Product 105 image
const P = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
P.find(x => x.id === 105).img = 'https://r2.gear4music.com/media/104/1045200/1200/preview.jpg';
fs.writeFileSync('data/products.json', JSON.stringify(P, null, 2));
fs.writeFileSync('data/guides.json', t);
const G = JSON.parse(t);
console.log('cover:', G.find(x => x.id === 'budget-pa-systems').image);