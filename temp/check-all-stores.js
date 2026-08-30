const fs=require("fs");
const p=JSON.parse(fs.readFileSync("data/products.json","utf8"));
const ids=[276,277,278,279,280,281,284,287,289,290,291,292,299];
ids.forEach(id=>{
  const prod=p.find(x=>x.id===id);
  if(!prod){console.log(`${id}: NOT FOUND`);return;}
  const stores=prod.stores||{};
  const storeKeys=Object.keys(stores);
  console.log(`\n=== ${id}: price=$${prod.price} ===`);
  console.log(`Stores: ${storeKeys.join(", ")}`);
  storeKeys.forEach(k=>{
    const url=stores[k];
    const isSearch=url.includes("search")||url.includes("?q=");
    console.log(`  ${k}: ${isSearch?"SEARCH URL":url.substring(0,90)}`);
  });
});
