const fs=require("fs");
const g=JSON.parse(fs.readFileSync("data/guides.json","utf8"));
const guide=g.find(x=>x.id==="budget-usb-mics");
console.log("Title:", guide.title);
console.log("Title ES:", guide.title_es);
console.log("Featured:", JSON.stringify(guide.featuredProducts));
console.log("Featured count:", guide.featuredProducts.length);

const allIds=[...new Set(guide.sections.flatMap(s=>s.products||[]))];
console.log("Section products:", JSON.stringify(allIds));
console.log("Section count:", allIds.length);

const p=JSON.parse(fs.readFileSync("data/products.json","utf8"));
allIds.forEach(id=>{
  const prod=p.find(x=>x.id===id);
  console.log(`  ${id}: ${prod?prod.title:'NOT FOUND'}`);
});
