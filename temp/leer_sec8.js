const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const s = g.find(x => x.id === 'live-sound-pa');
const txt = h => (h || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
const i8 = s.sections.findIndex(x => /EVERSE/i.test(x.heading_es));
console.log('######## SEC[8] ########\n' + txt(s.sections[i8].content_es));
console.log('\nanchors conclusion:');
[...s.conclusion_es.matchAll(/<a[^>]*href="([^"]+)"[^>]*>([^<]+)<\/a>/g)].forEach(m => {
  const id = m[1].replace('/guides/', '').replace('_es.html', '');
  const dest = g.find(y => y.id === id);
  console.log('  ' + id + '  texto: "' + m[2] + '"  | titulo: "' + (dest ? dest.title_es : 'NO EXISTE') + '"');
});
