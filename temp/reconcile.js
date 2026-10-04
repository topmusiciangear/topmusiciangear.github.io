const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const G = require(F);
function* walk(o, path) {
  if (typeof o === 'string') { yield [path, o]; return; }
  if (Array.isArray(o)) { for (let i = 0; i < o.length; i++) yield* walk(o[i], path + '[' + i + ']'); return; }
  if (o && typeof o === 'object') { for (const k of Object.keys(o)) yield* walk(o[k], path ? path + '.' + k : k); }
}
const D1 = require('C:/Users/Daniel/projects/topmusiciangear/temp/deep1.json');
const D2 = require('C:/Users/Daniel/projects/topmusiciangear/temp/deep2.json');
const D3 = require('C:/Users/Daniel/projects/topmusiciangear/temp/deep3.json');
const byGuide = {};
G.forEach(g => { byGuide[g.id] = g; });
// re-derive problems exactly like applyes
const probs = [];
[D1, D2, D3].flat().forEach(f => {
  if (!f || typeof f.guide !== 'string' || typeof f.old !== 'string' || typeof f.new !== 'string') return;
  const g = byGuide[f.guide];
  if (!g) return;
  const hits = [];
  for (const [path, val] of walk(g, '')) {
    if (typeof val === 'string' && val.includes(f.old)) hits.push(path);
  }
  const esHits = hits.filter(p => /_es/.test(p));
  const use = esHits.length ? esHits : hits;
  if (use.length !== 1) probs.push({ f, n: use.length, already: !!hits.length && [...walk(g, '')].some(([p, v]) => typeof v === 'string' && v.includes(f.new)) });
});
let alreadyNew = 0;
const needManual = [];
probs.forEach(({ f, n, already }) => {
  if (already) alreadyNew++;
  else needManual.push(f.guide + ' HITS=' + n + ' :: ' + f.old.slice(0, 60) + '  => NEW: ' + f.new.slice(0, 60));
});
console.log('ya aplicado via duplicado:', alreadyNew, '| manual pendiente:', needManual.length);
needManual.forEach(m => console.log(' ' + m));