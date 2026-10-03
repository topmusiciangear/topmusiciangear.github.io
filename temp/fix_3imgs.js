const fs = require('fs');
const P = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
P.find(x => x.id === 413).img = 'https://r2.gear4music.com/media/46/460565/1200/preview.jpg';
P.find(x => x.id === 413).stores.gear4music = 'https://www.awin1.com/cread.php?awinmid=1117&awinaffid=2891111&ued=https%3A%2F%2Fwww.gear4music.com%2FPA-DJ-and-Lighting%2FPreSonus-StudioLive-32SC%2F2WNL';
P.find(x => x.id === 418).img = 'https://r2.gear4music.com/media/96/961692/1200/preview.jpg';
P.find(x => x.id === 414).img = 'https://r2.gear4music.com/media/138/1383303/1200/preview.jpg';
P.find(x => x.id === 414).image = 'https://r2.gear4music.com/media/138/1383303/1200/preview.jpg';
fs.writeFileSync('data/products.json', JSON.stringify(P, null, 2));
console.log('done');