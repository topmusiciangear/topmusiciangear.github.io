const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const s = g.find(x => x.id === 'best-headphones');
const t = JSON.stringify(s);
['asi la claqueta', 'así la claqueta', 'unos hi-fi', 'EQ correctivo', 'EQ correctiva'].forEach(k => {
  const i = t.indexOf(k);
  console.log('### ' + k + ' ###');
  console.log(i > -1 ? JSON.stringify(t.slice(Math.max(0, i - 60), i + 80)) : '(no existe)');
});
