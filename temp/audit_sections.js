// Audit: products with cards but no dedicated explanation section.
// "Explained" = product is the SOLE product of a section with non-empty content,
// OR the section heading names the product.
const fs = require('fs');
const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const P = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const pname = id => { const p = P.find(x => x.id === id); return p ? p.title : 'ID?' + id; };

const report = [];
G.forEach(g => {
  if (!g.productTable || !g.sections) return;
  const cards = [...new Set(g.sections.flatMap(s => s.products || []))];
  const explained = new Set();
  g.sections.forEach(s => {
    const prods = s.products || [];
    const hasContent = ((s.content || '').length > 100);
    if (!hasContent || !prods.length) return;
    const h = ((s.heading || '') + ' ' + (s.heading_es || '')).toLowerCase();
    if (prods.length === 1) { explained.add(prods[0]); return; }
    prods.forEach(pid => { if (h.includes(pname(pid).toLowerCase().slice(0, 18))) explained.add(pid); });
  });
  const missing = cards.filter(id => !explained.has(id));
  if (missing.length) report.push({ id: g.id, cards: cards.length, explained: explained.size, missing: missing.map(pname) });
});
report.sort((a, b) => b.missing.length - a.missing.length);
console.log('Guides with unexplained card products: ' + report.length);
report.forEach(r => console.log(r.id + ': cards=' + r.cards + ' explained=' + r.explained + ' MISSING(' + r.missing.length + ')=' + r.missing.join(' | ')));
