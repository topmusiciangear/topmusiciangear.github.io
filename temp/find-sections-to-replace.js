const fs=require("fs");
const g=JSON.parse(fs.readFileSync("data/guides.json","utf8"));
const guide=g.find(x=>x.id==="budget-usb-mics");

// Find sections to replace
guide.sections.forEach((s,i)=>{
  const title = (s.title||"").toLowerCase();
  const content = (s.content||"").substring(0,100).toLowerCase();
  if(content.includes("at2020usb") || content.includes("audio-technica")) {
    console.log(`Section ${i}: AT2020USB-X section`);
  }
  if(content.includes("sennheiser profile") || content.includes("profile streaming")) {
    console.log(`Section ${i}: Profile Streaming Set section`);
  }
});
