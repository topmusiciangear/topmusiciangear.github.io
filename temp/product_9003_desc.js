const fs=require('fs');
const p=JSON.parse(fs.readFileSync('C:\\Users\\Daniel\\projects\\topmusiciangear\\data\\products.json','utf8'));
const prod=p.find(x=>x.id===9003);
console.log(prod.desc);
console.log(prod.desc_es);
