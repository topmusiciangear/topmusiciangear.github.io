const fs = require('fs');
const G = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
for (const id of ['best-multi-effects-pedals', 'best-overdrive-distortion', 'best-looper-pedals', 'best-reverb-delay']) {
  const g = G.find(v => v.id === id);
  console.log('\n############ ' + id);
  console.log('--- featured: ' + JSON.stringify(g.featuredProducts));
  console.log('--- verdict_en: ' + g.verdict);
  console.log('--- verdict_es: ' + g.verdict_es);
  console.log('--- conclusion_es: ' + (g.conclusion_es || '').slice(0, 600));
  console.log('--- verdicts:');
  g.verdictProsCons.forEach(v => {
    console.log('  ' + v.name + ' pros:' + v.pros.length + '/' + v.pros_es.length + ' cons:' + v.cons.length + '/' + v.cons_es.length);
  });
  console.log('--- sections_es:');
  g.sections.forEach((s, i) => {
    console.log('  [' + i + '] ' + s.heading_es + ' prods=' + JSON.stringify(s.products));
  });
}
