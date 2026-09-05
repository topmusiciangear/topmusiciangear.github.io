const g = require('../data/guides.json');
function show(id, vi) {
  const x = g.find(i => i.id === id);
  console.log('==== ' + id + ' v' + vi);
  const v = x.verdictProsCons[vi];
  console.log('EN pros:', v.pros.map((p, i) => '  [' + i + '] ' + p).join('\n'));
  console.log('ES pros:', v.pros_es.map((p, i) => '  [' + i + '] ' + p).join('\n'));
}
show('ableton-vs-logic', 1);
show('nx912-vs-pxm12mp', 1);
show('best-ribbon-mics', 2);
show('best-ribbon-mics', 3);
const d = g.find(i => i.id === 'di-box');
console.log('==== di-box');
console.log('conclusion_es:', JSON.stringify(d.conclusion_es));
console.log('verdict:', JSON.stringify(d.verdict));
console.log('sections:', d.sections.map(s => (s.heading || s.title || s.h2 || Object.keys(s).join(','))).join(' | ').slice(0, 600));
const a = g.find(i => i.id === 'best-amp-modelers');
console.log('==== best-amp-modelers');
console.log('sections:', a.sections.map(s => (s.heading || s.title || s.h2 || Object.keys(s).join(','))).join(' | ').slice(0, 600));