const fs=require("fs");
const g=JSON.parse(fs.readFileSync("data/guides.json","utf8"));
const guide=g.find(x=>x.id==="best-in-ear-monitors");
console.log(JSON.stringify(guide.sections,null,2));
