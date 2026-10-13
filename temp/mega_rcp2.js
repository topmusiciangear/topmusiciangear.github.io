var fs=require('fs');
var BASE='C:/Users/Daniel/projects/topmusiciangear/';
var fails=[];
function assert(c,m){if(!c)fails.push(m);}

// ============ 1. products.json: 248 photo, delete 660 ============
var ps=JSON.parse(fs.readFileSync(BASE+'data/products.json','utf8'));
var rcp=ps.find(function(x){return x.id===248;});
assert(rcp,'248 missing');
rcp.img='https://r2.gear4music.com/media/82/829851/1200/preview_2.jpg';
assert(ps.find(function(x){return x.id===660;}),'660 missing?');
ps=ps.filter(function(x){return x.id!==660;});
fs.writeFileSync(BASE+'data/products.json',JSON.stringify(ps,null,2));
console.log('catalog: 248 photo, 660 out');

// ============ 2. build-guides.js: delete TEST 660 ============
var b=BASE+'build-guides.js';
var src=fs.readFileSync(b,'utf8');
(function delBlock(id){
  var key='\n  '+id+': {',i=src.indexOf(key);
  assert(i>-1,'BLOCK '+id+' NOT FOUND');
  if(i===-1)return;
  var j=src.indexOf('{',i),depth=0,k=j;
  while(k<src.length){if(src[k]==='{')depth++;else if(src[k]==='}'){if(--depth===0)break;}k++;}
  var end=k+1;if(src[end]===',')end++;
  src=src.slice(0,i)+src.slice(end);
})(660);
fs.writeFileSync(b,src);
console.log('TEST: 660 out');

// ============ 3. guides.json surgery ============
var d=JSON.parse(fs.readFileSync(BASE+'data/guides.json','utf8'));
var g=d.find(function(x){return x.id==='stream-controllers';});
assert(g,'guide missing');

// 3a. remove ZG02 section
var n0=g.sections.length;
g.sections=g.sections.filter(function(s){return (s.products||[]).indexOf(660)===-1;});
assert(g.sections.length===n0-1,'ZG02 section not removed');

// 3b. chooser products -> the 10
g.sections[0].products=[243,244,246,264,659,248,661,260,240,327];

// 3c. table: drop Deck MK.2 (4), Razer X (5), ZG02 (7) — from end first
var cols=g.productTable.columns.map(function(c){return c.title;});
console.log('cols before: '+cols.join(' | '));
assert(cols[4]==='Elgato Stream Deck MK.2','col4: '+cols[4]);
assert(cols[5]==='Razer Stream Controller X','col5: '+cols[5]);
assert(cols[7]==='Yamaha ZG02','col7: '+cols[7]);
[7,5,4].forEach(function(i){
  g.productTable.columns.splice(i,1);
  g.productTable.rows.forEach(function(r){r.values.splice(i,1);});
});
console.log('cols mid: '+g.productTable.columns.map(function(c){return c.title;}).join(' | '));

// 3d. append RCP2, Wave Pro, Bridge, Maono
g.productTable.columns.push(
  {title:'Rode RODECaster Pro II',title_es:'Rode RODECaster Pro II'},
  {title:'Elgato Wave XLR Pro',title_es:'Elgato Wave XLR Pro'},
  {title:'Roland Bridge Cast X',title_es:'Roland Bridge Cast X'},
  {title:'Maono Maonocaster E2 Gen2',title_es:'Maono Maonocaster E2 Gen2'}
);
var newVals={
  'Best For':[['All-in-one broadcast console','Consola broadcast todo-en-uno'],['Dual-mic streaming hardware mixes','Mezclas hardware para dos micros'],['Console + PC game streaming','Streaming de consola + PC'],['Budget podcasting on battery','Pódcast económico con batería']],
  'Type':[['Production console + interface','Consola de producción + interfaz'],['Dual-XLR interface + hardware mixer','Interfaz dual-XLR + mezclador hardware'],['Dual-bus streaming mixer + capture','Mezclador dual-bus + captura'],['All-in-one podcast console','Consola pódcast todo-en-uno']],
  'Mic Gain':[['4x Neutrik combo, 76dB Revolution','4x combo Neutrik, 76dB Revolution'],['2x 80dB ultra-low-noise','2x 80dB ultrabaja en ruido'],['XLR + phantom power','XLR + phantom'],['2x XLR combo (60 dB)','2x combo XLR (60 dB)']],
  'Video Capture':[['No','No'],['No','No'],['HDMI capture','Captura HDMI'],['No','No']],
  'Keys / Controls':[['6 faders + 8 SMART pads + touchscreen','6 faders + 8 pads SMART + táctil'],['Dual dials + tap-to-mute','Diales duales + silencio táctil'],['Assignable pads + dual buses','Pads asignables + buses duales'],['8 sound pads + faders','8 pads de sonido + faders']],
  'Connectivity':[['Dual USB-C, BT, WiFi, microSD','Doble USB-C, BT, WiFi, microSD'],['Dual USB-C, 2x XLR, headphone','Doble USB-C, 2x XLR, auriculares'],['USB-C, HDMI in/out','USB-C, HDMI entrada/salida'],['USB, Bluetooth, 8h battery','USB, Bluetooth, batería 8h']],
  'Software':[['Onboard (Rode Central setup)','A bordo (ajuste Rode Central)'],['Wave Link + onboard DSP/VST','Wave Link + DSP/VST a bordo'],['Roland Bridge Cast app','App Roland Bridge Cast'],['Maono app','App Maono']],
  'Estimated Price':[['~$595','~$595'],['~$349.99','~$349,99'],['~$499','~$499'],['~$109.97','~$109,97']]
};
Object.keys(newVals).forEach(function(label){
  var r=g.productTable.rows.find(function(x){return x.label===label;});
  assert(r,'row '+label+' missing');
  if(!r)return;
  newVals[label].forEach(function(v){r.values.push({value:v[0],value_es:v[1]});});
});
console.log('cols final: '+g.productTable.columns.map(function(c){return c.title;}).join(' | '));

