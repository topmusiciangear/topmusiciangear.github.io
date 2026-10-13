var fs=require('fs');
var BASE='C:/Users/Daniel/projects/topmusiciangear/';
var fails=[];
function assert(c,m){if(!c)fails.push(m);}

// ---------- 1. products.json: update 649 ----------
var ps=JSON.parse(fs.readFileSync(BASE+'data/products.json','utf8'));
var p=ps.find(function(x){return x.id===649;});
assert(p,'649 missing');
p.stores={
  musicstore:'https://www.musicstore.com/en_OE/EUR/Genelec-GLM-Set/art-REC0012270-000',
  gear4music:'https://www.gear4music.com/Recording-and-Computers/Genelec-GLM-3-Genelec-Loudspeaker-Manager-User-Kit/226N',
  andertons:'https://www.andertons.co.uk/genelec-glm-3-loudspeaker-manager-user-kit/'
};
fs.writeFileSync(BASE+'data/products.json',JSON.stringify(ps,null,2));
console.log('products.json 649 updated');

// ---------- 2. build-guides.js: update TEST_SHOP_BTN 649 ----------
var b=BASE+'build-guides.js';
var src=fs.readFileSync(b,'utf8');

var key='\n  649: {',i=src.indexOf(key);
assert(i>-1,'649 TEST block NOT FOUND');
if(i>-1){
  var j=src.indexOf('{',i),depth=0,k=j;
  while(k<src.length){if(src[k]==='{')depth++;else if(src[k]==='}'){if(--depth===0)break;}k++;}
  var end=k+1;if(src[end]===',')end++;
  var nb='  649: {\n    prices: {\n      musicstore: "€315.00",\n      gear4music: "£249.00",\n      andertons: "£309.00"\n    },\n    urls: {\n      musicstore: "https://www.musicstore.com/en_OE/EUR/Genelec-GLM-Set/art-REC0012270-000",\n      gear4music: "https://www.gear4music.com/Recording-and-Computers/Genelec-GLM-3-Genelec-Loudspeaker-Manager-User-Kit/226N",\n      andertons: "https://www.andertons.co.uk/genelec-glm-3-loudspeaker-manager-user-kit/"\n    },\n    na: ["zzounds","reverb","amazon"]\n  }';
  src=src.slice(0,i)+'\n'+nb+src.slice(end);
  fs.writeFileSync(b,src);
  console.log('TEST_SHOP_BTN 649 updated');
}

if(fails.length){console.log('FAIL:\n'+fails.join('\n'));process.exit(1);}
console.log('DONE');