const fs = require('fs');
const t = JSON.stringify(JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8')).find(x => x.id === 'best-microphone'));
['cubre 20 Hz', 'Conviene saber', 'distinta matemática', '48V obligatorios', 'a bordo, sus 11'].forEach(k => {
  const i = t.indexOf(k);
  console.log('### ' + k + ' ###');
  console.log(i > -1 ? JSON.stringify(t.slice(Math.max(0, i - 100), i + 150)) : '(no existe)');
});
