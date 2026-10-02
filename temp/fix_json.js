const fs = require('fs');
let t = fs.readFileSync('data/guides.json', 'utf8');
t = t.replace('"image": "https://r2.gear4music.com/media/44/447474/1200/preview.jpg",,', '"image": "https://r2.gear4music.com/media/44/447474/1200/preview.jpg",');
fs.writeFileSync('data/guides.json', t);
console.log('fixed');