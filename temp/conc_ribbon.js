const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const s = g.find(x => x.id === 'best-ribbon-mics');
console.log('CONCLUSION:');
console.log(s.conclusion_es.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
console.log('---ANCHORS---');
[...s.conclusion_es.matchAll(/<a[^>]*href="([^"]+)"[^>]*>([^<]+)<\/a>/g)].forEach(m => {
  const id = m[1].replace('/guides/', '').replace('_es.html', '');
  const d = g.find(y => y.id === id);
  console.log('  ' + id + '  texto: "' + m[2] + '"  | titulo: "' + (d ? d.title_es : 'NO EXISTE') + '"');
});
