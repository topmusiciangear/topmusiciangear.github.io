const fs=require("fs");
const g=JSON.parse(fs.readFileSync("data/guides.json","utf8"));
const guide=g.find(x=>x.id==="budget-usb-mics");
guide.sections.forEach((s,i)=>{
  const content = (s.content||"").substring(0,150);
  console.log(`Section ${i}: ${content.replace(/<[^>]+>/g,"").substring(0,100)}`);
});
