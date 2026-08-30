const fs=require("fs");
const g=JSON.parse(fs.readFileSync("data/guides.json","utf8"));
console.log("Total guides in JSON:", g.length);
const iem = g.filter(x=>x.category==="in_ear_monitors");
console.log("IEM guides:", iem.length);
iem.forEach(x=>console.log(`  ${x.id} | ${x.datePublished} | ${x.title}`));
