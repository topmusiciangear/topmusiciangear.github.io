const fs=require('fs');
const file="build-guides.js";
let src=fs.readFileSync(file,"utf8");
const start=src.indexOf("const TEST_SHOP_BTN = {");
const ob=src.indexOf("{", start);
let d=0,end=-1;
for(let i=ob;i<src.length;i++){if(src[i]==="{")d++;else if(src[i]==="}"){d--;if(d===0){end=i;break;}}}
const obj=eval("("+src.slice(ob,end+1)+")");

const updates={
  364: { urls: { gear4music: "https://www.gear4music.com/Recording-and-Computers/beyerdynamic-M160-Double-Ribbon-Microphone/92T" } },
  365: { urls: { gear4music: "https://www.gear4music.com/Recording-and-Computers/sE-Electronics-VR2-Voodoo-Active-Ribbon-Mic/DRQ" } },
  370: { urls: { gear4music: "https://www.gear4music.com/Keyboards-and-Pianos/Roland-GOKEYS-3-Music-Creation-Keyboard-Midnight-Blue/6AB8" } },
  317: { oos: ["gear4music"] },
  234: { oos: ["gear4music"] },
  343: { oos: ["gear4music"] },
};

for(const [idStr, patch] of Object.entries(updates)){
  const id=+idStr;
  if(obj[id]){ if(patch.urls) obj[id].urls={...(obj[id].urls||{}), ...patch.urls}; if(patch.oos) obj[id].oos=[...new Set([...(obj[id].oos||[]), ...patch.oos])]; }
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
console.log("DONE");
