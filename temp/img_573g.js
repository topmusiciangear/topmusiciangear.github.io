const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const pFile = DIR + 'data/products.json';
const P = JSON.parse(fs.readFileSync(pFile, 'utf8'));
const p = P.find(x => x.id === 573);
if (!p) throw new Error('573 not found');
p.img = 'https://r2.gear4music.com/media/139/1392733/1200/preview_2.jpg';
fs.writeFileSync(pFile, JSON.stringify(P, null, 2) + '\n');
console.log('573 img -> G4M');
