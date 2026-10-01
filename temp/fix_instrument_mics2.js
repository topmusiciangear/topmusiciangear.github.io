// Fix duplicate Shure Beta 58A verdict
const fs = require('fs');
const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const g = G.find(x => x.id === 'best-instrument-mics');

// Remove duplicate Beta 58A verdict (keep first)
const seen = new Set();
g.verdictProsCons = g.verdictProsCons.filter(v => {
  if (seen.has(v.name)) return false;
  seen.add(v.name);
  return true;
});

fs.writeFileSync('data/guides.json', JSON.stringify(G, null, 2));
console.log('best-instrument-mics: cols=' + g.productTable.columns.length + ' verdict=' + g.verdictProsCons.length);
console.log('Verdicts:', g.verdictProsCons.map(v => v.name).join(', '));