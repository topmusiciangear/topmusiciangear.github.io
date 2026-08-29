const fs=require('fs');
const file="data/guides.json";
const g=JSON.parse(fs.readFileSync(file,"utf8"));
const gs=g.find(x=>x.id==="best-electric-under-500");
if(!gs){console.log("NOT FOUND");process.exit(1);}
// change title from $500 to $700
gs.title = gs.title.replace(/\$500/, "$700");
gs.title_es = gs.title_es.replace(/\$500/, "$700");
// also description if it mentions 500
if(gs.description) gs.description = gs.description.replace(/\$500|500\s*dollars?/i, "$700");
if(gs.description_es) gs.description_es = gs.description_es.replace(/\$500|500\s*d[oó]lares?/i, "$700");
fs.writeFileSync(file, JSON.stringify(g,null,2));
console.log("DONE");
console.log("title:", gs.title);
console.log("title_es:", gs.title_es);
