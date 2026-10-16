const fs = require('fs');
const t = JSON.stringify(JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8')).find(x => x.id === 'best-monitors-for-small-rooms'));
['bi-amplificados a 70W', 'hasta el extremo', 'el woofer es pequeño', 'mejores auriculares de estudio .', 'bi-amplificados a 55W', 'otra especie frente', 'de grosor en tantas'].forEach(k => {
  const i = t.indexOf(k);
  console.log('### ' + k + ' ###');
  console.log(i > -1 ? JSON.stringify(t.slice(Math.max(0, i - 60), i + 80)) : '(no existe)');
});
