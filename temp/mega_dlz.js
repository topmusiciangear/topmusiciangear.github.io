var fs=require('fs');
var BASE='C:/Users/Daniel/projects/topmusiciangear/';
var fails=[];
function assert(c,m){if(!c)fails.push(m);}

// ============ 1. products.json: 662 photo, 247 photo+oos ============
var ps=JSON.parse(fs.readFileSync(BASE+'data/products.json','utf8'));
var ag=ps.find(function(x){return x.id===662;});
assert(ag,'662 missing');
ag.img='https://cdn11.bigcommerce.com/s-4hc0jwsnnq/images/stencil/original/products/4053/14616/CAG08BLUK-AG08-black-front_7cf31fe620ffa8d8611a016b110ddf8e__72697.1714754133.jpg?c=1';
var dlz=ps.find(function(x){return x.id===247;});
assert(dlz,'247 missing');
dlz.img='https://r2.gear4music.com/media/94/942214/1200/preview.jpg';
fs.writeFileSync(BASE+'data/products.json',JSON.stringify(ps,null,2));
console.log('catalog: 662 photo, 247 photo');

// ============ 2. TEST 247: zzounds 799, drop G4M price (no price per user) ============
var b=BASE+'build-guides.js';
var src=fs.readFileSync(b,'utf8');
var old247='  247: {\n    prices: {\n      gear4music: "£699.00",\n      amazon: "$799.99",\n      zzounds: "$799.99",\n      andertons: "£521.00",\n      musicstore: "€649.00"\n    }\n  },';
assert(src.indexOf(old247)>-1,'247 block not found');
src=src.replace(old247,'  247: {\n    prices: {\n      amazon: "$799.99",\n      zzounds: "$799.00",\n      andertons: "£521.00",\n      musicstore: "€649.00"\n    },\n    urls: {\n      gear4music: "https://www.gear4music.com/PA-DJ-and-Lighting/Mackie-DLZ-Creator-Digital-Streaming-Mixer/5NE6"\n    }\n  },');
fs.writeFileSync(b,src);
console.log('TEST 247 updated');

// ============ 3. guides.json surgery ============
var d=JSON.parse(fs.readFileSync(BASE+'data/guides.json','utf8'));
var g=d.find(function(x){return x.id==='stream-controllers';});
assert(g,'guide missing');
function sameArr(a,b){return a.length===b.length&&a.every(function(v,i){return v===b[i];});}

// 3a. remove Maono section [327]
var n0=g.sections.length;
g.sections=g.sections.filter(function(s){return !sameArr(s.products||[],[327]);});
assert(g.sections.length===n0-1,'Maono section not removed');

// 3b. chooser: 327 -> 247
var ch=g.sections[0];
ch.products=ch.products.map(function(p){return p===327?247:p;});
assert(ch.products.indexOf(327)===-1,'327 still in chooser');

// 3c. table: replace Maono col with DLZ
var cols=g.productTable.columns.map(function(c){return c.title;});
console.log('cols before: '+cols.join(' | '));
var mi=cols.indexOf('Maono Maonocaster E2 Gen2');
assert(mi>-1,'Maono col missing');
g.productTable.columns[mi]={title:'Mackie DLZ Creator',title_es:'Mackie DLZ Creator'};
var dlzVals={
  'Best For':['Adaptive podcast/stream console','Consola adaptativa de pódcast/stream'],
  'Type':['Adaptive digital mixer + interface','Mezclador digital adaptativo + interfaz'],
  'Mic Gain':['4x Onyx80 preamps','4x previos Onyx80'],
  'Video Capture':['No','No'],
  'Keys / Controls':['Nine 100mm faders + 10.1in touchscreen','Nueve faders 100mm + táctil 10,1'],
  'Connectivity':['USB-C, SD, USB drive','USB-C, SD, USB'],
  'Software':['Mix Agent + 3 modes','Mix Agent + 3 modos'],
  'Estimated Price':['~$799','~$799']
};
Object.keys(dlzVals).forEach(function(label){
  var r=g.productTable.rows.find(function(x){return x.label===label;});
  assert(r,'row '+label+' missing');
  if(!r)return;
  r.values[mi]={value:dlzVals[label][0],value_es:dlzVals[label][1]};
});
console.log('cols final: '+g.productTable.columns.map(function(c){return c.title;}).join(' | '));

