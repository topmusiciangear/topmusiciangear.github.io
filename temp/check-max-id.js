const fs=require("fs");
const p=JSON.parse(fs.readFileSync("data/products.json","utf8"));
const maxId=Math.max(...p.map(x=>x.id));
console.log("Max ID:", maxId);
// Show last 5 products
p.slice(-5).forEach(x=>console.log(`ID ${x.id}: ${x.title}`));
