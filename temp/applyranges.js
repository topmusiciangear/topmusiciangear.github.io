const fs = require('fs');
const { P, rangeFor, mapId } = require('C:/Users/Daniel/projects/topmusiciangear/temp/rangelib.js');
const G = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
function oneAmount(s) {
  const m = (s || '').match(/\$\s*[\d,]+(?:\.\d+)?/g);
  return m && m.length === 1 ? m[0] : null;
}
function convertCell(cur, id, lang) {
  // returns {text, status}
  if (/^(Pro|Budget|Mid|Premium|Entry|Flagship)\b/i.test(cur)) return { text: cur, status: 'tier' };
  const amt = oneAmount(cur);
  if (!amt) return { text: cur, status: 'noamount' };
  if (!id) return { text: cur, status: 'nomap' };
  const r = rangeFor(id);
  if (!r) return { text: cur, status: 'nodata' };
  return { text: cur.replace(amt, r), status: 'conv' };
}
const stats = { conv: 0, tier: 0, noamount: 0, nomap: 0, nodata: 0, newrows: 0, dash: 0, compRows: 0 };
const DRY = process.argv[2] === 'dry';
// productTables
G.forEach(g => {
  if (!g.productTable) return;
  const cols = g.productTable.columns.map(c => c.title);
  let priceRow = (g.productTable.rows || []).find(r => /price/i.test(r.label || '') && !/tier/i.test(r.label || ''));
  let isNew = false;
  if (!priceRow) {
    if (DRY) { stats.newrows++; return; }
    priceRow = { label: 'Price', label_es: 'Precio', values: [] };
    isNew = true;
    const bfIdx = (g.productTable.rows || []).findIndex(r => /best for|ideal para/i.test(r.label || '') || /best for|ideal para/i.test(r.label_es || ''));
    g.productTable.rows.splice(bfIdx >= 0 ? bfIdx + 1 : 0, 0, priceRow);
  }
  // ensure values length matches columns
  while (priceRow.values.length < cols.length) priceRow.values.push({ value: '—', value_es: '—' });
  priceRow.values.forEach((v, i) => {
    const id = mapId(cols[i]);
    if (isNew) {
      const r = id ? rangeFor(id) : null;
      if (r) { v.value = r; v.value_es = r; stats.conv++; }
      else { stats.dash++; if (!id) stats.nomap++; else stats.nodata++; }
      return;
    }
    ['value', 'value_es'].forEach(k => {
      const cur = v[k] || '';
      const res = convertCell(cur, id);
      if (DRY) { stats[res.status === 'conv' ? 'conv' : res.status]++; return; }
      if (res.status === 'conv') { v[k] = res.text; stats.conv++; }
      else stats[res.status]++;
    });
  });
});
// comparison tables: add Price row at 0
G.forEach(g => {
  if (!g.comparison || !g.featuredSnippet) return;
  const fsn = g.featuredSnippet;
  const has = (g.comparison.rows || []).some(r => /price|precio/i.test(r.label || ''));
  if (has) return;
  const mk = (nm) => {
    if (!nm) return '—';
    const id = mapId(nm);
    if (!id) { stats.nomap++; return '—'; }
    const r = rangeFor(id);
    if (!r) { stats.nodata++; return '—'; }
    stats.compRows++;
    return r;
  };
  const v1 = mk(fsn.name1_en), v2 = mk(fsn.name2_en);
  if (DRY) return;
  g.comparison.rows.unshift({
    label: 'Price', label_es: 'Precio',
    val1: v1, val2: v2, val1_es: v1, val2_es: v2
  });
});
console.log(JSON.stringify(stats));
if (!DRY) fs.writeFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', JSON.stringify(G, null, 2));