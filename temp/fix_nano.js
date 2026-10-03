const fs = require('fs');
const P = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
P.find(x => x.id === 443).stores.musicstore = 'https://www.awin1.com/cread.php?awinmid=63816&awinaffid=2891111&ued=https%3A%2F%2Fwww.musicstore.com%2Fen_OE%2FEUR%2FElectro-Harmonix-Small-Stone-Nano-Chassis%2Fart-GIT0009646-000';
fs.writeFileSync('data/products.json', JSON.stringify(P, null, 2));
let t = fs.readFileSync('build-guides.js', 'utf8');
const start = t.indexOf('  443: {');
let d = 0, q = null, i = start;
for (; i < t.length; i++) {
  const c = t[i];
  if (q) { if (c === '\\') i++; else if (c === q) q = null; continue; }
  if (c === '"' || c === "'" || c === '`') { q = c; continue; }
  if (c === '{') d++;
  else if (c === '}') { d--; if (d === 0) break; }
}
const nu = `  443: {
    prices: {
      amazon: "$83.50",
      zzounds: "$83.50",
      gear4music: "£67.90",
      musicstore: "€66.00",
      andertons: "£69.99"
    }
  },`;
t = t.slice(0, start) + nu + t.slice(i + 2);
fs.writeFileSync('build-guides.js', t);
let v = fs.readFileSync('temp/pb_verify_data.js', 'utf8');
const anchor = "  '185': {";
const entry = "  '443': { 'prices.musicstore': ['€74.79', '€66.00'] },\n";
v = v.split(anchor).join(entry + anchor);
fs.writeFileSync('temp/pb_verify_data.js', v);
console.log('done');