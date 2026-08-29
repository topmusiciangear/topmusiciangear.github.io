const fs=require('fs');
const p=JSON.parse(fs.readFileSync("data/products.json","utf8"));
const models=["SE846","SE215","MP-220","IE 100","ATH-E70","DT 70","Mach 60","ProPhile","ER4SR","ATH-E40","AS16","IE 900"];
for(const m of models){
  const found=p.filter(x=>x.title.toLowerCase().includes(m.toLowerCase()) || x.title_es.toLowerCase().includes(m.toLowerCase()));
  console.log(`\n=== ${m} ===`);
  found.forEach(f=>console.log(`  ${f.id} | ${f.title} | ${f.title_es} | cat: ${f.category} | stores: ${Object.keys(f.stores||{}).join(",")}`));
}
