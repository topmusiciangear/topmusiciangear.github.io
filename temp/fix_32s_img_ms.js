const fs = require('fs');
const P = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
P.find(x => x.id === 412).img = 'https://r2.gear4music.com/media/46/460507/1200/preview.jpg';
fs.writeFileSync('data/products.json', JSON.stringify(P, null, 2));
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
      gear4music: "£2,399.00",
      andertons: "£2,159.00",
      musicstore: "€1,899.00"
    },
    urls: {
      zzounds: "https://www.zzounds.com/item--PRSSTUDIOLIVE32S",
      musicstore: "https://www.awin1.com/cread.php?awinmid=63816&awinaffid=2891111&ued=https%3A%2F%2Fwww.musicstore.com%2Fen_OE%2FEUR%2FPresonus-StudioLive-32S%2Fart-REC0014236-000"
    }
  },`;
t = t.slice(0, start) + nu + t.slice(i + 2);
fs.writeFileSync('build-guides.js', t);
let v = fs.readFileSync('temp/pb_verify_data.js', 'utf8');
v = v.split("'prices.musicstore': ['€1,678.99', undefined]").join("'prices.musicstore': ['€1,678.99', '€1,899.00']");
fs.writeFileSync('temp/pb_verify_data.js', v);
console.log('done');