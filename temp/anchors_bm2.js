const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const s = g.find(x => x.id === 'best-monitors');
console.log('anchors ES en toda la guia:');
[...JSON.stringify(s).matchAll(/<a[^>]*href="([^"]*_es\.html)"[^>]*>([^<]+)<\/a>/g)].forEach(m => {
  const id = m[1].replace('/guides/', '').replace('_es.html', '');
  const dest = g.find(y => y.id === id);
  console.log('  ' + id + '  texto: "' + m[2] + '"  | titulo: "' + (dest ? dest.title_es : 'NO EXISTE') + '"');
});
console.log('anchors EN en texto ES (buscar .html sin _es):');
const t = JSON.stringify(s);
let idx = -1; let k = 0;
while ((idx = t.indexOf('guides/', idx + 1)) > -1 && k < 40) {
  const seg = t.slice(idx, idx + 60);
  if (!seg.includes('_es.html')) console.log('  EN: ' + JSON.stringify(seg));
  k++;
}
