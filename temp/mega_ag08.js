var fs=require('fs');
var BASE='C:/Users/Daniel/projects/topmusiciangear/';
var fails=[];
function assert(c,m){if(!c)fails.push(m);}

// ============ 1. products.json ============
var ps=JSON.parse(fs.readFileSync(BASE+'data/products.json','utf8'));
var rcp=ps.find(function(x){return x.id===248;});
assert(rcp,'248 missing');
rcp.img='https://r2.gear4music.com/media/106/1068690/1200/preview.jpg';
assert(ps.find(function(x){return x.id===260;}),'260 missing?');
assert(!ps.find(function(x){return x.id===662;}),'662 exists?');
ps=ps.filter(function(x){return x.id!==260;});
ps.push(
  { id:662, title:'Yamaha AG08', title_es:'Yamaha AG08', brand:'Yamaha', category:'streaming', price:499, rating:4.5, badge:'recommended',
    desc:'8-channel livestreaming mixer with analog-style 60 mm faders: 2 combo inputs with +48 V phantom (CH2 Hi-Z for guitar), 4 stereo USB streams (Streaming/Voice/AUX/DAW) so every app gets a physical fader, onboard DSP (voice changer, amp sim, SPX reverb, comp) and 6 sound pads. No standalone recording — needs PC/iPad. ~$499.',
    desc_es:'Mezclador de streaming de 8 canales con faders analógicos de 60 mm: 2 entradas combo con phantom +48 V (CH2 Hi-Z para guitarra), 4 streams USB estéreo (Streaming/Voice/AUX/DAW) para dar un fader físico a cada app, DSP a bordo (cambia-voces, amp sim, reverb SPX, comp) y 6 pads. Sin grabación autónoma — exige PC/iPad. ~$499.',
    img:'https://images.musicstore.de/images/0960/yamaha-ag08-bl_1_REC0016318-000.jpg',
    stores:{
      musicstore:'https://www.musicstore.com/en_OE/EUR/Yamaha-AG08-BL/art-REC0016318-000',
      andertons:'https://www.andertons.co.uk/yamaha-ag08-bl/',
      zzounds:'https://www.zzounds.com/item--YAMAG08'
    } }
);
ps.sort(function(a,b){return a.id-b.id;});
fs.writeFileSync(BASE+'data/products.json',JSON.stringify(ps,null,2));
console.log('catalog: 248 photo, 260 out, 662 in');

// ============ 2. build-guides.js TEST ============
var b=BASE+'build-guides.js';
var src=fs.readFileSync(b,'utf8');
function delBlock(id){
  var key='\n  '+id+': {',i=src.indexOf(key);
  assert(i>-1,'BLOCK '+id+' NOT FOUND');
  if(i===-1)return;
  var j=src.indexOf('{',i),depth=0,k=j;
  while(k<src.length){if(src[k]==='{')depth++;else if(src[k]==='}'){if(--depth===0)break;}k++;}
  var end=k+1;if(src[end]===',')end++;
  src=src.slice(0,i)+src.slice(end);
}
function addAfter(id,newBlock){
  var key='\n  '+id+': {',i=src.indexOf(key);
  assert(i>-1,'ANCHOR '+id+' NOT FOUND');
  if(i===-1)return;
  var j=src.indexOf('{',i),depth=0,k=j;
  while(k<src.length){if(src[k]==='{')depth++;else if(src[k]==='}'){if(--depth===0)break;}k++;}
  var end=k+1;if(src[end]===',')end++;
  src=src.slice(0,end)+'\n'+newBlock+src.slice(end);
}
delBlock(260);
addAfter(661,'  662: {\n    prices: {\n      musicstore: "€459.00",\n      andertons: "£405.00",\n      zzounds: "$499.00"\n    },\n    urls: {\n      musicstore: "https://www.musicstore.com/en_OE/EUR/Yamaha-AG08-BL/art-REC0016318-000",\n      andertons: "https://www.andertons.co.uk/yamaha-ag08-bl/",\n      zzounds: "https://www.zzounds.com/item--YAMAG08"\n    }\n  },');
fs.writeFileSync(b,src);
console.log('TEST: 260 out, 662 in');

// ============ 3. guides.json surgery ============
var d=JSON.parse(fs.readFileSync(BASE+'data/guides.json','utf8'));
var g=d.find(function(x){return x.id==='stream-controllers';});
assert(g,'guide missing');
function sameArr(a,b){return a.length===b.length&&a.every(function(v,i){return v===b[i];});}

