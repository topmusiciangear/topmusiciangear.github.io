const fs=require('fs');
const B='C:/Users/Daniel/projects/topmusiciangear/';
const p=JSON.parse(fs.readFileSync(B+'data/products.json','utf8'));
const bad=p.filter(pr=> (pr.desc||'').endsWith('…') || (pr.desc_es||'').endsWith('…'));
console.log('products with ellipsis after trim:', bad.length);
for(const pr of bad.slice(0,20)) console.log(pr.id, pr.title, '| EN:', (pr.desc||'').slice(-30), '| ES:', (pr.desc_es||'').slice(-30));