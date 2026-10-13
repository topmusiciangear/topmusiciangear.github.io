var fs=require('fs');
var BASE='C:/Users/Daniel/projects/topmusiciangear/';
var fails=[];
function assert(c,m){if(!c)fails.push(m);}

// ============ 1. products.json: add 658 Bose T8S ============
var ps=JSON.parse(fs.readFileSync(BASE+'data/products.json','utf8'));
assert(!ps.find(function(x){return x.id===658;}),'658 already exists');
ps.push(
  { id:658, title:'Bose T8S ToneMatch', title_es:'Bose T8S ToneMatch', brand:'Bose', category:'live_sound', price:999, rating:4.7, badge:'recommended',
    desc:'Compact 8-channel digital mixer for performers: 8 ToneMatch presets per channel, 4 aux outs, 5 user scenes, per-channel EQ/dynamics/FX and USB interface. Stand-mountable at 1.9 kg; needs its own PSU (no ToneMatch-link power like the T4S). Official price $999.',
    desc_es:'Mezcladora digital compacta de 8 canales para músicos: presets ToneMatch por canal, 4 aux, 5 escenas de usuario, EQ/dinámica/FX por canal e interfaz USB. Se monta en soporte con 1,9 kg; exige su propia fuente (sin alimentación por ToneMatch como el T4S). Precio oficial $999.',
    img:'https://cdn11.bigcommerce.com/s-4hc0jwsnnq/products/5305/images/18823/258517-T48_ToneMatch_8Chan_Ortho_Top__13011.1714812908.386.513.jpg?c=1',
    stores:{
      gear4music:'https://www.gear4music.com/PA-DJ-and-Lighting/Bose-T8S-ToneMatch-Digital-Mixer/2ADL',
      amazon:'https://www.amazon.com/BOSE-785491-0110-Bose-T8S-toneMatch/dp/B07CG81TLC',
      zzounds:'https://www.zzounds.com/item--BOET8STONEMATCH',
      andertons:'https://www.andertons.co.uk/bose-t8s-tonematch/'
    } }
);
ps.sort(function(a,b){return a.id-b.id;});
// fix X32 Compact desc: 25 faders -> 17 (Compact has 17)
var x32=ps.find(function(x){return x.id===138;});
x32.desc=x32.desc.replace('25 motorized faders','17 motorized faders');
x32.desc_es=x32.desc_es.replace('25 faders motorizados','17 faders motorizados');
fs.writeFileSync(BASE+'data/products.json',JSON.stringify(ps,null,2));
console.log('catalog: 658 added, 138 desc fixed');

// ============ 2. build-guides.js TEST blocks ============
var b=BASE+'build-guides.js';
var src=fs.readFileSync(b,'utf8');
// 2a. 411 zzounds 1866 -> 1799.99
assert(src.indexOf('zzounds: "$1,866.00"')>-1,'411 old price not found');
src=src.replace('zzounds: "$1,866.00"','zzounds: "$1,799.99"');
// 2b. add 658 after 411 line
var line411='  411: { prices: { amazon: "$1,799.99", zzounds: "$1,799.99", andertons: "£1,399.00", gear4music: "£1,447.00", musicstore: "€1,427.70" } },';
assert(src.indexOf(line411)>-1,'411 line not found');
src=src.replace(line411, line411+'\n  658: {\n    prices: {\n      zzounds: "$999.00",\n      andertons: "£799.00"\n    },\n    urls: {\n      gear4music: "https://www.gear4music.com/PA-DJ-and-Lighting/Bose-T8S-ToneMatch-Digital-Mixer/2ADL",\n      amazon: "https://www.amazon.com/BOSE-785491-0110-Bose-T8S-toneMatch/dp/B07CG81TLC",\n      zzounds: "https://www.zzounds.com/item--BOET8STONEMATCH",\n      andertons: "https://www.andertons.co.uk/bose-t8s-tonematch/"\n    }\n  },');
fs.writeFileSync(b,src);
console.log('TEST: 411 fixed, 658 added');

