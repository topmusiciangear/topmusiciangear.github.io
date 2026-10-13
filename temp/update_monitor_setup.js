var fs=require('fs');
var BASE='C:/Users/Daniel/projects/topmusiciangear/';
var fails=[];
function assert(c,m){if(!c)fails.push(m);}

// ---------- 1. products.json: update stores for 647, 648, 649, 650, 651 ----------
var ps=JSON.parse(fs.readFileSync(BASE+'data/products.json','utf8'));

var p647=ps.find(function(x){return x.id===647;});
assert(p647,'647 missing');
p647.stores={
  musicstore:'https://www.musicstore.com/en_OE/EUR/SONARWORKS-SoundID-Reference-Multichannel-with-Mic/art-PCM0017394-000',
  zzounds:'https://www.zzounds.com/item--SNWSOUNDIDSPHP',
  gear4music:'https://www.gear4music.com/Recording-and-Computers/Sonarworks-SoundID-Reference-Speaker-and-Headphone/6RQC'
};

var p648=ps.find(function(x){return x.id===648;});
assert(p648,'648 missing');
// Music Store doesn't carry UMIK-1, Gear4Music doesn't carry it, zZounds doesn't carry it
// Keep only Amazon (already there)
p648.stores={
  amazon:'https://www.amazon.com/dp/B00N4Q25R8'
};

var p649=ps.find(function(x){return x.id===649;});
assert(p649,'649 missing');
p649.stores={
  musicstore:'https://www.musicstore.com/en_OE/EUR/Genelec-GLM-Set/art-REC0012270-000',
  gear4music:'https://www.gear4music.com/Recording-and-Computers/Genelec-GLM-3-Genelec-Loudspeaker-Manager-User-Kit/226N'
  // zZounds doesn't carry Genelec
};

var p650=ps.find(function(x){return x.id===650;});
assert(p650,'650 missing');
p650.stores={
  musicstore:'https://www.musicstore.com/en_OE/EUR/Auralex-MoPad-Speaker-Pad-Set/art-REC0004624-000',
  amazon:'https://www.amazon.com/dp/B0002D0B4K',  // Auralex MoPADs on Amazon (clp page)
  // zZounds shows "No longer available"
};

var p651=ps.find(function(x){return x.id===651;});
assert(p651,'651 missing');
p651.stores={
  amazon:'https://www.amazon.com/Ultimate-Support-MS-100B-Professional-Adjustable/dp/B005OWHATS',
  zzounds:'https://www.zzounds.com/item--ULTMS100B'
  // Music Store doesn't carry MS-100, Gear4Music doesn't carry it
};

fs.writeFileSync(BASE+'data/products.json',JSON.stringify(ps,null,2));
console.log('products.json updated for 647-651');

// ---------- 2. build-guides.js: update TEST_SHOP_BTN for 647, 648, 649, 650, 651 ----------
var b=BASE+'build-guides.js';
var src=fs.readFileSync(b,'utf8');

function replaceBlock(id,newBlock){
  var key='\n  '+id+': {',i=src.indexOf(key);
  assert(i>-1,'BLOCK '+id+' NOT FOUND in TEST_SHOP_BTN');
  if(i===-1)return;
  var j=src.indexOf('{',i),depth=0,k=j;
  while(k<src.length){if(src[k]==='{')depth++;else if(src[k]==='}'){if(--depth===0)break;}k++;}
  var end=k+1;if(src[end]===',')end++;
  src=src.slice(0,i)+'\n'+newBlock+src.slice(end);
}

// 647 Sonarworks SoundID Reference
replaceBlock(647,'  647: {\n    prices: {\n      musicstore: "€299.00",\n      zzounds: "$299.00",\n      gear4music: "£269.00"\n    },\n    urls: {\n      musicstore: "https://www.musicstore.com/en_OE/EUR/SONARWORKS-SoundID-Reference-Multichannel-with-Mic/art-PCM0017394-000",\n      zzounds: "https://www.zzounds.com/item--SNWSOUNDIDSPHP",\n      gear4music: "https://www.gear4music.com/Recording-and-Computers/Sonarworks-SoundID-Reference-Speaker-and-Headphone/6RQC"\n    }\n  }');

// 648 MiniDSP UMIK-1 - only Amazon available
replaceBlock(648,'  648: {\n    prices: {\n      amazon: "$79.00"\n    },\n    urls: {\n      amazon: "https://www.amazon.com/dp/B00N4Q25R8"\n    },\n    na: ["musicstore","gear4music","zzounds","andertons","reverb"]\n  }');

// 649 Genelec GLM Kit
replaceBlock(649,'  649: {\n    prices: {\n      musicstore: "€264.70",\n      gear4music: "£249.00"\n    },\n    urls: {\n      musicstore: "https://www.musicstore.com/en_OE/EUR/Genelec-GLM-Set/art-REC0012270-000",\n      gear4music: "https://www.gear4music.com/Recording-and-Computers/Genelec-GLM-3-Genelec-Loudspeaker-Manager-User-Kit/226N"\n    },\n    na: ["zzounds","andertons","reverb","amazon"]\n  }');

// 650 Auralex MoPADs (4-Pack)
replaceBlock(650,'  650: {\n    prices: {\n      musicstore: "€39.99",\n      amazon: "$39.99"\n    },\n    urls: {\n      musicstore: "https://www.musicstore.com/en_OE/EUR/Auralex-MoPad-Speaker-Pad-Set/art-REC0004624-000",\n      amazon: "https://www.amazon.com/dp/B0002D0B4K"\n    },\n    oos: ["zzounds"],\n    na: ["gear4music","andertons","reverb"]\n  }');

// 651 Ultimate Support MS-100 (Pair)
replaceBlock(651,'  651: {\n    prices: {\n      zzounds: "$399.15",\n      amazon: "$599.99"\n    },\n    urls: {\n      zzounds: "https://www.zzounds.com/item--ULTMS100B",\n      amazon: "https://www.amazon.com/Ultimate-Support-MS-100B-Professional-Adjustable/dp/B005OWHATS"\n    },\n    na: ["musicstore","gear4music","andertons","reverb"]\n  }');

fs.writeFileSync(b,src);
console.log('TEST_SHOP_BTN updated for 647-651');

if(fails.length){console.log('FAIL:\n'+fails.join('\n'));process.exit(1);}
console.log('DONE');