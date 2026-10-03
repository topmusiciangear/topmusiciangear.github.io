const fs = require('fs');
const P = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
P.find(x => x.id === 263).img = 'https://r2.gear4music.com/media/71/711891/1200/preview_1.jpg';
fs.writeFileSync('data/products.json', JSON.stringify(P, null, 2));
console.log('img 263 updated');