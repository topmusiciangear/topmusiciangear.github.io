const fs=require("fs");
const p=JSON.parse(fs.readFileSync("data/products.json","utf8"));
[269,266,347,348,349,350,362].forEach(id=>{
  const prod=p.find(x=>x.id===id);
  console.log(id, prod?prod.title:"NOT FOUND");
});
