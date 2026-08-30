const fs=require("fs");
const g=JSON.parse(fs.readFileSync("data/guides.json","utf8"));
const guide=g.find(x=>x.id==="budget-usb-mics");
console.log("Title EN:", guide.title);
console.log("Title ES:", guide.title_es);
console.log("Category:", guide.category);
console.log("Products:", guide.products ? guide.products.join(", ") : "NONE");
console.log("Comparison rows:", JSON.stringify(guide.comparison ? guide.comparison.rows.map(r=>r.label).join(", ") : "NONE"));
