const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const s = g.find(x => x.id === 'best-monitors-for-small-rooms');
const t = JSON.stringify(s);
const patterns = ['confiable', 'perilla', 'Class-D de ', 'libras', 'sólo', '\\.html\\\\\">', 'Mejores '];
console.log('--- patrones sospechosos ---');
patterns.forEach(p => {
  const m = t.match(new RegExp(p, 'g'));
  console.log(p + ': ' + (m ? m.length : 0));
});
console.log('--- anchors ES ---');
[...s.conclusion_es.matchAll(/<a[^>]*href="([^"]+)"[^>]*>([^<]+)<\/a>/g)].forEach(m => {
  const id = m[1].replace('/guides/', '').replace('_es.html', '').replace('.html', '');
  const dest = g.find(y => y.id === id);
  const ok = dest && dest.title_es === m[2];
  console.log((ok ? 'OK  ' : 'FIX ') + id + '  texto="' + m[2] + '"' + (ok ? '' : ' titulo="' + (dest ? dest.title_es : 'NO') + '"'));
});
