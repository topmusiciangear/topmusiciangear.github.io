const fs=require('fs');
const p=JSON.parse(fs.readFileSync("data/products.json","utf8"));
[317,234,343,364,365,370].forEach(id=>{
  const prod=p.find(x=>x.id===id);
  console.log(id, prod?.title, "| stores:", Object.keys(prod?.stores||{}));
});
const src=fs.readFileSync("build-guides.js","utf8");
const ob=src.indexOf("{",src.indexOf("const TEST_SHOP_BTN"));
let d=0,e=-1;for(let i=ob;i<src.length;i++){if(src[i]==="{")d++;else if(src[i]==="}"){d--;if(d===0){e=i;break;}}}
const TS=eval("("+src.slice(ob,e+1)+")");
[317,234,343,364,365,370].forEach(id=>{
  const c=TS[id];
  console.log(id, "prices:", c?.prices?.gear4music, "| urls:", c?.urls?.gear4music);
});
