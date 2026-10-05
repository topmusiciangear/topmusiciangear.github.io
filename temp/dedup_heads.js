const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const G = require(DIR + 'data/guides.json');
let removed = 0;
// 1. identical normalized headings in same guide: keep first
function normHead(s) { return (s || '').toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim(); }
G.forEach(g => {
  const seen = new Map(); const rm = [];
  (g.sections || []).forEach((s, si) => {
    const h = normHead(s.heading || '');
    if (!h) return;
    if (seen.has(h)) rm.push(si); else seen.set(h, si);
  });
  rm.sort((a, b) => b - a).forEach(si => {
    console.log('REMOVE-DUPHEAD ' + g.id + ' S' + si + ' "' + (g.sections[si].heading || '').slice(0, 55) + '"');
    g.sections.splice(si, 1); removed++;
  });
});
fs.writeFileSync(DIR + 'data/guides.json', JSON.stringify(G, null, 2));
console.log('removed=' + removed);