var fs=require('fs');
var BASE='C:/Users/Daniel/projects/topmusiciangear/';
var fails=[];
function assert(c,m){if(!c)fails.push(m);}

var b=BASE+'build-guides.js';
var src=fs.readFileSync(b,'utf8');

function addAfter(id,newBlock){
  var key='\n  '+id+': {',i=src.indexOf(key);
  assert(i>-1,'ANCHOR '+id+' NOT FOUND');
  if(i===-1)return;
  var j=src.indexOf('{',i),depth=0,k=j;
  while(k<src.length){if(src[k]==='{')depth++;else if(src[k]==='}'){if(--depth===0)break;}k++;}
  var end=k+1;if(src[end]===',')end++;
  src=src.slice(0,end)+'\n'+newBlock+src.slice(end);
}

// 647 after 648
addAfter(648,'  647: {\n    prices: {\n      musicstore: "€299.00",\n      zzounds: "$299.00",\n      gear4music: "£269.00"\n    },\n    urls: {\n      musicstore: "https://www.musicstore.com/en_OE/EUR/SONARWORKS-SoundID-Reference-Multichannel-with-Mic/art-PCM0017394-000",\n      zzounds: "https://www.zzounds.com/item--SNWSOUNDIDSPHP",\n      gear4music: "https://www.gear4music.com/Recording-and-Computers/Sonarworks-SoundID-Reference-Speaker-and-Headphone/6RQC"\n    }\n  }');

// 649 after 647 (will be there now)
addAfter(647,'  649: {\n    prices: {\n      musicstore: "€264.70",\n      gear4music: "£249.00"\n    },\n    urls: {\n      musicstore: "https://www.musicstore.com/en_OE/EUR/Genelec-GLM-Set/art-REC0012270-000",\n      gear4music: "https://www.gear4music.com/Recording-and-Computers/Genelec-GLM-3-Genelec-Loudspeaker-Manager-User-Kit/226N"\n    },\n    na: ["zzounds","andertons","reverb","amazon"]\n  }');

// 650 after 649
addAfter(649,'  650: {\n    prices: {\n      musicstore: "€39.99",\n      amazon: "$39.99"\n    },\n    urls: {\n      musicstore: "https://www.musicstore.com/en_OE/EUR/Auralex-MoPad-Speaker-Pad-Set/art-REC0004624-000",\n      amazon: "https://www.amazon.com/dp/B0002D0B4K"\n    },\n    oos: ["zzounds"],\n    na: ["gear4music","andertons","reverb"]\n  }');

// 651 already exists - need to update it (replace)
// Find and replace 651 block
var key='\n  651: {',i=src.indexOf(key);
assert(i>-1,'651 NOT FOUND for replace');
if(i>-1){
  var j=src.indexOf('{',i),depth=0,k=j;
  while(k<src.length){if(src[k]==='{')depth++;else if(src[k]==='}'){if(--depth===0)break;}k++;}
  var end=k+1;if(src[end]===',')end++;
  var nb='  651: {\n    prices: {\n      zzounds: "$399.15",\n      amazon: "$599.99"\n    },\n    urls: {\n      zzounds: "https://www.zzounds.com/item--ULTMS100B",\n      amazon: "https://www.amazon.com/Ultimate-Support-MS-100B-Professional-Adjustable/dp/B005OWHATS"\n    },\n    na: ["musicstore","gear4music","andertons","reverb"]\n  }';
  src=src.slice(0,i)+'\n'+nb+src.slice(end);
}

fs.writeFileSync(b,src);
console.log('TEST_SHOP_BTN updated for 647, 649, 650, 651');

if(fails.length){console.log('FAIL:\n'+fails.join('\n'));process.exit(1);}
console.log('DONE');