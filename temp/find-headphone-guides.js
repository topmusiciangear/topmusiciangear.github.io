const fs=require('fs');
const g=JSON.parse(fs.readFileSync("data/guides.json","utf8"));
// Find headphones category guides
g.filter(x=>x.category==="headphones" || x.category==="auriculares" || x.id.includes("headphone") || x.id.includes("ear")).forEach(item=>console.log(`${item.id} | ${item.category} | ${item.title_es}`));
