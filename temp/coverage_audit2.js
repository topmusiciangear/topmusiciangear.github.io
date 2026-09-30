// Coverage audit v2: strict normalization + per-guide gap lists.
const fs = require('fs');
const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const P = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const byId = {};
P.forEach(p => { byId[p.id] = p.title; });
const norm = s => (s || '').toLowerCase().replace(/[^a-z0-9]/g, '');
const covered = (name, pool) => {
  const n = norm(name);
  if (!n) return false;
  return pool.some(c => { const m = norm(c); return m.includes(n) || n.includes(m); });
};
const out = [];
G.forEach(g => {
  const cards = [...new Set((g.sections || []).flatMap(s => s.products || []))];
  const cardTitles = cards.map(id => byId[id] || ('ID?' + id));
  const cols = (g.productTable && g.productTable.columns ? g.productTable.columns : []).map(c => c.title);
  const verdicts = (g.verdictProsCons || []).map(v => v.name);
  const cardsMissingTable = cardTitles.filter(t => !covered(t, cols));
  const tableMissingCards = cols.filter(t => !covered(t, cardTitles));
  const cardsMissingVerdict = cardTitles.filter(t => !covered(t, verdicts));
  const verdictMissingCards = verdicts.filter(t => !covered(t, cardTitles));
  const flags = [];
  if (cardsMissingTable.length) flags.push('SIN_TABLA: ' + cardsMissingTable.join(' | '));
  if (tableMissingCards.length) flags.push('TABLA_SIN_TARJETA: ' + tableMissingCards.join(' | '));
  if (cardsMissingVerdict.length) flags.push('SIN_VEREDICTO: ' + cardsMissingVerdict.join(' | '));
  if (verdictMissingCards.length) flags.push('VEREDICTO_SIN_TARJETA: ' + verdictMissingCards.join(' | '));
  if (flags.length) out.push({ id: g.id, ncards: cards.length, ncols: cols.length, nverdict: verdicts.length, flags });
});
console.log('guias con huecos reales: ' + out.length);
out.forEach(o => console.log('\n### ' + o.id + ' [tarj=' + o.ncards + ' col=' + o.ncols + ' ver=' + o.nverdict + ']\n  ' + o.flags.join('\n  ')));
fs.writeFileSync('temp/coverage_v2.json', JSON.stringify(out, null, 1));
