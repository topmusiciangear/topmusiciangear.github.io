const fs = require('fs');
const P = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
P.find(x => x.id === 335).img = 'https://r2.gear4music.com/media/53/535561/1200/preview.jpg';
fs.writeFileSync('data/products.json', JSON.stringify(P, null, 2));
console.log('done');