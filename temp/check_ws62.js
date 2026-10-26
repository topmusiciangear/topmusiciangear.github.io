const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const sub = g.find(x => x.id === 'studio-subwoofers');
console.log('GUIA EN REPOSITORIO:', sub ? 'SI' : 'NO');
if (sub) {
  console.log('title:', sub.title);
  console.log('featuredProducts:', JSON.stringify(sub.featuredProducts));
  const txt = JSON.stringify(sub);
  console.log('contiene WS-6.2:', txt.includes('WS-6.2'));
  console.log('contiene WS 6.2:', txt.includes('WS 6.2'));
  console.log('contiene Kali WS:', txt.includes('Kali WS'));
  console.log('contiene WS-6:', txt.includes('WS-6'));
  (sub.sections || []).forEach((s, i) => {
    if ((s.products || []).length) console.log(' sec[' + i + '] products:', JSON.stringify(s.products));
  });
}
let hits = 0;
g.forEach(gu => {
  const t = JSON.stringify(gu);
  if (t.includes('WS-6.2') || t.includes('WS 6.2') || t.includes('Kali WS')) {
    hits++;
    console.log('  ->', gu.id);
  }
});
console.log('Total guias que mencionan WS-6.2 / WS 6.2 / Kali WS:', hits);
