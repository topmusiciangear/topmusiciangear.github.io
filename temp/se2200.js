var fs=require('fs');
var BASE='C:/Users/Daniel/projects/topmusiciangear/';
var fails=[];
function assert(c,m){if(!c)fails.push(m);}

var ps=JSON.parse(fs.readFileSync(BASE+'data/products.json','utf8'));
var p=ps.find(function(x){return x.id===657;});
assert(p,'657 missing');
p.stores.andertons='https://www.andertons.co.uk/se-electronics-se2200a-microphone';
p.stores.zzounds='https://www.zzounds.com/a--925521/item--SEESE2200';
p.stores.musicstore='https://www.musicstore.com/en_OE/EUR/sE-electronics-sE2200/art-REC0013378-000';
fs.writeFileSync(BASE+'data/products.json',JSON.stringify(ps,null,2));
console.log('products 657 updated');

var b=BASE+'build-guides.js';
var src=fs.readFileSync(b,'utf8');
var key='\n  657: {',i=src.indexOf(key);
assert(i>-1,'657 TEST NOT FOUND');
if(i>-1){
  var j=src.indexOf('{',i),depth=0,k=j;
  while(k<src.length){if(src[k]==='{')depth++;else if(src[k]==='}'){if(--depth===0)break;}k++;}
  var end=k+1;if(src[end]===',')end++;
  var nb='  657: {\n    prices: {\n      gear4music: "£177.00",\n      andertons: "£143.00",\n      zzounds: "$299.00",\n      musicstore: "€259.00"\n    },\n    urls: {\n      gear4music: "https://www.gear4music.com/Recording-and-Computers/sE-Electronics-SE2200-Large-Diaphragm-Condenser-Microphone/2CYA",\n      amazon: "https://www.amazon.com/SE-ELECTRONICS-Diaphragm-Condenser-Shockmount/dp/B077HZJJSJ",\n      andertons: "https://www.andertons.co.uk/se-electronics-se2200a-microphone",\n      zzounds: "https://www.zzounds.com/item--SEESE2200",\n      musicstore: "https://www.musicstore.com/en_OE/EUR/sE-electronics-sE2200/art-REC0013378-000"\n    }\n  },';
  src=src.slice(0,i)+'\n'+nb+src.slice(end);
  fs.writeFileSync(b,src);
  console.log('TEST 657 replaced');
}
if(fails.length){console.log('FAIL:\n'+fails.join('\n'));process.exit(1);}
console.log('DONE');
