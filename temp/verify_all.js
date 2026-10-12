var fs=require('fs');
var path=require('path');
function chk(n,c){ console.log((c?'PASS':'FAIL')+' '+n); }
// 1. guides dir: midi refs only in stubs
var files=fs.readdirSync('guides').filter(function(f){return /\.html$/.test(f)});
var bad=[];
files.forEach(function(f){
  if(f.indexOf('midi-keyboards')===0) return; // stubs
  var h=fs.readFileSync('guides/'+f,'utf8');
  if(h.indexOf('midi-keyboards')>-1) bad.push(f);
});
chk('no midi-keyboards refs in built guides (stubs excluded)', bad.length===0);
if(bad.length) console.log('BAD: '+bad.join(','));
// 2. stubs redirect correctly
var s1=fs.readFileSync('guides/midi-keyboards.html','utf8');
var s2=fs.readFileSync('guides/midi-keyboards_es.html','utf8');
chk('EN stub -> stage', s1.indexOf('best-stage-keyboards.html')>-1 && s1.indexOf('canonical')>-1);
chk('ES stub -> stage_es', s2.indexOf('best-stage-keyboards_es.html')>-1 && s2.indexOf('canonical')>-1);
// 3. sitemap
var sm=fs.readFileSync('sitemap.xml','utf8');
chk('sitemap has stage', sm.indexOf('best-stage-keyboards.html')>-1);
chk('sitemap no midi', sm.indexOf('midi-keyboards')===-1);
// 4. hub page
var hub=fs.readFileSync('guides/best-keyboard.html','utf8');
var hubEs=fs.readFileSync('guides/best-keyboard_es.html','utf8');
chk('hub 10 cols', (hub.match(/<th>M-Audio Hammer 88<\/th>/g)||[]).length===1 && (hub.match(/<th>Native Instruments Kontrol S61 MK3<\/th>/g)||[]).length===1);
chk('hub Hammer section', hub.indexOf('Best 88-Key Weighted Controller')>-1);
chk('hub Kontrol section', hub.indexOf('Best Premium 61-Key Controller')>-1);
chk('hub DAW advice section', hub.indexOf('How to Choose a MIDI Controller for Your DAW')>-1);
chk('hub no midi links', hub.indexOf('midi-keyboards')===-1 && hubEs.indexOf('midi-keyboards')===-1);
// 5. stage page
var st=fs.readFileSync('guides/best-stage-keyboards.html','utf8');
var stEs=fs.readFileSync('guides/best-stage-keyboards_es.html','utf8');
chk('stage title EN', st.indexOf('<title>Best Stage Keyboards for Live Performance (Pros, Cons & Buying Guide 2026)</title>')>-1);
chk('stage title ES', stEs.indexOf('Mejores teclados para directo')>-1);
var cols9=['Nord Stage 4 88','Roland RD-2000 EX','Yamaha YC88','Yamaha Montage M8x','Roland Fantom 8 EX','Nord Electro 7 61','Korg Grandstage X','Arturia AstroLab 61','Yamaha CK88'];
var missing=cols9.filter(function(t){return st.indexOf('<th>'+t+'</th>')===-1});
chk('stage 9 cols', missing.length===0);
if(missing.length) console.log('MISSING COLS: '+missing.join(','));
chk('stage Two-Tier section', st.indexOf('Two-Tier Rig Rule')>-1 && stEs.indexOf('doble piso')>-1);
chk('stage verdicts 9', (st.match(/verdict-product-name/g)||[]).length===9);
chk('stage JSONLD Montage $4699', st.indexOf('4699')>-1);
chk('stage JSONLD Fantom', st.indexOf('ROLFANTOM8EX')>-1);
chk('stage JSONLD Electro7', st.indexOf('NORELECTRO7D61')>-1);
chk('stage no midi-keyboards text', st.indexOf('midi-keyboards')===-1);
console.log('done');
