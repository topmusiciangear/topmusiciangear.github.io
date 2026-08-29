const fs=require('fs');
const file="build-guides.js";
let src=fs.readFileSync(file,"utf8");
const start=src.indexOf("const TEST_SHOP_BTN = {");
const ob=src.indexOf("{", start);
let d=0,end=-1;
for(let i=ob;i<src.length;i++){if(src[i]==="{")d++;else if(src[i]==="}"){d--;if(d===0){end=i;break;}}}
const obj=eval("("+src.slice(ob,end+1)+")");

const msEUR={
  401: "€849.00",
  410: "€849.00",
  412: "€1,998.00",
};

for(const [idStr, price] of Object.entries(msEUR)){
  const id=+idStr;
  if(obj[id]){ obj[id].prices={...(obj[id].prices||{}), musicstore: price}; }
  else{ console.log("MISSING entry for",id); }
}

const lines=Object.keys(obj).sort((a,b)=>+a-+b).map(id=>{
  const e=obj[id];
  const parts=[];
  if(e.prices && Object.keys(e.prices).length) parts.push("prices:"+JSON.stringify(e.prices).replace(/"([^"]+)":/g,"$1:"));
  if(e.urls && Object.keys(e.urls).length) parts.push("urls:"+JSON.stringify(e.urls).replace(/"([^"]+)":/g,"$1:"));
  if(e.oos && e.oos.length) parts.push("oos:"+JSON.stringify(e.oos));
  if(e.na && e.na.length) parts.push("na:"+JSON.stringify(e.na));
  return id+": {"+parts.join(",")+"}";
});
const newBlock="const TEST_SHOP_BTN = {\n  "+lines.join(",\n  ")+"\n};";
src=src.slice(0,start)+newBlock+src.slice(end+1);
fs.writeFileSync(file, src);
console.log("DONE - musicstore EUR prices updated");
