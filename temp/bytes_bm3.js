const fs = require('fs');
const t = JSON.stringify(JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8')).find(x => x.id === 'budget-mics'));
['viene pelado', 'acondicionamiento', 'Cero accesorios por comprar', 'La contrapartida.</strong>'].forEach(k => {
  const i = t.indexOf(k);
  console.log('### ' + k + ' ###');
  console.log(i > -1 ? JSON.stringify(t.slice(Math.max(0, i - 60), i + 140)) : '(no existe)');
});
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
console.log('\nbudget-interfaces title_es: ' + g.find(x => x.id === 'budget-interfaces').title_es);
