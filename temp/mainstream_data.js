var fs=require('fs');
var BASE='C:/Users/Daniel/projects/topmusiciangear/';
var fails=[];
function assert(c,m){if(!c)fails.push(m);}

var ps=JSON.parse(fs.readFileSync(BASE+'data/products.json','utf8'));
var p=ps.find(function(x){return x.id===661;});
assert(p,'661 missing');
p.img='https://r2.gear4music.com/media/102/1026784/1200/preview.jpg';
p.stores.andertons='https://www.andertons.co.uk/mackie-mainstream-live-streaming-video-capture-interface/';
p.stores.musicstore='https://www.musicstore.com/en_OE/EUR/Mackie-MainStream/art-LIG0019371-000';
fs.writeFileSync(BASE+'data/products.json',JSON.stringify(ps,null,2));
console.log('products 661 updated');

var b=BASE+'build-guides.js';
var src=fs.readFileSync(b,'utf8');
var key='\n  661: {',i=src.indexOf(key);
assert(i>-1,'661 TEST NOT FOUND');
if(i>-1){
  var j=src.indexOf('{',i),depth=0,k=j;
  while(k<src.length){if(src[k]==='{')depth++;else if(src[k]==='}'){if(--depth===0)break;}k++;}
  var end=k+1;if(src[end]===',')end++;
  var nb='  661: {\n    prices: {\n      andertons: "£101.00",\n      zzounds: "$299.00",\n      musicstore: "€329.00"\n    },\n    urls: {\n      gear4music: "https://www.gear4music.com/Recording-and-Computers/Mackie-MainStream-Streaming-Interface/651X",\n      zzounds: "https://www.zzounds.com/item--MACMAINSTREAM",\n      andertons: "https://www.andertons.co.uk/mackie-mainstream-live-streaming-video-capture-interface/",\n      musicstore: "https://www.musicstore.com/en_OE/EUR/Mackie-MainStream/art-LIG0019371-000"\n    }\n  }';
  src=src.slice(0,i)+'\n'+nb+src.slice(end);
  fs.writeFileSync(b,src);
  console.log('TEST 661 updated');
}
if(fails.length){console.log('FAIL:\n'+fails.join('\n'));process.exit(1);}
console.log('DONE');