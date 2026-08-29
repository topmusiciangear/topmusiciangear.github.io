const fs=require('fs');
const p=JSON.parse(fs.readFileSync("data/products.json","utf8"));
const src=fs.readFileSync("build-guides.js","utf8");
const ob=src.indexOf("{",src.indexOf("const TEST_SHOP_BTN"));
let d=0,e=-1;for(let i=ob;i<src.length;i++){if(src[i]==="{")d++;else if(src[i]==="}"){d--;if(d===0){e=i;break;}}}
const TS=eval("("+src.slice(ob,e+1)+")");

const stores=["amazon","zzounds","reverb","gear4music","andertons","musicstore"];
const missingByStore={};
for(const prod of p){
  for(const k of stores){
    const hasPrice=TS[prod.id]?.prices?TS[prod.id].prices[k]:false;
    const hasUrl=prod.stores?prod.stores[k]:false;
    const hasUrlTS=TS[prod.id]?.urls?TS[prod.id].urls[k]:false;
    if(hasPrice && !hasUrl && !hasUrlTS){
      missingByStore[k]=missingByStore[k]||[];
      missingByStore[k].push({id:prod.id, title:prod.title, price:TS[prod.id].prices[k]});
    }
  }
}
for(const k of stores){
  console.log(`${k}: ${missingByStore[k]?.length||0}`);
  if(missingByStore[k]){
    missingByStore[k].slice(0,5).forEach(x=>console.log(`  ${x.id} | ${x.title} | ${x.price}`));
  }
}