// 3a. remove XL [264,243] and WavePro [260] sections (exact match — chooser survives)
var n0=g.sections.length;
g.sections=g.sections.filter(function(s){
  return !(sameArr(s.products||[],[264,243])||sameArr(s.products||[],[260]));
});
assert(g.sections.length===n0-2,'sections removed != 2 (n0='+n0+' now='+g.sections.length+')');

// 3b. fix Deck+ [243,246,260,264]->[243,246], Wave [246,260,264]->[246], chooser list
g.sections.forEach(function(s){
  if(sameArr(s.products||[],[243,246,260,264]))s.products=[243,246];
  else if(sameArr(s.products||[],[246,260,264]))s.products=[246];
});
var ch=g.sections[0];
assert(ch.heading==='How to Choose a Streaming Mixer and Controller','chooser not at 0: '+ch.heading);
ch.products=[243,244,246,659,248,661,240,327,662];

// 3c. XLR Dock mention in Deck+ section (text only)
var deck=g.sections.find(function(s){return sameArr(s.products||[],[243,246]);});
assert(deck,'Deck+ section missing');
deck.content+='<p><strong>Pro tip:</strong> the official Elgato XLR Dock bolts underneath and turns the Stream Deck+ into a complete XLR interface (80 dB gain, onboard effects, Wave Link integration) — controller and mic preamp in one footprint, no separate interface needed.</p>';
deck.content_es+='<p><strong>Truco pro:</strong> el Elgato XLR Dock oficial se acopla debajo y convierte el Stream Deck+ en una interfaz XLR completa (80 dB de ganancia, efectos a bordo, integración Wave Link) — controlador y previo de micro en una sola huella, sin interfaz aparte.</p>';

// 3d. table: drop WavePro (7), DeckXL (3)
var cols=g.productTable.columns.map(function(c){return c.title;});
console.log('cols before: '+cols.join(' | '));
assert(cols[3]==='Elgato Stream Deck + XL','col3: '+cols[3]);
assert(cols[7]==='Elgato Wave XLR Pro','col7: '+cols[7]);
[7,3].forEach(function(i){
  g.productTable.columns.splice(i,1);
  g.productTable.rows.forEach(function(r){r.values.splice(i,1);});
});
g.productTable.columns.push({title:'Yamaha AG08',title_es:'Yamaha AG08'});
var agVals={
  'Best For':['Analog-style multi-source streaming','Streaming analógico multifuente'],
  'Type':['8-channel livestreaming mixer','Mezclador de streaming de 8 canales'],
  'Mic Gain':['2x combo +48 V phantom','2x combo + phantom 48 V'],
  'Video Capture':['No','No'],
  'Keys / Controls':['60 mm faders + 6 sound pads','Faders de 60 mm + 6 pads'],
  'Connectivity':['USB 8in/14out, smartphone, AUX','USB 8ent/14sal, smartphone, AUX'],
  'Software':['AG Controller (Win/Mac/iOS)','AG Controller (Win/Mac/iOS)'],
  'Estimated Price':[['~$499'],['~$499']]
};
// note: Estimated Price values are objects; handle below
Object.keys(agVals).forEach(function(label){
  if(label==='Estimated Price')return;
  var r=g.productTable.rows.find(function(x){return x.label===label;});
  assert(r,'row '+label+' missing');
  if(!r)return;
  var v=agVals[label];
  r.values.push({value:v[0],value_es:v[1]});
});
var rep=g.productTable.rows.find(function(x){return x.label==='Estimated Price';});
rep.values.push({value:'~$499',value_es:'~$499'});
console.log('cols final: '+g.productTable.columns.map(function(c){return c.title;}).join(' | '));

// 3e. verdictProsCons: drop XL + WavePro, add AG08
g.verdictProsCons=g.verdictProsCons.filter(function(v){return v.name!=='Elgato Stream Deck + XL'&&v.name!=='Elgato Wave XLR Pro';});
function vpc(n,ne,p,c,pe,ce){return{name:n,name_es:ne,pros:p,cons:c,pros_es:pe,cons_es:ce};}
g.verdictProsCons.push(
  vpc('Yamaha AG08','Yamaha AG08',
    ['Analog-style 60 mm faders beat touchscreen menus for live riding','4 stereo USB streams give game, Discord, Spotify and OBS each a physical fader','CH2 Hi-Z guitar input plus onboard amp sim for musicians','Hardware DSP (voice changer, SPX reverb, comp) with zero CPU load'],
    ['No standalone recording — PC or iPad must stay connected','Only 2 mono mic inputs despite the 8-channel name','Max 48 kHz USB while smaller AGs reach higher rates','Full DSP editing needs the Controller app'],
    ['Faders analógicos de 60 mm que superan menús táctiles en directo','4 streams USB estéreo dan un fader físico a juego, Discord, Spotify y OBS','Entrada Hi-Z para guitarra más amp sim a bordo para músicos','DSP por hardware (cambia-voces, reverb SPX, comp) sin cargar la CPU'],
    ['Sin grabación autónoma — el PC o iPad deben seguir conectados','Solo 2 entradas mono de micro pese al nombre de 8 canales','USB máximo 48 kHz mientras los AG pequeños llegan más alto','La edición DSP completa exige la app Controller'])
);
console.log('vpc: '+g.verdictProsCons.map(function(v){return v.name;}).join(' | '));

