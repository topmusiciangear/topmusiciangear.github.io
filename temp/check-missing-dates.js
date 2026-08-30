const fs=require("fs");
const g=JSON.parse(fs.readFileSync("data/guides.json","utf8"));
const missing = ["blx288-vs-ewd","best-electric-guitars-2026","best-acoustic-guitars-for-beginners","atc-vs-genelec","kh750-vs-7050c","best-shotgun-mics","best-wireless-iems","best-parlor-guitars","best-ribbon-mics","ai-tools-plugins","sidechain-modulation-plugins","beatmaker-plugins","best-32-channel-digital-mixers","best-in-ear-monitors"];
for(const id of missing){
  const guide=g.find(x=>x.id===id);
  if(guide){
    console.log(`${id}: datePublished="${guide.datePublished}" | category="${guide.category}"`);
  }else{
    console.log(`${id}: NOT FOUND`);
  }
}
