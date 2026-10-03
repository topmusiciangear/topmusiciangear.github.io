const fs = require('fs');
let t = fs.readFileSync('build-guides.js', 'utf8');
const start = t.indexOf('  178: {');
let d = 0, q = null, i = start;
for (; i < t.length; i++) {
  const c = t[i];
  if (q) { if (c === '\\') i++; else if (c === q) q = null; continue; }
  if (c === '"' || c === "'" || c === '`') { q = c; continue; }
  if (c === '{') d++;
  else if (c === '}') { d--; if (d === 0) break; }
}
const nu = `  178: {
    prices: {
      amazon: "$1,199.00",
      gear4music: "£1,159.00",
      musicstore: "€1,244.00"
    },
    oos: [
      "andertons"
    ]
  },`;
t = t.slice(0, start) + nu + t.slice(i + 2);
fs.writeFileSync('build-guides.js', t);
let v = fs.readFileSync('temp/pb_verify_data.js', 'utf8');
const anchor = "  '185': {";
const entry = "  '178': { 'prices.gear4music': ['£1,079.00', '£1,159.00'], 'prices.musicstore': ['€987.90', '€1,244.00'] },\n";
v = v.split(anchor).join(entry + anchor);
fs.writeFileSync('temp/pb_verify_data.js', v);
console.log('done');