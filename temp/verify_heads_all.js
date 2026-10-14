const fs = require('fs');
const guides = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
let bad = 0, hs = 0, es = 0;
guides.forEach(g => {
  (g.sections || []).forEach(s => {
    const h = s.heading || s.h || '';
    if (h) { hs++; if (!s.heading_es) { es++; console.log('sin heading_es: ' + g.id + ' :: ' + h); } }
    if (/A Closer Look|análisis detallado|In Depth|Deep Dive/i.test(h + ' ' + (s.heading_es || ''))) { bad++; console.log('PLANTILLA: ' + g.id + ' :: ' + h); }
  });
});
console.log('\nencabezados totales: ' + hs + ' | plantilla restante: ' + bad + ' | sin heading_es: ' + es);
['starter-studio','mics-for-creators','best-daw-for-beginners','pro-monitors'].forEach(id => {
  const g = guides.find(x => x.id === id);
  console.log('\n' + id + ' (' + g.sections.length + '):');
  g.sections.forEach(s => console.log('  - ' + s.heading));
});