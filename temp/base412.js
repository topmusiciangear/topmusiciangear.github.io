const { execSync } = require('child_process');
const BASE = execSync('git show d556fa5ed5:build-guides.js', { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
const i = BASE.indexOf('  412: {');
let d = 0, q = null, j = i;
for (; j < BASE.length; j++) {
  const c = BASE[j];
  if (q) { if (c === '\\') j++; else if (c === q) q = null; continue; }
  if (c === '"' || c === "'" || c === '`') { q = c; continue; }
  if (c === '{') d++;
  else if (c === '}') { d--; if (d === 0) break; }
}
console.log(BASE.slice(i, j + 1));