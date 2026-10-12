var fs=require('fs');
var p='build-guides.js';
var src=fs.readFileSync(p,'utf8');
var fails=[];
function assert(c,m){ if(!c) fails.push(m); }
var NL='\r\n';

// --- 1. Update 211 (M201): zzounds sale price + real URL ---
var old211='  211: {'+NL+'    prices: {'+NL+'      gear4music: "£372.00",'+NL+'      amazon: "$399.00",'+NL+'      zzounds: "$499.99",'+NL+'      andertons: "£372.00",'+NL+'      musicstore: "€349.00"'+NL+'    }'+NL+'  },';
assert(src.indexOf(old211)>-1,'211 block not found');
var new211='  211: {'+NL+'    prices: {'+NL+'      gear4music: "£372.00",'+NL+'      amazon: "$399.00",'+NL+'      zzounds: "$349.99",'+NL+'      andertons: "£372.00",'+NL+'      musicstore: "€349.00"'+NL+'    },'+NL+'    urls: {'+NL+'      zzounds: "https://www.zzounds.com/item--BEYM201TG"'+NL+'    }'+NL+'  },';
src=src.split(old211).join(new211);

// --- 2. New entries 634/635/636 (CRLF to match file) ---
function entry(id, prices, urls){
  var s='  '+id+': {'+NL+'    prices: {'+NL;
  s+=prices.map(function(pr){return '      '+pr[0]+': "'+pr[1]+'"'}).join(','+NL)+NL+'    }';
  if(urls){
    s+=','+NL+'    urls: {'+NL;
    s+=urls.map(function(u){return '      '+u[0]+': "'+u[1]+'"'}).join(','+NL)+NL+'    }';
  }
  s+=NL+'  },'+NL;
  return s;
}
var entries='';
entries+=entry('634',[['zzounds','$219.00'],['andertons','£149.00']],
  [['zzounds','https://www.zzounds.com/item--SENE906'],['amazon','https://www.amazon.com/dp/B000AQHJQ2'],['andertons','https://www.andertons.co.uk/sennheiser-e906-dynamic-instrument-mic'],['reverb','https://reverb.com/p/sennheiser-e906']]);
entries+=entry('635',[['zzounds','$105.00'],['amazon','$94.63'],['gear4music','£95.30'],['andertons','£91.00']],
  [['zzounds','https://www.zzounds.com/item--AUDI5'],['amazon','https://www.amazon.com/dp/B0002IHNA0'],['gear4music','https://www.gear4music.com/Recording-and-Computers/Audix-I5-All-Purpose-Dynamic-Instrument-Microphone-VLM-Type-B/OIL'],['andertons','https://www.andertons.co.uk/audix-i5-dynamic-mic'],['musicstore','https://www.musicstore.com/en_OE/EUR/Audix-i-5/art-PAH0006797-000'],['reverb','https://reverb.com/p/audix-i5']]);
entries+=entry('636',[['zzounds','$159.00'],['gear4music','£151.25'],['andertons','£151.00']],
  [['zzounds','https://www.zzounds.com/item--SHUBETA57A'],['amazon','https://www.amazon.com/dp/B0002BACAK'],['gear4music','https://www.gear4music.com/PA-DJ-and-Lighting/Shure-Beta-57A-Dynamic-Microphone/1UV'],['andertons','https://www.andertons.co.uk/shure-beta-57a-dynamic-instrument-microphone'],['musicstore','https://www.musicstore.com/en_OE/EUR/Shure-Beta-57-A-dynamic-Microphone/art-PAH0000168-000'],['reverb','https://reverb.com/p/shure-beta-57a']]);
assert(src.indexOf('634: {')===-1,'634 already exists');

// find TEST_SHOP_BTN map close by brace counting (string-aware)
var decl=src.search(/TEST_SHOP_BTN\s*[:=]\s*\{/);
assert(decl>-1,'TEST_SHOP_BTN decl not found');
var openIdx=src.indexOf('{',decl);
var depth=0, inStr=null, esc=false, closeIdx=-1;
for(var k=openIdx;k<src.length;k++){
  var ch=src[k];
  if(inStr){
    if(esc){ esc=false; }
    else if(ch==='\\'){ esc=true; }
    else if(ch===inStr){ inStr=null; }
    continue;
  }
  if(ch==='"'||ch==="'"){ inStr=ch; continue; }
  if(ch==='{'){ depth++; continue; }
  if(ch==='}'){ depth--; if(depth===0){ closeIdx=k; break; } continue; }
}
assert(closeIdx>-1,'map close not found');
assert(src[closeIdx+1]===';','close not followed by ;');
var ctx=src.slice(closeIdx-120,closeIdx);
assert(/},\s*$/.test(ctx),'close context odd: '+JSON.stringify(ctx.slice(-60)));
src=src.slice(0,closeIdx)+NL+entries+src.slice(closeIdx);

if(fails.length){ console.log('FAIL:\n'+fails.join('\n')); process.exit(1); }
fs.writeFileSync(p,src);
console.log('BUTTONS PATCH OK');
