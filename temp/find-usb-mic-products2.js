const fs=require("fs");
const p=JSON.parse(fs.readFileSync("data/products.json","utf8"));
const searches=["Q2U","PD200X","SoloCast","K688","AM8","Seiren","A6V","NT-USB","XCM-50","TC-777","PM461"];
searches.forEach(s=>{
  const m=p.filter(x=>JSON.stringify(x).toLowerCase().includes(s.toLowerCase()));
  m.forEach(x=>console.log(`${s}: id=${x.id} | ${x.name} | price=$${x.price}`));
  if(m.length===0) console.log(`${s}: NOT FOUND`);
});
