var fs=require('fs');
var BASE='C:/Users/Daniel/projects/topmusiciangear/';
var fails=[];
function assert(c,m){if(!c)fails.push(m);}

var ps=JSON.parse(fs.readFileSync(BASE+'data/products.json','utf8'));
var p=ps.find(function(x){return x.id===658;});
assert(p,'658 missing');
p.img='https://r2.gear4music.com/media/50/505656/1200/preview.jpg';
p.stores.musicstore='https://www.musicstore.com/en_OE/EUR/Bose-T8S-ToneMatch-Mixer/art-PAH0019778-000';
fs.writeFileSync(BASE+'data/products.json',JSON.stringify(ps,null,2));
console.log('products 658 updated');

var b=BASE+'build-guides.js';
var src=fs.readFileSync(b,'utf8');
var key='\n  658: {',i=src.indexOf(key);
assert(i>-1,'658 TEST NOT FOUND');
if(i>-1){
  var j=src.indexOf('{',i),depth=0,k=j;
  while(k<src.length){if(src[k]==='{')depth++;else if(src[k]==='}'){if(--depth===0)break;}k++;}
  var end=k+1;if(src[end]===',')end++;
  var nb='  658: {\n    prices: {\n      zzounds: "$999.00",\n      andertons: "£799.00",\n      musicstore: "€899.00",\n      gear4music: "£728.00"\n    },\n    urls: {\n      gear4music: "https://www.gear4music.com/PA-DJ-and-Lighting/Bose-T8S-ToneMatch-Digital-Mixer/2ADL",\n      amazon: "https://www.amazon.com/BOSE-785491-0110-Bose-T8S-toneMatch/dp/B07CG81TLC",\n      zzounds: "https://www.zzounds.com/item--BOET8STONEMATCH",\n      andertons: "https://www.andertons.co.uk/bose-t8s-tonematch/",\n      musicstore: "https://www.musicstore.com/en_OE/EUR/Bose-T8S-ToneMatch-Mixer/art-PAH0019778-000"\n    }\n  }';
  src=src.slice(0,i)+'\n'+nb+src.slice(end);
  fs.writeFileSync(b,src);
  console.log('TEST 658 updated');
}
if(fails.length){console.log('FAIL:\n'+fails.join('\n'));process.exit(1);}
console.log('DONE');