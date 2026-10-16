const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const bm = g.find(x => x.id === 'best-microphone');
console.log('best-microphone title: ' + bm.title);
const rib = g.find(x => x.id === 'best-ribbon-mics');
const t = JSON.stringify(rib);
const i = t.indexOf('23 Best Budget Microphones Under $200: XLR');
console.log('\ncontexto completo:');
console.log(t.slice(Math.max(0, i - 300), i + 200).replace(/\\"/g, '"'));
