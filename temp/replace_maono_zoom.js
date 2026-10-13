var fs=require('fs');
var BASE='C:/Users/Daniel/projects/topmusiciangear/';
var fails=[];
function R(s,a,b){ if(s.indexOf(a)===-1){fails.push('NOT FOUND: '+a.slice(0,70));return s;} return s.replace(a,b); }

// ============ 1. Add Zoom PodTrak P4next to products.json (id 664) ============
var ps=JSON.parse(fs.readFileSync(BASE+'data/products.json','utf8'));
ps.push(
  { id:664, title:'Zoom PodTrak P4next', title_es:'Zoom PodTrak P4next', brand:'Zoom', category:'streaming', price:179, rating:4.5, badge:'recommended',
    desc:'Next-gen portable podcast recorder with 4 XLR mic inputs (up to 70dB gain), 4 headphone outputs with independent volume, records to microSD, USB interface mode for streaming, tactile faders and 6 sound pads. ~$179 street.',
    desc_es:'Grabadora portátil de podcast de nueva generación con 4 entradas XLR de micrófono (hasta 70dB de ganancia), 4 salidas de auriculares con volumen independiente, graba a microSD, modo interfaz USB para streaming, faders táctiles y 6 pads de sonido. ~$179 en calle.',
    img:'https://r2.gear4music.com/media/133/1330177/1200/preview.jpg',
    stores:{
      gear4music:'https://www.gear4music.com/Recording-and-Computers/Zoom-Podtrak-P4Next-Podcasting-Interface/7TPP',
      andertons:'https://www.andertons.co.uk/podtrak-p4next--next-generation-podcast-recorder/',
      zzounds:'https://www.zzounds.com/item--ZOOZP4NEXT',
      musicstore:'https://www.musicstore.com/en_OE/EUR/Zoom-PodTrak-P4next-4-Track-Podcast-Recorder/art-REC0017137-000'
    },
    oos:['andertons'] }
);
ps.sort(function(a,b){return a.id-b.id;});
fs.writeFileSync(BASE+'data/products.json',JSON.stringify(ps,null,2));
console.log('Catalog: 664 Zoom PodTrak P4next added');

// ============ 2. Add TEST_SHOP_BTN entry in build-guides.js ============
var b=BASE+'build-guides.js';
var src=fs.readFileSync(b,'utf8');
function addAfter(id,newBlock){
  var key='\n  '+id+': {',i=src.indexOf(key);
  if(i===-1){fails.push('ANCHOR '+id+' NOT FOUND');return;}
  var j=src.indexOf('{',i),depth=0,k=j;
  while(k<src.length){if(src[k]==='{')depth++;else if(src[k]==='}'){if(--depth===0)break;}k++;}
  var end=k+1;if(src[end]===',')end++;
  src=src.slice(0,end)+'\n'+newBlock+src.slice(end);
}
addAfter(663,'  664: {\n    prices: {\n      gear4music: "£157.00",\n      andertons: "£157.00",\n      zzounds: "$179.00",\n      musicstore: "€172.00"\n    },\n    urls: {\n      gear4music: "https://www.gear4music.com/Recording-and-Computers/Zoom-Podtrak-P4Next-Podcasting-Interface/7TPP",\n      andertons: "https://www.andertons.co.uk/podtrak-p4next--next-generation-podcast-recorder/",\n      zzounds: "https://www.zzounds.com/item--ZOOZP4NEXT",\n      musicstore: "https://www.musicstore.com/en_OE/EUR/Zoom-PodTrak-P4next-4-Track-Podcast-Recorder/art-REC0017137-000"\n    },\n    oos: ["andertons"]\n  },');
fs.writeFileSync(b,src);
console.log('TEST 664 added');

// ============ 3. Update streaming-interfaces guide ============
var d=JSON.parse(fs.readFileSync(BASE+'data/guides.json','utf8'));
var g=d.find(function(x){return x.id==='streaming-interfaces';});

// Update intro: replace Maono with Zoom PodTrak P4next
g.intro=R(g.intro,'the Maono Maonocaster E2 Gen2 are the top','the Zoom PodTrak P4next are the top');
g.intro_es=R(g.intro_es,'el Maono Maonocaster E2 Gen2 son las mejores','el Zoom PodTrak P4next son las mejores');

// Update section 0 products: replace 327 with 664
var sec0=g.sections[0];
sec0.products=sec0.products.map(function(id){return id===327?664:id;});

// Update productTable columns: replace Maono with Zoom
g.productTable.columns=g.productTable.columns.map(function(c){
  if(c.title==='Maono Maonocaster E2 Gen2'){
    return {title:'Zoom PodTrak P4next',title_es:'Zoom PodTrak P4next'};
  }
  return c;
});

// Update productTable rows values: replace Maono column values with Zoom
var zoomVals={
  'Best For':['Portable podcast recorder with 4 XLR inputs','Grabadora portátil de podcast con 4 entradas XLR'],
  'Type':['Portable recorder + USB interface','Grabadora portátil + interfaz USB'],
  'Mic Gain':['4x XLR up to 70dB','4x XLR hasta 70dB'],
  'Video Capture':['No','No'],
  'Keys / Controls':['Tactile faders + 6 sound pads','Faders táctiles + 6 pads de sonido'],
  'Connectivity':['microSD, USB, TRRS','microSD, USB, TRRS'],
  'Software':['Podcast recording software','Software de grabación de podcast'],
  'Estimated Price':['~$179','~$179']
};
Object.keys(zoomVals).forEach(function(label){
  var r=g.productTable.rows.find(function(x){return x.label===label;});
  if(!r) return;
  var v=zoomVals[label];
  r.values[r.values.length-1]={value:v[0],value_es:v[1]};
});

