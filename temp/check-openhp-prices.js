const fs=require('fs');
const src=fs.readFileSync("build-guides.js","utf8");
const ob=src.indexOf("{",src.indexOf("const TEST_SHOP_BTN"));
let d=0,e=-1;for(let i=ob;i<src.length;i++){if(src[i]==="{")d++;else if(src[i]==="}"){d--;if(d===0){e=i;break;}}}
const obj=eval("("+src.slice(ob,e+1)+")");
const ids=[24,422,423,424,56,178,425,426];
for(const id of ids){
  const c=obj[id];
  if(c && c.prices && Object.keys(c.prices).length){
    console.log(`${id}: ${JSON.stringify(c.prices)}`);
  }else{
    console.log(`${id}: NO ENTRY or empty prices`);
  }
}