// 3f. AG08 section (user-approved crown title)
function SEC(h,hes,c,ces,prods){return{heading:h,heading_es:hes,content:c,content_es:ces,products:prods};}
g.sections.push(
  SEC('Best Analog-Style Mixer for Multi-Source Streaming: Yamaha AG08',
    'El mejor mezclador analógico para streaming multifuente: Yamaha AG08',
    '<strong>Rivals make you mix with a touchscreen; the AG08 hands you faders.</strong> The Yamaha AG08 is an 8-channel livestreaming mixer built around analog feel: 60 mm faders, two combo inputs with +48 V phantom, and four stereo USB streams (Streaming, Voice, AUX, DAW) so game, Discord, Spotify and OBS each get a physical fader with no VoiceMeeter needed. Musicians get a CH2 Hi-Z guitar input with onboard amp sim, streamers get hardware DSP — voice changer, SPX reverb, delay and compressor — plus 6 sound pads and two independent headphone mixes for two-person shows.</p><p><strong>The honest trade.</strong> It never records alone — the PC or iPad must stay connected, unlike microSD rivals — only two inputs are mono mics, and USB tops at 48 kHz. At ~$499 it costs real money, but for hands-on multi-source streaming nothing here feels this direct.',
    '<strong>Los rivales te hacen mezclar con táctil; el AG08 te da faders.</strong> El Yamaha AG08 es un mezclador de streaming de 8 canales con tacto analógico: faders de 60 mm, dos entradas combo con phantom +48 V, y cuatro streams USB estéreo (Streaming, Voice, AUX, DAW) para dar un fader físico a juego, Discord, Spotify y OBS sin VoiceMeeter. Los músicos tienen entrada Hi-Z con amp sim a bordo, los streamers DSP por hardware — cambia-voces, reverb SPX, delay y compresor — más 6 pads y dos mezclas de auriculares independientes para dúos.</p><p><strong>El trato honesto.</strong> Nunca graba solo — el PC o iPad deben seguir conectados, al contrario que rivales con microSD — solo dos entradas son micros mono, y el USB topa en 48 kHz. Por ~$499 cuesta dinero de verdad, pero para streaming multifuente con las manos nada aquí se siente tan directo.',
    [662])
);

