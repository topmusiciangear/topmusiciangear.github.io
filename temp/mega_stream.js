var fs=require('fs');
var BASE='C:/Users/Daniel/projects/topmusiciangear/';
var fails=[];
function assert(c,m){if(!c)fails.push(m);}

// ============ 1. products.json: delete 261, add 659+660+661 ============
var ps=JSON.parse(fs.readFileSync(BASE+'data/products.json','utf8'));
assert(ps.find(function(x){return x.id===261;}),'261 missing?');
assert(!ps.find(function(x){return x.id===659;}),'659 exists?');
ps=ps.filter(function(x){return x.id!==261;});
ps.push(
  { id:659, title:'TC Helicon GoXLR Mini', title_es:'TC Helicon GoXLR Mini', brand:'TC Helicon', category:'streaming', price:189, rating:4.6, badge:'bestSeller',
    desc:'4-channel USB streaming mixer with assignable faders, Midas preamp (+24 V phantom) and cough/censor buttons. Creates 12 virtual sound cards so every app gets its own fader, with onboard DSP EQ, compressor and gate. Windows only — no macOS support. Street ~$189.',
    desc_es:'Mezclador USB de 4 canales para streaming con faders asignables, previo Midas (phantom +24 V) y botones de tos/censura. Crea 12 tarjetas de sonido virtuales para dar un fader a cada app, con EQ, compresor y puerta DSP a bordo. Solo Windows — sin macOS. Calle ~$189.',
    img:'https://cdn-media.empowertribe.com/5f2401b318ee4da68806fab1e23644db/Image_TH_0803-AAB_GoXLR-MINI_Left_XL.png',
    stores:{
      gear4music:'https://www.gear4music.com/Recording-and-Computers/TC-Helicon-GoXLR-Mini/3R1T',
      amazon:'https://www.amazon.com/Helicon-Online-Broadcast-Interface-Preamp/dp/B07XH41DLN',
      musicstore:'https://www.musicstore.com/en_OE/EUR/TC-Helicon-GoXLR-Mini/art-REC0014497-000',
      zzounds:'https://www.zzounds.com/item--TCEGOXLRMINI',
      andertons:'https://www.andertons.co.uk/tc-helicon-go-xlr-mini-in-white/'
    },
    oos:['zzounds','andertons'] },
  { id:660, title:'Yamaha ZG02', title_es:'Yamaha ZG02', brand:'Yamaha', category:'streaming', price:199.95, rating:4.5, badge:'recommended',
    desc:'Compact game streaming mixer: XLR combo with +48 V phantom plus headset mic, USB-C to PC/Mac and direct USB to PS5/Switch, voice changer and game effects with 3D surround. ZG Controller app on Windows/Mac. MSRP $199.95; no HDMI (that is the ZG01).',
    desc_es:'Mezclador compacto para game streaming: XLR combo con phantom +48 V más micro de headset, USB-C a PC/Mac y USB directo a PS5/Switch, cambia-voces y efectos con surround 3D. App ZG Controller en Windows/Mac. PVP $199,95; sin HDMI (ese es el ZG01).',
    img:'https://media.sweetwater.com/m/products/image/f7bd919d2ffnZxAf5Nxq5wOHqyvbn0e1bclTMBHE.jpg?quality=82&width=750',
    stores:{ amazon:'https://www.amazon.com/Yamaha-Gaming-Mixer-Voice-Streaming/dp/B0CQZ25H1M' } },
  { id:661, title:'Mackie MainStream', title_es:'Mackie MainStream', brand:'Mackie', category:'streaming', price:299.99, rating:4.4, badge:'recommended',
    desc:'Streaming + video capture interface in one USB-C cable: XLR/TRS combo with +48 V (60 dB), HDMI 1080p60 capture with 4K60 passthrough, 6 programmable keys and free Matrix software (6 virtual inputs, 24 pads). Matrix is Windows only; Mackie lists it on backorder. $299.99 direct.',
    desc_es:'Interfaz de streaming + captura de vídeo en un cable USB-C: combo XLR/TRS con +48 V (60 dB), captura HDMI 1080p60 con paso 4K60, 6 teclas programables y software Matrix gratis (6 entradas virtuales, 24 pads). Matrix solo Windows; Mackie lo lista bajo pedido. $299,99 directo.',
    img:'https://mackie.com/img/pic_hero_line/mainstream.png',
    stores:{
      gear4music:'https://www.gear4music.com/Recording-and-Computers/Mackie-MainStream-Streaming-Interface/651X',
      zzounds:'https://www.zzounds.com/item--MACMAINSTREAM'
    } }
);
ps.sort(function(a,b){return a.id-b.id;});
fs.writeFileSync(BASE+'data/products.json',JSON.stringify(ps,null,2));
console.log('catalog: 261 out, 659+660+661 in');

