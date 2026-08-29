const fs=require('fs');
const file="data/products.json";
let p=JSON.parse(fs.readFileSync(file,"utf8"));
const urls={
  92: "https://www.gear4music.com/PA-DJ-and-Lighting/Sennheiser-EW-100-G4-Wireless-Microphone-System-with-935-S-E-Band/2BBJ",
  195: "https://www.gear4music.com/Recording-and-Computers/Elgato-WAVE3-Microphone/43BD",
  209: "https://www.gear4music.com/Recording-and-Computers/Austrian-Audio-OC818-Studio-Set-Black/4PIK",
  319: "https://www.gear4music.com/Guitar-and-Bass/ESP-E-II-Eclipse-Tobacco-Sunburst/273H",
  335: "https://www.gear4music.com/PA-DJ-and-Lighting/Korg-Soundlink-MW1608-Hybrid-Mixer/38AJ",
  336: "https://www.gear4music.com/PA-DJ-and-Lighting/Mackie-Mobile-Mix-8-Channel-USB-Mixer/651Y",
  170: "https://www.gear4music.com/Recording-and-Computers/G4M-Acoustics-Squarewave-4-Pack/5KYU",
  291: "https://www.gear4music.com/Recording-and-Computers/Audio-Technica-AT2020USBX-Cardioid-Condenser-Microphone/528M",
};
for(const prod of p){
  if(urls[prod.id]){ prod.stores={...prod.stores, gear4music: urls[prod.id]}; }
}
fs.writeFileSync(file, JSON.stringify(p,null,2));
console.log("DONE - gear4music URLs added to products.json");
