const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/build-guides.js';
let t = fs.readFileSync(F, 'utf8');
// insert BTN entries before the closing of TEST_SHOP_BTN: anchor on entry 552 block end
const start552 = t.indexOf('  552: {');
if (start552 < 0) { console.log('NO 552 anchor'); process.exit(1); }
let d = 0, q = null, i = start552;
for (; i < t.length; i++) {
  const c = t[i];
  if (q) { if (c === '\\') i++; else if (c === q) q = null; continue; }
  if (c === '"' || c === "'" || c === '`') { q = c; continue; }
  if (c === '{') d++;
  else if (c === '}') { d--; if (d === 0) break; }
}
const nu = `,
  553: {
    prices: {
      gear4music: "£189.00"
    },
    urls: {
      amazon: "https://www.amazon.com/dp/B07K2JLS56"
    }
  },
  554: {
    prices: {
      gear4music: "£209.00",
      amazon: "$349.00",
      zzounds: "$349.00"
    },
    urls: {
      gear4music: "https://www.gear4music.com/Guitar-and-Bass/Takamine-GC1-Classical-Guitar-Natural/1FSN",
      amazon: "https://www.amazon.com/dp/B00EOADUTU",
      zzounds: "https://www.zzounds.com/a--925521/item--TAKGC1"
    }
  }`;
t = t.slice(0, i + 1) + nu + t.slice(i + 1);
fs.writeFileSync(F, t);
const VF = 'C:/Users/Daniel/projects/topmusiciangear/temp/pb_verify_data.js';
let v = fs.readFileSync(VF, 'utf8');
const old = "'550', '551', '552']";
if (!v.includes(old)) { console.log('ADDED_OK anchor missing'); process.exit(1); }
v = v.split(old).join("'550', '551', '552', '553', '554']");
fs.writeFileSync(VF, v);
console.log('BTN 553+554 + ADDED_OK done');