// ============ 2. build-guides.js TEST blocks ============
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
delBlock(261);
addAfter(265,'  659: {\n    prices: {\n      gear4music: "£110.25",\n      musicstore: "€132.80",\n      andertons: "£153.00"\n    },\n    urls: {\n      gear4music: "https://www.gear4music.com/Recording-and-Computers/TC-Helicon-GoXLR-Mini/3R1T",\n      amazon: "https://www.amazon.com/Helicon-Online-Broadcast-Interface-Preamp/dp/B07XH41DLN",\n      musicstore: "https://www.musicstore.com/en_OE/EUR/TC-Helicon-GoXLR-Mini/art-REC0014497-000",\n      zzounds: "https://www.zzounds.com/item--TCEGOXLRMINI",\n      andertons: "https://www.andertons.co.uk/tc-helicon-go-xlr-mini-in-white/"\n    },\n    oos: ["zzounds","andertons"]\n  },\n  660: {\n    urls: {\n      amazon: "https://www.amazon.com/Yamaha-Gaming-Mixer-Voice-Streaming/dp/B0CQZ25H1M"\n    }\n  },\n  661: {\n    urls: {\n      gear4music: "https://www.gear4music.com/Recording-and-Computers/Mackie-MainStream-Streaming-Interface/651X",\n      zzounds: "https://www.zzounds.com/item--MACMAINSTREAM"\n    }\n  },');
fs.writeFileSync(b,src);
console.log('TEST: 261 out, 659+660+661 in');

// ============ 3. guides.json surgery ============
var d=JSON.parse(fs.readFileSync(BASE+'data/guides.json','utf8'));
var g=d.find(function(x){return x.id==='stream-controllers';});
assert(g,'guide missing');

// 3a. remove BEACN Mix Create section
var n0=g.sections.length;
g.sections=g.sections.filter(function(s){return (s.products||[]).indexOf(261)===-1;});
assert(g.sections.length===n0-1,'BEACN section not removed');

