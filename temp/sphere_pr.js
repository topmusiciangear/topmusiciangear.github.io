var fs=require('fs');
var BASE='C:/Users/Daniel/projects/topmusiciangear/';
var fails=[];
function assert(c,m){if(!c)fails.push(m);}

var ps=JSON.parse(fs.readFileSync(BASE+'data/products.json','utf8'));
var p=ps.find(function(x){return x.id===656;});
assert(p,'656 missing');
p.stores.musicstore='https://www.musicstore.com/en_OE/EUR/Universal-Audio-Sphere-DLX-Modeling-Microphone/art-REC0016277-000';
fs.writeFileSync(BASE+'data/products.json',JSON.stringify(ps,null,2));
console.log('products 656 updated');

var b=BASE+'build-guides.js';
var src=fs.readFileSync(b,'utf8');
var key='\n  656: {',i=src.indexOf(key);
assert(i>-1,'656 TEST NOT FOUND');
if(i>-1){
  var j=src.indexOf('{',i),depth=0,k=j;
  while(k<src.length){if(src[k]==='{')depth++;else if(src[k]==='}'){if(--depth===0)break;}k++;}
  var end=k+1;if(src[end]===',')end++;
  var nb='  656: {\n    prices: {\n      gear4music: "£1,283.00",\n      andertons: "£1,226.00",\n      zzounds: "$1,499.00",\n      musicstore: "€1,489.00"\n    },\n    urls: {\n      gear4music: "https://www.gear4music.com/Recording-and-Computers/Universal-Audio-Sphere-DLX-Modeling-Microphone/5B0C",\n      amazon: "https://www.amazon.com/Universal-Audio-Sphere-Modeling-Microphone/dp/B0C35LC2JZ",\n      zzounds: "https://www.zzounds.com/item--UADSPHEREDLX",\n      andertons: "https://www.andertons.co.uk/universal-audio-sphere-dlx-modelling-microphone",\n      musicstore: "https://www.musicstore.com/en_OE/EUR/Universal-Audio-Sphere-DLX-Modeling-Microphone/art-REC0016277-000"\n    }\n  },';
  src=src.slice(0,i)+'\n'+nb+src.slice(end);
  fs.writeFileSync(b,src);
  console.log('TEST 656 replaced');
}
if(fails.length){console.log('FAIL:\n'+fails.join('\n'));process.exit(1);}
console.log('DONE');
