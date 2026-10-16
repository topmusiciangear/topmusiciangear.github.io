const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const x = g.find(y => y.id === 'best-monitors');
console.log('best-monitors title_es: ' + x.title_es);
const s = g.find(y => y.id === 'budget-monitors');
console.log('anchors conclusion:');
[...s.conclusion_es.matchAll(/<a[^>]*href="([^"]+)"[^>]*>([^<]+)<\/a>/g)].forEach(m => {
  console.log('  ' + m[1] + '  texto: "' + m[2] + '"');
});