// 3e. verdictProsCons: drop MK.2, Razer, Tascam, ZG02; add RCP2
g.verdictProsCons=g.verdictProsCons.filter(function(v){return v.name!=='Elgato Stream Deck MK.2'&&v.name!=='Razer Stream Controller X'&&v.name!=='Tascam Stream Controller'&&v.name!=='Yamaha ZG02';});
function vpc(n,ne,p,c,pe,ce){return{name:n,name_es:ne,pros:p,cons:c,pros_es:pe,cons_es:ce};}
g.verdictProsCons.push(
  vpc('Rode RODECaster Pro II','Rode RODECaster Pro II',
    ['Four Neutrik combo inputs with 76dB Revolution preamps','Six faders plus 8 SMART pads (64 actions) and 5.5-inch touchscreen','APHEX processing with per-channel EQ, gate and de-esser','Dual USB-C, Bluetooth, WiFi and microSD multitrack — runs without a PC'],
    ['No motorized faders at this price','Real learning curve plus firmware quirks reported by owners','~$595 is pro money for single-mic streamers','Overkill if you only need one mic and OBS'],
    ['Cuatro entradas combo Neutrik con previos Revolution de 76dB','Seis faders más 8 pads SMART (64 acciones) y táctil de 5,5 pulgadas','Proceso APHEX con EQ, puerta y de-esser por canal','Doble USB-C, Bluetooth, WiFi y multipista microSD — va sin PC'],
    ['Sin faders motorizados a este precio','Curva real de aprendizaje más fallos de firmware reportados','~$595 es dinero pro para streamers de un micro','Excesivo si solo necesitas un micro y OBS'])
);
console.log('vpc: '+g.verdictProsCons.map(function(v){return v.name;}).join(' | '));

