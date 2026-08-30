const fs=require("fs");
const p=JSON.parse(fs.readFileSync("data/products.json","utf8"));
const names=["Q2U","PD200X","SoloCast 2","K688","AM8","Seiren V3 Mini","AmpliGame A6V","NT-USB Mini","XCM-50","TC-777","PM461"];
names.forEach(n=>{
  const match=p.filter(x=>(x.name||"").toLowerCase().includes(n.toLowerCase()));
  match.forEach(m=>{
    const stores = m.stores ? Object.entries(m.stores).map(([k,v])=>`${k}:${v?"ok":"missing"}`).join(", ") : "no stores";
    console.log(`${m.id}: ${m.name} | price=${m.price} | ${stores}`);
  });
});