// 3d. vpc: add DLZ (Maono had none)
function vpc(n,ne,p,c,pe,ce){return{name:n,name_es:ne,pros:p,cons:c,pros_es:pe,cons_es:ce};}
g.verdictProsCons.push(
  vpc('Mackie DLZ Creator','Mackie DLZ Creator',
    ['Mix Agent guides setup and AutoMix balances 4 mics at once','Four Onyx80 preamps with nine 100mm faders and 10.1-inch touchscreen','Three modes (Easy/Enhanced/Pro) match beginners and pros','Records multitrack to PC, SD card or USB drive'],
    ['~$799 is the priciest desk here for mic-only streamers','Big touchscreen footprint eats small desks','Touch-first workflow slows fader-per-channel riders','Overkill if OBS plus one mic already covers you'],
    ['Mix Agent guía el montaje y AutoMix equilibra 4 micros a la vez','Cuatro previos Onyx80 con nueve faders de 100mm y táctil de 10,1 pulgadas','Tres modos (Easy/Enhanced/Pro) para novatos y pros','Graba multipista a PC, tarjeta SD o USB'],
    ['~$799 es el escritorio más caro aquí para streamers de un micro','La gran táctil llena escritorios pequeños','El flujo táctil frena a los de fader por canal','Excesivo si OBS más un micro ya te cubren'])
);

// 3e. DLZ section
function SEC(h,hes,c,ces,prods){return{heading:h,heading_es:hes,content:c,content_es:ces,products:prods};}
g.sections.push(
  SEC('Setup in Minutes, Not Hours: Mackie DLZ Creator',
    'Configurado en minutos, no en horas: Mackie DLZ Creator',
    '<strong>Podcast crews do not have a sound engineer — so the DLZ brings one.</strong> The Mackie DLZ Creator is an adaptive digital mixer that sets itself up: Mix Agent walks the whole desk into shape while AutoMix balances up to four mics live, behind four Onyx80 preamps, nine 100mm faders and a 10.1-inch touchscreen. Three modes reshape the desk — Easy for guests, Enhanced for regulars, Pro for engineers — and multitrack records to PC over USB-C, to SD card or to a USB stick with no computer tricks.</p><p><strong>The honest trade.</strong> Around $799 makes it the priciest desk here, the big touchscreen eats small desks, and touch-first mixing slows riders who think in faders. For two-to-four-mic shows that must sound right without an engineer, it earns the money.',
    '<strong>Los equipos de pódcast no tienen técnico — así que el DLZ trae uno.</strong> El Mackie DLZ Creator es un mezclador digital adaptativo que se configura solo: Mix Agent pone todo el escritorio en forma mientras AutoMix equilibra hasta cuatro micros en directo, tras cuatro previos Onyx80, nueve faders de 100mm y una táctil de 10,1 pulgadas. Tres modos remodelan la mesa — Easy para invitados, Enhanced para habituales, Pro para técnicos — y la multipista graba a PC por USB-C, a SD o a USB sin trucos.</p><p><strong>El trato honesto.</strong> Por ~$799 es el escritorio más caro aquí, la gran táctil llena mesas pequeñas, y mezclar con tacto frena a los que piensan en faders. Para programas de dos a cuatro micros que deben sonar bien sin técnico, se gana el dinero.',
    [247])
);

// 3f. featured + texts (add DLZ)
g.featuredProducts=g.featuredProducts.map(function(p){return p===327?247:p;});
g.intro=g.intro.replace('the Streamer X and the Wave XLR are the top','the Streamer X, the DLZ Creator and the Wave XLR are the top');
g.intro_es=g.intro_es.replace('el Streamer X y el Wave XLR son los mejores','el Streamer X, el DLZ Creator y el Wave XLR son los mejores');
g.conclusion=g.conclusion.replace('If you stream from a console and want one compact box that does audio and video, the Streamer X is the value pick.','If you stream from a console and want one compact box that does audio and video, the Streamer X is the value pick. If your show runs two to four mics with no engineer, the <strong>Mackie DLZ Creator</strong> sets itself up with Mix Agent and AutoMix.');
g.conclusion_es=g.conclusion_es.replace('Si transmites desde una consola y quieres una caja compacta que haga audio y vídeo, el Streamer X es la opción de valor.','Si transmites desde una consola y quieres una caja compacta que haga audio y vídeo, el Streamer X es la opción de valor. Si tu programa lleva de dos a cuatro micros sin técnico, el <strong>Mackie DLZ Creator</strong> se configura solo con Mix Agent y AutoMix.');
g.verdict=g.verdict.replace('The Streamer X stays the 4K value box and the Wave XLR MK.2 the mic upgrade.','The Streamer X stays the 4K value box, the DLZ Creator is the self-setting podcast desk, and the Wave XLR MK.2 the mic upgrade.');
g.verdict_es=g.verdict_es.replace('El Streamer X sigue siendo la caja 4K de valor y el Wave XLR MK.2 la mejora de micro.','El Streamer X sigue siendo la caja 4K de valor, el DLZ Creator el escritorio que se configura solo, y el Wave XLR MK.2 la mejora de micro.');

fs.writeFileSync(BASE+'data/guides.json',JSON.stringify(d,null,2));
console.log('guide done: sections='+g.sections.length);
if(fails.length){console.log('FAIL:\n'+fails.join('\n'));process.exit(1);}
console.log('DONE');
