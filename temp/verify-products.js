const fs=require("fs");
const g=JSON.parse(fs.readFileSync("data/guides.json","utf8"));
const guide=g.find(x=>x.id==="budget-usb-mics");
const allIds=[...new Set(guide.sections.flatMap(s=>s.products))];
console.log("Unique product IDs:", JSON.stringify(allIds));
console.log("Count:", allIds.length);

// Check what each ID maps to
const p=JSON.parse(fs.readFileSync("data/products.json","utf8"));
allIds.forEach(id=>{
  const prod=p.find(x=>x.id===id);
  console.log(`  ${id}: ${prod ? prod.title : 'NOT FOUND'}`);
});
