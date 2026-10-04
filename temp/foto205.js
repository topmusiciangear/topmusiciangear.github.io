const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/products.json';
const P = require(F);
P.find(x => x.id === 205).img = 'https://r2.gear4music.com/media/114/1149987/1200/preview.jpg';
console.log('IMG203: ' + P.find(x => x.id === 203).img);
fs.writeFileSync(F, JSON.stringify(P, null, 2));
console.log('foto 205 lista');