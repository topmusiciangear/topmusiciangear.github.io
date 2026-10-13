var fs=require('fs');
var BASE='C:/Users/Daniel/projects/topmusiciangear/';
var b=BASE+'build-guides.js';
var src=fs.readFileSync(b,'utf8');

// Fix the TEST_SHOP_BTN section - need commas between entries
// Find the section from 648 to 652 and fix it
var start=src.indexOf('\n  648: {');
var end=src.indexOf('\n  652: {');
if(start===-1 || end===-1){console.log('Cannot find bounds');process.exit(1);}

var fixed='  648: {\n    prices: {\n      amazon: "$79.00"\n    },\n    urls: {\n      amazon: "https://www.amazon.com/dp/B00N4Q25R8"\n    },\n    na: ["musicstore","gear4music","zzounds","andertons","reverb"]\n  },\n  647: {\n    prices: {\n      musicstore: "€299.00",\n      zzounds: "$299.00",\n      gear4music: "£269.00"\n    },\n    urls: {\n      musicstore: "https://www.musicstore.com/en_OE/EUR/SONARWORKS-SoundID-Reference-Multichannel-with-Mic/art-PCM0017394-000",\n      zzounds: "https://www.zzounds.com/item--SNWSOUNDIDSPHP",\n      gear4music: "https://www.gear4music.com/Recording-and-Computers/Sonarworks-SoundID-Reference-Speaker-and-Headphone/6RQC"\n    }\n  },\n  649: {\n    prices: {\n      musicstore: "€264.70",\n      gear4music: "£249.00"\n    },\n    urls: {\n      musicstore: "https://www.musicstore.com/en_OE/EUR/Genelec-GLM-Set/art-REC0012270-000",\n      gear4music: "https://www.gear4music.com/Recording-and-Computers/Genelec-GLM-3-Genelec-Loudspeaker-Manager-User-Kit/226N"\n    },\n    na: ["zzounds","andertons","reverb","amazon"]\n  },\n  650: {\n    prices: {\n      musicstore: "€39.99",\n      amazon: "$39.99"\n    },\n    urls: {\n      musicstore: "https://www.musicstore.com/en_OE/EUR/Auralex-MoPad-Speaker-Pad-Set/art-REC0004624-000",\n      amazon: "https://www.amazon.com/dp/B0002D0B4K"\n    },\n    oos: ["zzounds"],\n    na: ["gear4music","andertons","reverb"]\n  },\n  651: {\n    prices: {\n      zzounds: "$399.15",\n      amazon: "$599.99"\n    },\n    urls: {\n      zzounds: "https://www.zzounds.com/item--ULTMS100B",\n      amazon: "https://www.amazon.com/Ultimate-Support-MS-100B-Professional-Adjustable/dp/B005OWHATS"\n    },\n    na: ["musicstore","gear4music","andertons","reverb"]\n  }';

src=src.slice(0,start)+'\n'+fixed+src.slice(end);
fs.writeFileSync(b,src);
console.log('Fixed TEST_SHOP_BTN commas');