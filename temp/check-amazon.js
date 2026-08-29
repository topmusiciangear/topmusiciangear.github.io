const fs=require('fs');
const p=JSON.parse(fs.readFileSync("data/products.json","utf8"));
const src=fs.readFileSync("build-guides.js","utf8");
const ob=src.indexOf("{",src.indexOf("const TEST_SHOP_BTN"));
let d=0,e=-1;for(let i=ob;i<src.length;i++){if(src[i]==="{")d++;else if(src[i]==="}"){d--;if(d===0){e=i;break;}}}
const TS=eval("("+src.slice(ob,e+1)+")");

let count=0, withUrl=0, withPrice=0;
for(const prod of p){
  if(prod.stores?.amazon){ withUrl++; count++; }
  if(TS[prod.id]?.prices?.amazon){ withPrice++; }
}
console.log("Products with amazon URL in products.json:", withUrl);
console.log("Products with amazon PRICE in TEST_SHOP_BTN:", withPrice);

// Find products with amazon price but no URL
for(const prod of p){
  const hasPrice=TS[prod.id]?.prices?.amazon;
  const hasUrl=prod.stores?.amazon || TS[prod.id]?.urls?.amazon;
  if(hasPrice && !hasUrl){
    console.log(`${prod.id} | ${prod.title} | PRICE: ${hasPrice} | NO URL`);
  }
}
