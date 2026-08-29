const fs=require('fs');
const g=JSON.parse(fs.readFileSync("data/guides.json","utf8"));
const gs=g.find(x=>x.id==="budget-monitors");
for(let i=0;i<gs.sections.length;i++){
  const s=gs.sections[i];
  if(s.products){
    const found=s.products.find(p=>(p?.product??p?.id??p)===300);
    if(found) console.log(`Section ${i}: ${s.title_es} -> ${JSON.stringify(found)}`);
  }
}
