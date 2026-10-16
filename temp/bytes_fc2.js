const fs = require('fs');
const t = JSON.stringify(JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8')).find(x => x.id === 'fix-clipping-scarlett'));
const i = t.indexOf('interruptor 4K');
console.log(i > -1 ? JSON.stringify(t.slice(Math.max(0, i - 60), i + 40)) : '(no existe)');
