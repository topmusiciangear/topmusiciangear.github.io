const fs = require('fs');
const t = JSON.stringify(JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8')).find(x => x.id === 'best-pa-speakers'));
['es la mejor opción económica. El QSC', 'más confiable en audio profesional', 'combina componentes premium', 'aportan los graves extra'].forEach(k => {
  const i = t.indexOf(k);
  console.log('### ' + k + ' ###');
  console.log(i > -1 ? JSON.stringify(t.slice(Math.max(0, i - 70), i + 60)) : '(no existe)');
});
