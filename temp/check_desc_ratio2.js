const fs=require('fs');
const B='C:/Users/Daniel/projects/topmusiciangear/';
const p=JSON.parse(fs.readFileSync(B+'data/products.json','utf8'));
const bad=[];
for(const pr of p){
  const en=(pr.desc||'').length;
  const es=(pr.desc_es||'').length;
  if(!pr.desc_es || es < en*0.8) bad.push({id:pr.id, title:pr.title, en, es, ratio: (es/en).toFixed(2)});
}
console.log('products with desc_es <80% of EN:', bad.length);
console.log(JSON.stringify(bad,null,2));