// ============ 3. guides.json surgery ============
var d=JSON.parse(fs.readFileSync(BASE+'data/guides.json','utf8'));
var g=d.find(function(x){return x.id==='best-live-sound-mixers';});
assert(g,'guide not found');

// 3a. remove MG10XU section
var n0=g.sections.length;
g.sections=g.sections.filter(function(s){return (s.products||[]).indexOf(137)===-1;});
assert(g.sections.length===n0-1,'MG10XU section not removed (n='+n0+' now '+g.sections.length+')');

// 3b. table: drop col 0 (MG10XU)
var cols=g.productTable.columns.map(function(c){return c.title;});
console.log('cols before: '+cols.join(' | '));
assert(cols[0]==='Yamaha MG10XU','col0 is not MG10XU: '+cols[0]);
g.productTable.columns.splice(0,1);
g.productTable.rows.forEach(function(r){r.values.splice(0,1);});
console.log('cols mid: '+g.productTable.columns.map(function(c){return c.title;}).join(' | '));

// 3c. delete Monitor Outputs row
var mi=g.productTable.rows.findIndex(function(r){return r.label==='Monitor Outputs';});
assert(mi>-1,'Monitor Outputs row not found');
if(mi>-1)g.productTable.rows.splice(mi,1);

// helper to push values to every row
function rowVals(label, vals){ // vals: array of [en,es] per column in current order
  var r=g.productTable.rows.find(function(x){return x.label===label;});
  assert(r,'row '+label+' missing');
  if(!r)return;
  assert(vals.length===g.productTable.columns.length+3,'vals len mismatch for '+label+': '+vals.length+' vs cols+3='+(g.productTable.columns.length+3));
  // vals correspond to final order (7 current + 3 new); push only the last 3
  var tail=vals.slice(vals.length-3);
  tail.forEach(function(v){r.values.push({value:v[0],value_es:v[1]});});
}

// 3d. add 3 new columns
g.productTable.columns.push(
  {title:'Bose T8S ToneMatch',title_es:'Bose T8S ToneMatch'},
  {title:'Yamaha DM3S',title_es:'Yamaha DM3S'},
  {title:'Soundcraft Ui24R',title_es:'Soundcraft Ui24R'}
);

