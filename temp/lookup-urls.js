const fs=require('fs');
const products=JSON.parse(fs.readFileSync('data/products.json','utf8'));
const byId=Object.fromEntries(products.map(p=>[p.id,p]));
for(const id of [406,408,384]){
  const p=byId[id]; if(!p){ console.log(id,'NOT FOUND'); continue; }
  console.log('==='+id+' | '+p.title+' | '+p.category+'===');
  for(const [k,v] of Object.entries(p.stores||{})) console.log('  '+k+': '+v);
  console.log('  oos:', (p.oos||[]).join(','));
}
