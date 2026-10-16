const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const s = g.find(x => x.id === 'best-monitors-for-small-rooms');
const parts = [];
parts.push(['INTRO', s.intro_es]);
s.sections.forEach((x, i) => parts.push(['SEC' + i, x.content_es]));
parts.forEach(([label, txt]) => {
  [...txt.matchAll(/<a[^>]*href="([^"]+)"[^>]*>([^<]+)<\/a>/g)].forEach(m => {
    const id = m[1].replace('/guides/', '').replace('_es.html', '');
    const dest = g.find(y => y.id === id);
    const ok = dest && dest.title_es === m[2];
    console.log((ok ? 'OK  ' : 'FIX ') + label + ' ' + id + ' texto="' + m[2] + '"' + (ok ? '' : ' titulo="' + (dest ? dest.title_es : 'NO') + '"'));
  });
});
