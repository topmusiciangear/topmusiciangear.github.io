const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const G = require(F);
function* walk(o, path) {
  if (typeof o === 'string') { yield [path, o]; return; }
  if (Array.isArray(o)) { for (let i = 0; i < o.length; i++) yield* walk(o[i], path + '[' + i + ']'); return; }
  if (o && typeof o === 'object') { for (const k of Object.keys(o)) yield* walk(o[k], path ? path + '.' + k : k); }
}
function setPath(root, path, val) {
  const parts = path.replace(/\[(\d+)\]/g, '.$1').split('.');
  let o = root;
  for (let i = 0; i < parts.length - 1; i++) o = o[parts[i]];
  o[parts[parts.length - 1]] = val;
}
const byGuide = {};
G.forEach(g => { byGuide[g.id] = g; });
const D1 = require('C:/Users/Daniel/projects/topmusiciangear/temp/deep1.json');
const D2 = require('C:/Users/Daniel/projects/topmusiciangear/temp/deep2.json');
const D3 = require('C:/Users/Daniel/projects/topmusiciangear/temp/deep3.json');
// approved manual list = triage score>=0.55 (recomputed here by uniqueness of normalized core)
function toks(s) {
  return new Set((s || '').toLowerCase().replace(/[^a-z0-9áéíóúñü ]/gi, ' ').split(' ').filter(w => w.length > 3));
}
let ok = 0;
[D1, D2, D3].flat().forEach(f => {
  if (!f || typeof f.guide !== 'string' || typeof f.old !== 'string' || typeof f.new !== 'string') return;
  const g = byGuide[f.guide];
  if (!g) return;
  const T = toks(f.old);
  if (!T.size) return;
  // find fields containing >=55% of distinctive tokens AND containing a rare token
  const cands = [];
  for (const [path, val] of walk(g, '')) {
    if (typeof val !== 'string' || !val.includes(f.old.slice(0, 20))) continue;
    cands.push([path, val]);
  }
  // fallback: token-overlap fields
  if (!cands.length) {
    for (const [path, val] of walk(g, '')) {
      if (typeof val !== 'string') continue;
      const V = toks(val);
      let hit = 0;
      T.forEach(w => { if (V.has(w)) hit++; });
      if (hit / T.size >= 0.55 && val.includes(f.old.split(' ').slice(0, 3).join(' ').slice(0, 20))) cands.push([path, val]);
    }
  }
  if (!cands.length) return;
  cands.forEach(([path, val]) => {
    if (val.includes(f.old)) { setPath(g, path, val.split(f.old).join(f.new)); ok++; }
  });
});
fs.writeFileSync(F, JSON.stringify(G, null, 2));
console.log('manual aplicados:', ok);
try { JSON.parse(fs.readFileSync(F, 'utf8')); console.log('JSON OK'); }
catch (e) { console.log('JSON BROKEN: ' + e.message); }