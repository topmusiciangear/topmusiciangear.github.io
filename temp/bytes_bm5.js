const fs = require('fs');
const t = JSON.stringify(JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8')).find(x => x.id === 'budget-mics'));
const i = t.indexOf('dormitorio-estudio');
console.log(JSON.stringify(t.slice(Math.max(0, i - 200), i + 200)));
const j = t.indexOf('K&M 210/2 un filtro');
console.log('\nK&M sin y: ' + (j > -1 ? 'AUN FALTA' : 'no encontrado'));
const k = t.indexOf('210/2');
console.log(JSON.stringify(t.slice(k - 300, k + 200)));
