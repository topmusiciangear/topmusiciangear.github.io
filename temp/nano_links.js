var fs=require('fs');
var BASE='C:/Users/Daniel/projects/topmusiciangear/';
var fails=[];
function assert(c,m){if(!c)fails.push(m);}

// products.json 429
var ps=JSON.parse(fs.readFileSync(BASE+'data/products.json','utf8'));
var p=ps.find(function(x){return x.id===429;});
p.stores.gear4music='https://www.awin1.com/cread.php?awinmid=1117&awinaffid=2891111&ued='+encodeURIComponent('https://www.gear4music.com/Recording-and-Computers/Blue-Yeti-USB-Microphone-Slate/3U30');
p.stores.zzounds='https://www.zzounds.com/a--925521/item--BLUYETINANO';
p.stores.musicstore='https://www.awin1.com/cread.php?awinmid=63816&awinaffid=2891111&ued='+encodeURIComponent('https://www.musicstore.com/en_OE/EUR/Blue-Microphones-Yeti-USB-Microphone/art-REC0007433-000');
fs.writeFileSync(BASE+'data/products.json',JSON.stringify(ps,null,2));
console.log('products 429 updated');

// TEST 429: urls only, no prices, oos the 3 unavailable
var b=BASE+'build-guides.js';
var src=fs.readFileSync(b,'utf8');
var key='\n  429: {';
var i=src.indexOf(key);
assert(i>-1,'429 BLOCK NOT FOUND');
if(i>-1){
  var j=src.indexOf('{',i),depth=0,k=j;
  while(k<src.length){if(src[k]==='{')depth++;else if(src[k]==='}'){if(--depth===0)break;}k++;}
  var end=k+1;if(src[end]===',')end++;
  var nb='  429: {\n    urls: {\n      zzounds: "https://www.zzounds.com/item--BLUYETINANO",\n      gear4music: "https://www.gear4music.com/Recording-and-Computers/Blue-Yeti-USB-Microphone-Slate/3U30",\n      musicstore: "https://www.musicstore.com/en_OE/EUR/Blue-Microphones-Yeti-USB-Microphone/art-REC0007433-000"\n    },\n    oos: [\n      "zzounds",\n      "gear4music",\n      "musicstore",\n      "andertons"\n    ]\n  },';
  src=src.slice(0,i)+'\n'+nb+src.slice(end);
  fs.writeFileSync(b,src);
  console.log('TEST 429 replaced');
}
if(fails.length){console.log('FAIL:\n'+fails.join('\n'));process.exit(1);}
console.log('DONE');
