var fs=require('fs');
var G4M_CLEAN='https://www.gear4music.com/Keyboards-and-Pianos/Yamaha-YC88-Digital-Stage-Keyboard-with-Drawbars/3Q2G';
function awin(mid, clean){ return 'https://www.awin1.com/cread.php?awinmid='+mid+'&awinaffid=2891111&ued='+encodeURIComponent(clean); }
// 1. products.json
var p='data/products.json';
var ps=JSON.parse(fs.readFileSync(p,'utf8'));
var y=ps.find(function(x){return x.id===638});
console.log('IMG BEFORE: '+y.img);
console.log('G4M BEFORE: '+(y.stores.gear4music||'(none)'));
y.img='https://r2.gear4music.com/media/63/636490/1200/preview.jpg';
y.stores.gear4music=awin('1117',G4M_CLEAN);
delete y.excludeStores;
fs.writeFileSync(p,JSON.stringify(ps,null,2));
console.log('IMG AFTER: '+y.img);
console.log('G4M AFTER: '+y.stores.gear4music.slice(0,120)+'...');
// 2. TEST_SHOP_BTN in build-guides.js (CRLF)
var b='build-guides.js';
var src=fs.readFileSync(b,'utf8');
var NL='\r\n';
var oldE='  638: {'+NL+'    prices: {'+NL+'      andertons: "£2,441.00",'+NL+'      musicstore: "€2,352.10",'+NL+'      zzounds: "$3,199.99"'+NL+'    },'+NL+'    urls: {'+NL+'      zzounds: "https://www.zzounds.com/item--YAMYC88",'+NL+'      amazon: "https://www.amazon.com/dp/B08RNKDLMN",'+NL+'      andertons: "https://www.andertons.co.uk/yamaha-yc88-88-key-drawbar-organ-stage-keyboard",'+NL+'      musicstore: "https://www.musicstore.com/en_OE/EUR/Yamaha-YC88/art-KEY0005386-000",'+NL+'      gear4music: "https://www.gear4music.com/Keyboards-and-Pianos/Yamaha-YC61-Digital-Stage-Keyboard-with-Drawbars/3AK8"'+NL+'    }'+NL+'  },';
if(src.indexOf(oldE)===-1){ console.log('BTN 638 BLOCK NOT FOUND'); process.exit(1); }
var newE='  638: {'+NL+'    prices: {'+NL+'      andertons: "£2,441.00",'+NL+'      musicstore: "€2,799.00",'+NL+'      zzounds: "$3,199.99",'+NL+'      gear4music: "£2,398.00"'+NL+'    },'+NL+'    urls: {'+NL+'      zzounds: "https://www.zzounds.com/item--YAMYC88",'+NL+'      amazon: "https://www.amazon.com/dp/B08RNKDLMN",'+NL+'      andertons: "https://www.andertons.co.uk/yamaha-yc88-88-key-drawbar-organ-stage-keyboard",'+NL+'      musicstore: "https://www.musicstore.com/en_OE/EUR/Yamaha-YC88/art-KEY0005386-000",'+NL+'      gear4music: "'+G4M_CLEAN+'"'+NL+'    }'+NL+'  },';
src=src.split(oldE).join(newE);
fs.writeFileSync(b,src);
console.log('BTN 638 UPDATED OK');
