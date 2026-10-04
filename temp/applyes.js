const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const G = require(F);
// fixes embedded below (batches ES1..ES3)
const FIXES = [];
FIXES.push(...require('C:/Users/Daniel/projects/topmusiciangear/temp/es1.json'));
FIXES.push(...require('C:/Users/Daniel/projects/topmusiciangear/temp/es2.json'));
FIXES.push(...require('C:/Users/Daniel/projects/topmusiciangear/temp/es3.json'));
function* walk(o, path) {
  if (typeof o === 'string') { yield [path, o]; return; }
  if (Array.isArray(o)) {
    for (let i = 0; i < o.length; i++) yield* walk(o[i], path + '[' + i + ']');
    return;
  }
  if (o && typeof o === 'object') {
    for (const k of Object.keys(o)) yield* walk(o[k], path ? path + '.' + k : k);
  }
}
function setPath(root, path, val) {
  const parts = path.replace(/\[(\d+)\]/g, '.$1').split('.');
  let o = root;
  for (let i = 0; i < parts.length - 1; i++) o = o[parts[i]];
  o[parts[parts.length - 1]] = val;
}
const byGuide = {};
G.forEach(g => { byGuide[g.id] = g; });
let ok = 0; const problems = [];
FIXES.forEach(f => {
  const g = byGuide[f.guide];
  if (!g) { problems.push(f.guide + ' NOGUIDE :: ' + f.old.slice(0, 40)); return; }
  const hits = [];
  for (const [path, val] of walk(g, '')) {
    if (typeof val === 'string' && val.includes(f.old)) hits.push([path, val]);
  }
  // only accept Spanish-field hits (avoid touching EN)
  const esHits = hits.filter(([p]) => /_es|_es\[/.test(p) || /\bes\b/i.test(p));
  const use = esHits.length ? esHits : hits;
  if (use.length !== 1) { problems.push(f.guide + ' HITS=' + use.length + ' :: ' + f.old.slice(0, 50)); return; }
  setPath(g, use[0][0], use[0][1].split(f.old).join(f.new));
  ok++;
});
fs.writeFileSync(F, JSON.stringify(G, null, 2));
console.log('applied=' + ok, 'problems=' + problems.length);
problems.forEach(p => console.log(' ' + p));