const fs = require('fs');
let t = fs.readFileSync('data/guides.json', 'utf8');
const setCover = (id, url) => {
  const i = t.indexOf('"id": "' + id + '"');
  const imgIdx = t.indexOf('"image":', i);
  const endIdx = t.indexOf(',', imgIdx);
  t = t.slice(0, imgIdx) + '"image": "' + url + '"' + t.slice(endIdx + 1);
};
setCover('budget-interfaces', 'https://r2.gear4music.com/media/72/725077/1200/preview.jpg');
setCover('portable-interfaces', 'https://r2.gear4music.com/media/60/609791/1200/preview.jpg');
fs.writeFileSync('data/guides.json', t);
const G = JSON.parse(t);
console.log('budget-interfaces:', G.find(x => x.id === 'budget-interfaces').image);
console.log('portable-interfaces:', G.find(x => x.id === 'portable-interfaces').image);