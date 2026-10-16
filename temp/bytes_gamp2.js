const fs = require('fs');
const t = JSON.stringify(JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8')).find(x => x.id === 'best-mic-for-guitar-amps'));
const i = t.indexOf('estándar para guitarra');
console.log(i > -1 ? JSON.stringify(t.slice(Math.max(0, i - 100), i + 60)) : '(no existe)');
