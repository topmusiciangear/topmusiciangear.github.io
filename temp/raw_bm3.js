const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const s = g.find(x => x.id === 'best-microphone');
const t = s.sections[0].content_es;
const i = t.indexOf('Salta a la');
console.log(i > -1 ? t.slice(i - 50, i + 200) : 'NO HAY "Salta a la" — buscar Comparativa:');
if (i < 0) {
  const j = t.indexOf('Comparativa');
  console.log(t.slice(j - 150, j + 100));
}
