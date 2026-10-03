const G = require('../data/guides.json');
const g = G.find(x => x.id === 'best-bass-amps');
console.log('featured:', JSON.stringify(g.featuredProducts));
console.log('cols:', g.productTable.columns.map(c => c.title).join(' / '));
console.log('rows:', g.productTable.rows.map(r => r.label).join(' | '));
console.log('verdicts:', (g.verdictProsCons || []).map(v => v.name).join(' / '));
g.sections.forEach((s, n) => {
  if ((s.products || []).includes(483)) {
    console.log('SEC' + n + ' h: ' + s.heading + '\nESh: ' + s.heading_es);
    console.log('EN: ' + (s.content || '').replace(/\s+/g, ' ').slice(0, 800));
    console.log('ES: ' + (s.content_es || '').replace(/\s+/g, ' ').slice(0, 800));
  }
});
const ci = g.productTable.columns.findIndex(c => /Spark LIVE/.test(c.title));
g.productTable.rows.forEach(r => console.log('ROW ' + r.label + ' | ' + JSON.stringify(r.values[ci])));
const vi = g.verdictProsCons.findIndex(v => /Spark LIVE/.test(v.name));
console.log('VERDICT:', JSON.stringify(g.verdictProsCons[vi]));