const fs=require('fs');
const src=fs.readFileSync("build-guides.js","utf8");
const ob=src.indexOf("{",src.indexOf("const TEST_SHOP_BTN"));
let d=0,e=-1;for(let i=ob;i<src.length;i++){if(src[i]==="{")d++;else if(src[i]==="}"){d--;if(d===0){e=i;break;}}}
const TS=eval("("+src.slice(ob,e+1)+")");

// Check current state of key products
[26,323,260,365,370,232,276,324,340,345,364,350].forEach(id=>{
  const c=TS[id];
  console.log(id, c?.prices);
});
