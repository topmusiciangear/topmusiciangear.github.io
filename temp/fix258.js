const fs = require('fs');
let t = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/build-guides.js', 'utf8');
const start = t.indexOf('  258: {');
let d = 0, q = null, i = start;
for (; i < t.length; i++) {
  const c = t[i];
  if (q) { if (c === '\\') i++; else if (c === q) q = null; continue; }
  if (c === '"' || c === "'" || c === '`') { q = c; continue; }
  if (c === '{') d++;
  else if (c === '}') { d--; if (d === 0) break; }
}
const nu = `  258: {
    prices: {
      gear4music: "£249.99",
      amazon: "$249.99",
      zzounds: "$199.99",
      andertons: "£249.00",
      musicstore: "€269.00"
    }
  },`;
t = t.slice(0, start) + nu + t.slice(i + 2);
fs.writeFileSync('C:/Users/Daniel/projects/topmusiciangear/build-guides.js', t);
let v = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/temp/pb_verify_data.js', 'utf8');
const anchor = "  '185': {";
const entry = "  '258': { 'prices.musicstore': ['€335.29', '€269.00'] },\n";
v = v.split(anchor).join(entry + anchor);
fs.writeFileSync('C:/Users/Daniel/projects/topmusiciangear/temp/pb_verify_data.js', v);
const P = require('C:/Users/Daniel/projects/topmusiciangear/data/products.json');
const p = P.find(x => x.title === 'Boss GX-1');
console.log(p.id, '|', p.title);
const t2 = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/build-guides.js', 'utf8');
const s2 = t2.indexOf('  ' + p.id + ': {');
let e = 0, w = null, j = s2;
for (; j < t2.length; j++) {
  const c = t2[j];
  if (w) { if (c === '\\') j++; else if (c === w) w = null; continue; }
  if (c === '"' || c === "'" || c === '`') { w = c; continue; }
  if (c === '{') e++;
  else if (c === '}') { e--; if (e === 0) break; }
}
console.log('BTNGX: ' + t2.slice(s2, j + 1).replace(/\s+/g, ' '));