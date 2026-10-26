const fs=require('fs');
const B='C:/Users/Daniel/projects/topmusiciangear/';
const p=JSON.parse(fs.readFileSync(B+'data/products.json','utf8'));
const bad=p.filter(pr=> (pr.desc||'').endsWith('…') || (pr.desc_es||'').endsWith('…'));
console.log('remaining ellipsis:', bad.length);
for(const pr of bad) console.log(pr.id, pr.title);