const fs=require('fs');
const p=JSON.parse(fs.readFileSync("data/products.json","utf8"));
const src=fs.readFileSync("build-guides.js","utf8");
const ob=src.indexOf("{",src.indexOf("const TEST_SHOP_BTN"));
let d=0,e=-1;for(let i=ob;i<src.length;i++){if(src[i]==="{")d++;else if(src[i]==="}"){d--;if(d===0){e=i;break;}}}
const TS=eval("("+src.slice(ob,e+1)+")");

const stores=["amazon","zzounds","reverb","gear4music","andertons","musicstore"];
let missing=0;
for(const prod of p){
  for(const k of stores){
    const hasPrice=TS[prod.id]?.prices?TS[prod.id].prices[k]:false;
    const hasUrl=prod.stores?prod.stores[k]:false;
    const hasUrlTS=TS[prod.id]?.urls?TS[prod.id].urls[k]:false;
    if(hasPrice && !hasUrl && !hasUrlTS) missing++;
  }
}
console.log("Prices without URL (excl. Reverb):", missing);
