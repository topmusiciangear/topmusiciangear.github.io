var fs=require('fs');
var BASE='C:/Users/Daniel/projects/topmusiciangear/';
var fails=[];
function R(s,a,b){ if(s.indexOf(a)===-1){fails.push('NOT FOUND: '+a.slice(0,70));return s;} return s.replace(a,b); }

// ============ 1. Add Focusrite Vocaster One to products.json (id 665) ============
var ps=JSON.parse(fs.readFileSync(BASE+'data/products.json','utf8'));
ps.push(
  { id:665, title:'Focusrite Vocaster One', title_es:'Focusrite Vocaster One', brand:'Focusrite', category:'streaming', price:149, rating:4.5, badge:'recommended',
    desc:'Solo podcaster interface with 70dB+ gain, Auto Gain, Enhance presets, mute button, TRRS phone input, TRS camera output, stereo loopback. Includes Hindenburg Pro + Acast trials. ~$149 (often on sale ~$50-70).',
    desc_es:'Interfaz para podcaster en solitario con 70dB+ de ganancia, Auto Gain, presets Enhance, botón mute, entrada TRRS para teléfono, salida TRS para cámara, loopback estéreo. Incluye pruebas de Hindenburg Pro + Acast. ~$149 (a menudo en oferta ~$50-70).',
    img:'https://cdn11.bigcommerce.com/s-4hc0jwsnnq/images/stencil/1280x1280/products/2507/8958/511329-Vocaster-One_overhead_HR__87977.1714742759.jpg?c=1',
    stores:{
      gear4music:'https://www.gear4music.com/Recording-and-Computers/Focusrite-Vocaster-One/4UI2',
      andertons:'https://www.andertons.co.uk/focusrite-vocaster-one-podcast-interface/',
      zzounds:'https://www.zzounds.com/item--FOCVOCASTERONE',
      musicstore:'https://www.musicstore.com/en_OE/EUR/Focusrite-Vocaster-One-Podcast-USB-Audio-Interface/art-PCM0017400-000',
      amazon:'https://www.amazon.com/dp/B09K9VQKQ3'
    },
    oos:['andertons','zzounds'] }
);
ps.sort(function(a,b){return a.id-b.id;});
fs.writeFileSync(BASE+'data/products.json',JSON.stringify(ps,null,2));
console.log('Catalog: 665 Focusrite Vocaster One added');

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
addAfter(664,'  665: {\n    prices: {\n      gear4music: "£89.00",\n      andertons: "£69.00",\n      zzounds: "$149.00",\n      musicstore: "€89.00",\n      amazon: "$69.00"\n    },\n    urls: {\n      gear4music: "https://www.gear4music.com/Recording-and-Computers/Focusrite-Vocaster-One/4UI2",\n      andertons: "https://www.andertons.co.uk/focusrite-vocaster-one-podcast-interface/",\n      zzounds: "https://www.zzounds.com/item--FOCVOCASTERONE",\n      musicstore: "https://www.musicstore.com/en_OE/EUR/Focusrite-Vocaster-One-Podcast-USB-Audio-Interface/art-PCM0017400-000",\n      amazon: "https://www.amazon.com/dp/B09K9VQKQ3"\n    },\n    oos: ["andertons","zzounds"]\n  },');
fs.writeFileSync(b,src);
console.log('TEST 665 added');

// ============ 3. Update streaming-interfaces guide ============
var d=JSON.parse(fs.readFileSync(BASE+'data/guides.json','utf8'));
var g=d.find(function(x){return x.id==='streaming-interfaces';});

// Update intro: add Vocaster One
g.intro=R(g.intro,'the Zoom PodTrak P4next are the top','the Focusrite Vocaster One and the Zoom PodTrak P4next are the top');
g.intro_es=R(g.intro_es,'el Zoom PodTrak P4next son las mejores','el Focusrite Vocaster One y el Zoom PodTrak P4next son las mejores');

// Update section 0 products: add 665
var sec0=g.sections[0];
sec0.products.push(665);

// Update productTable columns: add Vocaster One
g.productTable.columns.push({title:'Focusrite Vocaster One',title_es:'Focusrite Vocaster One'});

