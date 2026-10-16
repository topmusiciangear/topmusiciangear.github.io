const fs = require('fs');
const t = JSON.stringify(JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8')).find(x => x.id === 'budget-mics'));
['Consulta primero nuestra Guía', 'K&M 210/2 un filtro', 'Súmale: trae pinza', 'K&M 210/2 La rejilla'].forEach(k => {
  const i = t.indexOf(k);
  console.log('### ' + k + ' ###');
  console.log(i > -1 ? JSON.stringify(t.slice(Math.max(0, i - 60), i + 100)) : '(no existe)');
});
