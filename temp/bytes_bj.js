const fs = require('fs');
const t = JSON.stringify(JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8')).find(x => x.id === 'blues-junior-vs-ac30'));
const i = t.indexOf('Cada amplificador tiene su propio camino');
console.log(i > -1 ? JSON.stringify(t.slice(Math.max(0, i - 120), i + 60)) : '(no existe)');
