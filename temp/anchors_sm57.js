const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const s = g.find(x => x.id === 'sm57-vs-sm58');
console.log('anchors conclusion:');
[...s.conclusion_es.matchAll(/<a[^>]*href="([^"]+)"[^>]*>([^<]+)<\/a>/g)].forEach(m => {
  const id = m[1].replace('/guides/', '').replace('_es.html', '');
  const dest = g.find(y => y.id === id);
  console.log('  ' + id + '  texto: "' + m[2] + '"  | titulo: "' + (dest ? dest.title_es : 'NO EXISTE') + '"');
});
console.log('destinos:');
['sm7b-vs-nt1', 'best-microphone', 'budget-mics'].forEach(id => {
  const d = g.find(y => y.id === id);
  console.log('  ' + id + ': ' + (d ? d.title_es : 'NO EXISTE'));
});
