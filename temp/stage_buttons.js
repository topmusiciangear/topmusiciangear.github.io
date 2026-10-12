var fs=require('fs');
var p='build-guides.js';
var src=fs.readFileSync(p,'utf8');
var fails=[];
function assert(c,m){ if(!c) fails.push(m); }
var NL='\r\n';
function entry(id, prices, urls, oos){
  var s='  '+id+': {'+NL+'    prices: {'+NL;
  s+=prices.map(function(pr){return '      '+pr[0]+': "'+pr[1]+'"'}).join(','+NL)+NL+'    }';
  if(urls&&urls.length){
    s+=','+NL+'    urls: {'+NL;
    s+=urls.map(function(u){return '      '+u[0]+': "'+u[1]+'"'}).join(','+NL)+NL+'    }';
  }
  if(oos&&oos.length){
    s+=','+NL+'    oos: ['+NL;
    s+=oos.map(function(o){return '      "'+o+'"'}).join(','+NL)+NL+'    ]';
  }
  s+=NL+'  },'+NL;
  return s;
}
var E='';
E+=entry('637',[['gear4music','£2,333.00'],['musicstore','€2,439.00']],
  [['zzounds','https://www.zzounds.com/item--ROLRD2000EX'],['gear4music','https://www.gear4music.com/Keyboards-and-Pianos/Roland-RD-2000-EX-Digital-Stage-Piano/6KU9'],['musicstore','https://www.musicstore.com/en_OE/EUR/Roland-RD-2000-EX/art-KEY0006021-000'],['reverb','https://reverb.com/p/roland-rd-2000ex-88-key-digital-stage-piano']]);
E+=entry('638',[['andertons','£2,441.00'],['musicstore','€2,352.10'],['zzounds','$3,199.99'.replace('$','$')]],
  [['zzounds','https://www.zzounds.com/item--YAMYC88'],['amazon','https://www.amazon.com/dp/B08RNKDLMN'],['andertons','https://www.andertons.co.uk/yamaha-yc88-88-key-drawbar-organ-stage-keyboard'],['musicstore','https://www.musicstore.com/en_OE/EUR/Yamaha-YC88/art-KEY0005386-000'],['gear4music','https://www.gear4music.com/Keyboards-and-Pianos/Yamaha-YC61-Digital-Stage-Keyboard-with-Drawbars/3AK8']]);
E+=entry('639',[['amazon','$4,699.99'.replace('$','$')],['zzounds','$4,499.99'.replace('$','$')],['gear4music','£4,290.00'],['andertons','£4,290.00'],['musicstore','€4,880.00']],
  [['zzounds','https://www.zzounds.com/item--YAMMONTAGEM8X'],['amazon','https://www.amazon.com/dp/B0CFBC7MNY'],['gear4music','https://www.gear4music.com/Keyboards-and-Pianos/Yamaha-Montage-M8X-Synthesizer/7H6C'],['andertons','https://www.andertons.co.uk/yamaha-montage-m8x-synthesizer/'],['musicstore','https://www.musicstore.com/en_OE/EUR/Yamaha-Montage-M8x/art-SYN0008831-000'],['reverb','https://reverb.com/p/yamaha-montage-m8x-88-key-synthesizer']]);
E+=entry('640',[['zzounds','$4,629.99'.replace('$','$')],['gear4music','£3,802.00'],['andertons','£3,736.00'],['musicstore','€3,869.00']],
  [['zzounds','https://www.zzounds.com/item--ROLFANTOM8EX'],['gear4music','https://www.gear4music.com/Keyboards-and-Pianos/Roland-Fantom-8-EX-88-Key-Synthesizer-Keyboard/6DQZ'],['andertons','https://www.andertons.co.uk/roland-fantom-8-ex-88-key-flagship-synthesizer/'],['musicstore','https://www.musicstore.com/en_OE/EUR/Roland-FANTOM-8-EX/art-SYN0008964-000'],['reverb','https://reverb.com/p/roland-fantom-8-ex-88-key-workstation-keyboard']]);