// existing rows in order: Best For, Estimated Price, Type, Channels, Preamps, EQ, Aux Sends, Built-in FX, Connectivity, Weight
rowVals('Best For',[
  ['Hybrid mixer + recorder + interface','Híbrida mesa + grabadora + interfaz'],
  ['digital mixer with deep I/O for bands','Mesa digital con I/O amplio para bandas'],
  ['Small-format digital with pro sound','digital de formato compacto con sonido pro'],
  ['Analog control with advanced digital effects','Control analógico con efectos digitales avanzados'],
  ['Analog mixer for more channels','Mezcla analógica con más canales'],
  ['Rack digital stagebox mixing','Mezcla digital en rack'],
  ['Touchscreen digital mixing','Mezcla digital táctil'],
  ['Small acoustic events, weddings, duos','Eventos acústicos pequeños, bodas, dúos'],
  ['Corporate events, conferences, galas','Eventos corporativos, conferencias, galas'],
  ['Self-mixed touring bands, rack stagebox','Bandas autogestionadas en gira, stagebox en rack']
]);
rowVals('Estimated Price',[
  ['~$599','~$599'],['~$1,398','~$1,398'],['~$3,999','~$3,999'],
  ['$744.95–$999.99','$744,95–$999,99'],['$573.74–$675','$573,74–$675'],
  ['~$509','~$509'],['$1,099.99–$1,199.99','$1.099,99–$1.199,99'],
  ['~$999','~$999'],['~$1,799.99','~$1.799,99'],['$999 (was $1,499)','$999 (antes $1.499)']
]);
rowVals('Type',[
  ['Hybrid analog with digital recorder & USB','Híbrida analógica con grabadora digital y USB'],
  ['digital mixer','Mesa digital'],['digital mixer','Mesa digital'],
  ['Hybrid Analog/digital Mixer','Mezclador Híbrido Analógico/digital'],
  ['Analog mixer','Mezcladora analógica'],['digital mixer','Mezcladora digital'],['digital mixer','Mezcladora digital'],
  ['Compact digital mixer','Mezcladora digital compacta'],
  ['Ultra-compact digital mixer','Mezcladora digital ultracompacta'],
  ['Rack digital mixer','Mezcladora digital en rack']
]);
rowVals('Channels',[
  ['10 (12-track SD recorder)','10 (grabadora SD de 12 pistas)'],
  ['40 (16 local XLR)','40 (16 XLR locales)'],['48 total','48 totales'],
  ['16 (8 mono + 4 stereo)','16 (8 mono + 4 estéreo)'],
  ['16 line (8 mono + 4 stereo), 10 mic','16 líneas (8 mono + 4 estéreo), 10 de micro'],
  ['18 (16 mic)','18 (16 micro)'],['16 mono + 3 stereo','16 mono + 3 estéreo'],
  ['8 (ToneMatch presets per channel)','8 (presets ToneMatch por canal)'],
  ['22 (16 mono + 1 stereo + 2 FX return)','22 (16 mono + 1 estéreo + 2 retornos FX)'],
  ['24 (20 mic)','24 (20 de micro)']
]);
rowVals('Preamps',[
  ['8 x Ultra-HDDA','8 x Ultra-HDDA'],['16 MIDAS','16 MIDAS'],['16 A&H','16 A&H'],
  ['8 x HiVolt','8 x HiVolt'],['10x D-PRE','10x D-PRE'],['16 Midas','16 Midas'],
  ['16 recallable digital','16 digitales recuperables'],
  ['8 Bose with 48 V phantom','8 Bose con phantom de 48 V'],
  ['16 recallable (9 motorized faders)','16 recuperables (9 faders motorizados)'],
  ['20 Studer-designed','20 diseñados por Studer']
]);
rowVals('EQ',[
  ['3-band w/ sweepable mid + low-cut','3 bandas con medio barrido + filtro graves'],
  ['4-band fully parametric','Paramétrico de 4 bandas'],['4-band parametric','4 bandas paramétrico'],
  ['3-band with sweepable mid + 9-band ParaGraphic main EQ','3 bandas con medios ajustables + ecualizador ParaGráfico de 9 bandas'],
  ['3-band + 1-knob comp','3 bandas + compresor 1-knob'],
  ['4-band fully parametric','Paramétrico 4 bandas'],['Parametric + Quick Channels','Paramétrico + Quick Channels'],
  ['ToneMatch + zEQ per channel','ToneMatch + zEQ por canal'],
  ['4-band parametric + QuickPro presets','Paramétrico de 4 bandas + presets QuickPro'],
  ['4-band parametric + Lexicon/dbx','Paramétrico de 4 bandas + Lexicon/dbx']
]);
rowVals('Aux Sends',[
  ['2 aux sends','2 envíos aux'],['16 aux buses','16 buses aux'],
  ['12 stereo mixes + LR, 8 stereo FX engines','12 mezclas estéreo + LR, 8 motores FX estéreo'],
  ['4 Aux sends','4 envíos Aux'],['4 aux sends','4 envíos aux'],
  ['6 aux buses','6 buses aux'],['6 aux outputs','6 salidas aux'],
  ['4 aux outs','4 salidas aux'],
  ['6 Mix + 2 Matrix','6 Mix + 2 Matrix'],
  ['8 aux buses','8 buses aux']
]);
rowVals('Built-in FX',[
  ['Yes (reverb, delay, chorus)','Si (reverb, delay, chorus)'],
  ['8 FX engines','8 motores FX'],['8 FX slots (DEEP)','8 slots FX (DEEP)'],
  ['Korg 32-bit digital FX (up to 10 simultaneously)','Efectos digitales Korg de 32-bit (hasta 10 simultáneos)'],
  ['SPX digital FX','FX digitales SPX'],['4 FX engines','4 motores FX'],['4 FX engines','4 motores FX'],
  ['Per-channel dynamics + shared reverb','Dinámica por canal + reverb compartida'],
  ['2 FX + 8ch Automixer (FW V3)','2 FX + Automixer de 8 canales (FW V3)'],
  ['Lexicon / dbx / DigiTech modeling','Lexicon / dbx / modelado DigiTech']
]);
rowVals('Connectivity',[
  ['USB-C 12-in/10-out, SD recorder, Bluetooth 5.0, MIDI','USB-C 12 ent/10 sal, grabadora SD, Bluetooth 5.0, MIDI'],
  ['USB, AES50, 16 out','USB, AES50, 16 salidas'],['USB, 2x dSnake, tablet','USB, 2x dSnake, tablet'],
  ['USB stereo, 8-bus architecture','USB estéreo, arquitectura de 8 buses'],
  ['USB, 4 groups','USB, 4 grupos'],['USB 18x18, Ultranet, WiFi','USB 18x18, Ultranet, WiFi'],
  ['USB 24x22, SD, BT, WiFi','USB 24x22, SD, BT, WiFi'],
  ['USB interface + stand mount','Interfaz USB + montaje en soporte'],
  ['USB 18x18, StageMix/MonitorMix (10 devices)','USB 18x18, StageMix/MonitorMix (10 dispositivos)'],
  ['USB stick multitrack + dual-band WiFi (10 devices)','Multipista a USB + WiFi dual (10 dispositivos)']
]);
rowVals('Weight',[
  ['4.3 kg (9.5 lb)','4.3 kg'],['33.9 lb (15.4 kg)','15,4 kg'],['23.1 lb (10.5 kg)','23.1 lb (10.5 kg)'],
  ['17.6 lb (8.0 kg)','8,0 kg'],['6.8 kg (15.0 lb)','6,8 kg'],['3.2 kg (7.1 lb)','3,2 kg'],['3 kg (6.6 lb)','3 kg'],
  ['1.9 kg (4.1 lb)','1,9 kg'],['6.5 kg (14.3 lb)','6,5 kg'],['8.1 kg rack (17.9 lb)','8,1 kg en rack']
]);

