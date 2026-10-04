const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const G = require(F);
function* walk(o, path) {
  if (typeof o === 'string') { yield [path, o]; return; }
  if (Array.isArray(o)) { for (let i = 0; i < o.length; i++) yield* walk(o[i], path + '[' + i + ']'); return; }
  if (o && typeof o === 'object') { for (const k of Object.keys(o)) yield* walk(o[k], path ? path + '.' + k : k); }
}
function toks(s) {
  return new Set((s || '').toLowerCase().replace(/[^a-z0-9áéíóúñü ]/gi, ' ').split(' ').filter(w => w.length > 3));
}
const byGuide = {};
G.forEach(g => { byGuide[g.id] = g; });
const D1 = require('C:/Users/Daniel/projects/topmusiciangear/temp/deep1.json');
const D2 = require('C:/Users/Daniel/projects/topmusiciangear/temp/deep2.json');
const D3 = require('C:/Users/Daniel/projects/topmusiciangear/temp/deep3.json');
const seen = new Set();
const cands = [];
[D1, D2, D3].flat().forEach(f => {
  if (!f || typeof f.guide !== 'string' || typeof f.old !== 'string' || typeof f.new !== 'string') return;
  const key = f.guide + '||' + f.old;
  if (seen.has(key)) return;
  seen.add(key);
  const g = byGuide[f.guide];
  if (!g) return;
  const T = toks(f.old);
  if (!T.size) return;
  let best = 0, bestPath = '';
  for (const [path, val] of walk(g, '')) {
    if (typeof val !== 'string') continue;
    const V = toks(val);
    let hit = 0;
    T.forEach(w => { if (V.has(w)) hit++; });
    const score = hit / T.size;
    if (score > best) { best = score; bestPath = path; }
  }
  // skip if new already present (applied via duplicate)
  let hasNew = false;
  for (const [p, v] of walk(g, '')) { if (typeof v === 'string' && v.includes(f.new.slice(0, 40))) { hasNew = true; break; } }
  cands.push({ guide: f.guide, score: best, path: bestPath, old: f.old, new: f.new, hasNew });
});
cands.sort((a, b) => b.score - a.score);
console.log('total únicos:', cands.length);
console.log('con new ya presente:', cands.filter(c => c.hasNew).length);
const review = cands.filter(c => !c.hasNew && c.score >= 0.55);
console.log('para revisión manual (score>=0.55):', review.length);
review.forEach(c => console.log('[' + c.score.toFixed(2) + '] ' + c.guide + ' ' + c.path + '\n  OLD: ' + c.old.slice(0, 110) + '\n  NEW: ' + c.new.slice(0, 110)));
const discard = cands.filter(c => !c.hasNew && c.score < 0.55);
console.log('descartados (score<0.55):', discard.length);