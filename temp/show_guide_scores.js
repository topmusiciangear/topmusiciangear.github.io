const fs = require('fs');
const s = fs.readFileSync('js/guide-scores.js', 'utf8');
const i = s.indexOf('"best-headphones-for-mixing"');
const j = s.indexOf('\n },', i);
const block = s.substring(i, j + 4);
const nums = block.match(/"([^"]+)":\s*([0-9.]+)/g) || [];
const seen = new Set();
nums.forEach(m => {
  const k = m.replace(/":.*$/, '').replace(/^"/, '');
  const base = k.replace(/ \(.*\)$/, '');
  const val = m.match(/([0-9.]+)$/)[1];
  if (!seen.has(base)) { seen.add(base); console.log(val + '  ' + base); }
});
