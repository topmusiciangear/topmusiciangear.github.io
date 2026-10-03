const fs = require('fs');
const P = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
P.find(x => x.id === 411).stores.gear4music = 'https://www.awin1.com/cread.php?awinmid=1117&awinaffid=2891111&ued=https%3A%2F%2Fwww.gear4music.com%2FPA-DJ-and-Lighting%2FYamaha-DM3-S-16-Channel-Digital-Mixer%2F5JCY';
fs.writeFileSync('data/products.json', JSON.stringify(P, null, 2));
let t = fs.readFileSync('build-guides.js', 'utf8');
const start = t.indexOf('  411: {');
let d = 0, q = null, i = start;
for (; i < t.length; i++) {
  const c = t[i];
  if (q) { if (c === '\\') i++; else if (c === q) q = null; continue; }
  if (c === '"' || c === "'" || c === '`') { q = c; continue; }
  if (c === '{') d++;
  else if (c === '}') { d--; if (d === 0) break; }
}
console.log('current 411:', t.slice(start, i + 1).replace(/\s+/g, ' '));