const fs=require("fs");
const g=JSON.parse(fs.readFileSync("data/guides.json","utf8"));
const guide=g.find(x=>x.id==="best-guitar-home-office");
if(guide){
  console.log("Found:", guide.id);
  console.log("Title:", guide.title_es);
  console.log("Sections:", guide.sections.length);
  guide.sections.forEach((s,i)=>{
    const c=s.content_es||s.content;
    if(c) console.log(`\n=== sec[${i}] ${s.title_es} ===`, c.substring(0,300));
  });
}else{
  console.log("NOT FOUND");
}