// Replace section 5 (Maono section) with Zoom P4next section
function SEC(h,hes,c,ces,prods){return{heading:h,heading_es:hes,content:c,content_es:ces,products:prods};}
var maonoIdx=g.sections.findIndex(function(s){return s.heading.indexOf('Maono Maonocaster')>-1;});
if(maonoIdx>-1){
  g.sections[maonoIdx]=SEC(
    'Is the Zoom PodTrak P4next the Best Portable Podcast Recorder?',
    '¿Es el Zoom PodTrak P4next la mejor grabadora portátil de podcast?',
    '<p><strong>The Zoom PodTrak P4next is a portable podcast studio you can take anywhere.</strong> It gives you four XLR inputs with up to 70dB of clean gain, four headphone outputs with their own volume knobs, and records everything to microSD with zero computer needed. For streamers, it also works as a USB interface so you can bring the same hardware to your desk.</p><p><strong>Tactile faders and six sound pads</strong> let you ride levels and fire intros live — the same physical workflow that makes the big Rodecaster consoles work, but in a box that fits in a backpack. Loopback and TRRS call-in handle remote guests, and the built-in podcast software guides you through editing on the unit itself.</p><p><strong>The honest trade.</strong> It tops at 48kHz/24-bit with no 32-bit float, the screen is small for deep menu diving, and the plastic build is light but not tank-like. For podcasters who record on location or streamers who want hardware faders without the desk footprint, it is the most complete portable package at this price.</p>',
    '<p><strong>El Zoom PodTrak P4next es un estudio de podcast portátil que cabe en la mochila.</strong> Te da cuatro entradas XLR con hasta 70dB de ganancia limpia, cuatro salidas de auriculares con sus propios controles de volumen y graba todo a microSD sin necesitar ordenador. Para streamers, también funciona como interfaz USB para llevar el mismo hardware al escritorio.</p><p><strong>Faders táctiles y seis pads de sonido</strong> te permiten subir y bajar niveles y lanzar intros en directo — el mismo flujo físico que hace funcionar las grandes consolas Rodecaster, pero en una caja que cabe en una mochila. Loopback y llamada TRRS gestionan invitados remotos, y el software de podcast integrado te guía para editar en la propia unidad.</p><p><strong>El trato honesto.</strong> Topa en 48kHz/24-bit sin 32-bit float, la pantalla es pequeña para menús profundos y la construcción de plástico es ligera pero no blindada. Para podcasters que graban en exteriores o streamers que quieren faders de hardware sin ocupar el escritorio, es el paquete portátil más completo a este precio.</p>',
    [664]
  );
}

// Update conclusion: replace Maono mention with Zoom
g.conclusion=R(g.conclusion,'and the Maono Maonocaster E2 Gen2 is the budget console pick','and the Zoom PodTrak P4next is the portable recorder pick');
g.conclusion_es=R(g.conclusion_es,'y el Maono Maonocaster E2 Gen2 es la consola económica','y el Zoom PodTrak P4next es la grabadora portátil');

// Update featuredProducts: replace 327 with 664
g.featuredProducts=g.featuredProducts.map(function(id){return id===327?664:id;});

// Update FAQ: replace Maonocaster E2 mentions with Zoom PodTrak P4next
var F=g.featuredSnippet;
F.faq_a1_en=R(F.faq_a1_en,'The Maonocaster E2 or Audient EVO 4','The Zoom PodTrak P4next or Audient EVO 4');
F.faq_a1_es=R(F.faq_a1_es,'El Maonocaster E2 o el Audient EVO 4','El Zoom PodTrak P4next o el Audient EVO 4');
F.faq_a4_en=R(F.faq_a4_en,'the Maonocaster E2 integrates it too','the Zoom PodTrak P4next integrates it too');
F.faq_a4_es=R(F.faq_a4_es,'el Maonocaster E2 también lo integra','el Zoom PodTrak P4next también lo integra');
F.faq_a5_en=R(F.faq_a5_en,'Maonocaster E2): everything','Zoom PodTrak P4next): everything');
F.faq_a5_es=R(F.faq_a5_es,'Maonocaster E2): todo','Zoom PodTrak P4next): todo');

// Update featuredSnippet text (already generic enough, just verify)
F.text_en=R(F.text_en,'and the Universal Audio Volt 276 adds analog 1176-style compression. All four perform','and the Universal Audio Volt 276 adds analog 1176-style compression. All four perform');
F.text_es=R(F.text_es,'y el Universal Audio Volt 276 añade compresión analógica estilo 1176. Los cuatro funcionan','y el Universal Audio Volt 276 añade compresión analógica estilo 1176. Los cuatro funcionan');

fs.writeFileSync(BASE+'data/guides.json',JSON.stringify(d,null,2));
console.log('Guide updated');

if(fails.length){console.log('FAIL:\n'+fails.join('\n'));process.exit(1);}
console.log('DONE');