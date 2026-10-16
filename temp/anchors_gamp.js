const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const s = g.find(x => x.id === 'best-mic-for-guitar-amps');
console.log('anchors SEC1+CONC:');
[...JSON.stringify(s).matchAll(/<a[^>]*href="([^"]+)"[^>]*>([^<]+)<\/a>/g)].forEach(m => {
  const id = m[1].replace('/guides/', '').replace('_es.html', '').replace('.html', '');
  const dest = g.find(y => y.id === id);
  console.log('  href=' + m[1] + '  texto: "' + m[2] + '"  | id=' + id + ' titulo: "' + (dest ? dest.title_es : 'NO EXISTE') + '"');
});
