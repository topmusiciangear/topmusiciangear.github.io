const fs=require("fs");
const g=JSON.parse(fs.readFileSync("data/guides.json","utf8"));
const guide=g.find(x=>x.id==="budget-usb-mics");
guide.sections.forEach((s,i)=>{
  console.log(`Section ${i} products: ${JSON.stringify(s.products)}`);
});
