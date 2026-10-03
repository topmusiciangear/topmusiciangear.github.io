const fs = require('fs');
let t = fs.readFileSync('data/guides.json', 'utf8');
t = t.split('"image": "https://r2.gear4music.com/media/72/725077/1200/preview.jpg"\n').join('"image": "https://r2.gear4music.com/media/72/725077/1200/preview.jpg",\n');
t = t.split('"image": "https://r2.gear4music.com/media/60/609791/1200/preview.jpg"\n').join('"image": "https://r2.gear4music.com/media/60/609791/1200/preview.jpg",\n');
fs.writeFileSync('data/guides.json', t);
const G = JSON.parse(t);
console.log('budget-interfaces:', G.find(x => x.id === 'budget-interfaces').image);
console.log('portable-interfaces:', G.find(x => x.id === 'portable-interfaces').image);