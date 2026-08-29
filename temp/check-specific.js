const fs=require('fs');
const g=JSON.parse(fs.readFileSync("data/guides.json","utf8"));
const ids=["budget-usb-mics","budget-mics","open-headphones","best-electric-under-500","budget-monitors"];
for(const id of ids){
  const guide=g.find(x=>x.id===id);
  if(!guide){console.log(id, "NOT FOUND"); continue;}
  console.log("\n=== "+id+" ===");
  console.log("title_es:", guide.title_es);
  console.log("intro_es:", guide.intro_es?.substring(0,200));
  console.log("conclusion_es:", guide.conclusion_es?.substring(0,200));
  if(guide.sections){
    guide.sections.forEach((s,i)=>{ const c=s.content_es||s.content; if(c) console.log("  sec["+i+"]:", c.substring(0,200)); });
  }
}
