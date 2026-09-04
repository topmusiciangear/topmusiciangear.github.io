const path = require('path');
const guides = require(path.join(__dirname, '..', 'data', 'guides.json'));
const targets = ['best-electric-guitars-2026', 'best-electric-guitar', 'pro-guitars', 'best-electric-under-500', 'american-pro-vs-les-paul'];
targets.forEach(id => {
  const g = guides.find(v => v.id === id);
  if (!g) { console.log(id, 'NOT FOUND'); return; }
  const all = [];
  if (g.sections) g.sections.forEach(s => (s.products || []).forEach(p => all.push(p)));
  const has = [65, 124, 444, 6, 7, 9, 10].filter(p => all.indexOf(p) > -1);
  console.log(id, '| products:', all.length, '| pro/playerII refs:', JSON.stringify(has));
  if (g.featuredProducts) console.log('   featured:', JSON.stringify(g.featuredProducts));
});