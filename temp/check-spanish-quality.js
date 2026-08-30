const fs=require("fs");
const g=JSON.parse(fs.readFileSync("data/guides.json","utf8"));
const guide=g.find(x=>x.id==="budget-usb-mics");

guide.sections.forEach((s,i)=>{
  const es=s.content_es||"";
  // Check for common issues
  if(es.length < s.content.length * 0.3) console.log(`Section ${i}: ES too short (${es.length} vs ${s.content.length})`);
  if(es.includes("AT2020USB")) console.log(`Section ${i}: Still references AT2020USB`);
  if(es.includes("Profile Streaming")) console.log(`Section ${i}: Still references Profile Streaming`);
});
console.log("Spanish content length check:");
guide.sections.forEach((s,i)=>{
  const en=s.content.length;
  const es=(s.content_es||"").length;
  const ratio=es/en;
  console.log(`  Section ${i}: EN=${en} ES=${es} ratio=${ratio.toFixed(2)}`);
});
