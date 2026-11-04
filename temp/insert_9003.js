const fs=require('fs');
const path='C:\\Users\\Daniel\\projects\\topmusiciangear\\build-guides.js';
let txt=fs.readFileSync(path,'utf8');
const marker='  };function hollyDefaultRegion()';
const idx=txt.indexOf(marker);
if(idx===-1){ console.log('marker not found'); process.exit(1); }
const insert=`  9003: { prices: {}, urls: { gear4music: "https://www.gear4music.com/Guitar-and-Bass/Peterson-StroboStomp-HD-Compact-Strobe-Pedal-Tuner/2VSD", musicstore: "https://www.musicstore.com/en_OE/EUR/Peterson-StroboStomp-HD/art-GIT0048384-000", andertons: "https://www.andertons.co.uk/peterson-strobostomp-hd-compact-strobe-pedal-tuner/?search_query=Peterson%20StroboStomp%20HD", zzounds: "https://www.zzounds.com/item--PET403884?siid=353716", amazon: "https://www.amazon.com/Peterson-StroboStomp-Guitar-Tuner-403884/dp/B07PW9KBBJ" } },\n`;
const newTxt=txt.slice(0,idx)+insert+txt.slice(idx);
fs.writeFileSync(path,newTxt);
console.log('inserted');
