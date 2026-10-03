const fs = require('fs');
let t = fs.readFileSync('build-guides.js', 'utf8');
const start = t.indexOf('  260: {');
let d = 0, q = null, i = start;
for (; i < t.length; i++) {
  const c = t[i];
  if (q) { if (c === '\\') i++; else if (c === q) q = null; continue; }
  if (c === '"' || c === "'" || c === '`') { q = c; continue; }
  if (c === '{') d++;
  else if (c === '}') { d--; if (d === 0) break; }
}
const nu = `  260: {
    prices: {
      amazon: "$349.99"
    },
    oos: [
      "andertons"
    ]
  },`;
t = t.slice(0, start) + nu + t.slice(i + 2);
fs.writeFileSync('build-guides.js', t);
let v = fs.readFileSync('temp/pb_verify_data.js', 'utf8');
const anchor = "  '185': {";
const entry = "  '260': { 'prices.gear4music': ['£329.99', undefined], 'prices.musicstore': ['€293.28', undefined] },\n";
v = v.split(anchor).join(entry + anchor);
fs.writeFileSync('temp/pb_verify_data.js', v);
console.log('done');