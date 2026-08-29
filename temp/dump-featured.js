const fs=require('fs');
const products=JSON.parse(fs.readFileSync('data/products.json','utf8'));
const byId=Object.fromEntries(products.map(p=>[p.id,p]));
const ids=[276,277,281,278,279,280,289,292,290,287,284];
for(const id of ids){ const p=byId[id]; console.log(`${id} | ${p.title} | cat ${p.category}`); }
