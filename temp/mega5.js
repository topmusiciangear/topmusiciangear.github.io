var fs=require('fs');
var BASE='C:/Users/Daniel/projects/topmusiciangear/';
var fails=[];
function assert(c,m){if(!c)fails.push(m);}

// ---------- 1. catalog: delete 653, add 656 + 657 ----------
var ps=JSON.parse(fs.readFileSync(BASE+'data/products.json','utf8'));
assert(ps.find(function(x){return x.id===653;}),'653 missing?');
ps=ps.filter(function(x){return x.id!==653;});
ps.push(
  { id:656, title:'Universal Audio Sphere DLX', title_es:'Universal Audio Sphere DLX', brand:'Universal Audio', category:'microphones', price:1499, rating:4.9, badge:'premium',
    desc:'Flagship dual-diaphragm modeling condenser with 38 legendary mic models from Neumann, Telefunken, AKG, Sony and more. Change mic model and polar pattern even after tracking; native plugin needs no Apollo (realtime does). 5-pin XLR needs 2 preamp channels; 20 dB pad, 140 dB max SPL.',
    desc_es:'Condensador insignia de doble diafragma con 38 modelos legendarios de Neumann, Telefunken, AKG, Sony y más. Cambia de micro y patrón polar incluso después de grabar; el plugin nativo no exige Apollo (el tiempo real sí). XLR de 5 pines pide 2 previos; pad 20 dB, 140 dB SPL máximo.',
    img:'https://r2.gear4music.com/media/89/899494/1200/preview.jpg',
    stores:{ gear4music:'https://www.gear4music.com/Recording-and-Computers/Universal-Audio-Sphere-DLX-Modeling-Microphone/5B0C', amazon:'https://www.amazon.com/Universal-Audio-Sphere-Modeling-Microphone/dp/B0C35LC2JZ', zzounds:'https://www.zzounds.com/item--UADSPHEREDLX', andertons:'https://www.andertons.co.uk/universal-audio-sphere-dlx-modelling-microphone' } },
  { id:657, title:'sE Electronics sE2200', title_es:'sE Electronics sE2200', brand:'sE Electronics', category:'microphones', price:299, rating:4.7, badge:'recommended',
    desc:'Cardioid large-diaphragm condenser with hand-built capsule, custom transformer and Class-A electronics: 24 mV/Pa, 8 dB-A noise, 125/135/145 dB max SPL with -10/-20 dB pads and 80/160 Hz filters. Real analog weight for $299.',
    desc_es:'Condensador cardioide gran diafragma con cápsula hecha a mano, transformador propio y electrónica Clase A: 24 mV/Pa, 8 dB-A de ruido, 125/135/145 dB SPL máximo con pads -10/-20 dB y filtros 80/160 Hz. Peso analógico real por $299.',
    img:'https://r2.gear4music.com/media/34/340072/1200/preview.jpg',
    stores:{ gear4music:'https://www.gear4music.com/Recording-and-Computers/sE-Electronics-SE2200-Large-Diaphragm-Condenser-Microphone/2CYA', amazon:'https://www.amazon.com/SE-ELECTRONICS-Diaphragm-Condenser-Shockmount/dp/B077HZJJSJ' } }
);
ps.sort(function(a,b){return a.id-b.id;});
fs.writeFileSync(BASE+'data/products.json',JSON.stringify(ps,null,2));
console.log('catalog: 653 out, 656+657 in');

// ---------- 2. TEST blocks ----------
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
// 653 has no TEST (never created) — nothing to delete; assert absent
assert(src.indexOf('\n  653: {')===-1,'653 TEST unexpectedly present');
addAfter(652,'  656: {\n    prices: {\n      gear4music: "£1,283.00"\n    },\n    urls: {\n      gear4music: "https://www.gear4music.com/Recording-and-Computers/Universal-Audio-Sphere-DLX-Modeling-Microphone/5B0C",\n      amazon: "https://www.amazon.com/Universal-Audio-Sphere-Modeling-Microphone/dp/B0C35LC2JZ",\n      zzounds: "https://www.zzounds.com/item--UADSPHEREDLX",\n      andertons: "https://www.andertons.co.uk/universal-audio-sphere-dlx-modelling-microphone"\n    }\n  },\n  657: {\n    prices: {\n      gear4music: "£300.00"\n    },\n    urls: {\n      gear4music: "https://www.gear4music.com/Recording-and-Computers/sE-Electronics-SE2200-Large-Diaphragm-Condenser-Microphone/2CYA",\n      amazon: "https://www.amazon.com/SE-ELECTRONICS-Diaphragm-Condenser-Shockmount/dp/B077HZJJSJ"\n    }\n  },');
fs.writeFileSync(b,src);
console.log('TEST 656+657 added');

