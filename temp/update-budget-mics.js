const fs=require("fs");
const g=JSON.parse(fs.readFileSync("data/guides.json","utf8"));
const guide=g.find(x=>x.id==="budget-mics");

const removeIds=[284,287,291,252,290,292,3,329];
const addIds=[431,432,433,434,435,436,437,438];

console.log("Before:", JSON.stringify(guide.featuredProducts));

// Remove from sections
guide.sections.forEach((s,i)=>{
  if(s.products) {
    const before=s.products.length;
    s.products=s.products.filter(id=>!removeIds.includes(id));
    // Add some new products to sections
    if(i===0) s.products.push(...addIds.slice(0,4)); // intro: add first 4
    if(i===1) s.products.push(addIds[4],addIds[5]); // dynamic vocals: add B906, PD100
    if(i===2) s.products.push(addIds[6]); // condenser: add K669D (budget dynamic)
    if(i===4) s.products.push(addIds[0]); // PodMic section: add V7
    if(i===5) s.products.push(addIds[1]); // SM58 section: add Wave DX
    if(i===6) s.products.push(addIds[2]); // AT2020 section: add Q9U
    if(i===7) s.products.push(addIds[3]); // NT1 section: add AKG P120
    if(i===8) s.products.push(addIds[7]); // AT2035 section: add Samson C01
    // Dedupe
    s.products=[...new Set(s.products)];
    const after=s.products.length;
    if(before!==after) console.log(`Section ${i}: ${before} -> ${after} products`);
  }
});

// Update featuredProducts
guide.featuredProducts=guide.featuredProducts.filter(id=>!removeIds.includes(id));
guide.featuredProducts.push(...addIds);
guide.featuredProducts=[...new Set(guide.featuredProducts)];
console.log("After featuredProducts:", JSON.stringify(guide.featuredProducts));
console.log("Count:", guide.featuredProducts.length);

fs.writeFileSync("data/guides.json", JSON.stringify(g, null, 2), "utf8");
console.log("guides.json updated");
