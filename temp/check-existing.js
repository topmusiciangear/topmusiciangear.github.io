const fs=require("fs");
const p=JSON.parse(fs.readFileSync("data/products.json","utf8"));

// Check which products already exist
const searchTerms=["V7","Wave DX","ATR2100","Q9U","PD100","K669D","AM8","B 906","P120"];
searchTerms.forEach(term=>{
  const found=p.filter(x=>x.title.toLowerCase().includes(term.toLowerCase()));
  if(found.length) {
    found.forEach(f=>console.log(`EXISTS: ID ${f.id}: ${f.title} ($${f.price})`));
  } else {
    console.log(`NOT FOUND: ${term}`);
  }
});
