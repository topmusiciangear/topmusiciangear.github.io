const fs = require('fs');
const PF = 'C:/Users/Daniel/projects/topmusiciangear/data/products.json';
const P = require(PF);
const p = P.find(x => x.id === 554);
p.stores.musicstore = 'https://www.musicstore.com/en_OE/EUR/Takamine-GC1N/art-GIT0063165-001';
fs.writeFileSync(PF, JSON.stringify(P, null, 2));
const F = 'C:/Users/Daniel/projects/topmusiciangear/build-guides.js';
let t = fs.readFileSync(F, 'utf8');
const start = t.indexOf('  554: {');
let d = 0, q = null, i = start;
for (; i < t.length; i++) {
  const c = t[i];
  if (q) { if (c === '\\') i++; else if (c === q) q = null; continue; }
  if (c === '"' || c === "'" || c === '`') { q = c; continue; }
  if (c === '{') d++;
  else if (c === '}') { d--; if (d === 0) break; }
}
const nu = `  554: {
    prices: {
      gear4music: "£209.00",
      amazon: "$349.00",
      zzounds: "$349.00",
      musicstore: "€299.00"
    },
    urls: {
      gear4music: "https://www.gear4music.com/Guitar-and-Bass/Takamine-GC1-Classical-Guitar-Natural/1FSN",
      amazon: "https://www.amazon.com/dp/B00EOADUTU",
      zzounds: "https://www.zzounds.com/item--TAKGC1?siid=178306",
      musicstore: "https://www.musicstore.com/en_OE/EUR/Takamine-GC1N/art-GIT0063165-001"
    }
  },`;
t = t.slice(0, start) + nu + t.slice(i + 2);
fs.writeFileSync(F, t);
console.log('GC1 MS+zz done');