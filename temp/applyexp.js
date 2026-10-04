const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const G = require(F);
const byGuide = {};
G.forEach(g => { byGuide[g.id] = g; });
let ok = 0; const problems = [];
for (let b = 1; b <= 8; b++) {
  const arr = require('C:/Users/Daniel/projects/topmusiciangear/temp/exp' + b + '.json');
  arr.forEach(e => {
    const g = byGuide[e.guide];
    if (!g) { problems.push(e.guide + ' NOGUIDE'); return; }
    const s = g.sections[e.secIndex];
    if (!s) { problems.push(e.guide + ' sec' + e.secIndex + ' NOSEC'); return; }
    if (typeof e.content !== 'string' || typeof e.content_es !== 'string') { problems.push(e.guide + ' sec' + e.secIndex + ' NOFIELD'); return; }
    if (e.content.length < 400 || e.content_es.length < 400) { problems.push(e.guide + ' sec' + e.secIndex + ' CORTO'); return; }
    if (/[$€£]\s*[\d,]+/.test(e.content) || /[$€£]\s*[\d,]+/.test(e.content_es)) { problems.push(e.guide + ' sec' + e.secIndex + ' TIENE-PRECIO'); return; }
    s.content = e.content;
    s.content_es = e.content_es;
    ok++;
  });
}
fs.writeFileSync(F, JSON.stringify(G, null, 2));
console.log('expansiones aplicadas:', ok, '| problemas:', problems.length);
problems.forEach(p => console.log(' ' + p));
try { JSON.parse(fs.readFileSync(F, 'utf8')); console.log('JSON OK'); }
catch (e) { console.log('JSON BROKEN: ' + e.message); }