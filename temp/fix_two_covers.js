const fs = require('fs');
let t = fs.readFileSync('data/guides.json', 'utf8');

// scarlett-vs-ssl
let i = t.indexOf('"id": "scarlett-vs-ssl"');
let imgIdx = t.indexOf('"image":', i);
let endIdx = t.indexOf(',', imgIdx);
t = t.slice(0, imgIdx) + '"image": "https://r2.gear4music.com/media/113/1133730/1200/preview_1.jpg",' + t.slice(endIdx);

// scarlett-vs-volt
i = t.indexOf('"id": "scarlett-vs-volt"');
imgIdx = t.indexOf('"image":', i);
endIdx = t.indexOf(',', imgIdx);
t = t.slice(0, imgIdx) + '"image": "https://r2.gear4music.com/media/71/713025/1200/preview.jpg",' + t.slice(endIdx);

fs.writeFileSync('data/guides.json', t);
console.log('Both covers updated');