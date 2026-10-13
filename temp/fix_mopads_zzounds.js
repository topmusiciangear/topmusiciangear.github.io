var fs=require('fs');
var BASE='C:/Users/Daniel/projects/topmusiciangear/';
var b=BASE+'build-guides.js';
var src=fs.readFileSync(b,'utf8');

// Add zzounds URL to 650 urls object
src=src.replace(
  'urls: {\n      musicstore: "https://www.musicstore.com/en_OE/EUR/Auralex-MoPad-Speaker-Pad-Set/art-REC0004624-000",\n      amazon: "https://www.amazon.com/dp/B0002D0B4K"\n    },\n    oos: ["zzounds"]',
  'urls: {\n      musicstore: "https://www.musicstore.com/en_OE/EUR/Auralex-MoPad-Speaker-Pad-Set/art-REC0004624-000",\n      amazon: "https://www.amazon.com/dp/B0002D0B4K",\n      zzounds: "https://www.zzounds.com/item--AURMOPAD"\n    },\n    oos: ["zzounds"]'
);

fs.writeFileSync(b,src);
console.log('Added zzounds URL to 650');