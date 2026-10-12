var fs=require('fs');
var MS='https://www.musicstore.com/en_OE/EUR/Korg-Grandstage-X-inkl-Wooden-stand/art-KEY0005938-000';
function awin(mid, clean){ return 'https://www.awin1.com/cread.php?awinmid='+mid+'&awinaffid=2891111&ued='+encodeURIComponent(clean); }
// 1. products.json 642
var p='data/products.json';
var ps=JSON.parse(fs.readFileSync(p,'utf8'));
var k=ps.find(function(x){return x.id===642});
console.log('IMG same: '+(k.img==='https://r2.gear4music.com/media/103/1037030/1200/preview.jpg'));
k.img='https://r2.gear4music.com/media/103/1037030/1200/preview.jpg';
k.stores.musicstore=awin('63816',MS);
k.excludeStores=(k.excludeStores||[]).filter(function(s){return s!=='musicstore'});
if(!k.excludeStores.length) delete k.excludeStores;
console.log('stores now: '+Object.keys(k.stores).join(',')+' | excl: '+JSON.stringify(k.excludeStores||null));
fs.writeFileSync(p,JSON.stringify(ps,null,2));
// 2. TEST_SHOP_BTN 642 (CRLF)
var b='build-guides.js';
var src=fs.readFileSync(b,'utf8');
var NL='\r\n';
var oldE='  642: {'+NL+'    prices: {'+NL+'      zzounds: "$1,999.99",'+NL+'      gear4music: "£1,749.00",'+NL+'      andertons: "£1,749.00"'+NL+'    },'+NL+'    urls: {'+NL+'      zzounds: "https://www.zzounds.com/item--KORGRANDSTAGEX",'+NL+'      amazon: "https://www.amazon.com/dp/B0DKN7FL2J",'+NL+'      gear4music: "https://www.gear4music.com/Keyboards-and-Pianos/Korg-Grandstage-X/6707",'+NL+'      andertons: "https://www.andertons.co.uk/Korg-Grandstage-X-Stage-Piano",'+NL+'      reverb: "https://reverb.com/p/korg-grandstage-x-88-key-digital-piano"'+NL+'    },'+NL+'    oos: ['+NL+'      "andertons"'+NL+'    ]'+NL+'  },';
if(src.indexOf(oldE)===-1){ console.log('BTN 642 BLOCK NOT FOUND'); process.exit(1); }
var newE='  642: {'+NL+'    prices: {'+NL+'      zzounds: "$1,999.99",'+NL+'      gear4music: "£1,749.00",'+NL+'      andertons: "£1,749.00",'+NL+'      musicstore: "€2,299.00"'+NL+'    },'+NL+'    urls: {'+NL+'      zzounds: "https://www.zzounds.com/item--KORGRANDSTAGEX",'+NL+'      amazon: "https://www.amazon.com/dp/B0DKN7FL2J",'+NL+'      gear4music: "https://www.gear4music.com/Keyboards-and-Pianos/Korg-Grandstage-X/6707",'+NL+'      andertons: "https://www.andertons.co.uk/Korg-Grandstage-X-Stage-Piano",'+NL+'      musicstore: "'+MS+'",'+NL+'      reverb: "https://reverb.com/p/korg-grandstage-x-88-key-digital-piano"'+NL+'    }'+NL+'  },';
src=src.split(oldE).join(newE);
fs.writeFileSync(b,src);
console.log('BTN 642 UPDATED OK (andertons white, MS bundle added)');
