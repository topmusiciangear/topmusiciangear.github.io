var fs=require('fs');
var G4M='https://www.gear4music.com/Keyboards-and-Pianos/Arturia-Astrolab-61-Note-Stage-Keyboard-Silver/82CQ';
function awin(mid, clean){ return 'https://www.awin1.com/cread.php?awinmid='+mid+'&awinaffid=2891111&ued='+encodeURIComponent(clean); }
var p='data/products.json';
var ps=JSON.parse(fs.readFileSync(p,'utf8'));
var a=ps.find(function(x){return x.id===643});
console.log('IMG same: '+(a.img==='https://r2.gear4music.com/media/105/1056629/1200/preview.jpg'));
a.img='https://r2.gear4music.com/media/105/1056629/1200/preview.jpg';
a.stores.gear4music=awin('1117',G4M);
fs.writeFileSync(p,JSON.stringify(ps,null,2));
console.log('CATALOG G4M URL updated');
var b='build-guides.js';
var src=fs.readFileSync(b,'utf8');
var NL='\r\n';
var oldE='  643: {'+NL+'    prices: {'+NL+'      gear4music: "£1,300.00",'+NL+'      andertons: "£1,159.00"'+NL+'    },'+NL+'    urls: {'+NL+'      zzounds: "https://www.zzounds.com/item--ARAASTROLAB",'+NL+'      amazon: "https://www.amazon.com/dp/B0CVBHTGVR",'+NL+'      gear4music: "https://www.gear4music.com/Keyboards-and-Pianos/Arturia-Astrolab-61-Note-Stage-Keyboard/6AMY",'+NL+'      andertons: "https://www.andertons.co.uk/arturia-astrolab-61-key-synth",'+NL+'      musicstore: "https://www.musicstore.com/en_OE/EUR/Arturia-AstroLab-61/art-SYN0008965-000"'+NL+'    }'+NL+'  },';
if(src.indexOf(oldE)===-1){ console.log('BTN 643 BLOCK NOT FOUND'); process.exit(1); }
var newE='  643: {'+NL+'    prices: {'+NL+'      zzounds: "$1,599.00",'+NL+'      gear4music: "£1,399.00",'+NL+'      andertons: "£1,159.00",'+NL+'      musicstore: "€1,369.00"'+NL+'    },'+NL+'    urls: {'+NL+'      zzounds: "https://www.zzounds.com/item--ARAASTROLAB",'+NL+'      amazon: "https://www.amazon.com/dp/B0CVBHTGVR",'+NL+'      gear4music: "'+G4M+'",'+NL+'      andertons: "https://www.andertons.co.uk/arturia-astrolab-61-key-synth",'+NL+'      musicstore: "https://www.musicstore.com/en_OE/EUR/Arturia-AstroLab-61/art-SYN0008965-000"'+NL+'    }'+NL+'  },';
src=src.split(oldE).join(newE);
fs.writeFileSync(b,src);
console.log('BTN 643 UPDATED OK');
