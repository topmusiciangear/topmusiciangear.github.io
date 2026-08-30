const fs=require("fs");
const p=JSON.parse(fs.readFileSync("data/products.json","utf8"));
const v7=p.find(x=>x.title.includes("V7"));
if(v7) console.log("V7:", v7.id, v7.title, v7.brand);
else console.log("V7 not found - need to add");
