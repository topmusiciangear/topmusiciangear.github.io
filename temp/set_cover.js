const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
const g = guides.find(x => x.id === 'repitch-vs-melodyne');
g.image = 'https://r2.gear4music.com/media/130/1304045/1200/preview_1.jpg';
fs.writeFileSync(B + 'data/guides.json', JSON.stringify(guides, null, 2), 'utf8');
console.log('portada aplicada');
const withImg = guides.filter(x => x.image).length;
console.log('guias con image: ' + withImg + '/' + guides.length);
