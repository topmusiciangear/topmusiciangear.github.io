const fs=require('fs');
const products=JSON.parse(fs.readFileSync('data/products.json','utf8'));
const byId=Object.fromEntries(products.map(p=>[p.id,p]));
const ids=[92,118,156,195,209,319,335,336,338,170,291];
for(const id of ids){ const p=byId[id]; console.log(`${id} | ${p.title} | cat ${p.category}`); }
