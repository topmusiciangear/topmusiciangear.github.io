const fs = require('fs');
const t = JSON.stringify(JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8')).find(x => x.id === 'mics-for-creators'));
['traes sensor', 'The AM8', 'se queden fuera', 'The cápsula', 'XLR tomorrow', 'caa justo', 'migrar a una', 'The caja', 'offeren patrones', 'te lleves'].forEach(k => {
  const i = t.indexOf(k);
  console.log('### ' + k + ' ###');
  console.log(i > -1 ? JSON.stringify(t.slice(Math.max(0, i - 60), i + 100)) : '(no existe)');
});