// ---------- 3. guide surgery ----------
var d=JSON.parse(fs.readFileSync(BASE+'data/guides.json','utf8'));
var g=d.find(function(x){return x.id==='best-condenser-mics';});
// 3a. remove TLM102 section (products [653])
var n0=g.sections.length;
g.sections=g.sections.filter(function(s){return (s.products||[]).indexOf(653)===-1;});
assert(g.sections.length===n0-1,'TLM102 section not removed');
// 3b. table: drop col index 3 (TLM 102), verify, then append Sphere + sE2200 cols
var cols=g.productTable.columns.map(function(c){return c.title;});
console.log('cols before: '+cols.join(' | '));
assert(cols[3]==='Neumann TLM 102','col3 is not TLM102: '+cols[3]);
g.productTable.columns.splice(3,1);
g.productTable.rows.forEach(function(r){r.values.splice(3,1);});
g.productTable.columns.push({title:'Universal Audio Sphere DLX',title_es:'Universal Audio Sphere DLX'});
g.productTable.rows[0].values.push({value:'Pro ($900-3500)',value_es:'Pro ($900-3500)'});
g.productTable.rows[1].values.push({value:'Modeling condenser',value_es:'Condensador de modelado'});
g.productTable.rows[2].values.push({value:'Variable (38 models)',value_es:'Variable (38 modelos)'});
g.productTable.rows[3].values.push({value:'20 Hz – 20 kHz',value_es:'20 Hz – 20 kHz'});
g.productTable.rows[4].values.push({value:'-33 dB (22 mV)',value_es:'-33 dB (22 mV)'});
g.productTable.rows[5].values.push({value:'Not published',value_es:'No publicado'});
g.productTable.rows[6].values.push({value:'140 dB (w/ pad)',value_es:'140 dB (con pad)'});
g.productTable.rows[7].values.push({value:'20 dB pad',value_es:'Pad 20 dB'});
g.productTable.rows[8].values.push({value:'48 V',value_es:'48 V'});
g.productTable.rows[9].values.push({value:'38 mic models after tracking',value_es:'38 modelos después de grabar'});
g.productTable.rows[10].values.push({value:'—',value_es:'—'});
console.log('cols after: '+g.productTable.columns.map(function(c){return c.title;}).join(' | '));
// sE2200 column goes to index 3 (mid-range slot)
function ins(i,en,es){g.productTable.columns.splice(i,0,{title:en,title_es:es});}
ins(3,'sE Electronics sE2200','sE Electronics sE2200');
var seVals=[
  ['Mid-Range ($300-800)','Mid-Range ($300-800)'],
  ['Condenser, Cardioid','Condensador, Cardioide'],
  ['Cardioid','Cardioide'],
  ['20 Hz – 20 kHz','20 Hz – 20 kHz'],
  ['24 mV/Pa (-32.5 dBV)','24 mV/Pa (-32,5 dBV)'],
  ['8 dB-A','8 dB-A'],
  ['125/135/145 dB (pads)','125/135/145 dB (pads)'],
  ['-10/-20 dB pads, 80/160 Hz HPF','Pads -10/-20 dB, HPF 80/160 Hz'],
  ['48 V','48 V'],
  ['Transformer warmth under $300','Calidez con transformador por menos de $300'],
  ['$299','$299']
];
g.productTable.rows.forEach(function(r,i){r.values.splice(3,0,{value:seVals[i][0],value_es:seVals[i][1]});});
console.log('cols final: '+g.productTable.columns.map(function(c){return c.title;}).join(' | '));
// 3c. vpc: drop TLM102, add sE2200 + Sphere (keep order: ...,LCT440,sE2200,TLM103,...)
g.verdictProsCons=g.verdictProsCons.filter(function(v){return v.name!=='Neumann TLM 102';});
function vpc(name,name_es,pros,cons,pros_es,cons_es){return{name:name,name_es:name_es,pros:pros,cons:cons,pros_es:pros_es,cons_es:cons_es};}
var seVPC=vpc('sE Electronics sE2200','sE Electronics sE2200',
  ['Hand-built capsule with custom transformer and Class-A electronics','-10/-20 dB pads plus 80/160 Hz filters — tools the cheaper mics lack','24 mV/Pa output with 8 dB-A noise suits budget preamps','Versatile on vocals, guitar cabs, drums and brass'],
  ['Cardioid only — no multi-pattern flexibility','Needs 48 V phantom, no USB/dynamic versatility','611 g body is heavy for backpack and tour use','Presence is honest, not hyped — dull rooms stay dull'],
  ['Cápsula hecha a mano con transformador propio y electrónica Clase A','Pads -10/-20 dB más filtros 80/160 Hz — herramientas que los baratos no tienen','Salida 24 mV/Pa con 8 dB-A apta para previos básicos','Versátil en voces, guitarras, batería y metales'],
  ['Solo cardioide — sin flexibilidad multipatrón','Exige phantom de 48 V, sin versatilidad USB/dinámica','El cuerpo de 611 g pesa para mochila y gira','La presencia es honesta, no excitada — las salas apagadas siguen apagadas']);
