const fs=require('fs');
const file="build-guides.js";
let src=fs.readFileSync(file,"utf8");
const start=src.indexOf("const TEST_SHOP_BTN = {");
const ob=src.indexOf("{", start);
let d=0,end=-1;
for(let i=ob;i<src.length;i++){ if(src[i]==="{")d++; else if(src[i]==="}"){ d--; if(d===0){end=i;break;} } }
const obj=eval("("+src.slice(ob,end+1)+")");

const updates={
  156: { prices: { gear4music: "£1849.00" } },
  92: { urls: { gear4music: "https://www.gear4music.com/PA-DJ-and-Lighting/Sennheiser-EW-100-G4-Wireless-Microphone-System-with-935-S-E-Band/2BBJ" } },
  195: { urls: { gear4music: "https://www.gear4music.com/Recording-and-Computers/Elgato-WAVE3-Microphone/43BD" } },
  209: { urls: { gear4music: "https://www.gear4music.com/Recording-and-Computers/Austrian-Audio-OC818-Studio-Set-Black/4PIK" } },
  319: { urls: { gear4music: "https://www.gear4music.com/Guitar-and-Bass/ESP-E-II-Eclipse-Tobacco-Sunburst/273H" } },
  335: { urls: { gear4music: "https://www.gear4music.com/PA-DJ-and-Lighting/Korg-Soundlink-MW1608-Hybrid-Mixer/38AJ" } },
  336: { urls: { gear4music: "https://www.gear4music.com/PA-DJ-and-Lighting/Mackie-Mobile-Mix-8-Channel-USB-Mixer/651Y" } },
  170: { urls: { gear4music: "https://www.gear4music.com/Recording-and-Computers/G4M-Acoustics-Squarewave-4-Pack/5KYU" } },
  291: { urls: { gear4music: "https://www.gear4music.com/Recording-and-Computers/Audio-Technica-AT2020USBX-Cardioid-Condenser-Microphone/528M" } },
  118: { oos: ["gear4music"] },
  338: { oos: ["gear4music"] },
};

for(const [idStr, patch] of Object.entries(updates)){
  const id=+idStr;
  if(!obj[id]) obj[id]={};
  if(patch.prices) obj[id].prices={...(obj[id].prices||{}), ...patch.prices};
  if(patch.urls) obj[id].urls={...(obj[id].urls||{}), ...patch.urls};
  if(patch.oos) obj[id].oos=[...new Set([...(obj[id].oos||[]), ...patch.oos])];
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
