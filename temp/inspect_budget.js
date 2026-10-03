const G = require('../data/guides.json');
const g = G.find(x => x.id === 'budget-interfaces');
console.log('sections:', g.sections.map(s => (s.heading || '').slice(0, 45) + ' | prods=' + JSON.stringify(s.products)));
console.log('featuredProducts:', JSON.stringify(g.featuredProducts));
console.log('has faq array:', Array.isArray(g.faq), 'len:', g.faq && g.faq.length);
console.log('table cols:', g.productTable.columns.map(c => c.title).join(' / '));
console.log('table rows:', g.productTable.rows.map(r => r.label + '(' + r.values.length + ')').join(' | '));
console.log('verdicts:', g.verdictProsCons.map(v => v.name).join(' / '));
console.log('descEN:', JSON.stringify(g.description));