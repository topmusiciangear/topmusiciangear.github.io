const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
['best-microphone', 'live-sound-pa', 'best-mic-for-guitar-amps'].forEach(id => {
  const x = g.find(y => y.id === id);
  console.log(id + ': ' + (x ? x.title_es : 'NO EXISTE'));
});
