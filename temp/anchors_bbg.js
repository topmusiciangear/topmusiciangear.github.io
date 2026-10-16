const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const s = g.find(x => x.id === 'beginner-bass-guitars');
console.log('anchors SEC0+SEC2+CONC:');
[0, 2].forEach(i => {
  [...s.sections[i].content_es.matchAll(/<a[^>]*href="([^"]+)"[^>]*>([^<]+)<\/a>/g)].forEach(m => console.log('  SEC' + i + ' ' + m[1] + ' => "' + m[2] + '"'));
});
[...s.conclusion_es.matchAll(/<a[^>]*href="([^"]+)"[^>]*>([^<]+)<\/a>/g)].forEach(m => {
  const id = m[1].replace('/guides/', '').replace('_es.html', '').replace('.html', '');
  const dest = g.find(y => y.id === id);
  console.log('  CONC href=' + m[1] + ' texto="' + m[2] + '" titulo="' + (dest ? dest.title_es : 'NO EXISTE') + '"');
});
['best-bass-under-700', 'fender-bass-guide', 'precision-vs-jazz', 'budget-bass-like-expensive'].forEach(id => {
  const d = g.find(y => y.id === id);
  console.log(id + ': ' + (d ? d.title_es : 'NO EXISTE'));
});