// 3e. NEW rows: Faders + Sample rate (7 existing + 3 new = 10 values)
g.productTable.rows.push({
  label:'Faders / Control', label_es:'Faders / Control',
  values:[
    {value:'Analog faders (non-motorized)',value_es:'Faders analógicos (no motorizados)'},
    {value:'17 motorized faders',value_es:'17 faders motorizados'},
    {value:'17 motorized faders',value_es:'17 faders motorizados'},
    {value:'Analog faders (non-motorized)',value_es:'Faders analógicos (no motorizados)'},
    {value:'Analog faders (non-motorized)',value_es:'Faders analógicos (no motorizados)'},
    {value:'None — 100% tablet/iPad control',value_es:'Ninguno — control 100% por tablet/iPad'},
    {value:'7-inch touchscreen, no faders',value_es:'Pantalla táctil de 7 pulgadas, sin faders'},
    {value:'Rotary encoders, no faders',value_es:'Codificadores rotativos, sin faders'},
    {value:'9 motorized faders (8 + 1 main)',value_es:'9 faders motorizados (8 + 1 máster)'},
    {value:'None — browser control (10 devices)',value_es:'Ninguno — control por navegador (10 dispositivos)'}
  ]
});
g.productTable.rows.push({
  label:'Sample rate', label_es:'Frecuencia de muestreo',
  values:[
    {value:'48 kHz',value_es:'48 kHz'},
    {value:'48 kHz',value_es:'48 kHz'},
    {value:'96 kHz',value_es:'96 kHz'},
    {value:'48 kHz (USB)',value_es:'48 kHz (USB)'},
    {value:'Analog',value_es:'Analógica'},
    {value:'48 kHz',value_es:'48 kHz'},
    {value:'96 kHz',value_es:'96 kHz'},
    {value:'48 kHz',value_es:'48 kHz'},
    {value:'96 / 48 kHz',value_es:'96 / 48 kHz'},
    {value:'48 kHz',value_es:'48 kHz'}
  ]
});
console.log('cols final: '+g.productTable.columns.map(function(c){return c.title;}).join(' | '));
console.log('rows: '+g.productTable.rows.map(function(r){return r.label;}).join(' | '));

