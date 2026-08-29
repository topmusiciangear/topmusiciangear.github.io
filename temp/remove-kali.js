const fs=require('fs');
const file="data/guides.json";
const g=JSON.parse(fs.readFileSync(file,"utf8"));
const gs=g.find(x=>x.id==="budget-monitors");
for(const s of gs.sections){
  if(s.products){
    s.products=s.products.filter(p=>{ const id=p?.product??p?.id??p; return id!==300; });
  }
}
fs.writeFileSync(file, JSON.stringify(g,null,2));
console.log("DONE - removed Kali WS-6.2 (300) from budget-monitors");
