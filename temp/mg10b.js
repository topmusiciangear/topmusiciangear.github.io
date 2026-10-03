const fs = require('fs');
let t = fs.readFileSync('build-guides.js', 'utf8');
const start = t.indexOf('  137: {');
let d = 0, q = null, i = start;
for (; i < t.length; i++) {
  const c = t[i];
  if (q) { if (c === '\\') i++; else if (c === q) q = null; continue; }
  if (c === '"' || c === "'" || c === '`') { q = c; continue; }
  if (c === '{') d++;
  else if (c === '}') { d--; if (d === 0) break; }
}
const nu = `  137: {
    prices: {
      amazon: "$250.74",
      zzounds: "$325.00",
      andertons: "£225.00",
      gear4music: "£225.50",
      musicstore: "€279.00"
    }
  },`;
t = t.slice(0, start) + nu + t.slice(i + 2);
fs.writeFileSync('build-guides.js', t);
let v = fs.readFileSync('temp/pb_verify_data.js', 'utf8');
const anchor = "  '185': {";
const entry = "  '137': { 'prices.zzounds': ['$250.74', '$325.00'] },\n";
v = v.split(anchor).join(entry + anchor);
fs.writeFileSync('temp/pb_verify_data.js', v);
console.log('done');