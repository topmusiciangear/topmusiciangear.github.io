const fs = require('fs');
// 1. Catalog images
const P = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
P.find(x => x.id === 550).img = 'https://r2.gear4music.com/media/72/725077/1200/preview.jpg';
P.find(x => x.id === 551).img = 'https://r2.gear4music.com/media/71/710789/1200/preview.jpg';
fs.writeFileSync('data/products.json', JSON.stringify(P, null, 2));

// 2. TEST_SHOP_BTN prices (string surgery to preserve file format)
let t = fs.readFileSync('build-guides.js', 'utf8');
const old550 = t.slice(t.indexOf('  550: {'), t.indexOf('  551: {'));
const new550 = `  550: {
    prices: {
      gear4music: "£142.00",
      andertons: "£179.00",
      musicstore: "€179.00",
      amazon: "$229.00"
    },
    urls: {
      amazon: "https://www.amazon.com/dp/B01ET9GCGS?tag=topmusicg-20",
      zzounds: "https://www.zzounds.com/prodsearch?q=Behringer+U-Phoria+UMC1820&key=q&form=search"
    }
  },
`;
t = t.split(old550).join(new550);
const start551 = t.indexOf('  551: {');
let d = 0, q = null, i = start551;
for (; i < t.length; i++) {
  const c = t[i];
  if (q) { if (c === '\\') i++; else if (c === q) q = null; continue; }
  if (c === '"' || c === "'" || c === '`') { q = c; continue; }
  if (c === '{') d++;
  else if (c === '}') { d--; if (d === 0) break; }
}
const new551 = `  551: {
    prices: {
      zzounds: "$199.00",
      amazon: "$199.00",
      gear4music: "£115.00",
      andertons: "£114.00",
      musicstore: "€139.00"
    },
    urls: {
      amazon: "https://www.amazon.com/dp/B09HL4GZF9?tag=topmusicg-20",
      musicstore: "https://www.awin1.com/cread.php?awinmid=63816&awinaffid=2891111&ued=https%3A%2F%2Fwww.musicstore.com%2Fen_OE%2FEUR%2FArturia-MiniFuse-2-Black%2Fart-PCM0017077-000"
    }
  },`;
t = t.slice(0, start551) + new551 + t.slice(i + 2);
fs.writeFileSync('build-guides.js', t);
console.log('done');