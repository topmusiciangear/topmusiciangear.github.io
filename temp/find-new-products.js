const fs=require("fs");
const p=JSON.parse(fs.readFileSync("data/products.json","utf8"));
const newP=p.filter(x=>x.title.includes("Yeti Nano")||x.title.includes("T669")||x.title.includes("Blue Yeti"));
newP.forEach(x=>console.log(`ID ${x.id}: ${x.title}`));
