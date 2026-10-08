const g = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
const d = g.find(x => x.id === 'best-drum-machine');
const s = d.sections[4];
console.log('HEADING:', s.heading, '| PRODUCTS:', JSON.stringify(s.products));
console.log('CONTENT:', s.content);
console.log('CONTENT_ES:', s.content_es);
console.log('VERDICT:', d.verdict);
console.log('VERDICT_ES:', d.verdict_es);
