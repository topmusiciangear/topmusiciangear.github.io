const fs=require("fs");
const g=JSON.parse(fs.readFileSync("data/guides.json","utf8"));
const xlrGuide=g.find(x=>x.id==="budget-mics");
if(xlrGuide) {
  console.log("Guide:", xlrGuide.title);
  console.log("Title ES:", xlrGuide.title_es);
  console.log("Category:", xlrGuide.category);
  console.log("Sections:", xlrGuide.sections.length);
  console.log("Products in sections:");
  const allIds=[...new Set(xlrGuide.sections.flatMap(s=>s.products||[]))];
  console.log("Product IDs:", JSON.stringify(allIds));
  console.log("Count:", allIds.length);
  
  // Check products.json for these IDs
  const p=JSON.parse(fs.readFileSync("data/products.json","utf8"));
  allIds.forEach(id=>{
    const prod=p.find(x=>x.id===id);
    if(prod) {
      const isXLR=prod.title.toLowerCase().includes("xlr")||prod.desc?.toLowerCase().includes("xlr")||(prod.stores&&Object.keys(prod.stores).length>0);
      console.log(`  ${id}: ${prod.title} (price: $${prod.price})`);
    }
  });
}
