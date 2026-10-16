const fs = require('fs');
const t = JSON.stringify(JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8')).find(x => x.id === 'j48-vs-rndi'));
const i = t.indexOf('no se parece en nada');
console.log(i > -1 ? JSON.stringify(t.slice(Math.max(0, i - 100), i + 40)) : '(no existe)');
