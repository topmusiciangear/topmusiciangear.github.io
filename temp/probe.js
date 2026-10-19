const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const p = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));
['8351', 'KH 80', '8010A', 'JBL 305P', 'Adam Audio A7V', 'Yamaha HS8', 'Rokit 7 G5', 'IN-8 V2', 'LP-6 V2', '8030C']
  .forEach(q => p.filter(x => (x.title || '').includes(q)).forEach(x => console.log(q.padEnd(12) + ' -> ' + x.score + '  ' + x.title)));
