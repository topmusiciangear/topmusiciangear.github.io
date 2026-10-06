const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const pFile = DIR + 'data/products.json';
const P = JSON.parse(fs.readFileSync(pFile, 'utf8'));
const p = P.find(x => x.id === 573);
if (!p) throw new Error('573 not found');
p.stores.musicstore = 'https://www.musicstore.com/en_OE/EUR/Yamaha-YDP-146-BK/art-EPI0001380-000';
fs.writeFileSync(pFile, JSON.stringify(P, null, 2) + '\n');
console.log('573 stores.musicstore added');
const bFile = DIR + 'build-guides.js';
let s = fs.readFileSync(bFile, 'utf8');
const before = s;
s = s.replace(
  '573: { prices: { amazon: "$1,299.99", zzounds: "$1,299.99", andertons: "£935.00" }, urls: { gear4music: "https://www.gear4music.com/Keyboards-and-Pianos/Yamaha-YDP-146-Digital-Piano-Black/86R5" } },',
  '573: { prices: { amazon: "$1,299.99", zzounds: "$1,299.99", andertons: "£899.00", gear4music: "£899.00", musicstore: "€1,049.00" }, urls: { gear4music: "https://www.gear4music.com/Keyboards-and-Pianos/Yamaha-YDP-146-Digital-Piano-Black/86R5" } },'
);
if (s === before) throw new Error('573 replace failed');
fs.writeFileSync(bFile, s);
console.log('573 prices: andertons £899, g4m £899, ms €1,049');
