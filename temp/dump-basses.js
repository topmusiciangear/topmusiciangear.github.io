const fs=require('fs');
const g=JSON.parse(fs.readFileSync("data/guides.json","utf8"));
const gs=g.find(x=>x.id==="best-electric-under-500");
console.log("title:", gs.title);
console.log("title_es:", gs.title_es);
console.log("featuredProducts:", gs.featuredProducts);
console.log("sections count:", gs.sections.length);
const prods=new Set();
(gs.featuredProducts||[]).forEach(id=>prods.add(id));
gs.sections.forEach(s=>(s.products||[]).forEach(p=>prods.add(p?.product??p?.id??p)));
console.log("unique products:", prods.size);
for(const id of [...prods].sort((a,b)=>a-b)){
  const p=JSON.parse(fs.readFileSync("data/products.json","utf8")).find(x=>x.id===id);
  if(p) console.log(`  ${id} | ${p.title}`);
}
