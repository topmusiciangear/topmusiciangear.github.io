const P = require('../data/products.json');
const p = P.find(x => x.id === 414);
console.log(JSON.stringify(p, null, 1));
const G = require('../data/guides.json');
G.forEach(g => {
  const uses = [];
  (g.sections || []).forEach(s => { if ((s.products || []).includes(414)) uses.push('sec:' + (s.heading || '').slice(0, 50)); });
  const f = (g.featuredProducts || []).includes(414);
  if (uses.length || f) console.log(g.id, '|', uses.join(' / '), '| feat:', f);
});