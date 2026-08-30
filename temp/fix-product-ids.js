const fs=require("fs");
const g=JSON.parse(fs.readFileSync("data/guides.json","utf8"));
const guide=g.find(x=>x.id==="budget-usb-mics");

// Replace 300->429, 301->430 in sections
guide.sections.forEach((s,i)=>{
  if(s.products) {
    const before=JSON.stringify(s.products);
    s.products=s.products.map(id=>id===300?429:id===301?430:id);
    const after=JSON.stringify(s.products);
    if(before!==after) console.log(`Section ${i}: ${before} -> ${after}`);
  }
});

// Update featuredProducts
const before=JSON.stringify(guide.featuredProducts);
guide.featuredProducts=guide.featuredProducts.map(id=>id===300?429:id===301?430:id);
console.log("featuredProducts:", before, "->", JSON.stringify(guide.featuredProducts));

fs.writeFileSync("data/guides.json", JSON.stringify(g, null, 2), "utf8");
console.log("guides.json updated");
