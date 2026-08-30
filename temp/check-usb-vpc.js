const fs=require("fs");
const g=JSON.parse(fs.readFileSync("data/guides.json","utf8"));
const guide=g.find(x=>x.id==="budget-usb-mics");
console.log("verdictProsCons:", guide.verdictProsCons?guide.verdictProsCons.length:"undefined");
if(guide.verdictProsCons) {
  guide.verdictProsCons.forEach((v,i)=>{
    console.log(`  ${i}: ${v.name}`);
  });
}