// 3b. chooser: drop 261, add new ids, rewrite BEACN mentions
var ch=g.sections[0];
ch.products=[243,246,260,264,659,660,661];
ch.content="<p><strong>A streaming mixer is the physical brain of your stream audio.</strong> It keeps your mic, your game, your music and your chat on separate channels so viewers hear a clean mix instead of one giant muddled blob. Most people start with cheap software routing and buy a real unit the first time something goes wrong mid-stream.</p><p><strong>First, pick the shape.</strong> Do you want a controller that drives your existing software, a dedicated mixer that processes audio, or all-in-one box? The Elgato Stream Deck+ is the best-selling controller, period — it sits next to whatever you already own and gives you buttons and dials for everything. The TC Helicon GoXLR Mini is the streamer-first mixer with real faders, a Midas preamp and per-app routing. The Yamaha ZG02 puts game, chat and mic on physical knobs for console and PC players. The Mackie MainStream merges interface and HDMI capture in one USB-C cable. The Streamer X throws an interface and a 4K capture card into the same compact box. And the Wave XLR is just a really good mic interface that plugs into the Elgato world.</p><p><strong>Now check the software, because that is what you will live with.</strong> All of these run through desktop apps, and that app shapes your whole workflow. The one you enjoy using every single day is the one you will keep on your desk. Note the OS limits: GoXLR Mini and MainStream Matrix are Windows only, while Yamaha ZG Controller runs on Windows and Mac.</p>";
ch.content_es="<p><strong>Un mezclador de streaming es el cerebro físico del audio de tu directo.</strong> Mantiene el micrófono, tu juego, tu música y tu chat en canales separados para que los espectadores escuchen una mezcla limpia en lugar de un pegote embarrado. La mayoría empieza con enrutamiento barato por software y compra un aparato la primera vez que algo falla en pleno directo.</p><p><strong>Primero, elige la forma.</strong>¿Quieres un controlador que maneje el software existente, un mezclador dedicado que procese audio, o una caja todo-en-uno? El Elgato Stream Deck+ es el controlador más vendido, sin discusión — se coloca junto a lo que ya tengas y te da botones y diales para todo. El TC Helicon GoXLR Mini es el mezclador de streamers con faders reales, previo Midas y enrutamiento por app. El Yamaha ZG02 pone juego, chat y micro en perillas físicas para jugadores de consola y PC. El Mackie MainStream fusiona interfaz y captura HDMI en un cable USB-C. El Streamer X mete una interfaz y una tarjeta de captura 4K en la misma caja compacta. Y el Wave XLR es simplemente una interfaz de micrófono muy buena que se enchufa al mundo Elgato.</p><p><strong>Ahora revisa el software, porque es con lo que vas a convivir.</strong> Todos se manejan desde apps de escritorio, y esa app define todo tu proceso. La que disfrutes usando cada día es la que terminarás dejando en tu escritorio. Ojo con los sistemas: GoXLR Mini y Matrix de MainStream solo van en Windows, mientras ZG Controller va en Windows y Mac.</p>";

// 3c. Streamer X section: drop BEACN ecosystem mention
var sx=g.sections.find(function(s){return (s.products||[]).indexOf(244)>-1;});
if(sx){
  sx.content=sx.content.replace('the Elgato or BEACN ecosystems are the safer bet','the Elgato ecosystem is the safer bet');
  sx.content_es=sx.content_es.replace('el ecosistema Elgato o BEACN es más fiable','el ecosistema Elgato es más fiable');
}

// 3d. table: drop cols 8,7,2 (Loupedeck, BEACN Mix, BEACN Mix Create)
var cols=g.productTable.columns.map(function(c){return c.title;});
console.log('cols before: '+cols.join(' | '));
assert(cols[2]==='BEACN Mix Create','col2 mismatch: '+cols[2]);
assert(cols[7]==='BEACN Mix','col7 mismatch: '+cols[7]);
assert(cols[8]==='Loupeedeck Live S','col8 mismatch: '+cols[8]);
[8,7,2].forEach(function(i){
  g.productTable.columns.splice(i,1);
  g.productTable.rows.forEach(function(r){r.values.splice(i,1);});
});
console.log('cols mid: '+g.productTable.columns.map(function(c){return c.title;}).join(' | '));

