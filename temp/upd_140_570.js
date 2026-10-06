const fs = require('fs');
// 1) products.json: MS store URL for 570
const pFile = 'data/products.json';
const P = JSON.parse(fs.readFileSync(pFile, 'utf8'));
const p570 = P.find(x => x.id === 570);
p570.stores.musicstore = 'https://www.musicstore.com/en_OE/EUR/Yamaha-Clavinova-CLP-835-B/art-EPI0001328-000';
fs.writeFileSync(pFile, JSON.stringify(P, null, 2) + '\n');
console.log('570 stores.musicstore added');
// 2) TEST_SHOP_BTN prices
const bFile = 'build-guides.js';
let s = fs.readFileSync(bFile, 'utf8');
const before = s;
s = s.replace(/andertons: "£496\.00",\r?\n      gear4music: "£495\.00",/, 'andertons: "£496.00",\r\n      gear4music: "£489.00",');
if (s === before) throw new Error('140 g4m replace failed');
const before2 = s;
s = s.replace(
  '570: { prices: { amazon: "$3,299.99", gear4music: "£1,469.00", andertons: "£1,513.00" }, na: ["zzounds", "musicstore"] },',
  '570: { prices: { amazon: "$3,299.99", gear4music: "£1,469.00", andertons: "£1,513.00", musicstore: "€1,799.00" }, na: ["zzounds"] },'
);
if (s === before2) throw new Error('570 replace failed');
fs.writeFileSync(bFile, s);
console.log('TEST_SHOP_BTN updated: 140 g4m £489, 570 ms €1,799');
