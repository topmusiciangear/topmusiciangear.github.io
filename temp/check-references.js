const fs=require("fs");
const g=JSON.parse(fs.readFileSync("data/guides.json","utf8"));
const guide=g.find(x=>x.id==="budget-usb-mics");

// Check all sections for AT2020USB-X or Profile Streaming Set references
guide.sections.forEach((s,i)=>{
  const hasAT=s.content.includes("AT2020USB")||s.content_es?.includes("AT2020USB");
  const hasProfile=s.content.includes("Profile Streaming")||s.content_es?.includes("Profile Streaming");
  if(hasAT||hasProfile) {
    console.log(`Section ${i}: AT=${hasAT}, Profile=${hasProfile}`);
    // Show relevant paragraph
    const paras=s.content.split("</p>");
    paras.forEach((p,j)=>{
      if(p.includes("AT2020USB")||p.includes("Profile Streaming")) {
        console.log(`  Para ${j}: ${p.substring(p.indexOf(">"),100)}`);
      }
    });
  }
});