// 3e. add 3 new columns + row values
g.productTable.columns.push(
  {title:'TC Helicon GoXLR Mini',title_es:'TC Helicon GoXLR Mini'},
  {title:'Yamaha ZG02',title_es:'Yamaha ZG02'},
  {title:'Mackie MainStream',title_es:'Mackie MainStream'}
);
var newVals={
  'Best For':[['Stream mixing with real faders + voice FX','Mezcla de stream con faders reales + FX de voz'],['Game streaming with chat mix','Game streaming con mezcla de chat'],['Video + audio streaming in one box','Vídeo + audio en una caja']],
  'Type':[['4-channel USB streaming mixer','Mezclador USB de 4 canales'],['Compact game streaming mixer','Mezclador compacto de juego'],['Streaming + video capture interface','Interfaz de streaming + captura de vídeo']],
  'Mic Gain':[['Midas preamp (+24 V phantom)','Previo Midas (phantom +24 V)'],['XLR combo +48 V phantom','Combo XLR + phantom 48 V'],['XLR/TRS combo +48 V (60 dB)','Combo XLR/TRS +48 V (60 dB)']],
  'Video Capture':[['No','No'],['No','No'],['1080p60 capture / 4K60 passthrough','Captura 1080p60 / paso 4K60']],
  'Keys / Controls':[['4 faders + cough/censor buttons','4 faders + botones de tos/censura'],['Game/chat/mic knobs + voice/game FX','Perillas juego/chat/micro + FX de voz/juego'],['6 programmable keys + Matrix pads','6 teclas programables + pads Matrix']],
  'Connectivity':[['USB (Windows only)','USB (solo Windows)'],['USB-C PC/Mac + console USB','USB-C PC/Mac + USB de consola'],['Single USB-C, HDMI in, USB-C hub','Un USB-C, HDMI in, hub USB-C']],
  'Software':[['GoXLR app (Windows only)','App GoXLR (solo Windows)'],['ZG Controller (Win/Mac)','ZG Controller (Win/Mac)'],['Matrix (Windows)','Matrix (Windows)']],
  'Estimated Price':[['~$189','~$189'],['~$199.95','~$199,95'],['~$299.99','~$299,99']]
};
Object.keys(newVals).forEach(function(label){
  var r=g.productTable.rows.find(function(x){return x.label===label;});
  assert(r,'row '+label+' missing');
  if(!r)return;
  newVals[label].forEach(function(v){r.values.push({value:v[0],value_es:v[1]});});
});
console.log('cols final: '+g.productTable.columns.map(function(c){return c.title;}).join(' | '));

// 3f. verdictProsCons: drop BEACN x2 + Loupedeck, add 3
g.verdictProsCons=g.verdictProsCons.filter(function(v){return v.name!=='BEACN Mix Create'&&v.name!=='BEACN Mix'&&v.name!=='Loupeedeck Live S';});
function vpc(n,ne,p,c,pe,ce){return{name:n,name_es:ne,pros:p,cons:c,pros_es:pe,cons_es:ce};}
g.verdictProsCons.push(
  vpc('TC Helicon GoXLR Mini','TC Helicon GoXLR Mini',
    ['Four assignable faders with Midas preamp — real hands-on stream mixing','12 virtual sound cards give every app its own fader','Onboard DSP EQ, compressor and gate, no CPU load','Cough and censor buttons keep broadcasts clean'],
    ['Windows only — no macOS support at all','No sampler soundboard (that is the full-size GoXLR)','+24 V phantom, not full +48 V for hungry condensers','zZounds and Andertons listings are out of stock as checked'],
    ['Cuatro faders asignables con previo Midas — mezcla real con las manos','12 tarjetas virtuales dan un fader a cada app','EQ, compresor y puerta DSP a bordo, sin cargar la CPU','Botones de tos y censura mantienen limpio el directo'],
    ['Solo Windows — sin soporte macOS','Sin sampler de sonidos (eso es el GoXLR grande)','Phantom +24 V, no +48 V completos para condensadores exigentes','Listados de zZounds y Andertons agotados al revisar']),
  vpc('Yamaha ZG02','Yamaha ZG02',
    ['Game, chat and mic on physical knobs — mix without looking','XLR combo with +48 V phantom plus headset mic input','Direct USB to PS5/Switch plus PC/Mac, Stream Deck compatible','Voice changer, game FX and 3D surround at $199.95 MSRP'],
    ['No HDMI switching — that is the bigger ZG01','Fewer one-touch buttons than the ZG01','Consoles need a separate power supply (single USB powers PC only)','Thin coverage in our stores — Amazon is the verified link'],
    ['Juego, chat y micro en perillas físicas — mezcla sin mirar','Combo XLR con phantom +48 V más entrada de headset','USB directo a PS5/Switch más PC/Mac, compatible con Stream Deck','Cambia-voces, FX de juego y surround 3D por $199,95 PVP'],
    ['Sin conmutación HDMI — eso es el ZG01 grande','Menos botones directos que el ZG01','Las consolas piden fuente aparte (un USB solo alimenta en PC)','Cobertura fina en tiendas — Amazon es el enlace verificado']),
  vpc('Mackie MainStream','Mackie MainStream',
    ['XLR/TRS combo with +48 V and 60 dB — drives an SM7B class mic','HDMI 1080p60 capture with 4K60 passthrough for consoles','6 programmable keys plus free Matrix software (6 virtual inputs, 24 pads)','One USB-C cable to the PC, bus powered'],
    ['Matrix software is Windows only','Mackie lists it on backorder — stock comes and goes','1080p capture only, no 4K recording like the Streamer X','No motorized faders for tactile mixing'],
    ['Combo XLR/TRS con +48 V y 60 dB — mueve un micro clase SM7B','Captura HDMI 1080p60 con paso 4K60 para consolas','6 teclas programables más software Matrix gratis (6 entradas virtuales, 24 pads)','Un cable USB-C al PC, alimentado por bus'],
    ['El software Matrix solo va en Windows','Mackie lo lista bajo pedido — el stock va y viene','Captura 1080p, sin grabación 4K como el Streamer X','Sin faders motorizados para mezcla táctil'])
);
console.log('vpc: '+g.verdictProsCons.map(function(v){return v.name;}).join(' | '));

