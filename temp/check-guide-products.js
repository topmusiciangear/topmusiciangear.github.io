const fs=require("fs");
const g=JSON.parse(fs.readFileSync("data/guides.json","utf8"));
const guide=g.find(x=>x.id==="budget-usb-mics");
console.log("Guide keys:", Object.keys(guide));
console.log("products:", guide.products);
console.log("Has products array:", Array.isArray(guide.products));
if(guide.products) {
  console.log("Products count:", guide.products.length);
  console.log("Products:", JSON.stringify(guide.products));
}
