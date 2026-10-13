var fs=require('fs');
var BASE='C:/Users/Daniel/projects/topmusiciangear/';
var fails=[];
function assert(c,m){if(!c)fails.push(m);}

// ============ 1. products.json: add 663 ============
var ps=JSON.parse(fs.readFileSync(BASE+'data/products.json','utf8'));
assert(!ps.find(function(x){return x.id===663;}),'663 exists?');
ps.push(
  { id:663, title:'Tascam Mixcast 4', title_es:'Tascam Mixcast 4', brand:'Tascam', category:'streaming', price:499, rating:4.5, badge:'recommended',
    desc:'Podcast console with 4 XLR combo inputs (auto-mix), 4 independent headphone outputs, standalone 14-track SD recording, Bluetooth/TRRS call channel with auto mix-minus and 8 lit sound pads. Free Podcast Editor software needs no DAW knowledge. ~$499 (often less on sale).',
    desc_es:'Consola de pódcast con 4 entradas combo XLR (auto-mix), 4 salidas de auriculares independientes, grabación autónoma multipista a SD, canal de llamadas Bluetooth/TRRS con mix-minus auto y 8 pads iluminados. Software Podcast Editor gratis sin saber de DAW. ~$499 (suele bajar en oferta).',
    img:'https://r2.gear4music.com/media/69/698657/1200/preview.jpg',
    stores:{
      gear4music:'https://www.gear4music.com/Recording-and-Computers/Tascam-Mixcast-4-Podcast-Recording-Console/41NY',
      andertons:'https://www.andertons.co.uk/tascam-mixcast-4-podcast-recording-console-with-built-in-recorder-usb-interface/',
      zzounds:'https://www.zzounds.com/item--TASMIXCAST4',
      musicstore:'https://www.musicstore.com/en_OE/EUR/Tascam-Mixcast-4/art-REC0015460-000'
    },
    oos:['andertons'] }
);
ps.sort(function(a,b){return a.id-b.id;});
fs.writeFileSync(BASE+'data/products.json',JSON.stringify(ps,null,2));
console.log('catalog: 663 in');

// ============ 2. TEST 663 after 662 ============
var b=BASE+'build-guides.js';
var src=fs.readFileSync(b,'utf8');
function addAfter(id,newBlock){
  var key='\n  '+id+': {',i=src.indexOf(key);
  assert(i>-1,'ANCHOR '+id+' NOT FOUND');
  if(i===-1)return;
  var j=src.indexOf('{',i),depth=0,k=j;
  while(k<src.length){if(src[k]==='{')depth++;else if(src[k]==='}'){if(--depth===0)break;}k++;}
  var end=k+1;if(src[end]===',')end++;
  src=src.slice(0,end)+'\n'+newBlock+src.slice(end);
}
addAfter(662,'  663: {\n    prices: {\n      gear4music: "£371.00",\n      andertons: "£368.00",\n      zzounds: "$499.00",\n      musicstore: "€449.00"\n    },\n    urls: {\n      gear4music: "https://www.gear4music.com/Recording-and-Computers/Tascam-Mixcast-4-Podcast-Recording-Console/41NY",\n      andertons: "https://www.andertons.co.uk/tascam-mixcast-4-podcast-recording-console-with-built-in-recorder-usb-interface/",\n      zzounds: "https://www.zzounds.com/item--TASMIXCAST4",\n      musicstore: "https://www.musicstore.com/en_OE/EUR/Tascam-Mixcast-4/art-REC0015460-000"\n    },\n    oos: ["andertons"]\n  },');
fs.writeFileSync(b,src);
console.log('TEST 663 in');

// ============ 3. guides.json surgery ============
var d=JSON.parse(fs.readFileSync(BASE+'data/guides.json','utf8'));
var g=d.find(function(x){return x.id==='stream-controllers';});
assert(g,'guide missing');

g.sections[0].products.push(663);
g.productTable.columns.push({title:'Tascam Mixcast 4',title_es:'Tascam Mixcast 4'});
var mxVals={
  'Best For':['4-person podcast without a computer','Pódcast de 4 sin ordenador'],
  'Type':['Podcast console + recorder','Consola pódcast + grabadora'],
  'Mic Gain':['4x XLR combo with auto-mix','4x combo XLR con auto-mix'],
  'Video Capture':['No','No'],
  'Keys / Controls':['Faders + 8 lit sound pads','Faders + 8 pads iluminados'],
  'Connectivity':['USB, Bluetooth, TRRS call, SD','USB, Bluetooth, TRRS, SD'],
  'Software':['Podcast Editor (beginner easy)','Podcast Editor (fácil)'],
  'Estimated Price':['~$499','~$499']
};
Object.keys(mxVals).forEach(function(label){
  var r=g.productTable.rows.find(function(x){return x.label===label;});
  assert(r,'row '+label+' missing');
  if(!r)return;
  var v=mxVals[label];
  r.values.push({value:v[0],value_es:v[1]});
});
console.log('cols final: '+g.productTable.columns.map(function(c){return c.title;}).join(' | '));

