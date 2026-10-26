const fs=require('fs');
const B='C:/Users/Daniel/projects/topmusiciangear/';
const p=JSON.parse(fs.readFileSync(B+'data/products.json','utf8'));
const pr=p.find(x=>x.id===14);
console.log(JSON.stringify(pr.desc.slice(-10)));
console.log(pr.desc.length);