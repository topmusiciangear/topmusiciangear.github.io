const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/build-guides.js';
let t = fs.readFileSync(F, 'utf8');
function set(id, nu) {
  const start = t.indexOf('  ' + id + ': {');
  let d = 0, q = null, i = start;
  for (; i < t.length; i++) {
    const c = t[i];
    if (q) { if (c === '\\') i++; else if (c === q) q = null; continue; }
    if (c === '"' || c === "'" || c === '`') { q = c; continue; }
    if (c === '{') d++;
    else if (c === '}') { d--; if (d === 0) break; }
  }
  t = t.slice(0, start) + nu + t.slice(i + 2);
}
set(187, `  187: {
    prices: {
      gear4music: "£2,599.00",
      amazon: "$3,499.00",
      zzounds: "$3,499.00",
      andertons: "£2,566.00",
      musicstore: "€3,079.00"
    }
  },`);
set(180, `  180: {
    prices: {
      amazon: "$3,999.99",
      gear4music: "£2,954.00",
      musicstore: "€3,389.00"
    },
    oos: [
      "andertons"
    ]
  },`);
set(181, `  181: {
    prices: {
      amazon: "$4,199.00",
      gear4music: "£3,120.00",
      musicstore: "€3,585.00"
    },
    oos: [
      "andertons"
    ]
  },`);
fs.writeFileSync(F, t);
const VF = 'C:/Users/Daniel/projects/topmusiciangear/temp/pb_verify_data.js';
let v = fs.readFileSync(VF, 'utf8');
const anchor = "  '185': {";
const entry = "  '187': { 'prices.musicstore': ['€2,680.67', '€3,079.00'] },\n  '180': { 'prices.musicstore': ['€2,393.19', '€3,389.00'] },\n  '181': { 'prices.musicstore': ['€2,520.17', '€3,585.00'] },\n";
v = v.split(anchor).join(entry + anchor);
fs.writeFileSync(VF, v);
console.log('done');