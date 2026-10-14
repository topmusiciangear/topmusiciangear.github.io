const fs = require('fs');
const guides = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const hits = [];
guides.forEach(g => {
  (g.sections || []).forEach((s, i) => {
    if (!s) return;
    if (/: A Closer Look\s*$/.test(s.heading || '')) hits.push({ guia: g.id, i, en: s.heading, es: s.heading_es });
    if (/: (Una mirada|Más de cerca|Un vistazo)[^.]*$/.test(s.heading_es || '')) hits.push({ guia: g.id + ' [ES]', i, en: s.heading, es: s.heading_es });
  });
});
console.log('Total plantilla EN ": A Closer Look": ' + hits.filter(h => !h.guia.includes('[ES]')).length);
// Agrupar por guia
const byG = {};
hits.forEach(h => {
  const id = h.guia;
  if (!byG[id]) byG[id] = [];
  byG[id].push(h);
});
Object.keys(byG).sort().forEach(id => {
  console.log('\n=== ' + id + ' (' + byG[id].length + ') ===');
  byG[id].forEach(h => console.log('  [' + h.i + '] EN: ' + h.en + ' | ES: ' + h.es));
});