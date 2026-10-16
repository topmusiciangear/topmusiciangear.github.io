const fs = require('fs');
const t = JSON.stringify(JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8')).find(x => x.id === 'budget-mics'));
['K&M 210/2 un filtro', 'Mejores Interfaces', 'acondicionamiento acústico', 'Cero accesorios', 'La contrapartida.'].forEach(k => {
  const i = t.indexOf(k);
  console.log('### ' + k + ' ###');
  console.log(i > -1 ? JSON.stringify(t.slice(Math.max(0, i - 80), i + 120)) : '(no existe)');
});
