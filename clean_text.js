const fs=require('fs');
let data=fs.readFileSync('data/guides.json','utf8');
const products=JSON.parse(fs.readFileSync('data/products.json','utf8'));
const removeIds=[136,200,61,472,7];
const titles=removeIds.map(id=>{
  const p=products.find(x=>x.id===id);
  return p? [p.title, p.title_es||p.title] : [];
}).flat().filter(Boolean);

for(const t of titles){
  const esc=t.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
  const re=new RegExp(esc,'gi');
  data=data.replace(re,'');
}
fs.writeFileSync('data/guides.json', data);
console.log('replaced');
