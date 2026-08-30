const fs=require("fs");
const p=JSON.parse(fs.readFileSync("data/products.json","utf8"));
// Check for duplicate IDs
const ids=p.map(x=>x.id);
const dups=ids.filter((id,i)=>ids.indexOf(id)!==i);
if(dups.length) console.log("DUPLICATE IDs:", dups);
else console.log("No duplicate IDs");
