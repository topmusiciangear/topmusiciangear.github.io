const fs=require("fs");
const p=JSON.parse(fs.readFileSync("data/products.json","utf8"));
const src=fs.readFileSync("build-guides.js","utf8");
const ob=src.indexOf("{",src.indexOf("const TEST_SHOP_BTN"));
let d=0,e=-1;for(let i=ob;i<src.length;i++){if(src[i]==="{")d++;else if(src[i]==="}"){d--;if(d===0){e=i;break;}}}
const TS=eval("("+src.slice(ob,e+1)+")");

[269,266,347,348,349,350,362].forEach(id=>{
  const prod=p.find(x=>x.id===id);
  const ts=TS[id];
  console.log(`\n=== ${id} ===`);
  console.log("Title:", prod?.title);
  console.log("Img:", prod?.img);
  console.log("Stores:", Object.keys(prod?.stores||{}));
  console.log("TS prices:", ts?.prices);
  console.log("TS urls:", ts?.urls);
});
