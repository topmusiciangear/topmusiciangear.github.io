const fs = require('fs');
const t = JSON.stringify(JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8')).find(x => x.id === 'pro-live-sound'));
const i = t.indexOf('perillas asignables');
console.log(i > -1 ? JSON.stringify(t.slice(Math.max(0, i - 100), i + 40)) : '(no existe)');
