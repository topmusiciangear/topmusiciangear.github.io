const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const s = g.find(x => x.id === 'budget-headphones');
const parts = [];
parts.push(['INTRO', s.intro_es]);
s.sections.forEach((x, i) => parts.push(['SEC' + i, x.content_es]));
parts.push(['CONC', s.conclusion_es]);
let bad = 0;
parts.forEach(([label, txt]) => {
  [...txt.matchAll(/<a[^>]*href="([^"]+)"[^>]*>([^<]+)<\/a>/g)].forEach(m => {
    const id = m[1].replace('/guides/', '').replace('_es.html', '');
    const dest = g.find(y => y.id === id);
    const ok = dest && dest.title_es === m[2];
    if (!ok) { bad++; console.log('FIX ' + label + ' ' + id + ' texto="' + m[2] + '" titulo="' + (dest ? dest.title_es : 'NO') + '"'); }
  });
});
console.log(bad === 0 ? 'TODO OK' : bad + ' por arreglar');
