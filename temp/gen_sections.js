// Generator: per-product deep-dive sections from verified table + verdict data.
// Only for card products lacking a dedicated explanation section. No prices, no new facts.
const fs = require('fs');
const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const P = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const pname = id => { const p = P.find(x => x.id === id); return p ? p.title : null; };
const clean = s => (s || '').trim().replace(/\s+/g, ' ').replace(/\.+$/, '');
const lower1 = s => s ? s.charAt(0).toLowerCase() + s.slice(1) : s;
const SKIP_LABELS = /^(best for|type|price|category|form factor|format)$/i;

function explainedSet(g) {
  const ex = new Set();
  g.sections.forEach(s => {
    const prods = s.products || [];
    if (((s.content || '').length < 100) || !prods.length) return;
    const h = ((s.heading || '') + ' ' + (s.heading_es || '')).toLowerCase();
    if (prods.length === 1) { ex.add(prods[0]); return; }
    prods.forEach(pid => { const t = pname(pid); if (t && h.includes(t.toLowerCase().slice(0, 18))) ex.add(pid); });
  });
  return ex;
}

let added = 0;
const skipped = [];
G.forEach(g => {
  if (!g.productTable || !g.sections) return;
  if (['guitar-bass-amps', 'beginner-bass-guitars', 'fx-plugins'].includes(g.id)) return;
  const cards = [...new Set(g.sections.flatMap(s => s.products || []))];
  const ex = explainedSet(g);
  const colByTitle = {};
  g.productTable.columns.forEach(c => { colByTitle[c.title] = true; });
  cards.filter(id => !ex.has(id)).forEach(pid => {
    const title = pname(pid);
    if (!title) { skipped.push(g.id + ':ID' + pid); return; }
    const v = (g.verdictProsCons || []).find(x => x.name === title)
      || (g.verdictProsCons || []).find(x => x.name && (x.name.includes(title) || title.includes(x.name)));
    if (!v || !v.pros || !v.pros.length) { skipped.push(g.id + ':' + title); return; }
    const ci = g.productTable.columns.findIndex(c => c.title === title);
    let specEn = '', specEs = '';
    if (ci > -1) {
      const specRows = g.productTable.rows.filter(r => !SKIP_LABELS.test(r.label || '') && r.values[ci] && r.values[ci].value).slice(0, 2);
      if (specRows.length === 2) {
        specEn = ' Standout specs — ' + specRows.map(r => r.label + ': ' + clean(r.values[ci].value)).join('; ') + '.';
        specEs = ' Specs clave — ' + specRows.map(r => r.label + ': ' + clean(r.values[ci].value_es || r.values[ci].value)).join('; ') + '.';
      }
    }
    const bf = ci > -1 ? (g.productTable.rows.find(r => /best for/i.test(r.label || '')) || {}) : {};
    const bfV = bf.values && bf.values[ci];
    const head = title + ': A Closer Look';
    const headEs = title + ': análisis detallado';
    const pros = v.pros.slice(0, 2).map(clean).join('; ');
    const cons = v.cons.slice(0, 1).map(clean).join('; ');
    const prosEs = (v.pros_es || []).slice(0, 2).map(clean).join('; ');
    const consEs = (v.cons_es || []).slice(0, 1).map(clean).join('; ');
    const content = '<strong>' + title + (bfV ? ' is ' + lower1(clean(bfV.value)) : '') + '.</strong>' + specEn +
      (pros ? ' On the plus side: ' + pros + '.' : '') + (cons ? ' Watch out: ' + cons + '.' : '');
    const content_es = '<strong>' + title + (bfV ? ': ' + clean(bfV.value_es || bfV.value) : '') + '.</strong>' + specEs +
      (prosEs ? ' En el lado positivo: ' + prosEs + '.' : '') + (consEs ? ' Ojo: ' + consEs + '.' : '');
    g.sections.push({ heading: head, heading_es: headEs, content, content_es, products: [pid] });
    added++;
  });
});
fs.writeFileSync('data/guides.json', JSON.stringify(G, null, 2));
console.log('sections added: ' + added);
console.log('skipped (no verdict/specs): ' + skipped.length);
skipped.slice(0, 20).forEach(s => console.log('  SKIP ' + s));
