const fs=require('fs');
const p=JSON.parse(fs.readFileSync("data/products.json","utf8"));
const src=fs.readFileSync("build-guides.js","utf8");
const ob=src.indexOf("{",src.indexOf("const TEST_SHOP_BTN"));
let d=0,e=-1;for(let i=ob;i<src.length;i++){if(src[i]==="{")d++;else if(src[i]==="}"){d--;if(d===0){e=i;break;}}}
const TS=eval("("+src.slice(ob,e+1)+")");

const stores=["amazon","zzounds","reverb","gear4music","andertons","musicstore"];
const missing={};
for(const prod of p){
  const cfg=TS[prod.id];
  if(!cfg) continue;
  for(const k of stores){
    const hasPrice=cfg.prices?cfg.prices[k]:false;
    const hasUrlTS=cfg.urls?cfg.urls[k]:false;
    const hasUrlProd=prod.stores?prod.stores[k]:false;
    if(hasPrice && !hasUrlProd && !hasUrlTS){
      missing[prod.id]=missing[prod.id]||{};
      missing[prod.id][k]=cfg.prices[k];
    }
  }
}
console.log("Products with price in TEST_SHOP_BTN but NO URL in products.json or TEST_SHOP_BTN.urls:");
for(const [id, st] of Object.entries(missing)){
  const prod=p.find(x=>x.id===+id);
  console.log(`${id} | ${prod?.title}`);
  for(const [k,price] of Object.entries(st)){
    console.log(`  ${k}: ${price} | NO URL`);
  }
}
