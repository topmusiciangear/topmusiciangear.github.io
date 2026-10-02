// skipMedia=true on multi-product thematic sections whose products ALL have
// their own dedicated single-product section (so image+buy renders there).
// Guards: skip sections with own video; never touch single-product sections.
const fs = require('fs');
const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));

let changed = 0;
const log = [];
G.forEach(g => {
  if (!g.sections) return;
  const dedicated = new Set();
  g.sections.forEach(s => {
    const pr = s.products || [];
    if (pr.length === 1 && ((s.content || '').length > 0)) dedicated.add(pr[0]);
  });
  g.sections.forEach(s => {
    const pr = s.products || [];
    if (pr.length < 2 || s.skipMedia || s.video) return;
    if (pr.every(pid => dedicated.has(pid))) {
      s.skipMedia = true;
      changed++;
      if (log.length < 40) log.push(g.id + ' :: ' + (s.heading || '').slice(0, 60));
    }
  });
});
fs.writeFileSync('data/guides.json', JSON.stringify(G, null, 2));
console.log('thematic sections set to skipMedia: ' + changed);
log.forEach(l => console.log('  ' + l));
