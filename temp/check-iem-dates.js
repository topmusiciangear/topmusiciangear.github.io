const fs=require("fs");
const g=JSON.parse(fs.readFileSync("data/guides.json","utf8"));
const iem=g.filter(x=>x.category==="in_ear_monitors");
iem.forEach(x=>console.log(`${x.id} | datePublished: "${x.datePublished}" | category: ${x.category} | title: ${x.title}`));
