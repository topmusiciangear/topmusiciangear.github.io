var fs=require('fs');
var BASE='C:/Users/Daniel/projects/topmusiciangear/';
var fails=[];
function assert(c,m){if(!c)fails.push(m);}

var ps=JSON.parse(fs.readFileSync(BASE+'data/products.json','utf8'));
var p=ps.find(function(x){return x.id===652;});
assert(p,'652 missing');
p.img='https://r2.gear4music.com/media/29/291966/1200/preview.jpg';
p.stores={
  gear4music:'https://www.gear4music.com/Recording-and-Computers/Lewitt-LCT-440-PURE-Condenser-Microphone/1ZJI',
  musicstore:'https://www.musicstore.com/en_OE/EUR/Lewitt-LCT-440-Pure/art-REC0013117-000',
  zzounds:'https://www.zzounds.com/a--925521/item--LEWLCT440PURE',
  andertons:'https://www.andertons.co.uk/lewitt-lct-440-pure-large-diaphragm-condenser-microphone/'
};
fs.writeFileSync(BASE+'data/products.json',JSON.stringify(ps,null,2));
console.log('products 652 updated');

var b=BASE+'build-guides.js';
var src=fs.readFileSync(b,'utf8');
assert(src.indexOf('\n  652: {')===-1,'652 TEST already exists');
var key='\n  651: {',i=src.indexOf(key);
assert(i>-1,'ANCHOR 651 NOT FOUND');
if(i>-1){
  var j=src.indexOf('{',i),depth=0,k=j;
  while(k<src.length){if(src[k]==='{')depth++;else if(src[k]==='}'){if(--depth===0)break;}k++;}
  var end=k+1;if(src[end]===',')end++;
  var nb='  652: {\n    prices: {\n      gear4music: "£215.00",\n      musicstore: "€264.00",\n      zzounds: "$249.00",\n      andertons: "£205.00"\n    },\n    urls: {\n      gear4music: "https://www.gear4music.com/Recording-and-Computers/Lewitt-LCT-440-PURE-Condenser-Microphone/1ZJI",\n      musicstore: "https://www.musicstore.com/en_OE/EUR/Lewitt-LCT-440-Pure/art-REC0013117-000",\n      zzounds: "https://www.zzounds.com/item--LEWLCT440PURE",\n      andertons: "https://www.andertons.co.uk/lewitt-lct-440-pure-large-diaphragm-condenser-microphone/"\n    }\n  },';
  src=src.slice(0,end)+'\n'+nb+src.slice(end);
  fs.writeFileSync(b,src);
  console.log('TEST 652 added');
}
if(fails.length){console.log('FAIL:\n'+fails.join('\n'));process.exit(1);}
console.log('DONE');
