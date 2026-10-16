const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
guides.find(x => x.id === 'best-audio-repair-plugins').image = 'https://r2.gear4music.com/media/137/1374743/1200/preview.jpg';
fs.writeFileSync(B + 'data/guides.json', JSON.stringify(guides, null, 2), 'utf8');
console.log('portada repair OK');
