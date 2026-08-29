const fs=require('fs');
const file="data/guides.json";
let g=JSON.parse(fs.readFileSync(file,"utf8"));

// Check if IEM hub guide already exists
const existing=g.find(x=>x.id==="best-iem" || x.id==="best-in-ear-monitors" || x.id==="in-ear-monitors");
if(existing){
  console.log("EXISTS:", existing.id);
}else{
  console.log("NOT EXISTS - will create");
}

// Get the max order for the new category
const iemGuides=g.filter(x=>x.category==="in_ear_monitors");
console.log("IEM guides:", iemGuides.map(x=>x.id));
