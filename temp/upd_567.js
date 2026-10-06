const fs = require('fs');
const pFile = 'data/products.json';
const P = JSON.parse(fs.readFileSync(pFile, 'utf8'));
const p567 = P.find(x => x.id === 567);
p567.stores.musicstore = 'https://www.musicstore.com/en_OE/EUR/Yamaha-YDP-166-BK/art-EPI0001383-000';
fs.writeFileSync(pFile, JSON.stringify(P, null, 2) + '\n');
console.log('567 stores.musicstore added');
const bFile = 'build-guides.js';
let s = fs.readFileSync(bFile, 'utf8');
const before = s;
s = s.replace(
  '567: { prices: { amazon: "$1,749.99", zzounds: "$1,749.99", gear4music: "£1,175.00", andertons: "£1,175.00" }, na: ["musicstore"] },',
  '567: { prices: { amazon: "$1,749.99", zzounds: "$1,749.99", gear4music: "£1,175.00", andertons: "£1,175.00", musicstore: "€1,399.00" } },'
);
if (s === before) throw new Error('567 replace failed');
fs.writeFileSync(bFile, s);
console.log('567 TEST_SHOP_BTN: ms €1,399, na removed');
