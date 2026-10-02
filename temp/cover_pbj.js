const fs = require('fs');
const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const g = G.find(x => x.id === 'precision-vs-jazz');
console.log('cover antes: ' + g.image);
g.image = 'https://r2.gear4music.com/media/109/1092663/1200/preview.jpg';
fs.writeFileSync('data/guides.json', JSON.stringify(G, null, 2));
console.log('cover ahora: OK');
