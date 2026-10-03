const fs = require('fs');
// catalog
const P = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
P.find(x => x.id === 403).img = 'https://r2.gear4music.com/media/64/648326/1200/preview.jpg';
P.find(x => x.id === 402).stores.zzounds = 'https://www.zzounds.com/item--BEHX32';
fs.writeFileSync('data/products.json', JSON.stringify(P, null, 2));
// BTN
function replaceEntry(t, id, nu) {
  const start = t.indexOf('  ' + id + ': {');
  let d = 0, q = null, i = start;
  for (; i < t.length; i++) {
    const c = t[i];
    if (q) { if (c === '\\') i++; else if (c === q) q = null; continue; }
    if (c === '"' || c === "'" || c === '`') { q = c; continue; }
    if (c === '{') d++;
    else if (c === '}') { d--; if (d === 0) break; }
  }
  return t.slice(0, start) + nu + t.slice(i + 2);
}
let t = fs.readFileSync('build-guides.js', 'utf8');
t = replaceEntry(t, 402, `  402: { prices: { amazon: "$1,999.00", gear4music: "£1,348.00", andertons: "£1,234.00", musicstore: "€1,555.00" }, urls: { zzounds: "https://www.zzounds.com/item--BEHX32" }, oos: [ "zzounds" ] },`);
t = replaceEntry(t, 403, `  403: { prices: { gear4music: "£2,969.00", amazon: "$2,499", andertons: "£2,659.00", musicstore: "€2,977.00" }, urls: { zzounds: "https://www.zzounds.com/a--925521/item--MIDM32LIVE" }, oos: [ "zzounds" ] },`);
fs.writeFileSync('build-guides.js', t);
// whitelist
let v = fs.readFileSync('temp/pb_verify_data.js', 'utf8');
const anchor = "  '185': {";
const entry = "  '402': { 'prices.gear4music': ['£1,447.00', '£1,348.00'], 'prices.musicstore': ['€1,306.72', '€1,555.00'], 'urls.zzounds': ['https://www.zzounds.com/a--925521/item--BEHX32', 'https://www.zzounds.com/item--BEHX32'] },\n  '403': { 'prices.gear4music': ['£3,139.00', '£2,969.00'], 'prices.andertons': ['£2,599.00', '£2,659.00'], 'prices.musicstore': ['€2,501.68', '€2,977.00'] },\n";
v = v.split(anchor).join(entry + anchor);
fs.writeFileSync('temp/pb_verify_data.js', v);
console.log('done');