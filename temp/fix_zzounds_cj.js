const fs = require('fs');
let t = fs.readFileSync('data/products.json', 'utf8');
const idx = t.indexOf('"id": 371');
const storesIdx = t.indexOf('"stores":', idx);
let d = 0, q = null, i = storesIdx;
for (; i < t.length; i++) {
  const c = t[i];
  if (q) { if (c === '\\') i++; else if (c === q) q = null; continue; }
  if (c === '"' || c === "'" || c === '`') { q = c; continue; }
  if (c === '{') d++;
  else if (c === '}') { d--; if (d === 0) break; }
}
const oldStores = t.slice(storesIdx, i + 1);
console.log('OLD:');
console.log(oldStores);

const newStores = oldStores.replace(
  '"zzounds": "https://www.zzounds.com/item--ADPTV5"',
  '"zzounds": "https://www.anrdoezrs.net/click-101857888-10439229?url=https%3A%2F%2Fwww.zzounds.com%2Fitem--ADPTV5"'
);

t = t.slice(0, storesIdx) + newStores + t.slice(i + 1);
fs.writeFileSync('data/products.json', t);
console.log('Updated');