const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';

// ---------- products.json (666) ----------
const pj = BASE + 'data/products.json';
const prods = JSON.parse(fs.readFileSync(pj, 'utf8'));
const p = prods.find(x => x.id === 666);
p.stores.musicstore = 'https://www.musicstore.com/en_OE/EUR/Rode-NT-USB-/art-REC0016237-000';
fs.writeFileSync(pj, JSON.stringify(prods, null, 2));
console.log('products.json 666 musicstore ->', p.stores.musicstore);

// ---------- build-guides.js TEST_SHOP_BTN (666) ----------
const bj = BASE + 'build-guides.js';
let s = fs.readFileSync(bj, 'utf8');
const needle = '\n  666: {';
const i = s.indexOf(needle);
if (i === -1) throw new Error('666 not found');
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
  666: {
    prices: {
      amazon: "$169.00",
      zzounds: "$169.00",
      andertons: "£141.00",
      gear4music: "£141.00",
      musicstore: "€209.00"
    },
    urls: {
      gear4music: "https://www.gear4music.com/Recording-and-Computers/Rode-NT-USBplus/58QD",
      musicstore: "https://www.musicstore.com/en_OE/EUR/Rode-NT-USB-/art-REC0016237-000"
    }
  },`;

s = s.substring(0, i) + newBlock + s.substring(end);
fs.writeFileSync(bj, s);
new (require('vm').Script)(s, { filename: 'build-guides.js' });
console.log('\nSYNTAX OK\n' + newBlock);