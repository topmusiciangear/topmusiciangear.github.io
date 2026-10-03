const fs = require('fs');
let t = fs.readFileSync('build-guides.js', 'utf8');
const start = t.indexOf('  216: {');
let d = 0, q = null, i = start;
for (; i < t.length; i++) {
  const c = t[i];
  if (q) { if (c === '\\') i++; else if (c === q) q = null; continue; }
  if (c === '"' || c === "'" || c === '`') { q = c; continue; }
  if (c === '{') d++;
  else if (c === '}') { d--; if (d === 0) break; }
}
const nu = `  216: {
    prices: {
      gear4music: "£1,016.00",
      amazon: "$1,699.00",
      andertons: "£899.00",
      musicstore: "€1,249.00"
    },
    urls: {
      zzounds: "https://www.zzounds.com/a--925521/item--RCFNX912SMA"
    },
    oos: [
      "zzounds"
    ]
  },`;
t = t.slice(0, start) + nu + t.slice(i + 2);
fs.writeFileSync('build-guides.js', t);
let v = fs.readFileSync('temp/pb_verify_data.js', 'utf8');
const anchor = "  '185': {";
const entry = "  '216': { 'prices.musicstore': ['€1,091.60', '€1,249.00'] },\n";
v = v.split(anchor).join(entry + anchor);
fs.writeFileSync('temp/pb_verify_data.js', v);
console.log('done');