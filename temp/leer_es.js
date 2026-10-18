const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'))
  .find(x => x.id === 'best-home-studio-speakers');
const st = s => String(s).replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/\s+/g, ' ').trim();

console.log('INTRO:\n' + g.intro_es);
g.sections.forEach((s, i) => {
  console.log('\n\n===== [' + i + '] ' + s.heading_es);
  const ps = s.content_es.split('</p>').map(x => st(x)).filter(Boolean);
  ps.forEach((p, j) => console.log('  (' + (j + 1) + ') ' + p));
});
console.log('\n\n===== VEREDICTOS');
g.verdictProsCons.forEach(v => {
  console.log('\n* ' + v.name_es);
  v.pros_es.forEach(x => console.log('   + ' + x));
  v.cons_es.forEach(x => console.log('   - ' + x));
});
console.log('\n\n===== FAQ ES');
(g.faq || []).forEach((f, i) => {
  console.log('\nP' + (i + 1) + '. ' + f.q_es);
  console.log('    ' + st(f.a_es));
});
