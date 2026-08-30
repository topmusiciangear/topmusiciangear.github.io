const fs=require("fs");
const g=JSON.parse(fs.readFileSync("data/guides.json","utf8"));
const guide=g.find(x=>x.id==="budget-mics");

const allIds=[...new Set(guide.sections.flatMap(s=>s.products||[]))];
console.log("All unique product IDs from sections:", JSON.stringify(allIds));
console.log("Count:", allIds.length);

// Check what each ID maps to
const p=JSON.parse(fs.readFileSync("data/products.json","utf8"));
allIds.forEach(id=>{
  const prod=p.find(x=>x.id===id);
  const isXLR=prod&&(prod.title.toLowerCase().includes("xlr")||prod.desc?.toLowerCase().includes("xlr")||(!prod.title.toLowerCase().includes("usb only")));
  console.log(`  ${id}: ${prod?prod.title:'NOT FOUND'} ($${prod?prod.price:'?'})`);
});
