const fs = require('fs');
const P = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
P.find(x => x.id === 328).img = 'https://r2.gear4music.com/media/128/1280861/1200/preview_1.jpg';
fs.writeFileSync('data/products.json', JSON.stringify(P, null, 2));
console.log('img 328 updated');