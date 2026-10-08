const g = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
const d = g.find(x => x.id === 'live-sound-pa');
console.log('VERDICT:', d.verdict);
console.log('VERDICT_ES:', d.verdict_es);
console.log('DESC:', d.description);
console.log('DESC_ES:', d.description_es);
console.log('SNIPPET:', JSON.stringify(d.featuredSnippet, null, 1).slice(0, 2000));
console.log('SECTIONS full:', JSON.stringify(d.sections.map(s => ({ h: s.heading, p: s.products })), null, 1));