// 3g. featured + texts
g.featuredProducts=[243,246,659,248,661,244,240,327,662];
g.intro='Streaming sound is 90% routing, and the gear below turns that routing into something you can grab with your hands. The Stream Deck+, the GoXLR Mini, the RODECaster Pro II, the Yamaha AG08, the Mackie MainStream, the Streamer X and the Wave XLR are the top streaming controllers and mixers — here is what each one does best.';
g.intro_es='El sonido del streaming es 90% enrutamiento, y el equipo de abajo convierte ese enrutamiento en algo que puedes tocar con las manos. El Stream Deck+, el GoXLR Mini, el RODECaster Pro II, el Yamaha AG08, el Mackie MainStream, el Streamer X y el Wave XLR son los mejores controladores y mezcladores de streaming — esto es lo que hace cada uno.';
function tailOf(s){var i=s.indexOf('<p>');return i>-1?s.slice(i):'';}
var cT=tailOf(g.conclusion),cET=tailOf(g.conclusion_es);
g.conclusion='If you want your hands on everything, get the Stream Deck+ — nothing else makes your whole stream so instantly controllable, and the official XLR Dock turns it into a complete XLR interface. If you want real faders on stream audio, the <strong>TC Helicon GoXLR Mini</strong> is the streamer-first pick with a Midas preamp and per-app routing. If you want analog feel on many sources, the <strong>Yamaha AG08</strong> gives every app a 60 mm fader. If you want the whole broadcast on hardware, the <strong>Rode RODECaster Pro II</strong> runs 4 Neutrik inputs with SMART pads and APHEX. If you want one cable for console video and audio, the <strong>Mackie MainStream</strong> merges interface and HDMI capture. If you stream from a console and want one compact box that does audio and video, the Streamer X is the value pick. And if you just need your mic to sound remarkable, the Wave XLR MK.2 delivers. There is no wrong answer here — it comes down to which workflow feels like yours. '+cT;
g.conclusion_es='Si quieres tenerlo todo al alcance de la mano, compra el Stream Deck+ — nada hace tu directo tan instantáneamente controlable, y el XLR Dock oficial lo convierte en una interfaz XLR completa. Si quieres faders reales en el audio, el <strong>TC Helicon GoXLR Mini</strong> es la opción de streamers con previo Midas y enrutamiento por app. Si quieres tacto analógico en muchas fuentes, el <strong>Yamaha AG08</strong> da un fader de 60 mm a cada app. Si quieres todo el programa en hardware, el <strong>Rode RODECaster Pro II</strong> lleva 4 entradas Neutrik con pads SMART y APHEX. Si quieres un cable para vídeo y audio de consola, el <strong>Mackie MainStream</strong> fusiona interfaz y captura HDMI. Si transmites desde una consola y quieres una caja compacta que haga audio y vídeo, el Streamer X es la opción de valor. Y si solo necesitas que el micrófono suene notable, el Wave XLR MK.2 lo logra. No hay respuesta equivocada aquí — todo se reduce a qué flujo de trabajo se adapta mejor a ti. '+cET;
g.verdict='The Stream Deck+ is the total control pick with buttons, dials and a touch strip for every stream setup — plus the XLR Dock turns it into a full interface. The GoXLR Mini is the streamer-first mixer with real faders and a Midas preamp, the Yamaha AG08 is the analog-feel pick with a fader per app, the RODECaster Pro II is the broadcast-console pick that survives a frozen PC, and the Mackie MainStream is the one-cable console pick with HDMI capture. The Streamer X stays the 4K value box and the Wave XLR MK.2 the mic upgrade. Match the tool to how you stream.';
g.verdict_es='El Stream Deck+ es la mejor opción para control total con botones, perillas y tira táctil para cualquier configuración de streaming — más el XLR Dock que lo vuelve interfaz completa. El GoXLR Mini es el mezclador de streamers con faders reales y previo Midas, el Yamaha AG08 es la opción de tacto analógico con un fader por app, el RODECaster Pro II es la consola broadcast que sobrevive a un PC congelado, y el Mackie MainStream es la opción de un cable para consolas con captura HDMI. El Streamer X sigue siendo la caja 4K de valor y el Wave XLR MK.2 la mejora de micro. Haz coincidir la herramienta con cómo haces streaming.';
g.description='In 2026, I swapped the Stream Deck+, GoXLR Mini, Yamaha AG08, RODECaster Pro II, Mackie MainStream, Rode Streamer X and Wave XLR MK. Here is which stream controller or mixer to buy and why, before';
g.description_es='En 2026, Pasé semanas intercambiando el Stream Deck+, el GoXLR Mini, el Yamaha AG08, el RODECaster Pro II, el Mackie MainStream, el Streamer X y el Wave XLR MK. Lee el veredicto completo y los precios';
var F=g.featuredSnippet;
F.text_en='The Stream Deck+ is the best-selling controller with 8 LCD keys, 4 dials and a touch strip — plus an official XLR Dock that makes it a full interface. The GoXLR Mini brings real faders and a Midas preamp to stream mixing. The Yamaha AG08 gives every app a 60 mm analog fader. The RODECaster Pro II runs the whole broadcast on hardware with 4 Neutrik inputs and 8 SMART pads. The Mackie MainStream merges interface and HDMI capture in one USB-C cable. The Streamer X packs an interface, 4K capture and a control surface into one box. The Wave XLR MK.2 adds broadcast-grade mic audio to any XLR mic.';
F.text_es='El Stream Deck+ es el controlador más vendido con 8 teclas LCD, 4 diales y una tira táctil — más un XLR Dock oficial que lo vuelve interfaz completa. El GoXLR Mini trae faders reales y previo Midas a la mezcla de stream. El Yamaha AG08 da un fader analógico de 60 mm a cada app. El RODECaster Pro II ejecuta todo el programa en hardware con 4 entradas Neutrik y 8 pads SMART. El Mackie MainStream fusiona interfaz y captura HDMI en un cable USB-C. El Streamer X mete interfaz, captura 4K y superficie de control en una sola caja. El Wave XLR MK.2 añade audio de micrófono de nivel broadcast a cualquier micrófono XLR.';

fs.writeFileSync(BASE+'data/guides.json',JSON.stringify(d,null,2));
console.log('guide done: sections='+g.sections.length);
if(fails.length){console.log('FAIL:\n'+fails.join('\n'));process.exit(1);}
console.log('DONE');
