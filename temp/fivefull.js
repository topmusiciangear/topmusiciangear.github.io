const G = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
const g = G.find(x => x.id === 'best-5-string-basses');
g.sections.forEach((s, i) => {
  console.log('===== SEC' + i + ' ' + s.heading + ' =====');
  console.log('EN: ' + s.content);
  console.log('ES: ' + s.content_es);
  console.log('');
});
console.log('INTRO EN: ' + g.intro);
console.log('INTRO ES: ' + g.intro_es);
console.log('CONCL EN: ' + g.conclusion);
console.log('CONCL ES: ' + g.conclusion_es);
console.log('VERDICT EN: ' + g.verdict);
console.log('VERDICT ES: ' + g.verdict_es);