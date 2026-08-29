const fs=require('fs');
const file="build-guides.js";
let src=fs.readFileSync(file,"utf8");
// Helper to update/insert TEST_SHOP_BTN entry
function upsertEntry(id, patch){
  const pattern=new RegExp("("+id+":\\s*\\{)(?:[^}]*)\\}");
  const m=src.match(pattern);
  if(m){
    // entry exists, need to merge prices/urls
    // For simplicity, rebuild the entry from scratch with existing + patch
    // Find the full entry
    const start=src.indexOf(m[1]);
    let d=0,end=-1;
    for(let i=start;i<src.length;i++){
      if(src[i]==="{")d++;
      else if(src[i]==="}"){
        d--; if(d===0){end=i;break;}
      }
    }
    const oldEntry=src.slice(start,end+1);
    let obj;
    try{ obj=eval("("+oldEntry.replace(/^\d+:\s*/,"")+")"); }catch(e){ console.log("parse err",id); return; }
    // merge
    obj.prices={...obj.prices, ...(patch.prices||{})};
    if(patch.urls) obj.urls={...obj.urls, ...patch.urls};
    if(patch.oos) obj.oos=[...new Set([...(obj.oos||[]), ...patch.oos])];
    // serialize back
    const newEntry=id+": "+JSON.stringify(obj).replace(/"([^"]+)":/g,"$1:") +",";
    src=src.slice(0,start)+newEntry+src.slice(end+1);
  }else{
    // insert new entry - find place to insert (before next higher id)
    // For now skip; we know most entries exist
    console.log("NO ENTRY for",id);
  }
}
// Prices/URLs from research
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
  // 118 and 338: NOT on gear4music -> add to oos
  118: { oos: ["gear4music"] },
  338: { oos: ["gear4music"] },
};

for(const id of Object.keys(updates)){ upsertEntry(+id, updates[id]); }

fs.writeFileSync(file, src);
console.log("DONE - updated TEST_SHOP_BTN for gear4music products");
