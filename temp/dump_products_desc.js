const fs=require('fs');
const B='C:/Users/Daniel/projects/topmusiciangear/';
const p=JSON.parse(fs.readFileSync(B+'data/products.json','utf8'));
for(const pr of p){
  console.log('=== '+pr.id+' '+pr.title+' ===');
  console.log('EN:', pr.desc);
  console.log('ES:', pr.desc_es);
}