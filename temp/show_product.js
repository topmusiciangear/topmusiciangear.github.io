const fs = require('fs');
const t = fs.readFileSync('data/products.json', 'utf8');
const i = t.indexOf('"id": 214');
const start = t.lastIndexOf('{', i);
let depth = 0, end = -1;
for (let k = i; k < t.length; k++) {
  if (t[k] === '{') depth++;
  else if (t[k] === '}') { depth--; if (depth === 0) { end = k; break; } }
}
console.log(t.slice(start, end + 1));