// Update productTable rows values: add Vocaster One column
var vocVals={
  'Best For':['Solo podcaster with Auto Gain & Enhance','Podcaster en solitario con Auto Gain y Enhance'],
  'Type':['Compact USB-C podcast interface','Interfaz USB-C compacta para podcast'],
  'Mic Gain':['1x XLR 70dB+ with Auto Gain','1x XLR 70dB+ con Auto Gain'],
  'Video Capture':['No (TRS camera out)','No (salida TRS cámara)'],
  'Keys / Controls':['Auto Gain, Enhance, Mute','Auto Gain, Enhance, Mute'],
  'Connectivity':['USB-C, TRRS phone, TRS cam, loopback','USB-C, TRRS teléfono, TRS cam, loopback'],
  'Software':['Vocaster Hub, Hindenburg Pro trial','Vocaster Hub, prueba Hindenburg Pro'],
  'Estimated Price':['~$149 (~$50-70 sale)','~$149 (~$50-70 oferta)']
};
Object.keys(vocVals).forEach(function(label){
  var r=g.productTable.rows.find(function(x){return x.label===label;});
  if(!r) return;
  var v=vocVals[label];
  r.values.push({value:v[0],value_es:v[1]});
});

// Add Vocaster One section after Zoom section
function SEC(h,hes,c,ces,prods){return{heading:h,heading_es:hes,content:c,content_es:ces,products:prods};}
var zoomIdx=g.sections.findIndex(function(s){return s.heading.indexOf('Zoom PodTrak')>-1;});
if(zoomIdx>-1){
  g.sections.splice(zoomIdx+1,0,
    SEC('Is the Focusrite Vocaster One the Best Simple Podcaster Interface?',
      '¿Es el Focusrite Vocaster One la mejor interfaz simple para podcasters?',
      '<p><strong>The Focusrite Vocaster One is built for one thing: making solo podcasting dead simple.</strong> It has a single XLR input with over 70dB of gain — enough to drive an SM7B without a booster — and the headline feature is Auto Gain: hold the button, talk for a few seconds, and it sets your level perfectly. No guesswork, no clipping.</p><p><strong>Enhance gives you three podcaster-approved voice presets</strong> (and a fourth custom slot in Vocaster Hub) so your voice sounds broadcast-ready in one click. A big mute button kills coughs and sneezes instantly. Stereo loopback pulls computer audio into your stream, TRRS phone input brings in callers with mix-minus, and TRS camera output sends clean audio to your video.</p><p><strong>The honest trade.</strong> Only one mic input — this is not for interviews or roundtables. The unit is plastic and feels light, and at full price (~$149) it overlaps the EVO 4; but on sale (~$50-70) it is the best value solo podcaster interface on the market. If you are one person, one mic, and want zero-friction setup, this is it.</p>',
      '<p><strong>El Focusrite Vocaster One está hecho para una sola cosa: que el podcast en solitario sea ridículamente simple.</strong> Tiene una entrada XLR con más de 70dB de ganancia — suficiente para mover un SM7B sin booster — y la función estrella es Auto Gain: mantienes el botón, hablas unos segundos, y ajusta tu nivel perfecto. Sin adivinar, sin recortar.</p><p><strong>Enhance te da tres presets de voz aprobados por podcasters</strong> (y un cuarto slot personalizable en Vocaster Hub) para que tu voz suene lista para radiodifusión en un clic. Un botón mute grande corta toses y estornudos al instante. Loopback estéreo trae el audio del PC a tu directo, entrada TRRS de teléfono mete llamadas con mix-minus, y salida TRS de cámara envía audio limpio a tu vídeo.</p><p><strong>El trato honesto.</strong> Solo una entrada de micro — no es para entrevistas ni mesas redondas. La unidad es de plástico y se siente ligera, y a precio completo (~$149) compite con el EVO 4; pero en oferta (~$50-70) es la mejor interfaz para podcaster en solitario por ese precio. Si eres una persona, un micro y quieres configuración sin fricción, esta es la tuya.</p>',
      [665]
    )
  );
}

