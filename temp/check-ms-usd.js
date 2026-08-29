const fs=require('fs');
const src=fs.readFileSync("build-guides.js","utf8");
const ob=src.indexOf("{",src.indexOf("const TEST_SHOP_BTN"));
let d=0,e=-1;for(let i=ob;i<src.length;i++){if(src[i]==="{")d++;else if(src[i]==="}"){d--;if(d===0){e=i;break;}}}
const obj=eval("("+src.slice(ob,e+1)+")");
[401,410,412,413].forEach(id=>{const c=obj[id];console.log(id, c?.prices?.musicstore);});
