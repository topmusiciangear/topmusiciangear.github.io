const fs=require("fs");
const g=JSON.parse(fs.readFileSync("data/guides.json","utf8"));
const guide=g.find(x=>x.id==="budget-usb-mics");

guide.sections.forEach((s,i)=>{
  console.log(`Section ${i} "${s.title||'untitled'}": products=${JSON.stringify(s.products)}, pros=${s.pros?s.pros.length:0}, cons=${s.cons?s.cons.length:0}`);
});
