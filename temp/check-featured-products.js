const fs=require("fs");
const g=JSON.parse(fs.readFileSync("data/guides.json","utf8"));
const guide=g.find(x=>x.id==="budget-usb-mics");
console.log("featuredProducts:", JSON.stringify(guide.featuredProducts));
console.log("productTable:", JSON.stringify(guide.productTable));
