const fs=require('fs');
const file="build-guides.js";
let src=fs.readFileSync(file,"utf8");
const start=src.indexOf("const TEST_SHOP_BTN = {");
const ob=src.indexOf("{", start);
let d=0,end=-1;
for(let i=ob;i<src.length;i++){if(src[i]==="{")d++;else if(src[i]==="}"){d--;if(d===0){end=i;break;}}}
const obj=eval("("+src.slice(ob,end+1)+")");

// URLs found
obj[323].urls={...(obj[323].urls||{}), zzounds: "https://www.zzounds.com/item--AKAMPKMINI3"};
obj[365].urls={...(obj[365].urls||{}), zzounds: "https://www.zzounds.com/item--SEEVR2"};
obj[370].urls={...(obj[370].urls||{}), zzounds: "https://www.zzounds.com/item--ROLGOKEYS3"};

// Products not on gear4music -> move to oos, remove price
[234,317,343].forEach(id=>{
  if(obj[id]){
    if(obj[id].prices?.gear4music) delete obj[id].prices.gear4music;
    obj[id].oos=[...new Set([...(obj[id].oos||[]), "gear4music"])];
  }
});

// 260 Elgato Wave XLR Pro: no zzounds/andertons URL found -> remove prices, add oos
if(obj[260]){
  if(obj[260].prices?.zzounds) delete obj[260].prices.zzounds;
  if(obj[260].prices?.andertons) delete obj[260].prices.andertons;
  obj[260].oos=[...new Set([...(obj[260].oos||[]), "zzounds", "andertons"])];
}

// Serialize
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
console.log("DONE");