// 3f. verdictProsCons: drop MG10XU, add 3
g.verdictProsCons=g.verdictProsCons.filter(function(v){return v.name!=='Yamaha MG10XU';});
function vpc(n,ne,p,c,pe,ce){return{name:n,name_es:ne,pros:p,cons:c,pros_es:pe,cons_es:ce};}
g.verdictProsCons.push(
  vpc('Bose T8S ToneMatch','Bose T8S ToneMatch',
    ['8 channels with ToneMatch presets per channel — vocals and guitars sound right in a minute','4 aux outs for monitors plus 5 user scenes for weddings, duos and corporate sets','Stand-mountable 1.9 kg box with USB interface for streaming and playback','Per-channel EQ, dynamics and FX tuned for acoustic performers'],
    ['No physical faders — encoders and menus only','Needs its own PSU — no single-cable ToneMatch-link power like the T4S','8 channels fall short for full bands with drums','Premium price for a mixer with no motorized surface'],
    ['8 canales con presets ToneMatch por canal — voces y guitarras suenan bien en un minuto','4 salidas aux para monitores más 5 escenas de usuario para bodas, dúos y eventos','Caja de 1,9 kg montable en soporte con interfaz USB para streaming y reproducción','EQ, dinámica y FX por canal afinados para músicos acústicos'],
    ['Sin faders físicos — solo codificadores y menús','Exige su propia fuente — sin alimentación por ToneMatch como el T4S','8 canales se quedan cortos para bandas completas con batería','Precio premium para una mesa sin superficie motorizada']),
  vpc('Yamaha DM3S','Yamaha DM3S',
    ['96 kHz processing — the only compact here with true high-resolution audio','8-channel Automixer (FW V3) keeps multi-mic speech clear at conferences and galas','9 motorized faders with 9-inch touchscreen plus StageMix/MonitorMix for 10 devices','18x18 USB recording with QuickPro presets in a 6.5 kg frame'],
    ['Only 9 faders for 22 channels — constant layer switching on big shows','6 Mix + 2 Matrix buses limit complex monitor-heavy festivals','No Dante on the S model — the DM3-D costs more for AoIP expansion','Single touchscreen means no knob-per-function fallback'],
    ['Proceso a 96 kHz — la única compacta aquí con audio real de alta resolución','Automixer de 8 canales (FW V3) que mantiene clara la voz con varios micros en conferencias y galas','9 faders motorizados con táctil de 9 pulgadas más StageMix/MonitorMix para 10 dispositivos','Grabación USB 18x18 con presets QuickPro en 6,5 kg'],
    ['Solo 9 faders para 22 canales — cambio de capas constante en shows grandes','6 Mix + 2 Matrix limitan festivales con muchos monitores','Sin Dante en el modelo S — el DM3-D cuesta más para expansión AoIP','Una sola táctil sin controles físicos por canal como respaldo']),
  vpc('Soundcraft Ui24R','Soundcraft Ui24R',
    ['24 inputs with 20 Studer-designed preamps — more real mic channels than the XR18','Built-in dual-band WiFi controls up to 10 devices — each musician mixes their own monitor','Dual-path multitrack: records 22 channels + master straight to a USB stick, no laptop needed','Lexicon reverbs, dbx compression and DigiTech amp modeling onboard'],
    ['Zero physical faders — if the tablet or network fails there is no surface fallback','Built-in WiFi still struggles in packed venues — an external router is wise','48 kHz ceiling with no 96 kHz option like the SQ-5 or DM3S','Rack format hides on stage but needs a tablet stand at mix position'],
    ['24 entradas con 20 previos Studer — más canales reales de micro que el XR18','WiFi dual integrado para 10 dispositivos — cada músico mezcla su monitor','Multipista de doble ruta: graba 22 canales + máster directo a USB, sin portátil','Reverbs Lexicon, compresión dbx y modelado DigiTech a bordo'],
    ['Cero faders físicos — si fallan tablet o red no hay superficie de respaldo','El WiFi integrado sufre en recintos llenos — conviene un router externo','Techo de 48 kHz sin opción 96 kHz como el SQ-5 o el DM3S','El formato rack se esconde en el escenario pero pide soporte de tablet en la mezcla'])
);
console.log('vpc: '+g.verdictProsCons.map(function(v){return v.name;}).join(' | '));

