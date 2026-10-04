const { P, rangeFor, mapId } = require('C:/Users/Daniel/projects/topmusiciangear/temp/rangelib.js');
const G = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
let conv = 0, skipNoMap = 0, skipNoData = 0, skipTier = 0;
const samples = [];
G.forEach(g => {
  if (!g.productTable) return;
  const cols = g.productTable.columns.map(c => c.title);
  const priceRow = (g.productTable.rows || []).find(r => /^(Price|Precio)$/i.test((r.label || '').trim()));
  if (!priceRow) { console.log(g.id, 'SIN fila Price'); return; }
  priceRow.values.forEach((v, i) => {
    const col = cols[i];
    const cur = v.value || '';
    // tier labels stay
    if (/^(Pro|Budget|Mid|Premium|Entry|Flagship)\b/i.test(cur)) { skipTier++; return; }
    const m = cur.match(/^\$\s*[\d,]+(?:\.\d+)?\b/);
    if (!m) { skipTier++; return; }
    const id = mapId(col);
    if (!id) { skipNoMap++; return; }
    const r = rangeFor(id);
    if (!r) { skipNoData++; return; }
    conv++;
    if (samples.length < 12) samples.push(g.id + ' | ' + col + ': "' + cur + '" -> "' + r + '"');
  });
});
console.log('convertibles:', conv, 'tier/otro:', skipTier, 'sin mapa:', skipNoMap, 'sin datos:', skipNoData);
samples.forEach(s => console.log(' ' + s));