const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(DIR + 'data/guides.json', 'utf8'));
const d = guides.find(x => x.id === 'best-drum-machine');
console.log('old image:', d.image);
d.image = 'https://r2.gear4music.com/media/82/829101/1200/preview.jpg';
fs.writeFileSync(DIR + 'data/guides.json', JSON.stringify(guides, null, 2));
console.log('cover updated');