// 3g. sections: update chooser + append 3
g.sections[0].content=g.sections[0].content.replace('The Yamaha MG10XU is the dependable analog option for small gigs and podcasts.','The Yamaha MG16XU is the dependable analog option for bands that need real channel counts.');
g.sections[0].content_es=g.sections[0].content_es.replace('El Yamaha MG10XU es la opción analógica fiable.','El Yamaha MG16XU es la opción analógica fiable para bandas que necesitan canales de verdad.');
g.sections[0].products=[149,332,138,139,145,147,335,658,411,410];
function SEC(h,hes,c,ces,prods){return{heading:h,heading_es:hes,content:c,content_es:ces,products:prods};}
g.sections.push(
  SEC('A Minute to Soundcheck: Bose T8S ToneMatch for Small Events',
    'Sonido en un minuto: Bose T8S ToneMatch para eventos pequeños',
    '<strong>Small acoustic events are won before the first song.</strong> The Bose T8S ToneMatch is a compact 8-channel mixer built for soloists, duos, wedding DJs and corporate sets: ToneMatch presets per channel dial in specific mics and instruments in seconds, with per-channel EQ, dynamics and FX plus 4 aux outs for monitors. Five user scenes (Full Band, String Band, Stereo DJ and more) recall whole setups, and the 1.9 kg box mounts on a stand with USB for playback and streaming.</p><p><strong>The honest trade.</strong> Encoders only — no faders, no motorized surface — and it needs its own PSU since the T8S has no ToneMatch-link power. Eight channels will not cover a drum kit. For voices, guitars and playback at weddings and conferences, nothing here sets up faster.',
    '<strong>Los eventos acústicos pequeños se ganan antes de la primera canción.</strong> El Bose T8S ToneMatch es una mesa compacta de 8 canales para solistas, dúos, DJs de bodas y eventos: los presets ToneMatch por canal ajustan micros e instrumentos concretos en segundos, con EQ, dinámica y FX por canal más 4 aux para monitores. Cinco escenas de usuario (Full Band, String Band, Stereo DJ y más) recuperan montajes enteros, y la caja de 1,9 kg se monta en soporte con USB para reproducción y streaming.</p><p><strong>El trato honesto.</strong> Solo codificadores — sin faders ni superficie motorizada — y exige su propia fuente porque el T8S no se alimenta por ToneMatch. Ocho canales no cubren una batería. Para voces, guitarras y pistas en bodas y conferencias, nada aquí se configura más rápido.',
    [658]),
  SEC('Voices Without Feedback: Yamaha DM3S for Corporate Events',
    'Voces sin acoples: Yamaha DM3S para eventos corporativos',
    '<strong>Conferences and galas punish mixers that only know music.</strong> The Yamaha DM3S is the ultra-compact digital desk for that world: 22 channels (16 mono + 1 stereo + 2 FX return) at up to 96 kHz, 9 motorized faders under a 9-inch touchscreen, and an 8-channel Automixer (firmware V3) that keeps multi-mic speech clear when several people talk at once. USB records 18x18 while StageMix and MonitorMix serve up to 10 devices, all in 6.5 kg.</p><p><strong>The honest trade.</strong> Nine faders for 22 channels means living on layers, 6 Mix + 2 Matrix buses cap monitor-heavy shows, and the S model has no Dante (that is the DM3-D). For speech-first events that still need a real band mix after dinner, it is the compact standard.',
    '<strong>Conferencias y galas castigan a las mesas que solo saben de música.</strong> El Yamaha DM3S es el escritorio digital ultracompacto para ese mundo: 22 canales (16 mono + 1 estéreo + 2 retornos FX) hasta 96 kHz, 9 faders motorizados bajo una táctil de 9 pulgadas, y Automixer de 8 canales (firmware V3) que mantiene clara la voz cuando hablan varios a la vez. El USB graba 18x18 mientras StageMix y MonitorMix sirven a 10 dispositivos, todo en 6,5 kg.</p><p><strong>El trato honesto.</strong> Nueve faders para 22 canales obligan a vivir en capas, 6 Mix + 2 Matrix limitan shows con muchos monitores, y el modelo S no trae Dante (ese es el DM3-D). Para eventos de voz que aún piden banda real tras la cena, es el estándar compacto.',
    [411]),
  SEC('The Rack That Replaces the Console: Soundcraft Ui24R for Touring Bands',
    'El rack que sustituye a la consola: Soundcraft Ui24R para bandas en gira',
    '<strong>Self-mixed bands stopped carrying consoles years ago.</strong> The Soundcraft Ui24R is the rack stagebox that proves it: 24 inputs with 20 Studer-designed preamps, controlled from any browser on up to 10 devices over built-in dual-band WiFi — every musician mixes their own monitor. Dual-path recording writes 22 channels plus the master straight to a USB stick with no laptop, while Lexicon reverbs, dbx compression and DigiTech amp modeling cover the mix bus.</p><p><strong>The honest trade.</strong> Zero physical faders, so a dead tablet or a saturated venue WiFi leaves no surface to grab — carry an external router. Against the XR18 it wins on real mic channels, dual WiFi and stick recording; against consoles it loses on hands-on speed. For bands running their own events from the stage, it is the format that travels.',
    '<strong>Las bandas autogestionadas dejaron de cargar consolas hace años.</strong> El Soundcraft Ui24R es el stagebox en rack que lo demuestra: 24 entradas con 20 previos Studer, controlado desde cualquier navegador en 10 dispositivos por WiFi dual integrado — cada músico mezcla su monitor. La grabación de doble ruta escribe 22 canales más el máster directo a USB sin portátil, mientras reverbs Lexicon, compresión dbx y modelado DigiTech cubren la mezcla.</p><p><strong>El trato honesto.</strong> Cero faders físicos, así que una tablet muerta o un WiFi saturado dejan sin superficie que agarrar — lleva un router externo. Frente al XR18 gana en canales reales, WiFi dual y grabación a USB; frente a consolas pierde en velocidad manual. Para bandas que llevan sus propios eventos desde el escenario, es el formato que viaja.',
    [410])
);

