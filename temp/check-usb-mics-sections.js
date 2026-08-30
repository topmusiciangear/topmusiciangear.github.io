const fs=require("fs");
const g=JSON.parse(fs.readFileSync("data/guides.json","utf8"));
const guide=g.find(x=>x.id==="budget-usb-mics");
guide.sections.forEach((s,i)=>{
  console.log(`\n=== Section ${i}: ${s.title || "no title"} ===`);
  console.log(s.content ? s.content.substring(0, 300) : "NO CONTENT");
  if(s.content_es) console.log("\n[ES]", s.content_es.substring(0, 300));
});
