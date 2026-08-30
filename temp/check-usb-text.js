const fs=require("fs");
const g=JSON.parse(fs.readFileSync("data/guides.json","utf8"));
const guide=g.find(x=>x.id==="budget-usb-mics");

const allIds=[...new Set(guide.sections.flatMap(s=>s.products||[]))];
console.log("All product IDs:", JSON.stringify(allIds));
console.log("Count:", allIds.length);

// Check which have section content (title + description)
guide.sections.forEach((s,i)=>{
  if(s.title && s.title.length > 5) {
    const prodIds = s.products || [];
    const prodNames = prodIds.map(id => {
      const p = JSON.parse(fs.readFileSync("data/products.json","utf8")).find(x=>x.id===id);
      return p ? p.title.split(" ").slice(0,3).join(" ") : "?";
    });
    console.log(`Section ${i}: "${s.title.substring(0,60)}" -> products: ${prodNames.join(", ")}`);
  }
});