// 3h. featured, conclusion, verdict, FAQ
g.featuredProducts=[149,332,138,139,335,145,147,658,411,410];
function tailOf(s){var i=s.indexOf('<p>');return i>-1?s.slice(i):'';}
var cT=tailOf(g.conclusion),cET=tailOf(g.conclusion_es);
g.conclusion='The Yamaha MG16XU is the analog workhorse for bands that need real channels without menus. The Behringer X32 Compact stays the versatility king with 17 motorized faders, while the Allen & Heath SQ-5 brings 96 kHz pro sound to touring. The Tascam Model 12 records the gig to SD, the Korg MW-1608 keeps hands on analog faders, and the CQ-18T mixes from its touchscreen with auto gain and feedback help. New here: the <strong>Bose T8S ToneMatch</strong> sets up small acoustic events in a minute, the <strong>Yamaha DM3S</strong> runs corporate speech at 96 kHz with an 8-channel Automixer, and the <strong>Soundcraft Ui24R</strong> replaces the console with a 24-input rack that records to USB. '+cT;
g.conclusion_es='El Yamaha MG16XU es el caballo de batalla analógico para bandas que necesitan canales reales sin menús. El Behringer X32 Compact sigue siendo el rey de la versatilidad con 17 faders motorizados, mientras el Allen & Heath SQ-5 lleva sonido pro a 96 kHz a la gira. El Tascam Model 12 graba el concierto a SD, el Korg MW-1608 mantiene las manos en faders analógicos, y el CQ-18T mezcla desde su táctil con ganancia auto y ayuda anti-feedback. Novedades: el <strong>Bose T8S ToneMatch</strong> monta eventos acústicos en un minuto, el <strong>Yamaha DM3S</strong> lleva la voz corporativa a 96 kHz con Automixer de 8 canales, y el <strong>Soundcraft Ui24R</strong> sustituye la consola con un rack de 24 entradas que graba a USB. '+cET;
g.verdict='Analog bands take the Yamaha MG16XU; digital versatility still belongs to the 17-fader X32 Compact, with the 96 kHz SQ-5 as the touring pro pick. The Tascam Model 12 is the recorder-hybrid, the Korg MW-1608 the analog-hands choice, and the CQ-18T the touchscreen shortcut with smart assistants. Small acoustic events go Bose T8S ToneMatch, corporate speech goes Yamaha DM3S with its 8-channel Automixer, and self-mixed touring bands go Soundcraft Ui24R rack over the XR18.';
g.verdict_es='Las bandas analógicas eligen el Yamaha MG16XU; la versatilidad digital sigue siendo del X32 Compact de 17 faders, con el SQ-5 a 96 kHz como opción pro de gira. El Tascam Model 12 es el híbrido con grabadora, el Korg MW-1608 la opción de manos analógicas, y el CQ-18T el atajo táctil con asistentes inteligentes. Los eventos acústicos pequeños van con el Bose T8S ToneMatch, la voz corporativa con el Yamaha DM3S y su Automixer de 8 canales, y las bandas autogestionadas con el Soundcraft Ui24R en rack sobre el XR18.';
g.featuredSnippet.faq_q1_en='Should you choose the Yamaha MG16XU for band gigs?';
g.featuredSnippet.faq_a1_en='Yes, the Yamaha MG16XU offers 16 channels with 10 D-PRE preamps, SPX effects, and USB recording — the realistic analog pick for bands that outgrow 10-channel desks.';
g.featuredSnippet.faq_q1_es='¿Deberías elegir el Yamaha MG16XU para conciertos con banda?';
g.featuredSnippet.faq_a1_es='Sí, el Yamaha MG16XU ofrece 16 canales con 10 previos D-PRE y efectos SPX.';
g.intro='Whether you run a duo at weddings, a band loading its own PA, or a corporate gala with six open mics, the right live mixer depends on the size of the event. This guide covers analog workhorses, hybrid recorder-mixers, touchscreen digitals, rack stageboxes and the compact standards for small acoustic sets and big corporate rooms — so you can match the console to the gig, not the other way around.';
g.intro_es='Lleves un dúo en bodas, una banda con su propio PA o una gala corporativa con seis micros abiertos, el mezclador correcto depende del tamaño del evento. Esta guía cubre caballos analógicos, híbridos con grabadora, digitales táctiles, stageboxes en rack y los estándares compactos para sets acústicos y salas corporativas — para ajustar la consola al concierto, no al revés.';

fs.writeFileSync(BASE+'data/guides.json',JSON.stringify(d,null,2));
console.log('guide done: sections='+g.sections.length);
if(fails.length){console.log('FAIL:\n'+fails.join('\n'));process.exit(1);}
console.log('DONE');
