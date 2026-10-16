const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
const g = guides.find(x => x.id === 'repitch-vs-melodyne');
g.faq.forEach((f, i) => console.log('--- FAQ' + i + ': ' + f.a.slice(0, 300)));
