const fs = require('fs');
let t = fs.readFileSync('build-guides.js', 'utf8');
const start = t.indexOf('  412: {');
let d = 0, q = null, i = start;
for (; i < t.length; i++) {
  const c = t[i];
  if (q) { if (c === '\\') i++; else if (c === q) q = null; continue; }
  if (c === '"' || c === "'" || c === '`') { q = c; continue; }
  if (c === '{') d++;
  else if (c === '}') { d--; if (d === 0) break; }
}
const nu = `  412: {
    prices: {
      amazon: "$2,499.00",
      andertons: "£1,699.00",
      musicstore: "€2,099.00",
      gear4music: "£2,106.00"
    }
  },`;
t = t.slice(0, start) + nu + t.slice(i + 2);
fs.writeFileSync('build-guides.js', t);
let v = fs.readFileSync('temp/pb_verify_data.js', 'utf8');
v = v.split("'412': { 'prices.gear4music': [undefined, '£2,106.00'], 'prices.musicstore': ['€1,678.99', '€2,099.00'] },").join("'412': { 'prices.gear4music': [undefined, '£2,106.00'], 'prices.musicstore': ['€1,678.99', '€2,099.00'], 'prices.andertons': ['£1,614.00', '£1,699.00'] },");
fs.writeFileSync('temp/pb_verify_data.js', v);
console.log('done');