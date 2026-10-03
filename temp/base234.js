const { execSync } = require('child_process');
const BASE = execSync('git show d556fa5ed5:build-guides.js', { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
[234, 235].forEach(id => {
  const i = BASE.indexOf('  ' + id + ': {');
  if (i === -1) { console.log(id, 'NOT IN BASELINE'); return; }
  let d = 0, q = null, j = i;
  for (; j < BASE.length; j++) {
    const c = BASE[j];
    if (q) { if (c === '\\') j++; else if (c === q) q = null; continue; }
    if (c === '"' || c === "'" || c === '`') { q = c; continue; }
    if (c === '{') d++;
    else if (c === '}') { d--; if (d === 0) break; }
  }
  console.log('BASE' + id + ': ' + BASE.slice(i, j + 1).replace(/\s+/g, ' '));
});
const fs = require('fs');
const v = fs.readFileSync('temp/pb_verify_data.js', 'utf8');
['234', '235'].forEach(id => {
  const i = v.indexOf("'" + id + "':");
  console.log(id + ' whitelist:', i === -1 ? 'NONE' : v.slice(i, i + 200));
});
// JBL PRX918XLF product?
const P = require('../data/products.json');
P.forEach(p => { if (/PRX918/i.test(p.title)) console.log('JBL:', p.id, p.title); });