const fs=require('fs');
const file="data/guides.json";
const g=JSON.parse(fs.readFileSync(file,"utf8"));
const gs=g.find(x=>x.id==="budget-usb-mics");
const remove=[39,167];
for(const s of gs.sections){
  if(s.products){ s.products=s.products.filter(p=>{ const id=p?.product??p?.id??p; return !remove.includes(id); }); }
}
fs.writeFileSync(file, JSON.stringify(g,null,2));
console.log("DONE - removed 39,167 from budget-usb-mics sections");
