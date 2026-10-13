const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';

// ---------- 1. products.json (id 670) ----------
const pj = BASE + 'data/products.json';
const prods = JSON.parse(fs.readFileSync(pj, 'utf8'));
const p = prods.find(x => x.id === 670);

// Official Gear4Music CDN image provided by the user (strip tracking query)
p.img = 'https://r2.gear4music.com/media/81/812219/1200/preview.jpg';

// Verified store URLs (user-supplied, live). Clean URLs — build wraps Awin/Impact.
p.stores.gear4music = 'https://www.gear4music.com/Recording-and-Computers/sE-Electronics-NEOM-USB-Condenser-Microphone/4OZA';
p.stores.andertons = 'https://www.andertons.co.uk/se-electronics-neom-usb-cardioid-condenser-microphone/?search_query=sE%20Electronics%20NEOM%20USB';
p.stores.musicstore = 'https://www.musicstore.com/en_OE/EUR/sE-electronics-NEOM/art-REC0015955-000';

fs.writeFileSync(pj, JSON.stringify(prods, null, 2));
console.log('products.json 670 ->', JSON.stringify(p.stores, null, 1));

// ---------- 2. build-guides.js TEST_SHOP_BTN (id 670) ----------
const bj = BASE + 'build-guides.js';
let s = fs.readFileSync(bj, 'utf8');
const needle = '\n  670: {';
const i = s.indexOf(needle);
if (i === -1) throw new Error('670 block not found');
const b = s.indexOf('{', i);
let depth = 0, k = b;
while (k < s.length) {
  if (s[k] === '{') depth++;
  else if (s[k] === '}') { depth--; if (depth === 0) break; }
  k++;
}
let end = k + 1;
if (s[end] === ',') end++;

const newBlock = `
  670: {
    prices: {
      amazon: "$169.00",
      zzounds: "$169.00",
      andertons: "£69.00",
      gear4music: "£69.00",
      musicstore: "€115.00"
    },
    urls: {
      gear4music: "https://www.gear4music.com/Recording-and-Computers/sE-Electronics-NEOM-USB-Condenser-Microphone/4OZA",
      andertons: "https://www.andertons.co.uk/se-electronics-neom-usb-cardioid-condenser-microphone/?search_query=sE%20Electronics%20NEOM%20USB",
      musicstore: "https://www.musicstore.com/en_OE/EUR/sE-electronics-NEOM/art-REC0015955-000"
    }
  },`;

s = s.substring(0, i) + newBlock + s.substring(end);
fs.writeFileSync(bj, s);
console.log('\nTEST_SHOP_BTN 670 ->');
console.log(newBlock);