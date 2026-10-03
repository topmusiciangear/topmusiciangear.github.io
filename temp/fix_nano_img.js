const fs = require('fs');
const P = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
P.find(x => x.id === 443).img = 'https://r2.gear4music.com/media/71/719931/1200/preview_1.jpg';
fs.writeFileSync('data/products.json', JSON.stringify(P, null, 2));
console.log('done');