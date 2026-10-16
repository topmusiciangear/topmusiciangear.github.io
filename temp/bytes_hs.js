const fs = require('fs');
const t = JSON.stringify(JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8')).find(x => x.id === 'best-hardware-samplers'));
const i = t.indexOf('El costo es la contra');
console.log(i > -1 ? JSON.stringify(t.slice(Math.max(0, i - 40), i + 80)) : '(no existe)');