E+=entry('641',[['zzounds','$3,299.00'.replace('$','$')],['gear4music','£1,655.47'],['andertons','£1,929.00']],
  [['zzounds','https://www.zzounds.com/item--NORELECTRO7D61'],['gear4music','https://www.gear4music.com/Keyboards-and-Pianos/Nord-Electro-7-61-Key-Semi-Weighted-Keyboard/7T19'],['andertons','https://www.andertons.co.uk/nord-electro-7-61-stage-piano/'],['musicstore','https://www.musicstore.com/en_OE/EUR/Clavia-Nord-Electro-7-61/art-KEY0006274-000']]);
E+=entry('642',[['zzounds','$1,999.99'.replace('$','$')],['gear4music','£1,749.00'],['andertons','£1,749.00']],
  [['zzounds','https://www.zzounds.com/item--KORGRANDSTAGEX'],['amazon','https://www.amazon.com/dp/B0DKN7FL2J'],['gear4music','https://www.gear4music.com/Keyboards-and-Pianos/Korg-Grandstage-X/6707'],['andertons','https://www.andertons.co.uk/Korg-Grandstage-X-Stage-Piano'],['reverb','https://reverb.com/p/korg-grandstage-x-88-key-digital-piano']],['andertons']);
E+=entry('643',[['gear4music','£1,300.00'],['andertons','£1,159.00']],
  [['zzounds','https://www.zzounds.com/item--ARAASTROLAB'],['amazon','https://www.amazon.com/dp/B0CVBHTGVR'],['gear4music','https://www.gear4music.com/Keyboards-and-Pianos/Arturia-Astrolab-61-Note-Stage-Keyboard/6AMY'],['andertons','https://www.andertons.co.uk/arturia-astrolab-61-key-synth'],['musicstore','https://www.musicstore.com/en_OE/EUR/Arturia-AstroLab-61/art-SYN0008965-000']]);
E+=entry('644',[['andertons','£1,188.00'],['zzounds','$1,499.99'.replace('$','$')]],
  [['zzounds','https://www.zzounds.com/item--YAMCK88'],['amazon','https://www.amazon.com/dp/B0BTQ3HXRS'],['gear4music','https://www.gear4music.com/Keyboards-and-Pianos/Yamaha-CK88-Stage-Keyboard/5HLE'],['andertons','https://www.andertons.co.uk/yamaha-ck88-88-key-ghs-graded-hammer-standard-keyboard/'],['musicstore','https://www.musicstore.com/en_OE/EUR/Yamaha-CK88/art-KEY0005768-000']]);
assert(src.indexOf('637: {')===-1,'637 exists');
// brace-count to TEST_SHOP_BTN close
var decl=src.search(/TEST_SHOP_BTN\s*[:=]\s*\{/);
assert(decl>-1,'decl missing');
var openIdx=src.indexOf('{',decl);
var depth=0, inStr=null, esc=false, closeIdx=-1;
for(var k=openIdx;k<src.length;k++){
  var ch=src[k];
  if(inStr){ if(esc){esc=false} else if(ch==='\\'){esc=true} else if(ch===inStr){inStr=null} continue; }
  if(ch==='"'||ch==="'"){ inStr=ch; continue; }
  if(ch==='{'){ depth++; continue; }
  if(ch==='}'){ depth--; if(depth===0){ closeIdx=k; break; } continue; }
}
assert(closeIdx>-1,'close missing');
assert(/},\s*$/.test(src.slice(closeIdx-120,closeIdx)),'ctx odd');
src=src.slice(0,closeIdx)+NL+E+src.slice(closeIdx);
if(fails.length){ console.log('FAIL:\n'+fails.join('\n')); process.exit(1); }
fs.writeFileSync(p,src);
console.log('STAGE BUTTONS OK');
