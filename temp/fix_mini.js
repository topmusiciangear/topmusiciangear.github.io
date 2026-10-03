const { execSync } = require('child_process');
const BASE = execSync('git show d556fa5ed5:build-guides.js', { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
const i = BASE.indexOf('  489: {');
let d = 0, q = null, j = i;
for (; j < BASE.length; j++) {
  const c = BASE[j];
  if (q) { if (c === '\\') j++; else if (c === q) q = null; continue; }
  if (c === '"' || c === "'" || c === '`') { q = c; continue; }
  if (c === '{') d++;
  else if (c === '}') { d--; if (d === 0) break; }
}
console.log('BASE 489: ' + BASE.slice(i, j + 1).replace(/\s+/g, ' '));
const fs = require('fs');
const P = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
P.find(x => x.id === 489).stores.gear4music = 'https://www.awin1.com/cread.php?awinmid=1117&awinaffid=2891111&ued=https%3A%2F%2Fwww.gear4music.com%2FGuitar-and-Bass%2FPositive-Grid-Spark-Mini-Black%2F695I';
fs.writeFileSync('data/products.json', JSON.stringify(P, null, 2));
let t = fs.readFileSync('build-guides.js', 'utf8');
const start = t.indexOf('  489: {');
d = 0; q = null; j = start;
for (; j < t.length; j++) {
  const c = t[j];
  if (q) { if (c === '\\') j++; else if (c === q) q = null; continue; }
  if (c === '"' || c === "'" || c === '`') { q = c; continue; }
  if (c === '{') d++;
  else if (c === '}') { d--; if (d === 0) break; }
}
const nu = `  489: {
    prices: {
      zzounds: "$199.00",
      amazon: "$199.00",
      andertons: "£199.99",
      musicstore: "€179.00"
    },
    oos: [
      "gear4music"
    ]
  },`;
t = t.slice(0, start) + nu + t.slice(j + 2);
fs.writeFileSync('build-guides.js', t);
console.log('applied');