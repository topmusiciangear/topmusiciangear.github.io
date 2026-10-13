var fs=require('fs');
var BASE='C:/Users/Daniel/projects/topmusiciangear/';
var fails=[];
function assert(c,m){if(!c)fails.push(m);}

// ---------- 1. products.json: update 647 ----------
var ps=JSON.parse(fs.readFileSync(BASE+'data/products.json','utf8'));
var p=ps.find(function(x){return x.id===647;});
assert(p,'647 missing');
p.img='https://r2.gear4music.com/media/114/1142303/1200/preview.jpg';
p.stores={
  musicstore:'https://www.musicstore.com/en_OE/EUR/SONARWORKS-SoundID-Reference-Speakers-Headphones-Mic/art-PCM0016890-000',
  zzounds:'https://www.zzounds.com/item--SNWSOUNDIDSPHP',
  gear4music:'https://www.gear4music.com/Recording-and-Computers/Sonarworks-SoundID-Reference-Speaker-and-Headphone/6RQC',
  andertons:'https://www.andertons.co.uk/sonarworks-soundid-reference-for-speakers--headphones-esd/'
};
fs.writeFileSync(BASE+'data/products.json',JSON.stringify(ps,null,2));
console.log('products.json 647 updated');

// ---------- 2. build-guides.js: update TEST_SHOP_BTN 647 ----------
var b=BASE+'build-guides.js';
var src=fs.readFileSync(b,'utf8');

var key='\n  647: {',i=src.indexOf(key);
assert(i>-1,'647 TEST block NOT FOUND');
if(i>-1){
  var j=src.indexOf('{',i),depth=0,k=j;
  while(k<src.length){if(src[k]==='{')depth++;else if(src[k]==='}'){if(--depth===0)break;}k++;}
  var end=k+1;if(src[end]===',')end++;
  var nb='  647: {\n    prices: {\n      musicstore: "€285.00",\n      zzounds: "$249.00",\n      gear4music: "£199.00",\n      andertons: "£219.00"\n    },\n    urls: {\n      musicstore: "https://www.musicstore.com/en_OE/EUR/SONARWORKS-SoundID-Reference-Speakers-Headphones-Mic/art-PCM0016890-000",\n      zzounds: "https://www.zzounds.com/item--SNWSOUNDIDSPHP",\n      gear4music: "https://www.gear4music.com/Recording-and-Computers/Sonarworks-SoundID-Reference-Speaker-and-Headphone/6RQC",\n      andertons: "https://www.andertons.co.uk/sonarworks-soundid-reference-for-speakers--headphones-esd/"\n    }\n  }';
  src=src.slice(0,i)+'\n'+nb+src.slice(end);
  fs.writeFileSync(b,src);
  console.log('TEST_SHOP_BTN 647 updated');
}

if(fails.length){console.log('FAIL:\n'+fails.join('\n'));process.exit(1);}
console.log('DONE');