// 3f. new sections: RCP2 + Wave Pro
function SEC(h,hes,c,ces,prods){return{heading:h,heading_es:hes,content:c,content_es:ces,products:prods};}
g.sections.push(
  SEC('The Console That Replaces Three Boxes: Rode RODECaster Pro II',
    'La consola que sustituye tres cajas: Rode RODECaster Pro II',
    '<strong>When the stream is the job, the mixer cannot depend on the PC.</strong> The Rode RODECaster Pro II processes everything on hardware: four Neutrik combo inputs with 76dB Revolution preamps, six physical faders plus three virtual ones, eight SMART pads with 64 assignable actions, and studio-grade APHEX chains with per-channel EQ, gate and de-esser under a 5.5-inch touchscreen. Dual USB-C hangs two computers at once, Bluetooth and WiFi take phone calls, and multitrack records to microSD or USB with no computer attached.</p><p><strong>The honest trade.</strong> No motorized faders, a genuine learning curve with occasional firmware quirks, and ~$595 of pro money. For single-mic streamers it is overkill — for broadcast desks that must survive a frozen PC, it is the desk.',
    '<strong>Cuando el directo es el trabajo, la mesa no puede depender del PC.</strong> El Rode RODECaster Pro II procesa todo en hardware: cuatro entradas combo Neutrik con previos Revolution de 76dB, seis faders físicos más tres virtuales, ocho pads SMART con 64 acciones, y cadenas APHEX con EQ, puerta y de-esser por canal bajo una táctil de 5,5 pulgadas. El doble USB-C cuelga dos ordenadores a la vez, Bluetooth y WiFi toman llamadas, y la multipista graba a microSD o USB sin ordenador.</p><p><strong>El trato honesto.</strong> Sin faders motorizados, curva real de aprendizaje con algún fallo de firmware, y ~$595 de dinero pro. Para streamers de un micro es excesivo — para escritorios broadcast que deben sobrevivir a un PC congelado, es LA mesa.',
    [248]),
  SEC('Two Mics, Zero Compromises: Elgato Wave XLR Pro',
    'Dos micros, cero concesiones: Elgato Wave XLR Pro',
    '<strong>Co-hosted shows break single-channel interfaces.</strong> The Elgato Wave XLR Pro doubles the MK.2 formula: two studio-grade preamps with up to 80dB of clean gain each, so gain-hungry dynamics need no Cloudlifter on either channel. The Wave FX Processor runs five independent hardware mixes with zero-latency monitoring, Clipguard 2.0, onboard DSP effects plus VST support, dual USB-C for a second PC or console, and a standalone mode that keeps settings alive with no computer attached.</p><p><strong>The honest trade.</strong> Bigger, pricier (~$349.99) and still desk-bound — no faders, no capture, no scenes. For duos who outgrew one dial, it is the straight upgrade inside the Elgato world.',
    '<strong>Los programas con dos voces rompen las interfaces de un canal.</strong> El Elgato Wave XLR Pro dobla la fórmula del MK.2: dos previos de estudio con hasta 80dB de ganancia limpia cada uno, así que los dinámicos hambrientos no piden Cloudlifter en ningún canal. El Wave FX Processor ejecuta cinco mezclas hardware independientes con monitoreo de latencia cero, Clipguard 2.0, DSP a bordo más VST, doble USB-C para segundo PC o consola, y modo independiente que mantiene los ajustes sin ordenador.</p><p><strong>El trato honesto.</strong> Más grande, más caro (~$349,99) y aún de escritorio — sin faders, sin captura, sin escenas. Para dúos que superaron un dial, es la mejora directa dentro del mundo Elgato.',
    [260])
);

// 3g. featured = user's 10
g.featuredProducts=[243,246,260,264,659,248,661,244,240,327];

