var fs=require('fs');
var BASE='C:/Users/Daniel/projects/topmusiciangear/';
var fails=[];
function assert(c,m){if(!c)fails.push(m);}
function rep(hay,oldN,desc){
  if(hay.indexOf(oldN)===-1){fails.push('NOT FOUND: '+desc);return hay;}
  return hay.replace(oldN,desc && false ? '' : arguments[2]||'');
}
// simpler: explicit replaces below with R()
function R(s,a,b){ if(s.indexOf(a)===-1){fails.push('NOT FOUND: '+a.slice(0,70));return s;} return s.replace(a,b); }

var d=JSON.parse(fs.readFileSync(BASE+'data/guides.json','utf8'));
var g=d.find(function(x){return x.id==='stream-controllers';});

// ---------- TITLE ES ----------
g.title_es='Mejores alternativas al Stream Deck y mezcladores para streaming';

// ---------- INTRO (add DLZ + Mixcast) ----------
g.intro=R(g.intro,'the Streamer X and the Wave XLR are the top','the Streamer X, the DLZ Creator, the Mixcast 4 and the Wave XLR are the top');
g.intro_es=R(g.intro_es,'el Streamer X y el Wave XLR son los mejores','el Streamer X, el DLZ Creator, el Mixcast 4 y el Wave XLR son los mejores');
g.intro_es=R(g.intro_es,'esto es lo que hace cada uno.','esto es lo mejor de cada uno.');

// ---------- CHOOSER EN typo ----------
var ch=g.sections[0];
ch.content=R(ch.content,'or all-in-one box?','or an all-in-one box?');

// ---------- SEC1 Deck+ EN: dup sentence + article ----------
var deck=g.sections.find(function(s){return s.heading.indexOf('Stream Deck+ the Best')>-1;});
deck.content=R(deck.content,'once you spend afternoon with it','once you spend an afternoon with it');
deck.content=R(deck.content,'It has no XLR input and no preamp. It has no XLR input and no preamp.','It has no XLR input and no preamp.');
// ---------- SEC1 ES natural ----------
deck.content_es=R(deck.content_es,'en cuanto pasas una tarde con él, el porqué es obvio','en cuanto pasas una tarde con él, entiendes por qué');
deck.content_es=R(deck.content_es,'una tira táctil fina caen bajo los dedos','una tira táctil fina quedan al alcance de los dedos');
deck.content_es=R(deck.content_es,'Solo el plugin Wave Link convierte el deck','El plugin Wave Link por sí solo convierte el deck');
deck.content_es=R(deck.content_es,'dispara una cadena entera con una sola pulsación','ejecuta una cadena entera con una sola pulsación');

// ---------- SEC2 Streamer X ----------
var sx=g.sections.find(function(s){return s.products&&s.products.length===1&&s.products[0]===244;});
sx.content=R(sx.content,'until you close and reopen app.','until you close and reopen the app.');
sx.content_es=R(sx.content_es,'Si el configuración es una máquina compleja de doble PC','Si tu configuración es un equipo complejo de doble PC');
sx.content_es=R(sx.content_es,'pueden jubilar tres aparatos separados','pueden sustituir tres aparatos separados');
sx.content_es=R(sx.content_es,'El previo Revolution empuja 76dB','El previo Revolution entrega 76dB');
sx.content_es=R(sx.content_es,'despiertas tu PC del reposo','sacas tu PC de la suspensión');
sx.content_es=R(sx.content_es,'y no voy a fingir lo contrario','y no voy a ocultarlo');

// ---------- SEC3 Wave ES ----------
var wv=g.sections.find(function(s){return s.heading.indexOf('Wave XLR MK.2')>-1;});
wv.content_es=R(wv.content_es,'muting táctil','silenciado táctil');

// ---------- SEC4 Bridge ES rewrite ----------
var br=g.sections.find(function(s){return s.heading.indexOf('Bridge Cast')>-1;});
br.content_es=R(br.content_es,'Los jugadores entre consolas, PC y cámaras encuentran un centro pensado a medida en el Bridge Cast X.','Quienes juegan entre consola, PC y cámaras tienen en el Bridge Cast X un centro hecho a medida.');
br.content_es=R(br.content_es,'varios puertos USB-C más HDMI amarran la estación de juego','varios puertos USB-C y HDMI completan tu equipo');
br.content_es=R(br.content_es,'La contrapartida atañe a la sencillez orientada a audio:','El inconveniente es su enfoque jugón:');
br.content_es=R(br.content_es,'bancadas generosas de faders','hileras generosas de faders');
br.content_es=R(br.content_es,'una consola radial dedicada','una consola de radio dedicada');

// ---------- SEC5 GoXLR ES ----------
var gx=g.sections.find(function(s){return s.products&&s.products.length===1&&s.products[0]===659;});
gx.content_es=R(gx.content_es,'para meteduras a prueba de sponsors','para meteduras a prueba de patrocinadores');
gx.content_es=R(gx.content_es,'Solo Windows — los de macOS abstenerse','Solo Windows — los usuarios de macOS, abstenerse');
gx.content_es=R(gx.content_es,'Por ~$189 en calle con stock','Por unos ~$189 con stock');

// ---------- SEC6 MainStream ES ----------
var ms=g.sections.find(function(s){return s.products&&s.products.length===1&&s.products[0]===661;});
ms.content_es=R(ms.content_es,'odian el baile de tres cajas','odian el lío de las tres cajas');
ms.content_es=R(ms.content_es,'El Mackie MainStream se come las tres','El Mackie MainStream acaba con las tres');
ms.content_es=R(ms.content_es,'Por $299,99 directo es la respuesta','Por $299,99 en la web de Mackie es la respuesta');

