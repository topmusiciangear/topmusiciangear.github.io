const fs = require('fs');
let t = fs.readFileSync('data/guides.json', 'utf8');
t = t.replace('"image": "https://r2.gear4music.com/media/113/1133730/1200/preview_1.jpg",,', '"image": "https://r2.gear4music.com/media/113/1133730/1200/preview_1.jpg",');
t = t.replace('"image": "https://r2.gear4music.com/media/71/713025/1200/preview.jpg",,', '"image": "https://r2.gear4music.com/media/71/713025/1200/preview.jpg",');
fs.writeFileSync('data/guides.json', t);
console.log('Fixed double commas');