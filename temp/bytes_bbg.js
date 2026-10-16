const fs = require('fs');
const t = JSON.stringify(JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8')).find(x => x.id === 'beginner-bass-guitars'));
const i = t.indexOf('Guía de bajos Fender');
console.log(i > -1 ? JSON.stringify(t.slice(Math.max(0, i - 80), i + 80)) : '(no existe)');
