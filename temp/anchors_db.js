const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const s = g.find(x => x.id === 'best-daw-for-beginners');
console.log('anchors SEC1+CONC:');
[...s.sections[1].content_es.matchAll(/<a[^>]*href="([^"]+)"[^>]*>([^<]+)<\/a>/g)].forEach(m => console.log('  SEC1 ' + m[1] + ' => "' + m[2] + '"'));
[...s.conclusion_es.matchAll(/<a[^>]*href="([^"]+)"[^>]*>([^<]+)<\/a>/g)].forEach(m => {
  const id = m[1].replace('/guides/', '').replace('_es.html', '').replace('.html', '');
  const dest = g.find(y => y.id === id);
  console.log('  CONC href=' + m[1] + ' texto="' + m[2] + '" titulo="' + (dest ? dest.title_es : 'NO EXISTE') + '"');
});
console.log('beat-making: ' + (g.find(y => y.id === 'beat-making') || {}).title_es);