// ---------- SEC7 RCP2 ES ----------
var rc=g.sections.find(function(s){return s.products&&s.products.length===1&&s.products[0]===248;});
rc.content_es=R(rc.content_es,'El doble USB-C cuelga dos ordenadores','El doble USB-C conecta dos ordenadores');

// ---------- SEC8 AG08 ES ----------
var ag8=g.sections.find(function(s){return s.products&&s.products.length===1&&s.products[0]===662;});
ag8.content_es=R(ag8.content_es,'te hacen mezclar con táctil;','te hacen mezclar con pantalla táctil;');

// ---------- SEC9 DLZ ES ----------
var dlz=g.sections.find(function(s){return s.products&&s.products.length===1&&s.products[0]===247;});
dlz.content_es=R(dlz.content_es,'frena a los que piensan en faders','frena a quienes piensan en faders');
dlz.content_es=R(dlz.content_es,'se gana el dinero.','vale lo que cuesta.');

// ---------- SEC10 Mixcast ES ----------
var mx=g.sections.find(function(s){return s.products&&s.products.length===1&&s.products[0]===663;});
mx.content_es=R(mx.content_es,'sin red de 32-bit float','sin la red de seguridad del 32-bit float');
mx.content_es=R(mx.content_es,'solo con corriente, y ~$499','solo funciona enchufado, y ~$499');
mx.content_es=R(mx.content_es,'gana en precio y sencillez novata','gana en precio y simplicidad para principiantes');

// ---------- CONCLUSION link grammar ----------
g.conclusion=R(g.conclusion,'best audio interfaces guide</a> the <a href="/guides/usb-mics.html"','best audio interfaces guide</a> and the <a href="/guides/usb-mics.html"');
g.conclusion_es=R(g.conclusion_es,'guía de mejores interfaces de audio</a> los <a href="/guides/usb-mics_es.html"','guía de mejores interfaces de audio</a>, los <a href="/guides/usb-mics_es.html"');

// ---------- VERDICT ES ----------
g.verdict_es=R(g.verdict_es,'Haz coincidir la herramienta con cómo haces streaming.','Elige la herramienta según cómo hagas streaming.');

// ---------- FAQ ----------
var F=g.featuredSnippet;
F.faq_a3_en=R(F.faq_a3_en,'Revolution previo delivers','Revolution preamp delivers');
F.faq_a3_es=R(F.faq_a3_es,'Sáltate el booster','Ahórrate el booster');
F.faq_a2_es=R(F.faq_a2_es,'La contrapartida honesta es el software UNIFY','El inconveniente es el software UNIFY');
F.faq_a2_es=R(F.faq_a2_es,'un software que nunca parpadee','un software que nunca falle');
F.faq_a4_es=R(F.faq_a4_es,'la opción de enrutamiento más manual','la opción de enrutamiento más práctica');

// ---------- VPC: Wave MK.2 75->80dB + Bridge added ----------
var wvpc=g.verdictProsCons.find(function(v){return v.name==='Elgato Wave XLR MK.2';});
assert(wvpc,'Wave vpc missing');
wvpc.pros=wvpc.pros.map(function(p){return p.replace('75 dB','80 dB');});
wvpc.pros_es=wvpc.pros_es.map(function(p){return p.replace('75 dB','80 dB');});
function vpc(n,ne,p,c,pe,ce){return{name:n,name_es:ne,pros:p,cons:c,pros_es:pe,cons_es:ce};}
assert(!g.verdictProsCons.find(function(v){return v.name==='Roland Bridge Cast X';}),'Bridge vpc exists?');
g.verdictProsCons.push(
  vpc('Roland Bridge Cast X','Roland Bridge Cast X',
    ['Dual-bus mixing separates personal and audience feeds','XLR with phantom plus HDMI capture for consoles','Assignable pads with onboard voice processing','Compact hub for console, PC and camera desks'],
    ['Gaming-first layout confuses podcast-first buyers','Compact controls with no real faders','No onboard multitrack SD recording','Deep edits need the app, not the surface'],
    ['Mezcla dual-bus que separa escucha personal y audiencia','XLR con phantom más captura HDMI para consolas','Pads asignables con procesado vocal a bordo','Centro compacto para consola, PC y cámaras'],
    ['Diseño jugón que confunde a podcasters','Controles compactos sin faders reales','Sin grabación multipista a SD a bordo','Los ajustes profundos piden la app, no la superficie'])
);

fs.writeFileSync(BASE+'data/guides.json',JSON.stringify(d,null,2));

// ---------- CATALOG 246: 96kHz -> 48kHz ----------
var ps=JSON.parse(fs.readFileSync(BASE+'data/products.json','utf8'));
var p246=ps.find(function(x){return x.id===246;});
assert(p246,'246 missing');
p246.desc=R(p246.desc,'24-bit/96kHz','24-bit/48kHz');
p246.desc_es=R(p246.desc_es,'24-bit/96kHz','24-bit/48kHz');
fs.writeFileSync(BASE+'data/products.json',JSON.stringify(ps,null,2));

console.log('audit fixes applied');
if(fails.length){console.log('FAIL:\n'+fails.join('\n'));process.exit(1);}
console.log('DONE');
