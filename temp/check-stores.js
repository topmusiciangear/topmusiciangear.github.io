const fs=require("fs");
const p=JSON.parse(fs.readFileSync("data/products.json","utf8"));
const yetinano=p.find(x=>x.id===429);
console.log("Blue Yeti Nano stores:", JSON.stringify(yetinano.stores));
const t669=p.find(x=>x.id===430);
console.log("FIFINE T669 stores:", JSON.stringify(t669.stores));