// 3g. new sections
function SEC(h,hes,c,ces,prods){return{heading:h,heading_es:hes,content:c,content_es:ces,products:prods};}
g.sections.push(
  SEC('Real Faders for Stream Audio: TC Helicon GoXLR Mini',
    'Faders de verdad para el directo: TC Helicon GoXLR Mini',
    '<strong>The king of stream mixers is still a GoXLR.</strong> The TC Helicon GoXLR Mini gives streamers what controllers never will: four physical faders riding real audio, driven by the same ultra-low-noise Midas preamp as the full-size GoXLR with phantom power. It creates 12 virtual sound cards on the PC, so game, chat, music and system each get their own fader, while onboard DSP EQ, compressor and gate keep the voice broadcast-ready with zero CPU load. Cough and censor buttons sit under the thumb for sponsor-safe slip-ups.</p><p><strong>The honest trade.</strong> Windows only — macOS streamers need not apply — there is no sampler soundboard on the Mini, and phantom runs at +24 V rather than full +48 V. At ~$189 street with stock in major stores, it remains the default answer for hands-on stream audio.',
    '<strong>El rey de los mezcladores de stream sigue siendo un GoXLR.</strong> El TC Helicon GoXLR Mini da a los streamers lo que ningún controlador dará: cuatro faders físicos sobre audio real, con el mismo previo Midas de ruido ultrabajo que el GoXLR grande y phantom. Crea 12 tarjetas virtuales en el PC, así juego, chat, música y sistema tienen cada uno su fader, mientras EQ, compresor y puerta DSP a bordo dejan la voz lista sin cargar la CPU. Los botones de tos y censura quedan bajo el pulgar para meteduras a prueba de sponsors.</p><p><strong>El trato honesto.</strong> Solo Windows — los de macOS abstenerse — no hay sampler en el Mini, y el phantom va a +24 V en vez de +48 V completos. Por ~$189 en calle con stock en tiendas grandes, sigue siendo la respuesta por defecto para audio de stream con las manos.',
    [659]),
  SEC('Game, Chat and Mic on Knobs: Yamaha ZG02',
    'Juego, chat y micro en perillas: Yamaha ZG02',
    '<strong>Console and PC gamers mix three things all night: game, chat and mic.</strong> The Yamaha ZG02 puts exactly those on physical knobs in a compact box: an XLR combo with +48 V phantom plus headset input, USB-C to PC or Mac and a dedicated USB port straight into PS5 or Switch, with voice changer, game effects and 3D surround on top. The ZG Controller app (Windows/Mac) handles the deep settings, and it even plays nice with an Elgato Stream Deck beside it. At $199.95 MSRP it undercuts the HDMI-equipped ZG01 while keeping the parts streamers actually touch.</p><p><strong>The honest trade.</strong> No HDMI switching, fewer one-touch buttons than the ZG01, and consoles need a separate power supply. Retail coverage is thin — Amazon is the verified buy link. For multiplayer nights where chat balance decides the game, the knobs beat menus every time.',
    '<strong>Los jugadores de consola y PC mezclan tres cosas toda la noche: juego, chat y micro.</strong> El Yamaha ZG02 pone justo eso en perillas físicas en una caja compacta: combo XLR con phantom +48 V más entrada de headset, USB-C a PC o Mac y puerto USB dedicado directo a PS5 o Switch, con cambia-voces, efectos de juego y surround 3D encima. La app ZG Controller (Windows/Mac) lleva los ajustes profundos, y hasta se entiende con un Stream Deck al lado. Por $199,95 PVP queda bajo el ZG01 con HDMI quedándose con lo que los streamers tocan de verdad.</p><p><strong>El trato honesto.</strong> Sin conmutación HDMI, menos botones que el ZG01, y las consolas piden fuente aparte. La cobertura en tiendas es fina — Amazon es el enlace verificado. Para noches multijugador donde el balance del chat decide la partida, las perillas ganan a los menús siempre.',
    [660]),
  SEC('Video and Audio in One Cable: Mackie MainStream',
    'Vídeo y audio en un cable: Mackie MainStream',
    '<strong>Console streamers hate the three-box shuffle: interface, capture card, controller.</strong> The Mackie MainStream eats all three: an XLR/TRS combo with +48 V and 60 dB of gain, HDMI input capturing 1080p60 with 4K60 passthrough for Switch, Xbox and PlayStation, and 6 programmable keys on the face — all reaching the PC through a single bus-powered USB-C cable with a dual USB-C hub for the rest of the desk. The free Matrix software adds 6 virtual inputs like Discord or Spotify and 24 virtual pads for samples and transitions.</p><p><strong>The honest trade.</strong> Matrix is Windows only, Mackie currently lists the unit on backorder so stock comes and goes, and capture tops at 1080p where the Streamer X records 4K. At $299.99 direct it is the one-cable answer for console-to-Twitch desks.',
    '<strong>Los streamers de consola odian el baile de tres cajas: interfaz, capturadora, controlador.</strong> El Mackie MainStream se come las tres: combo XLR/TRS con +48 V y 60 dB, HDMI capturando 1080p60 con paso 4K60 para Switch, Xbox y PlayStation, y 6 teclas programables en el frontal — todo llegando al PC por un solo USB-C alimentado por bus con hub dual para el resto del escritorio. El software Matrix gratis añade 6 entradas virtuales como Discord o Spotify y 24 pads para samples y transiciones.</p><p><strong>El trato honesto.</strong> Matrix solo va en Windows, Mackie lo lista bajo pedido así que el stock va y viene, y la captura topa en 1080p donde el Streamer X graba 4K. Por $299,99 directo es la respuesta de un cable para escritorios de consola a Twitch.',
    [661])
);

