const fs=require('fs');
const B='C:/Users/Daniel/projects/topmusiciangear/';
const p=JSON.parse(fs.readFileSync(B+'data/products.json','utf8'));
const long=p.filter(pr=>(pr.desc||'').length>230 || (pr.desc_es||'').length>230);
console.log('products with desc >230 chars:', long.length);
for(const pr of long) console.log(pr.id, (pr.desc||'').length, (pr.desc_es||'').length, pr.title);