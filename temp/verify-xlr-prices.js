const fs=require("fs");
const build=fs.readFileSync("build-guides.js","utf8");
const p=JSON.parse(fs.readFileSync("data/products.json","utf8"));

const xlrIds=[5,330,276,278,50,197,277,297,196,298];
xlrIds.forEach(id=>{
  const prod=p.find(x=>x.id===id);
  // Find TEST_SHOP_BTN entry
  const regex=new RegExp(id+":\\s*\\{prices:\\{([^}]+)\\}");
  const match=build.match(regex);
  const prices=match?match[1]:"NOT FOUND";
  console.log(`${id}: ${prod.title}`);
  console.log(`  json price: $${prod.price}`);
  console.log(`  TEST_SHOP_BTN: ${prices.substring(0,100)}`);
  console.log();
});
