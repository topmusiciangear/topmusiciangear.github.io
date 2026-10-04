const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const G = require(F);
function norm(s) {
  return (s || '').toLowerCase().replace(/[^a-z0-9áéíóúñü ]/gi, ' ').replace(/\s+/g, ' ').trim();
}
function overlap(a, b) {
  const A = new Set(norm(a).split(' ').filter(w => w.length > 3));
  const B = new Set(norm(b).split(' ').filter(w => w.length > 3));
  if (!A.size || !B.size) return 0;
  let hit = 0;
  A.forEach(w => { if (B.has(w)) hit++; });
  return hit / Math.min(A.size, B.size);
}
// proposals embedded below by batch
const ALL = [];
ALL.push(...require('C:/Users/Daniel/projects/topmusiciangear/temp/vpropA.json'));
ALL.push(...require('C:/Users/Daniel/projects/topmusiciangear/temp/vpropB.json'));
ALL.push(...require('C:/Users/Daniel/projects/topmusiciangear/temp/vpropC.json'));
ALL.push(...require('C:/Users/Daniel/projects/topmusiciangear/temp/vpropD.json'));
ALL.push(...require('C:/Users/Daniel/projects/topmusiciangear/temp/vpropE.json'));
let applied = 0, skipped = 0;
ALL.forEach(p => {
  const g = G.find(x => x.id === p.guide);
  if (!g) { console.log('NO GUIDE ' + p.guide); return; }
  const v = (g.verdictProsCons || []).find(v => v.name === p.name);
  if (!v) { console.log('NO ENTRY ' + p.guide + ' / ' + p.name); return; }
  [['pros', 'add_pros'], ['pros_es', 'add_pros_es'], ['cons', 'add_cons'], ['cons_es', 'add_cons_es']].forEach(([field, add]) => {
    (p[add] || []).forEach(item => {
      const need = 4 - v[field].length;
      if (need <= 0) { skipped++; return; }
      const dup = v[field].some(e => overlap(e, item) >= 0.6);
      if (dup) { console.log('DUP skip [' + p.guide + '][' + v.name + ']: ' + item.slice(0, 50)); skipped++; return; }
      v[field].push(item);
      applied++;
    });
  });
});
fs.writeFileSync(F, JSON.stringify(G, null, 2));
console.log('applied=' + applied, 'skipped=' + skipped);