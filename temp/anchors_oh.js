const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const s = g.find(x => x.id === 'open-headphones');
console.log('anchors conclusion:');
[...s.conclusion_es.matchAll(/<a href="([^"]+)"[^>]*>([^<]+)<\/a>/g)].forEach(m => {
  const id = m[1].replace('/guides/', '').replace('_es.html', '');
  const dest = g.find(y => y.id === id);
  console.log('  ' + id + '  texto: "' + m[2] + '"  | titulo: "' + (dest ? dest.title_es : 'NO EXISTE') + '"');
});
const i = s.sections[0].content_es.indexOf('Mejores auriculares para mezclar');
console.log('\nsec0 cola: ' + JSON.stringify(s.sections[0].content_es.slice(i - 150, i + 120)));
