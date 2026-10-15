const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const arr = JSON.parse(fs.readFileSync(BASE+'data/products.json','utf8'));
const list = Array.isArray(arr)?arr:arr.products;
const g = JSON.parse(fs.readFileSync(BASE+'data/guides.json','utf8'));
const s = g.find(x=>x.id==='starter-studio');

// NT1 Signature esta en la guia? buscarlo
console.log('=== NT1 Signature en catalogo ===');
const nt1s = list.filter(p=>/NT1 Signature/i.test(p.title));
nt1s.forEach(p=>console.log('  id '+p.id+': '+p.title+'  $'+p.price+'  ['+Object.keys(p.stores||{}).join(', ')+']'));

// Eris 3.5 / otros monitores compactos
console.log('\n=== monitores en catalogo ===');
list.filter(p=>p.category==='monitors'||/Eris|HS5|M5|Monitor/i.test(p.title)).slice(0,20).forEach(p=>console.log('  id '+p.id+': '+p.title+'  $'+p.price));

// what products.json schema looks like for a studio-furniture / accessory
console.log('\n=== ejemplo de esquema (id 170, G4M panels) ===');
const ej = list.find(x=>x.id===170);
console.log(JSON.stringify(ej,null,2).slice(0,900));