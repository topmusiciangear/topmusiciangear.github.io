const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const G = require(F);
function norm(s) {
  return (s || '').toLowerCase().replace(/[^a-z0-9áéíóúñü ]/gi, ' ').replace(/\s+/g, ' ').trim();
}
function normIdx(s) {
  // returns [normalized, map normPos -> rawPos]
  const map = [];
  let out = '';
  for (let i = 0; i < s.length; i++) {
    const c = s[i].toLowerCase();
    if (/[a-z0-9áéíóúñü]/.test(c)) { out += c; map.push(i); }
    else if (c === ' ' || /\s/.test(c)) {
      if (out && !out.endsWith(' ')) { out += ' '; map.push(i); }
    }
  }
  return [out.trim(), map];
}
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
let ok = 0; const problems = [];
[D1, D2, D3].flat().forEach(f => {
  if (!f || typeof f.guide !== 'string' || typeof f.old !== 'string' || typeof f.new !== 'string') return;
  const g = byGuide[f.guide];
  if (!g) { problems.push(f.guide + ' NOGUIDE'); return; }
  const no = norm(f.old);
  if (no.length < 15) { problems.push(f.guide + ' TOOSHORT :: ' + f.old.slice(0, 40)); return; }
  const cands = [];
  for (const [path, val] of walk(g, '')) {
    if (typeof val !== 'string') continue;
    const [nv, map] = normIdx(val);
    const at = nv.indexOf(no);
    if (at > -1) cands.push([path, val, at, map]);
  }
  if (cands.length !== 1) { problems.push(f.guide + ' AMBIG=' + cands.length + ' :: ' + f.old.slice(0, 50)); return; }
  const [path, val, at, map] = cands[0];
  const rawStart = map[at];
  const rawEnd = map[at + no.length - 1] + 1;
  setPath(g, path, val.slice(0, rawStart) + f.new + val.slice(rawEnd));
  ok++;
});
fs.writeFileSync(F, JSON.stringify(G, null, 2));
console.log('fuzzy applied=' + ok, 'problems=' + problems.length);
// validate
try { JSON.parse(fs.readFileSync(F, 'utf8')); console.log('JSON OK'); }
catch (e) { console.log('JSON BROKEN: ' + e.message); }