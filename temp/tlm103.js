var fs=require('fs');
var BASE='C:/Users/Daniel/projects/topmusiciangear/';
var fails=[];
function assert(c,m){if(!c)fails.push(m);}

var ps=JSON.parse(fs.readFileSync(BASE+'data/products.json','utf8'));
var p=ps.find(function(x){return x.id===654;});
assert(p,'654 missing');
p.img='https://r2.gear4music.com/media/58/589956/1200/preview.jpg';
p.stores={
  gear4music:'https://www.gear4music.com/Recording-and-Computers/Neumann-TLM-103-Condenser-Microphone-Nickel/22FD',
  zzounds:'https://www.zzounds.com/a--925521/item--NEUTLM103',
  andertons:'https://www.andertons.co.uk/neumann-tlm103-studio-condenser-mic/',
  musicstore:'https://www.musicstore.com/en_OE/EUR/Neumann-TLM103-ni-Condenser-Microphone/art-REC0000317-000'
};
fs.writeFileSync(BASE+'data/products.json',JSON.stringify(ps,null,2));
console.log('products 654 updated');

var b=BASE+'build-guides.js';
var src=fs.readFileSync(b,'utf8');
assert(src.indexOf('\n  654: {')===-1,'654 TEST already exists');
var key='\n  653: {',i=src.indexOf(key);
// 653 was deleted; anchor on 652 instead
if(i===-1){key='\n  652: {';i=src.indexOf(key);}
assert(i>-1,'ANCHOR NOT FOUND');
if(i>-1){
  var j=src.indexOf('{',i),depth=0,k=j;
  while(k<src.length){if(src[k]==='{')depth++;else if(src[k]==='}'){if(--depth===0)break;}k++;}
  var end=k+1;if(src[end]===',')end++;
  var nb='  654: {\n    prices: {\n      gear4music: "£976.00",\n      zzounds: "$1,295.00",\n      andertons: "£966.00",\n      musicstore: "€1,039.00"\n    },\n    urls: {\n      gear4music: "https://www.gear4music.com/Recording-and-Computers/Neumann-TLM-103-Condenser-Microphone-Nickel/22FD",\n      zzounds: "https://www.zzounds.com/item--NEUTLM103",\n      andertons: "https://www.andertons.co.uk/neumann-tlm103-studio-condenser-mic/",\n      musicstore: "https://www.musicstore.com/en_OE/EUR/Neumann-TLM103-ni-Condenser-Microphone/art-REC0000317-000"\n    }\n  },';
  src=src.slice(0,end)+'\n'+nb+src.slice(end);
  fs.writeFileSync(b,src);
  console.log('TEST 654 added');
}
if(fails.length){console.log('FAIL:\n'+fails.join('\n'));process.exit(1);}
console.log('DONE');
