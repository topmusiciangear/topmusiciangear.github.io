var fs = require('fs');
var BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
var b = fs.readFileSync(BASE + 'build-guides.js', 'utf8');

var entries = [
  '  666: {\n    prices: {\n      amazon: "$169.00",\n      zzounds: "$169.00",\n      andertons: "£141.00",\n      musicstore: "€179.00"\n    },\n    urls: {\n      gear4music: "https://www.gear4music.com/Recording-and-Computers/Rode-NT-USBplus/58QD"\n    }\n  },',
  '  667: {\n    prices: {\n      amazon: "$129.00",\n      zzounds: "$124.95",\n      andertons: "£159.00",\n      musicstore: "€139.00"\n    },\n    urls: {\n      gear4music: "https://www.gear4music.com/PA-DJ-and-Lighting/Shure-MV6-USB-Gaming-Microphone/6OHD"\n    },\n    oos: ["gear4music"]\n  },',
  '  668: {\n    prices: {\n      amazon: "$219.00",\n      zzounds: "$219.00",\n      musicstore: "€189.00"\n    },\n    urls: {\n      gear4music: "https://www.gear4music.com/us/en/PA-DJ-and-Lighting/Audio-Technica-AT2020USB-XP-Cardioid-Condenser-USB-Microphone/5PYF"\n    },\n    oos: ["andertons"]\n  },',
  '  669: {\n    prices: {\n      amazon: "$149.00"\n    },\n    urls: {\n      musicstore: "https://www.musicstore.com/en_US/USD/AKG-Lyra/art-REC0014609-000",\n      gear4music: "https://www.gear4music.com/Recording-and-Computers/AKG-Lyra-USB-Microphone/35V1"\n    },\n    oos: ["gear4music", "andertons", "zzounds"]\n  },'
];

// Insert after entry 665
var anchor = '\n  665: {';
var idx = b.indexOf(anchor);
if (idx === -1) { console.log('ANCHOR 665 NOT FOUND'); process.exit(1); }

// Find end of 665 block
var braceStart = b.indexOf('{', idx);
var depth = 0, k = braceStart;
while (k < b.length) {
  if (b[k] === '{') depth++;
  else if (b[k] === '}') { depth--; if (depth === 0) break; }
  k++;
}
var insertPoint = k + 1;
if (b[insertPoint] === ',') insertPoint++;

b = b.slice(0, insertPoint) + '\n' + entries.join(',\n') + b.slice(insertPoint);
fs.writeFileSync(BASE + 'build-guides.js', b);
console.log('TEST_SHOP_BTN entries added for 666-669');
