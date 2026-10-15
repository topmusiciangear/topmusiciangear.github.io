const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const P = JSON.parse(fs.readFileSync(BASE + 'data/products.json', 'utf8'));
const arr = Array.isArray(P) ? P : P.products;
const byId = {}; arr.forEach(p => byId[p.id] = p);
[200, 315, 102, 474, 385, 239, 248, 510, 509, 578, 344, 267, 349, 613, 596, 598].forEach(id => {
  const p = byId[id];
  console.log('id ' + String(id).padEnd(5) + (p ? '$' + String(p.price).padEnd(8) + ' | ' + p.title : '*** NO EXISTE ***'));
});
console.log('\n--- todos los productos con "FS800" o "FG800" ---');
arr.filter(p => /FS800|FG800/i.test(p.title)).forEach(p => console.log('  id ' + p.id + '  $' + p.price + '  ' + p.title));
console.log('\n--- todos los RODECaster ---');
arr.filter(p => /RODECaster/i.test(p.title)).forEach(p => console.log('  id ' + p.id + '  $' + p.price + '  ' + p.title));
console.log('\n--- todos los SOLIDCOM ---');
arr.filter(p => /SOLIDCOM/i.test(p.title)).forEach(p => console.log('  id ' + p.id + '  $' + p.price + '  ' + p.title));
console.log('\n--- REFERENCE / MIXVAULT ---');
arr.filter(p => /Mastering The Mix/i.test(p.title)).forEach(p => console.log('  id ' + p.id + '  $' + p.price + '  ' + p.title));
console.log('\n--- Sennheiser IEM G4 ---');
arr.filter(p => /IEM G4/i.test(p.title)).forEach(p => console.log('  id ' + p.id + '  $' + p.price + '  ' + p.title));