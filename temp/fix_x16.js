const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/build-guides.js';
let t = fs.readFileSync(F, 'utf8');
const start = t.indexOf('  182: {');
let d = 0, q = null, i = start;
for (; i < t.length; i++) {
  const c = t[i];
  if (q) { if (c === '\\') i++; else if (c === q) q = null; continue; }
  if (c === '"' || c === "'" || c === '`') { q = c; continue; }
  if (c === '{') d++;
  else if (c === '}') { d--; if (d === 0) break; }
}
const nu = `  182: {
    prices: {
      amazon: "$4,999.00",
      zzounds: "$3,999.00",
      andertons: "£3,821.00",
      gear4music: "£4,255.00",
      musicstore: "€3,640.00"
    },
    urls: {
      musicstore: "https://www.musicstore.com/en_OE/EUR/Universal-Audio-Apollo-x16-with-UAD-Analog-Classics/art-PCM0018211-000"
    }
  },`;
t = t.slice(0, start) + nu + t.slice(i + 2);
fs.writeFileSync(F, t);
const VF = 'C:/Users/Daniel/projects/topmusiciangear/temp/pb_verify_data.js';
let v = fs.readFileSync(VF, 'utf8');
const anchor = "  '185': {";
const entry = "  '182': { 'prices.zzounds': ['$3,899.00', '$3,999.00'], 'prices.gear4music': ['£3,859.00', '£4,255.00'], 'prices.musicstore': [undefined, '€3,640.00'], 'urls.musicstore': ['https://www.musicstore.com/en_OE/EUR/search?SearchText=Universal%20Audio%20Apollo%20x16', 'https://www.musicstore.com/en_OE/EUR/Universal-Audio-Apollo-x16-with-UAD-Analog-Classics/art-PCM0018211-000'], 'na': ['[\"musicstore\"]', undefined] },\n";
v = v.split(anchor).join(entry + anchor);
fs.writeFileSync(VF, v);
console.log('done');