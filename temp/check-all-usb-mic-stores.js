const fs=require("fs");
const p=JSON.parse(fs.readFileSync("data/products.json","utf8"));
const searches=["Q2U","PD200X","SoloCast","K688","AM8","Seiren","A6V","NT-USB","XCM-50","TC-777","PM461","AT2020USB","Profile Streaming"];
searches.forEach(s=>{
  const m=p.filter(x=>JSON.stringify(x).toLowerCase().includes(s.toLowerCase()));
  m.forEach(x=>{
    const stores = x.stores || {};
    const storeUrls = Object.entries(stores).map(([k,v])=>`${k}: ${v ? v.substring(0,80) : "NO URL"}`).join("\n    ");
    console.log(`\n${x.id}: ${s} | price=$${x.price}`);
    console.log(`  ${storeUrls}`);
  });
});
