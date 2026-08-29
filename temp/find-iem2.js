const fs=require('fs');
const g=JSON.parse(fs.readFileSync("data/guides.json","utf8"));
// Search for IEM/wireless guides
g.filter(x=>x.id.includes("iem") || x.id.includes("wireless") || x.id.includes("in.ear") || x.id.includes("in-ear")).forEach(x=>console.log(`${x.id} | ${x.category} | ${x.title_es}`));
