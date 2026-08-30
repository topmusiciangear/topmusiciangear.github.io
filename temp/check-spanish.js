const fs=require("fs");
const g=JSON.parse(fs.readFileSync("data/guides.json","utf8"));
const guide=g.find(x=>x.id==="budget-usb-mics");

// Show first 2 sections with content
guide.sections.slice(0,3).forEach((s,i)=>{
  console.log(`=== Section ${i} ===`);
  console.log("EN:", s.content.substring(0,200));
  console.log("ES:", s.content_es ? s.content_es.substring(0,200) : "MISSING");
  console.log();
});