function vpc(n,ne,p,c,pe,ce){return{name:n,name_es:ne,pros:p,cons:c,pros_es:pe,cons_es:ce};}
g.verdictProsCons.push(
  vpc('Tascam Mixcast 4','Tascam Mixcast 4',
    ['Four XLR combo inputs with auto-mix plus four independent headphone outs','Standalone 14-track SD recording — no computer needed','Bluetooth/TRRS call channel with automatic mix-minus','8 lit sound pads plus beginner-easy Podcast Editor software'],
    ['Manual faders only, 48 kHz ceiling — no 32-bit float','AC adapter required, no battery like the Maono had','Bulkier than minimalist 2-channel desks','~$499 overlaps the RODECaster Pro II on sale'],
    ['Cuatro entradas combo XLR con auto-mix más cuatro salidas de auriculares','Grabación autónoma a SD de 14 pistas — sin ordenador','Canal de llamadas Bluetooth/TRRS con mix-minus automático','8 pads iluminados más software Podcast Editor facilísimo'],
    ['Solo faders manuales, techo 48 kHz — sin 32-bit float','Exige adaptador de corriente, sin batería','Más grande que escritorios mínimos de 2 canales','~$499 se solapa con el RODECaster Pro II en oferta'])
);

function SEC(h,hes,c,ces,prods){return{heading:h,heading_es:hes,content:c,content_es:ces,products:prods};}
g.sections.push(
  SEC('Four Mics, Four Headphones, Zero Computer: Tascam Mixcast 4',
    'Cuatro micros, cuatro auriculares, cero ordenador: Tascam Mixcast 4',
    '<strong>Podcasts with guests live or die on headphone mixes and call quality.</strong> The Tascam Mixcast 4 is built for exactly that: four XLR combo inputs with auto-mix, four independent headphone outputs each with its own volume, and standalone 14-track recording straight to SD — the whole episode captured with the computer off. Phone guests come in over Bluetooth or TRRS cable with automatic mix-minus so they never hear their own echo, eight lit sound pads fire applause and jingles live, and the free Podcast Editor software edits without any DAW knowledge.</p><p><strong>The honest trade.</strong> Manual faders only at 48 kHz with no 32-bit float safety, wall power only, and ~$499 sits close to discounted RODECaster Pro II money. Against the RCP2 it wins on price and beginner simplicity; for four-person shows that record themselves, it is the desk to beat.',
    '<strong>Los pódcast con invitados viven o mueren por las mezclas de auriculares y las llamadas.</strong> El Tascam Mixcast 4 nace para eso: cuatro entradas combo XLR con auto-mix, cuatro salidas de auriculares independientes cada una con su volumen, y grabación autónoma de 14 pistas directo a SD — todo el episodio capturado con el ordenador apagado. Los invitados entran por Bluetooth o cable TRRS con mix-minus automático para no oír su eco, ocho pads iluminados disparan aplausos y cortinillas en directo, y el software Podcast Editor gratis edita sin saber de DAW.</p><p><strong>El trato honesto.</strong> Solo faders manuales a 48 kHz sin red de 32-bit float, solo con corriente, y ~$499 queda cerca del RODECaster Pro II en oferta. Frente al RCP2 gana en precio y sencillez novata; para programas de cuatro que se graban solos, es la mesa a batir.',
    [663])
);

g.featuredProducts.push(663);
g.intro=g.intro.replace('the Streamer X and the Wave XLR are the top','the Streamer X, the Mixcast 4 and the Wave XLR are the top');
g.intro_es=g.intro_es.replace('el Streamer X y el Wave XLR son los mejores','el Streamer X, el Mixcast 4 y el Wave XLR son los mejores');
g.conclusion=g.conclusion.replace('And if you just need your mic to sound remarkable, the Wave XLR MK.2 delivers.','If your show is four mics around a table, the <strong>Tascam Mixcast 4</strong> records everyone to SD with auto-mix and mix-minus calls. And if you just need your mic to sound remarkable, the Wave XLR MK.2 delivers.');
g.conclusion_es=g.conclusion_es.replace('Y si solo necesitas que el micrófono suene notable, el Wave XLR MK.2 lo logra.','Si tu programa son cuatro micros en una mesa, el <strong>Tascam Mixcast 4</strong> graba a todos a SD con auto-mix y llamadas mix-minus. Y si solo necesitas que el micrófono suene notable, el Wave XLR MK.2 lo logra.');
g.verdict=g.verdict.replace('The Streamer X stays the 4K value box and the Wave XLR MK.2 the mic upgrade.','The Streamer X stays the 4K value box, the Mixcast 4 is the four-mic podcast desk, and the Wave XLR MK.2 the mic upgrade.');
g.verdict_es=g.verdict_es.replace('El Streamer X sigue siendo la caja 4K de valor y el Wave XLR MK.2 la mejora de micro.','El Streamer X sigue siendo la caja 4K de valor, el Mixcast 4 el escritorio de cuatro micros, y el Wave XLR MK.2 la mejora de micro.');

fs.writeFileSync(BASE+'data/guides.json',JSON.stringify(d,null,2));
console.log('guide done: sections='+g.sections.length);
if(fails.length){console.log('FAIL:\n'+fails.join('\n'));process.exit(1);}
console.log('DONE');
