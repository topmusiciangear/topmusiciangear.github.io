const fs=require("fs");
const file="data/guides.json";
let g=JSON.parse(fs.readFileSync(file,"utf8"));

const today = "2025-08-29";
const missing = ["blx288-vs-ewd","best-electric-guitars-2026","best-acoustic-guitars-for-beginners","atc-vs-genelec","kh750-vs-7050c","best-shotgun-mics","best-wireless-iems","best-parlor-guitars","best-ribbon-mics","ai-tools-plugins","sidechain-modulation-plugins","beatmaker-plugins","best-32-channel-digital-mixers","best-in-ear-monitors"];

let updated=0;
for(const guide of g){
  if(guide.id && missing.includes(guide.id)){
    guide.datePublished = today;
    updated++;
  }
}

fs.writeFileSync(file, JSON.stringify(g,null,2));
console.log("Updated:", updated, "guides");