// 3h. intro / conclusion / verdict / description / snippet / FAQ (ZG02 -> RCP2, gamers -> Bridge)
g.intro='Streaming sound is 90% routing, and the gear below turns that routing into something you can grab with your hands. The Stream Deck+, the GoXLR Mini, the RODECaster Pro II, the Mackie MainStream, the Streamer X and the Wave XLR are the top streaming controllers and mixers — here is what each one does best.';
g.intro_es='El sonido del streaming es 90% enrutamiento, y el equipo de abajo convierte ese enrutamiento en algo que puedes tocar con las manos. El Stream Deck+, el GoXLR Mini, el RODECaster Pro II, el Mackie MainStream, el Streamer X y el Wave XLR son los mejores controladores y mezcladores de streaming — esto es lo que hace cada uno.';
function tailOf(s){var i=s.indexOf('<p>');return i>-1?s.slice(i):'';}
var cT=tailOf(g.conclusion),cET=tailOf(g.conclusion_es);
g.conclusion='If you want your hands on everything, get the Stream Deck+ — nothing else makes your whole stream so instantly controllable. If you want real faders on stream audio, the <strong>TC Helicon GoXLR Mini</strong> is the streamer-first pick with a Midas preamp and per-app routing. If you want the whole broadcast on hardware, the <strong>Rode RODECaster Pro II</strong> runs 4 Neutrik inputs with SMART pads and APHEX. If you want one cable for console video and audio, the <strong>Mackie MainStream</strong> merges interface and HDMI capture. If you stream from a console and want one compact box that does audio and video, the Streamer X is the value pick. And if you just need your mic to sound remarkable, the Wave XLR MK.2 delivers. There is no wrong answer here — it comes down to which workflow feels like yours. '+cT;
g.conclusion_es='Si quieres tenerlo todo al alcance de la mano, compra el Stream Deck+ — nada hace tu directo tan instantáneamente controlable. Si quieres faders reales en el audio, el <strong>TC Helicon GoXLR Mini</strong> es la opción de streamers con previo Midas y enrutamiento por app. Si quieres todo el programa en hardware, el <strong>Rode RODECaster Pro II</strong> lleva 4 entradas Neutrik con pads SMART y APHEX. Si quieres un cable para vídeo y audio de consola, el <strong>Mackie MainStream</strong> fusiona interfaz y captura HDMI. Si transmites desde una consola y quieres una caja compacta que haga audio y vídeo, el Streamer X es la opción de valor. Y si solo necesitas que el micrófono suene notable, el Wave XLR MK.2 lo logra. No hay respuesta equivocada aquí — todo se reduce a qué flujo de trabajo se adapta mejor a ti. '+cET;
g.verdict='The Stream Deck+ is the total control pick with buttons, dials and a touch strip for every stream setup. The GoXLR Mini is the streamer-first mixer with real faders and a Midas preamp, the RODECaster Pro II is the broadcast-console pick that survives a frozen PC, and the Mackie MainStream is the one-cable console pick with HDMI capture. The Streamer X stays the 4K value box and the Wave XLR MK.2 the mic upgrade. Match the tool to how you stream.';
g.verdict_es='El Stream Deck+ es la mejor opción para control total con botones, perillas y tira táctil para cualquier configuración de streaming. El GoXLR Mini es el mezclador de streamers con faders reales y previo Midas, el RODECaster Pro II es la consola broadcast que sobrevive a un PC congelado, y el Mackie MainStream es la opción de un cable para consolas con captura HDMI. El Streamer X sigue siendo la caja 4K de valor y el Wave XLR MK.2 la mejora de micro. Haz coincidir la herramienta con cómo haces streaming.';
g.description='In 2026, I swapped the Stream Deck+, GoXLR Mini, RODECaster Pro II, Mackie MainStream, Rode Streamer X and Wave XLR MK. Here is which stream controller or mixer to buy and why, before';
g.description_es='En 2026, Pasé semanas intercambiando el Stream Deck+, el GoXLR Mini, el RODECaster Pro II, el Mackie MainStream, el Streamer X y el Wave XLR MK. Lee el veredicto completo y los precios';
var F=g.featuredSnippet;
F.text_en='The Stream Deck+ is the best-selling controller with 8 LCD keys, 4 dials and a touch strip. The GoXLR Mini brings real faders and a Midas preamp to stream mixing. The RODECaster Pro II runs the whole broadcast on hardware with 4 Neutrik inputs and 8 SMART pads. The Mackie MainStream merges interface and HDMI capture in one USB-C cable. The Streamer X packs an interface, 4K capture and a control surface into one box. The Wave XLR MK.2 adds broadcast-grade mic audio to any XLR mic.';
F.text_es='El Stream Deck+ es el controlador más vendido con 8 teclas LCD, 4 diales y una tira táctil. El GoXLR Mini trae faders reales y previo Midas a la mezcla de stream. El RODECaster Pro II ejecuta todo el programa en hardware con 4 entradas Neutrik y 8 pads SMART. El Mackie MainStream fusiona interfaz y captura HDMI en un cable USB-C. El Streamer X mete interfaz, captura 4K y superficie de control en una sola caja. El Wave XLR MK.2 añade audio de micrófono de nivel broadcast a cualquier micrófono XLR.';
F.faq_a1_en='It depends on your workflow. The Elgato Stream Deck+ is the best-selling controller for hands-on control of your entire stream. The TC Helicon GoXLR Mini is the streamer-first mixer with real faders, a Midas preamp and per-app routing. For console and PC gamers, the Roland Bridge Cast X mixes game, chat and mic with dual buses. If you want an all-in-one mixer that runs its processing on the hardware itself, the RØDECaster Pro II and the Mackie DLZ Creator are the professional picks.';
F.faq_a1_es='Depende de tu flujo de trabajo. El Elgato Stream Deck+ es el controlador más vendido para control total del directo. El TC Helicon GoXLR Mini es el mezclador de streamers con faders reales, previo Midas y enrutamiento por app. Para jugadores de consola y PC, el Roland Bridge Cast X mezcla juego, chat y micro con buses duales. Si buscas un mezclador todo-en-uno que corra su procesamiento en el propio hardware, el RØDECaster Pro II y el Mackie DLZ Creator son las opciones profesionales.';

fs.writeFileSync(BASE+'data/guides.json',JSON.stringify(d,null,2));
console.log('guide done: sections='+g.sections.length);
if(fails.length){console.log('FAIL:\n'+fails.join('\n'));process.exit(1);}
console.log('DONE');