var spVPC=vpc('Universal Audio Sphere DLX','Universal Audio Sphere DLX',
  ['38 legendary models from Neumann, Telefunken, AKG, Sony and more in one mic','Change mic model and polar pattern even after tracking','Native plugin needs no Apollo; dual diaphragms capture once, decide later','20 dB pad with 140 dB handling covers loud sources'],
  ['Needs two preamp channels and a 5-pin cable for one microphone','No Apollo means no realtime modeling while tracking','$1,499-tier price before you own a single classic','Modeling cannot rescue a bad room or bad placement'],
  ['38 modelos legendarios de Neumann, Telefunken, AKG, Sony y más en un micro','Cambia de micro y patrón polar incluso después de grabar','El plugin nativo no exige Apollo; los diafragmas duales capturan una vez y decides después','Pad de 20 dB con 140 dB cubre fuentes fuertes'],
  ['Pide dos previos y cable de 5 pines para un micrófono','Sin Apollo no hay modelado en tiempo real al grabar','Precio de gama $1.499 antes de poseer un clásico','El modelado no rescata una mala sala ni una mala colocación']);
var idx=g.verdictProsCons.findIndex(function(v){return v.name==='Neumann TLM 103';});
g.verdictProsCons.splice(idx,0,seVPC);
g.verdictProsCons.push(spVPC);
console.log('vpc: '+g.verdictProsCons.map(function(v){return v.name;}).join(' | '));
// 3d. new sections (append)
function SEC(h,hes,c,ces,prods){return{heading:h,heading_es:hes,content:c,content_es:ces,products:prods};}
g.sections.push(
  SEC('Transformer Warmth Under $300: sE Electronics sE2200',
    'Calidez con transformador por menos de $300: sE Electronics sE2200',
    '<strong>The mid-range gap ends here.</strong> The sE Electronics sE2200 jumps from budget simplicity to real analog engineering: a hand-built 1-inch capsule, custom output transformer and Class-A electronics with no ICs. Cardioid output runs hot at 24 mV/Pa with 8 dB-A noise, and physical switches give -10/-20 dB pads plus 80/160 Hz low-cuts the cheaper mics simply lack.</p><p><strong>The honest trade.</strong> Cardioid only, phantom only, and 611 g of metal to carry. For vocals, guitar cabs, drums and brass at $299, it is the transformer-weight bargain of the guide.',
    '<strong>La brecha de gama media termina aquí.</strong> El sE Electronics sE2200 salta de la simplicidad barata a ingeniería analógica real: cápsula de 1 pulgada hecha a mano, transformador propio y electrónica Clase A sin ICs. La salida cardioide corre caliente a 24 mV/Pa con 8 dB-A de ruido, e interruptores físicos dan pads -10/-20 dB más cortes 80/160 Hz que los baratos no tienen.</p><p><strong>El trato honesto.</strong> Solo cardioide, solo phantom, y 611 g de metal que cargar. Para voces, guitarras, batería y metales por $299, es la ganga con transformador de la guía.',
    [657]),
  SEC('38 Mics in One: Universal Audio Sphere DLX',
    '38 micros en uno: Universal Audio Sphere DLX',
    '<strong>Stop choosing the mic before the take.</strong> The Universal Audio Sphere DLX is a dual-diaphragm modeling condenser with 38 legendary models from Neumann, Telefunken, AKG, Sony and more — and you can change mic model and polar pattern even after tracking. The native plugin needs no Apollo hardware (realtime monitoring does), while the 5-pin XLR captures through two preamp channels with a 20 dB pad and 140 dB handling.</p><p><strong>The honest trade.</strong> One microphone eats two preamps and a special cable, the rig costs flagship money, and no model fixes a bad room. For C800-style rap gloss and total recall without owning vaults of vintage, it stands alone here.',
    '<strong>Deja de elegir el micro antes de la toma.</strong> El Universal Audio Sphere DLX es un condensador de modelado de doble diafragma con 38 modelos legendarios de Neumann, Telefunken, AKG, Sony y más — y puedes cambiar de micro y patrón polar incluso después de grabar. El plugin nativo no exige hardware Apollo (el tiempo real sí), mientras el XLR de 5 pines captura por dos previos con pad de 20 dB y 140 dB.</p><p><strong>El trato honesto.</strong> Un micrófono come dos previos y un cable especial, el equipo cuesta dinero insignia, y ningún modelo arregla una mala sala. Para el brillo rap estilo C800 y recall total sin cámaras de vintage, no tiene rival aquí.',
    [656])
);
g.featuredProducts=[196,297,652,657,654,4,655,656,2];
// 3e. verdict + conclusion (keep link tails)
function tailOf(s){var i=s.indexOf('<p>');return i>-1?s.slice(i):'';}
var cT=tailOf(g.conclusion),cET=tailOf(g.conclusion_es);
g.verdict='Start at $99 with the Audio-Technica AT2020; buy silence with the Rode NT1 Signature Series at 4 dB-A. The Lewitt LCT 440 PURE is record-ready simplicity, the sE Electronics sE2200 adds transformer weight with real pads and filters, and the Neumann TLM 103 is the modern vocal standard. The AKG C414 XLII flexes 9 patterns, the Warm Audio WA-8000 brings tube C800-style rap vocals, the Universal Audio Sphere DLX re-records through 38 classics after the take, and the Neumann U 87 Ai remains the lifetime flagship.';
g.verdict_es='Empieza por $99 con el Audio-Technica AT2020; compra silencio con el Rode NT1 Signature Series de 4 dB-A. El Lewitt LCT 440 PURE es simplicidad lista para grabar, el sE Electronics sE2200 añade peso con transformador, pads y filtros reales, y el Neumann TLM 103 es el estándar vocal moderno. El AKG C414 XLII despliega 9 patrones, el Warm Audio WA-8000 trae voces rap de válvulas estilo C800, el Universal Audio Sphere DLX regraba con 38 clásicos después de la toma, y el Neumann U 87 Ai sigue siendo el insignia de por vida.';
g.conclusion='Eight condensers, one ladder: the <strong>Audio-Technica AT2020</strong> teaches placement for $99, the <strong>Rode NT1 Signature Series</strong> removes self-noise from the equation, and the <strong>Lewitt LCT 440 PURE</strong> sounds finished with zero switches. The <strong>sE Electronics sE2200</strong> brings transformer weight, pads and filters for $299, and the <strong>Neumann TLM 103</strong> sets the modern vocal standard. The <strong>AKG C414 XLII</strong> covers every pattern, the <strong>Warm Audio WA-8000</strong> covers tube gloss, the <strong>Universal Audio Sphere DLX</strong> covers all 38 classics after tracking, and the <strong>Neumann U 87 Ai</strong> ends the climb. '+cT;
g.conclusion_es='Ocho condensadores, una escalera: el <strong>Audio-Technica AT2020</strong> enseña colocación por $99, el <strong>Rode NT1 Signature Series</strong> elimina el ruido de la ecuación, y el <strong>Lewitt LCT 440 PURE</strong> suena terminado sin interruptores. El <strong>sE Electronics sE2200</strong> trae peso con transformador, pads y filtros por $299, y el <strong>Neumann TLM 103</strong> fija el estándar vocal moderno. El <strong>AKG C414 XLII</strong> cubre cada patrón, el <strong>Warm Audio WA-8000</strong> cubre el brillo de válvulas, el <strong>Universal Audio Sphere DLX</strong> cubre los 38 clásicos después de grabar, y el <strong>Neumann U 87 Ai</strong> corona la subida. '+cET;
fs.writeFileSync(BASE+'data/guides.json',JSON.stringify(d,null,2));
console.log('guide done: sections='+g.sections.length);
if(fails.length){console.log('FAIL:\n'+fails.join('\n'));process.exit(1);}
console.log('DONE');
