const fs=require('fs');
const file="data/products.json";
let p=JSON.parse(fs.readFileSync(file,"utf8"));

// Correct URLs from subagent research (fixed the mixed ones)
const urls={
  // Amazon
  115: { amazon: "https://www.amazon.com/Reason-Studios-Reason-14-Standard/dp/B0CHXQK7Q9" },
  // zzounds
  260: { zzounds: "https://www.zzounds.com/item--ELGWAVEXLRPRO" },
  365: { zzounds: "https://www.zzounds.com/item--SEEVR2" },
  370: { zzounds: "https://www.zzounds.com/item--ROLGOKEYS3" },
  // andertons
  260: { andertons: "https://www.andertons.co.uk/elgato-wave-xlr-pro" },
  365: { andertons: "https://www.andertons.co.uk/se-electronics-vr2-voodoo-active-ribbon-mic" },
  370: { andertons: "https://www.andertons.co.uk/roland-go-keys-3-61-key-music-creation-keyboard" },
  350: { andertons: "https://www.andertons.co.uk/phenyx-pro-ptm-10-uhf-stereo-iem-system" },
  // musicstore
  232: { musicstore: "https://www.musicstore.de/de_DE/EUR/Electro-Voice-ND86-Gesangsmikrofon-dynamisch-Niere/art-PAH0018576-000" },
  260: { musicstore: "https://www.musicstore.de/de_DE/EUR/Elgato-Wave-XLR-Pro/art-REC0017355-000" },
  276: { musicstore: "https://www.musicstore.de/de_DE/EUR/Samson-Q2U-Recording-Podcasting-Pack/art-REC0006956-000" },
  324: { musicstore: "https://www.musicstore.de/de_DE/EUR/Novation-Launchkey-Mini-25-Mk4/art-SYN0009050-000" },
  340: { musicstore: "https://www.musicstore.de/de_DE/EUR/Rode-NTG5-Kit/art-REC0014571-000" },
  345: { musicstore: "https://www.musicstore.de/de_DE/EUR/Rode-VideoMic-NTG/art-REC0014694-000" },
  364: { musicstore: "https://www.musicstore.de/de_DE/EUR/beyerdynamic-M-160/art-REC0001467-001" },
};

for(const prod of p){
  if(urls[prod.id]){
    prod.stores = { ...prod.stores, ...urls[prod.id] };
  }
}
fs.writeFileSync(file, JSON.stringify(p,null,2));
console.log("DONE - URLs added to products.json");
