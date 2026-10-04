const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const G = require(F);
const A = require('C:/Users/Daniel/projects/topmusiciangear/temp/bfA.json');
const B = require('C:/Users/Daniel/projects/topmusiciangear/temp/bfB.json');
function fixEs(s) {
  return s.replace(/\bBoleros\b/g, 'bolos').replace(/\bBolero\b/g, 'bolo');
}
let applied = 0, skipped = [];
function apply(list, skipGuides, skipFilter) {
  list.forEach(p => {
    if (skipGuides.has(p.guide)) return;
    if (skipFilter && skipFilter(p)) return;
    const g = G.find(x => x.id === p.guide);
    if (!g || !g.productTable) { skipped.push(p.guide + '#' + p.colIndex + ' NOGUIDE'); return; }
    const row = (g.productTable.rows || []).find(r => /best for|ideal para/i.test(r.label || '') || /best for|ideal para/i.test(r.label_es || ''));
    if (!row || !row.values[p.colIndex]) { skipped.push(p.guide + '#' + p.colIndex + ' NOROW'); return; }
    row.values[p.colIndex].value = p.bestfor_en;
    row.values[p.colIndex].value_es = fixEs(p.bestfor_es);
    applied++;
  });
}
// batch A: all (no overlapping jurisdiction)
apply(A, new Set(), null);
// batch B: skip best-5-string (mine kept) and fender-guide (batch A version kept)
apply(B, new Set(['best-5-string-basses']), p => p.guide === 'fender-guide');
fs.writeFileSync(F, JSON.stringify(G, null, 2));
console.log('applied=' + applied);
console.log('skipped: ' + skipped.join(' | '));