// Update conclusion: add Vocaster One
g.conclusion=R(g.conclusion,'and the Zoom PodTrak P4next is the portable recorder pick','the Focusrite Vocaster One is the best simple solo podcaster pick with Auto Gain and Enhance, and the Zoom PodTrak P4next is the portable recorder pick');
g.conclusion_es=R(g.conclusion_es,'y el Zoom PodTrak P4next es la grabadora portátil','el Focusrite Vocaster One es la mejor opción simple para podcasters en solitario con Auto Gain y Enhance, y el Zoom PodTrak P4next es la grabadora portátil');

// Update featuredProducts: add 665
g.featuredProducts.push(665);

// Update featuredSnippet text
var F=g.featuredSnippet;
F.text_en=R(F.text_en,'and the Zoom PodTrak P4next is a portable recorder with 4 XLR inputs and sound pads. All perform','the Focusrite Vocaster One is the best simple solo podcaster interface with Auto Gain and Enhance, and the Zoom PodTrak P4next is a portable recorder with 4 XLR inputs and sound pads. All perform');
F.text_es=R(F.text_es,'y el Zoom PodTrak P4next es una grabadora portátil con 4 entradas XLR y pads de sonido. Todas funcionan','el Focusrite Vocaster One es la mejor interfaz simple para podcaster en solitario con Auto Gain y Enhance, y el Zoom PodTrak P4next es una grabadora portátil con 4 entradas XLR y pads de sonido. Todas funcionan');

// Update FAQ: add Vocaster One mentions
F.faq_a1_en=R(F.faq_a1_en,'The Zoom PodTrak P4next or Audient EVO 4','The Focusrite Vocaster One (on sale), the Zoom PodTrak P4next or Audient EVO 4');
F.faq_a1_es=R(F.faq_a1_es,'El Zoom PodTrak P4next o el Audient EVO 4','El Focusrite Vocaster One (en oferta), el Zoom PodTrak P4next o el Audient EVO 4');
F.faq_a5_en=R(F.faq_a5_en,'consoles win (Rodecaster Duo, Bridge Cast X, Zoom PodTrak P4next):','consoles win (Rodecaster Duo, Bridge Cast X, Focusrite Vocaster One, Zoom PodTrak P4next):');
F.faq_a5_es=R(F.faq_a5_es,'ganan las consolas (Rodecaster Duo, Bridge Cast X, Zoom PodTrak P4next):','ganan las consolas (Rodecaster Duo, Bridge Cast X, Focusrite Vocaster One, Zoom PodTrak P4next):');

// Add Vocaster One to verdictProsCons
function vpc(n,ne,p,c,pe,ce){return{name:n,name_es:ne,pros:p,cons:c,pros_es:pe,cons_es:ce};}
if(!g.verdictProsCons.find(function(v){return v.name==='Focusrite Vocaster One';})){
  g.verdictProsCons.push(
    vpc('Focusrite Vocaster One','Focusrite Vocaster One',
      ['Over 70dB gain drives SM7B without booster','Auto Gain sets perfect level in seconds','Enhance presets + Mute button for pro sound','TRRS phone in with mix-minus, TRS camera out, stereo loopback','Includes 6mo Hindenburg Pro + Acast Influencer','Often on sale for ~$50-70 incredible value'],
      ['Only 1 mic input — not for interviews/roundtables','Plastic build feels light','Full price (~$149) overlaps EVO 4','No hardware faders or pads','Discontinued? Heavy discounts suggest end of life'],
      ['Más de 70dB de ganancia mueve SM7B sin booster','Auto Gain ajusta el nivel perfecto en segundos','Presets Enhance + botón Mute para sonido pro','TRRS teléfono con mix-minus, TRS cámara, loopback estéreo','Incluye 6 meses Hindenburg Pro + Acast Influencer','A menudo en oferta ~$50-70 valor increíble'],
      ['Solo 1 entrada de micro — no para entrevistas/mesas','Construcción de plástico ligera','Precio completo (~$149) solapa con EVO 4','Sin faders ni pads de hardware','¿Descontinuado? Grandes descuentos sugieren fin de vida']
    )
  );
}

fs.writeFileSync(BASE+'data/guides.json',JSON.stringify(d,null,2));
console.log('Guide updated');

if(fails.length){console.log('FAIL:\n'+fails.join('\n'));process.exit(1);}
console.log('DONE');