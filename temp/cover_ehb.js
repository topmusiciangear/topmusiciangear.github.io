const fs = require('fs');
const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const g = G.find(x => x.id === 'best-bass-home-office');
console.log('cover antes: ' + g.image);
g.image = 'https://r2.gear4music.com/media/103/1033527/1200/preview.jpg';
fs.writeFileSync('data/guides.json', JSON.stringify(G, null, 2));
console.log('cover ahora: ' + JSON.parse(fs.readFileSync('data/guides.json', 'utf8')).find(x => x.id === 'best-bass-home-office').image);
