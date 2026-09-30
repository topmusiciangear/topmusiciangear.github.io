// Coverage audit: per guide compare
// cards (union of section products) vs productTable columns vs
// verdictProsCons vs FAQ count (guide.faq || featuredSnippet q1..8) vs sections.
const fs = require('fs');
const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const P = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const byId = {};
P.forEach(p => { byId[p.id] = p.title; });

function faqCount(g) {
  if (Array.isArray(g.faq)) return g.faq.length;
  const fsn = g.featuredSnippet || {};
  let n = 0;
  for (let i = 1; i <= 8; i++) if (fsn['faq_q' + i + '_en']) n++;
  return n;
}
const out = [];
G.forEach(g => {
  const cards = [...new Set((g.sections || []).flatMap(s => s.products || []))];
  const missing = cards.filter(id => !byId[id]);
  const cols = g.productTable && g.productTable.columns ? g.productTable.columns.length : 0;
  const rowsOk = !g.productTable || !g.productTable.rows ? true :
    g.productTable.rows.every(r => (r.values || []).length === cols);
  const verdictN = (g.verdictProsCons || []).length;
  const faqN = faqCount(g);
  const verdictNames = (g.verdictProsCons || []).map(v => v.name);
  const cardTitles = cards.map(id => byId[id] || ('ID?' + id));
  // verdict names not among card titles (fuzzy: strip)
  const norm = s => (s || '').toLowerCase().replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();
  const cardSet = new Set(cardTitles.map(norm));
  const verdictOrphans = verdictNames.filter(n => {
    const nn = norm(n);
    for (const c of cardSet) if (c.includes(nn) || nn.includes(c)) return false;
    return true;
  });
  const tableTitles = (g.productTable && g.productTable.columns ? g.productTable.columns : []).map(c => c.title);
  const tableSet = new Set(tableTitles.map(norm));
  const tableOrphans = tableTitles.filter(t => {
    const tt = norm(t);
    for (const c of cardSet) if (c.includes(tt) || tt.includes(c)) return false;
    return true;
  });
  const flags = [];
  if (missing.length) flags.push('IDS_FANTASMA:' + missing.join(','));
  if (cols && cols !== cards.length) flags.push('TABLA(' + cols + ')<>TARJETAS(' + cards.length + ')');
  if (verdictN && verdictN !== cards.length) flags.push('VEREDICTO(' + verdictN + ')<>TARJETAS(' + cards.length + ')');
  if (!rowsOk) flags.push('FILAS_MAL');
  if (verdictOrphans.length) flags.push('VEREDICTO_HUERFANO:' + verdictOrphans.join(';'));
  if (tableOrphans.length) flags.push('TABLA_HUERFANA:' + tableOrphans.join(';'));
  if (flags.length) out.push({ id: g.id, cards: cards.length, flags });
});
console.log('guias con problemas: ' + out.length + ' / ' + G.length);
out.forEach(o => console.log('\n' + o.id + ' [tarjetas=' + o.cards + ']\n  ' + o.flags.join('\n  ')));
fs.writeFileSync('temp/coverage_report.json', JSON.stringify(out, null, 1));
