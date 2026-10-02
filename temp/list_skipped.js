const fs = require('fs');
const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const P = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const pname = id => { const p = P.find(x => x.id === id); return p ? p.title : null; };
function exset(g) {
  const ex = new Set();
  g.sections.forEach(s => {
    const pr = s.products || [];
    if (((s.content || '').length < 100) || !pr.length) return;
    const h = ((s.heading || '') + ' ' + (s.heading_es || '')).toLowerCase();
    if (pr.length === 1) { ex.add(pr[0]); return; }
    pr.forEach(pid => { const t = pname(pid); if (t && h.includes(t.toLowerCase().slice(0, 18))) ex.add(pid); });
  });
  return ex;
}
const li = [];
G.forEach(g => {
  if (!g.productTable || !g.sections) return;
  const cards = [...new Set(g.sections.flatMap(s => s.products || []))];
  const ex = exset(g);
  cards.filter(id => !ex.has(id)).forEach(pid => {
    const t = pname(pid);
    const v = (g.verdictProsCons || []).find(x => x.name === t) || (g.verdictProsCons || []).find(x => x.name && (x.name.includes(t) || t.includes(x.name)));
    if (!v || !v.pros || !v.pros.length) {
      const elsewhere = G.filter(o => o.id !== g.id && (o.verdictProsCons || []).some(x => x.name === t)).map(o => o.id);
      li.push(g.id + ' :: ' + t + ' :: en_otras=[' + elsewhere.join(',') + ']');
    }
  });
});
console.log('total: ' + li.length);
li.forEach(l => console.log(l));
