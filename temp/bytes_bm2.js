const fs = require('fs');
const t = JSON.stringify(JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8')).find(x => x.id === 'best-microphone'));
const i = t.indexOf('SM57 vs SM58');
console.log(i > -1 ? JSON.stringify(t.slice(Math.max(0, i - 120), i + 80)) : '(no existe)');
