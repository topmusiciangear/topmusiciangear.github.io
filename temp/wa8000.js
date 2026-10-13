var fs=require('fs');
var BASE='C:/Users/Daniel/projects/topmusiciangear/';
var fails=[];
function assert(c,m){if(!c)fails.push(m);}

var ps=JSON.parse(fs.readFileSync(BASE+'data/products.json','utf8'));
var p=ps.find(function(x){return x.id===655;});
assert(p,'655 missing');
p.img='https://r2.gear4music.com/media/71/712330/1200/preview_1.jpg';
p.stores={
  gear4music:'https://www.gear4music.com/Recording-and-Computers/Warm-Audio-WA-8000-Condenser-Microphone/436V',
  andertons:'https://www.andertons.co.uk/warm-audio-wa-8000-large-diaphragm-condenser-microphone/',
  zzounds:'https://www.zzounds.com/a--925521/item--WAUWA8000',
  musicstore:'https://www.musicstore.com/en_OE/EUR/Warm-Audio-WA-8000/art-REC0015721-000'
};
fs.writeFileSync(BASE+'data/products.json',JSON.stringify(ps,null,2));
console.log('products 655 updated');

var b=BASE+'build-guides.js';
var src=fs.readFileSync(b,'utf8');
assert(src.indexOf('\n  655: {')===-1,'655 TEST already exists');
var key='\n  654: {',i=src.indexOf(key);
assert(i>-1,'ANCHOR 654 NOT FOUND');
if(i>-1){
  var j=src.indexOf('{',i),depth=0,k=j;
  while(k<src.length){if(src[k]==='{')depth++;else if(src[k]==='}'){if(--depth===0)break;}k++;}
  var end=k+1;if(src[end]===',')end++;
  var nb='  655: {\n    prices: {\n      gear4music: "£1,020.00",\n      andertons: "£949.00",\n      zzounds: "$1,299.00",\n      musicstore: "€1,149.00"\n    },\n    urls: {\n      gear4music: "https://www.gear4music.com/Recording-and-Computers/Warm-Audio-WA-8000-Condenser-Microphone/436V",\n      andertons: "https://www.andertons.co.uk/warm-audio-wa-8000-large-diaphragm-condenser-microphone/",\n      zzounds: "https://www.zzounds.com/item--WAUWA8000",\n      musicstore: "https://www.musicstore.com/en_OE/EUR/Warm-Audio-WA-8000/art-REC0015721-000"\n    }\n  },';
  src=src.slice(0,end)+'\n'+nb+src.slice(end);
  fs.writeFileSync(b,src);
  console.log('TEST 655 added');
}
if(fails.length){console.log('FAIL:\n'+fails.join('\n'));process.exit(1);}
console.log('DONE');
