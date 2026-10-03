const fs = require('fs');
const P = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const p = P.find(x => x.id === 552);
p.stores.gear4music = 'https://www.awin1.com/cread.php?awinmid=1117&awinaffid=2891111&ued=https%3A%2F%2Fwww.gear4music.com%2FGuitar-and-Bass%2FBoss-Katana-110-Bass-Amplifier-Combo%2F4PYN';
p.stores.zzounds = 'https://www.zzounds.com/item--BOSKTN110B?siid=314937';
p.stores.musicstore = 'https://www.awin1.com/cread.php?awinmid=63816&awinaffid=2891111&ued=https%3A%2F%2Fwww.musicstore.com%2Fen_OE%2FEUR%2FBoss-Katana-110-Bass%2Fart-BAS0012110-000';
fs.writeFileSync('data/products.json', JSON.stringify(P, null, 2));
let t = fs.readFileSync('build-guides.js', 'utf8');
const start = t.indexOf('  552: {');
let d = 0, q = null, i = start;
for (; i < t.length; i++) {
  const c = t[i];
  if (q) { if (c === '\\') i++; else if (c === q) q = null; continue; }
  if (c === '"' || c === "'" || c === '`') { q = c; continue; }
  if (c === '{') d++;
  else if (c === '}') { d--; if (d === 0) break; }
}
const nu = `  552: {
    prices: {
      zzounds: "$450.00",
      andertons: "£379.00",
      gear4music: "£347.00",
      musicstore: "€399.00"
    }
  },`;
t = t.slice(0, start) + nu + t.slice(i + 2);
fs.writeFileSync('build-guides.js', t);
console.log('done');