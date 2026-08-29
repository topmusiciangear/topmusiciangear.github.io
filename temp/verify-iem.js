const fs=require("fs");
const g=JSON.parse(fs.readFileSync("data/guides.json","utf8"));
const iem=g.filter(x=>x.category==="in_ear_monitors");
console.log("IEM guides:", iem.map(x=>`${x.id} | ${x.category} | ${x.title_es}`));
