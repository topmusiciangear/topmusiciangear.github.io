const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const s = g.find(x => x.id === 'best-monitors-for-small-rooms');
const t = JSON.stringify(s);
['JBL 305P vs Kali LP-6', 'Adam A7V vs Genelec', 'configuración de monitores', 'mejores auriculares de estudio .'].forEach(k => {
  const i = t.indexOf(k);
  console.log('### ' + k + ' ###');
  console.log(i > -1 ? t.slice(Math.max(0, i - 160), i + 100).replace(/\\"/g, '"') : '(no existe)');
});
