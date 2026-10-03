const fs = require('fs');
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
t = replaceEntry(t, 235, `  235: {
    prices: {
      amazon: "$999.00",
      zzounds: "$1,099.00",
      andertons: "£803.00",
      gear4music: "£848.00",
      musicstore: "€1,100.00"
    }
  },`);
t = replaceEntry(t, 234, `  234: {
    prices: {
      amazon: "$3,499.00",
      zzounds: "$3,849.00",
      andertons: "£2,549.00",
      musicstore: "€2,898.00"
    },
    urls: {
      musicstore: "https://www.awin1.com/cread.php?awinmid=63816&awinaffid=2891111&ued=https%3A%2F%2Fwww.musicstore.com%2Fen_OE%2FEUR%2FRCF-SUB-8004-AS-18-%2Fart-PAH0014398-000"
    },
    oos: [
      "gear4music"
    ]
  },`);
t = replaceEntry(t, 236, `  236: {
    prices: {
      gear4music: "£1,139.00",
      amazon: "$1,349.00",
      zzounds: "$1,499.00",
      andertons: "£1,149.00",
      musicstore: "€1,399.00"
    }
  },`);
t = replaceEntry(t, 109, `  109: {
    prices: {
      amazon: "$1,781.01",
      zzounds: "$1,899.00",
      andertons: "£1,333.00",
      gear4music: "£1,325.00",
      musicstore: "€1,699.00"
    }
  },`);
t = replaceEntry(t, 237, `  237: {
    prices: {
      gear4music: "£1,452.00",
      amazon: "$1,739.99",
      andertons: "£1,452.00",
      musicstore: "€1,999.00"
    }
  },`);
fs.writeFileSync('build-guides.js', t);
// products.json 234 MS wrap
const P = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
P.find(x => x.id === 234).stores.musicstore = 'https://www.awin1.com/cread.php?awinmid=63816&awinaffid=2891111&ued=https%3A%2F%2Fwww.musicstore.com%2Fen_OE%2FEUR%2FRCF-SUB-8004-AS-18-%2Fart-PAH0014398-000';
fs.writeFileSync('data/products.json', JSON.stringify(P, null, 2));
// whitelist
let v = fs.readFileSync('temp/pb_verify_data.js', 'utf8');
const anchor = "  '185': {";
const entry = "  '235': { 'prices.zzounds': ['$899.00', '$1,099.00'], 'prices.gear4music': ['£899.00', '£848.00'], 'prices.musicstore': ['€1,069.00', '€1,100.00'] },\n  '234': { 'prices.musicstore': [undefined, '€2,898.00'], 'urls.musicstore': ['https://www.musicstore.com/en_OE/EUR/search?SearchText=RCF%20SUB%208004-AS', 'https://www.awin1.com/cread.php?awinmid=63816&awinaffid=2891111&ued=https%3A%2F%2Fwww.musicstore.com%2Fen_OE%2FEUR%2FRCF-SUB-8004-AS-18-%2Fart-PAH0014398-000'], 'na': ['[\"musicstore\"]', undefined] },\n  '236': { 'prices.musicstore': ['€1,511.76', '€1,399.00'] },\n  '109': { 'prices.gear4music': ['£1,428.00', '£1,325.00'], 'prices.andertons': ['£1,359.00', '£1,333.00'] },\n  '237': { 'prices.musicstore': ['€1,427.73', '€1,999.00'] },\n";
v = v.split(anchor).join(entry + anchor);
fs.writeFileSync('temp/pb_verify_data.js', v);
console.log('done');