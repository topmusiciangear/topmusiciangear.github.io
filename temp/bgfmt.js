const G = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
const g = G.find(x => x.id === 'beginner-guitar');
console.log('WEIGHT:', JSON.stringify(g.productTable.rows.find(r => r.label === 'Weight')));
console.log('TUNERS:', JSON.stringify(g.productTable.rows.find(r => r.label === 'Tuners')));
console.log('SCALE:', JSON.stringify(g.productTable.rows.find(r => r.label === 'Scale Length')));
console.log('FAQKEYS:', Object.keys(g.featuredSnippet || {}).filter(k => /^faq/.test(k)).join(','));
console.log('faq arr:', (g.faq || []).length, '| faqTitle:', !!g.faqTitle);
const s = g.sections.find(s => /CD-60S/.test(s.heading));
console.log('SEC-CD60S:', JSON.stringify(s).slice(0, 900));