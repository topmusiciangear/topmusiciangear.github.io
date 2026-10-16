const fs = require('fs');
const t = JSON.stringify(JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8')).find(x => x.id === 'budget-monitors'));
['quiero un gran sonido', '4,5 pulgadas de alta excursión', 'punto óptimo de escucha', 'sin graves falsos', 'sub-bass profundo'].forEach(k => {
  const i = t.indexOf(k);
  console.log('### ' + k + ' ###');
  console.log(i > -1 ? JSON.stringify(t.slice(Math.max(0, i - 80), i + 100)) : '(no existe)');
});