// 3h. featured, conclusion, verdict, intro, description, FAQ, snippet
g.featuredProducts=[243,244,246,239,240,327,264,659,660,661];
function tailOf(s){var i=s.indexOf('<p>');return i>-1?s.slice(i):'';}
var cT=tailOf(g.conclusion),cET=tailOf(g.conclusion_es);
g.conclusion='If you want your hands on everything, get the Stream Deck+ — nothing else makes your whole stream so instantly controllable. If you want real faders on stream audio, the <strong>TC Helicon GoXLR Mini</strong> is the streamer-first pick with a Midas preamp and per-app routing. If you play on console or PC with voice chat, the <strong>Yamaha ZG02</strong> puts game, chat and mic on knobs. If you want one cable for console video and audio, the <strong>Mackie MainStream</strong> merges interface and HDMI capture. If you stream from a console and want one compact box that does audio and video, the Streamer X is the value pick. And if you just need your mic to sound remarkable, the Wave XLR MK.2 delivers. There is no wrong answer here — it comes down to which workflow feels like yours. '+cT;
g.conclusion_es='Si quieres tenerlo todo al alcance de la mano, compra el Stream Deck+ — nada hace tu directo tan instantáneamente controlable. Si quieres faders reales en el audio, el <strong>TC Helicon GoXLR Mini</strong> es la opción de streamers con previo Midas y enrutamiento por app. Si juegas en consola o PC con chat de voz, el <strong>Yamaha ZG02</strong> pone juego, chat y micro en perillas. Si quieres un cable para vídeo y audio de consola, el <strong>Mackie MainStream</strong> fusiona interfaz y captura HDMI. Si transmites desde una consola y quieres una caja compacta que haga audio y vídeo, el Streamer X es la opción de valor. Y si solo necesitas que el micrófono suene notable, el Wave XLR MK.2 lo logra. No hay respuesta equivocada aquí — todo se reduce a qué flujo de trabajo se adapta mejor a ti. '+cET;
g.verdict='The Stream Deck+ is the total control pick with buttons, dials and a touch strip for every stream setup. The GoXLR Mini is the streamer-first mixer with real faders and a Midas preamp, the Yamaha ZG02 is the gamer pick with game/chat/mic on knobs, and the Mackie MainStream is the one-cable console pick with HDMI capture. The Streamer X stays the 4K value box and the Wave XLR MK.2 the mic upgrade. Match the tool to how you stream.';
g.verdict_es='El Stream Deck+ es la mejor opción para control total con botones, perillas y tira táctil para cualquier configuración de streaming. El GoXLR Mini es el mezclador de streamers con faders reales y previo Midas, el Yamaha ZG02 es la opción gamer con juego/chat/micro en perillas, y el Mackie MainStream es la opción de un cable para consolas con captura HDMI. El Streamer X sigue siendo la caja 4K de valor y el Wave XLR MK.2 la mejora de micro. Haz coincidir la herramienta con cómo haces streaming.';
g.intro='Streaming sound is 90% routing, and the gear below turns that routing into something you can grab with your hands. The Stream Deck+, the GoXLR Mini, the Yamaha ZG02, the Mackie MainStream, the Streamer X and the Wave XLR are the top streaming controllers and mixers — here is what each one does best.';
g.intro_es='El sonido del streaming es 90% enrutamiento, y el equipo de abajo convierte ese enrutamiento en algo que puedes tocar con las manos. El Stream Deck+, el GoXLR Mini, el Yamaha ZG02, el Mackie MainStream, el Streamer X y el Wave XLR son los mejores controladores y mezcladores de streaming — esto es lo que hace cada uno.';
g.description='In 2026, I swapped the Stream Deck+, GoXLR Mini, Yamaha ZG02, Mackie MainStream, Rode Streamer X and Wave XLR MK. Here is which stream controller or mixer to buy and why, before';
g.description_es='En 2026, Pasé semanas intercambiando el Stream Deck+, el GoXLR Mini, el Yamaha ZG02, el Mackie MainStream, el Streamer X y el Wave XLR MK. Lee el veredicto completo y los precios';
var F=g.featuredSnippet;
F.text_en='The Stream Deck+ is the best-selling controller with 8 LCD keys, 4 dials and a touch strip. The GoXLR Mini brings real faders and a Midas preamp to stream mixing. The Yamaha ZG02 puts game, chat and mic on knobs for console and PC players. The Mackie MainStream merges interface and HDMI capture in one USB-C cable. The Streamer X packs an interface, 4K capture and a control surface into one box. The Wave XLR MK.2 adds broadcast-grade mic audio to any XLR mic.';
F.text_es='El Stream Deck+ es el controlador más vendido con 8 teclas LCD, 4 diales y una tira táctil. El GoXLR Mini trae faders reales y previo Midas a la mezcla de stream. El Yamaha ZG02 pone juego, chat y micro en perillas para jugadores de consola y PC. El Mackie MainStream fusiona interfaz y captura HDMI en un cable USB-C. El Streamer X mete interfaz, captura 4K y superficie de control en una sola caja. El Wave XLR MK.2 añade audio de micrófono de nivel broadcast a cualquier micrófono XLR.';
F.faq_a1_en='It depends on your workflow. The Elgato Stream Deck+ is the best-selling controller for hands-on control of your entire stream. The TC Helicon GoXLR Mini is the streamer-first mixer with real faders, a Midas preamp and per-app routing. For console and PC gamers, the Yamaha ZG02 puts game, chat and mic on physical knobs. If you want an all-in-one mixer that runs its processing on the hardware itself, the RØDECaster Pro II and the Mackie DLZ Creator are the professional picks.';
F.faq_a1_es='Depende de tu flujo de trabajo. El Elgato Stream Deck+ es el controlador más vendido para control total del directo. El TC Helicon GoXLR Mini es el mezclador de streamers con faders reales, previo Midas y enrutamiento por app. Para jugadores de consola y PC, el Yamaha ZG02 pone juego, chat y micro en perillas físicas. Si buscas un mezclador todo-en-uno que corra su procesamiento en el propio hardware, el RØDECaster Pro II y el Mackie DLZ Creator son las opciones profesionales.';
F.faq_a4_en='All of them integrate with OBS, but the GoXLR Mini is the most hands-on routing option, feeding OBS from per-app faders with no scene-level setup. The Stream Deck+ is the best controller for OBS scene switching thanks to its huge plugin library. The Streamer X and Wave XLR route through Rode UNIFY and Elgato Wave Link respectively, and both feed OBS through the app\'s virtual channels.';
F.faq_a4_es='Todos se integran con OBS, pero el GoXLR Mini es la opción de enrutamiento más manual, enviando a OBS desde faders por app sin configuración a nivel de escena. El Stream Deck+ es el mejor controlador para cambiar escenas en OBS gracias a su enorme biblioteca de plugins. El Streamer X y el Wave XLR enrutan a través de Rode UNIFY y Elgato Wave Link respectivamente, y ambos envían a OBS por los canales virtuales de la app.';
F.faq_q5_en='Is the TC Helicon GoXLR Mini worth it?';
F.faq_a5_en='Yes, for streamers who want real faders on stream audio. The GoXLR Mini manages per-app routing with 12 virtual sound cards, a Midas preamp and onboard DSP. The trade-offs are Windows-only software, no sampler soundboard and +24 V phantom instead of full +48 V.';
F.faq_q5_es='¿Merece la pena el TC Helicon GoXLR Mini?';
F.faq_a5_es='Sí, para streamers que quieren faders reales en el audio. El GoXLR Mini gestiona el enrutamiento por app con 12 tarjetas virtuales, previo Midas y DSP a bordo. Las contrapartidas son software solo Windows, sin sampler y phantom +24 V en vez de +48 V completos.';

fs.writeFileSync(BASE+'data/guides.json',JSON.stringify(d,null,2));
console.log('guide done: sections='+g.sections.length);
if(fails.length){console.log('FAIL:\n'+fails.join('\n'));process.exit(1);}
console.log('DONE');
