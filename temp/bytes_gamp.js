const fs = require('fs');
const t = JSON.stringify(JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8')).find(x => x.id === 'best-mic-for-guitar-amps'));
['comparativa SM57', 'Mejores micrófonos<', 'SM57 vs MD421', 'guide-link'].forEach(k => {
  const i = t.indexOf(k);
  console.log('### ' + k + ' ###');
  console.log(i > -1 ? JSON.stringify(t.slice(Math.max(0, i - 80), i + 100)) : '(no existe)');
});
