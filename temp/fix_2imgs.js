const fs = require('fs');
const P = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
P.find(x => x.id === 482).img = 'https://r2.gear4music.com/media/113/1136330/1200/preview.jpg';
P.find(x => x.id === 411).img = 'https://r2.gear4music.com/media/92/926225/1200/preview.jpg';
fs.writeFileSync('data/products.json', JSON.stringify(P, null, 2));
console.log('done');