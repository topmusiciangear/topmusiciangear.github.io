const fs=require("fs");
const p=JSON.parse(fs.readFileSync("data/products.json","utf8"));
const prod=p.find(x=>x.id===292);
console.log("Current price:", prod.price);
console.log("Title:", prod.title);
// The Amazon price is $103, which is the canonical price
prod.price = 103;
fs.writeFileSync("data/products.json", JSON.stringify(p, null, 2), "utf8");
console.log("Updated price to $103");
