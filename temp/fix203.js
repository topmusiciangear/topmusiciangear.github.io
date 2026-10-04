const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/build-guides.js';
let t = fs.readFileSync(F, 'utf8');
function block(id) {
  const start = t.indexOf('  ' + id + ': {');
  let d = 0, q = null, i = start;
  for (; i < t.length; i++) {
    const c = t[i];
    if (q) { if (c === '\\') i++; else if (c === q) q = null; continue; }
    if (c === '"' || c === "'" || c === '`') { q = c; continue; }
    if (c === '{') d++;
    else if (c === '}') { d--; if (d === 0) break; }
  }
  return [start, i];
}
let [s, e] = block(203);
const nu = `  203: {
    prices: {
      amazon: "$228.50",
      zzounds: "$229.99",
      gear4music: "£199.00",
      musicstore: "€259.00",
      andertons: "£219.00"
    }
  },`;
t = t.slice(0, s) + nu + t.slice(e + 2);
fs.writeFileSync(F, t);
let v = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/temp/pb_verify_data.js', 'utf8');
const anchor = "  '185': {";
v = v.split(anchor).join("  '203': { 'prices.gear4music': ['£219.00', '£199.00'] },\n" + anchor);
fs.writeFileSync('C:/Users/Daniel/projects/topmusiciangear/temp/pb_verify_data.js', v);
const P = require('C:/Users/Daniel/projects/topmusiciangear/data/products.json');
const p = P.find(x => /Flex Prime/i.test(x.title));
console.log(p.id, '|', p.title);
const t2 = fs.readFileSync(F, 'utf8');
const s2 = t2.indexOf('  ' + p.id + ': {');
let f = 0, w = null, j = s2;
for (; j < t2.length; j++) {
  const c = t2[j];
  if (w) { if (c === '\\') j++; else if (c === w) w = null; continue; }
  if (c === '"' || c === "'" || c === '`') { w = c; continue; }
  if (c === '{') f++;
  else if (c === '}') { f--; if (f === 0) break; }
}
console.log('BTNFLEX: ' + t2.slice(s2, j + 1).replace(/\s+/g, ' '));