const g = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
const d = g.find(x => x.id === 'best-drum-machine');
const f = d.featuredSnippet;
console.log('Q2EN:', f.faq_q2_en);
console.log('A2EN:', f.faq_a2_en);
console.log('Q2ES:', f.faq_q2_es);
console.log('A2ES:', f.faq_a2_es);
console.log('DESC:', d.description);
console.log('DESCES:', d.description_es);
