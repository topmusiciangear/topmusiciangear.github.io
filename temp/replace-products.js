const fs=require("fs");
const g=JSON.parse(fs.readFileSync("data/guides.json","utf8"));
const guide=g.find(x=>x.id==="budget-usb-mics");

// Replace 291 (AT2020USB-X) with 300 (Blue Yeti Nano) in all section products
guide.sections.forEach((s,i)=>{
  if(s.products) {
    const before = JSON.stringify(s.products);
    s.products = s.products.map(id => id === 291 ? 300 : id === 299 ? 301 : id);
    const after = JSON.stringify(s.products);
    if(before !== after) console.log(`Section ${i}: ${before} -> ${after}`);
  }
});

// Update featuredProducts
guide.featuredProducts = guide.featuredProducts.map(id => id === 291 ? 300 : id === 299 ? 301 : id);
console.log("\nfeaturedProducts:", JSON.stringify(guide.featuredProducts));

fs.writeFileSync("data/guides.json", JSON.stringify(g, null, 2), "utf8");
console.log("\nguides.json updated");
