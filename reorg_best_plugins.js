const fs=require('fs');
const p='C:\\Users\\Daniel\\projects\\topmusiciangear\\data\\guides.json';
let data=JSON.parse(fs.readFileSync(p,'utf8'));
const g=data.find(x=>x.id==='best-plugins');
if(!g){console.error('not found');process.exit(1);}

const secMap={};
g.sections.forEach(s=>secMap[s.heading]=s);

const free=secMap['Free Plugins That Rival Premium'];
const fabTotal=secMap['FabFilter Total Bundle: Three Tools You Reach for Every Mix'];
fabTotal.content = fabTotal.content + '\n<p><strong>Pro-Q 4 and Pro-C 3 can be purchased individually.</strong></p>';
fabTotal.content_es = fabTotal.content_es + '\n<p><strong>Pro-Q 4 y Pro-C 3 también se pueden comprar por separado.</strong></p>';
fabTotal.heading='Essential Mixing & EQ';
fabTotal.heading_es='Mezcla esencial y EQ';

const soundtoys=secMap['Soundtoys 5.5 Bundle: 23 Iconic Effects'];
const uad=secMap['UAD Ultimate 14: 100+ Hardware Emulations'];
const analog={
  heading:'Analog Color & Creative FX',
  heading_es:'Color analógico y efectos creativos',
  content:soundtoys.content+'<hr>'+uad.content,
  content_es:soundtoys.content_es+'<hr>'+uad.content_es,
  products:[...soundtoys.products,...uad.products],
  skipMedia:true,
  verdict:'',
  verdict_es:'',
  pros:[],
  pros_es:[],
  cons:[],
  cons_es:[],
  specs:{}
};

const melodyne=secMap['Celemony Melodyne 5: Fixing Notes Without Flattening the Performance'];
melodyne.heading='Vocal Processing';
melodyne.heading_es='Procesamiento vocal';

const ozone=secMap['iZotope Ozone 12 Advanced: Eight Mastering Stages in One Chain'];
ozone.heading='Mastering';
ozone.heading_es='Masterización';

const komplete=secMap['Native Instruments Komplete 26: Strings, Synths and Scoring in One'];
komplete.heading='Virtual Instruments';
komplete.heading_es='Instrumentos virtuales';

const tdr=secMap['Tokyo Dawn Labs TDR Kotelnikov GE: Bus Compression That Breathes'];
tdr.heading='Budget / Transparent';
tdr.heading_es='Presupuesto / Transparente';

g.sections=[free,fabTotal,analog,melodyne,ozone,komplete,tdr];

const colOrder=[
 'FabFilter Total Bundle',
 'TDR Kotelnikov GE',
 'Soundtoys 5.5 Bundle',
 'Universal Audio UAD Ultimate 14',
 'Celemony Melodyne 5',
 'iZotope Ozone 12 Advanced',
 'Native Instruments Komplete 26 Ultimate'
];
const colMap={
 'FabFilter Total Bundle':{title:'FabFilter Total Bundle',title_es:'FabFilter Total Bundle'},
 'TDR Kotelnikov GE':{title:'Tokyo Dawn Labs TDR Kotelnikov GE',title_es:'Tokyo Dawn Labs TDR Kotelnikov GE'},
 'Soundtoys 5.5 Bundle':{title:'Soundtoys 5.5 Bundle',title_es:'Soundtoys 5.5 Bundle'},
 'Universal Audio UAD Ultimate 14':{title:'Universal Audio UAD Ultimate 14',title_es:'Universal Audio UAD Ultimate 14'},
 'Celemony Melodyne 5':{title:'Celemony Melodyne 5',title_es:'Celemony Melodyne 5'},
 'iZotope Ozone 12 Advanced':{title:'iZotope Ozone 12 Advanced',title_es:'iZotope Ozone 12 Advanced'},
 'Native Instruments Komplete 26 Ultimate':{title:'Native Instruments Komplete 26 Ultimate',title_es:'Native Instruments Komplete 26 Definitivo'}
};
g.productTable.columns=colOrder.map(name=>colMap[name]);

// Build rows for 7 columns based on original values
// We'll reuse existing row values but filter to matching columns.
const originalCols = [
 'FabFilter Total Bundle',
 'FabFilter Pro-Q 4',
 'FabFilter Pro-C 3',
 'iZotope Ozone 12 Advanced',
 'Soundtoys 5.5 Bundle',
 'Celemony Melodyne 5',
 'Native Instruments Komplete 26 Ultimate',
 'Tokyo Dawn Labs TDR Kotelnikov GE',
 'Universal Audio UAD Ultimate 14'
];
const valueMap = {};
g.productTable.rows.forEach(row=>{
  const vals=row.values;
  originalCols.forEach((c,i)=>{
    valueMap[c]=vals[i];
  });
  // replace values with new order
  const newVals=colOrder.map(name=>{
    // map name variations
    let key=name;
    if(name==='TDR Kotelnikov GE') key='Tokyo Dawn Labs TDR Kotelnikov GE';
    return valueMap[key];
  });
  row.values=newVals;
});

g.featuredProducts=[29,61,32,121,120,30,123];

g.verdict='<p><strong>The reference in this category is <span class="product-name">FabFilter Total Bundle</span>.</strong> The ultimate mixing and mastering toolkit. Pro-Q 4, Pro-C 3, Pro-L 2, Pro-R 2, Saturn 2, Timeless 3, Volcano 3, Twin 3, and more. Pro-Q 4 and Pro-C 3 can be purchased individually.</p><p><strong><span class="product-name">Tokyo Dawn Labs TDR Kotelnikov GE</span></strong> — Transparent bus & master compression with M/S, sidechain EQ, lookahead, oversampling.</p><p><strong><span class="product-name">Soundtoys 5.5 Bundle</span></strong> — 23 iconic effects including Decapitator, EchoBoy, Little AlterBoy, SuperPlate, SpaceBlender, and Effect Rack.</p><p><strong><span class="product-name">Universal Audio UAD Ultimate 14</span></strong> — The complete UAD plugin collection with 100+ hardware emulations.</p><p><strong><span class="product-name">Celemony Melodyne 5</span></strong> — Industry standard for pitch correction and vocal tuning.</p><p><strong><span class="product-name">iZotope Ozone 12 Advanced</span></strong> — Next-gen AI-powered mastering suite.</p><p><strong><span class="product-name">Native Instruments Komplete 26 Ultimate</span></strong> — The ultimate Native Instruments collection.</p>';

g.verdict_es='<p><strong>La referencia de la categoría es <span class="product-name">FabFilter Paquete Total</span>.</strong> El kit definitivo de mezcla y masterización. Pro-Q 4, Pro-C 3, Pro-L 2, Pro-R 2, Saturn 2, Timeless 3, Volcano 3, Twin 3 y más. Pro-Q 4 y Pro-C 3 se pueden comprar por separado.</p><p><strong><span class="product-name">Tokyo Dawn Labs TDR Kotelnikov GE</span></strong> — Compresión transparente de bus y master con M/S, EQ de sidechain, lookahead y oversampling.</p><p><strong><span class="product-name">Soundtoys 5.5 Bundle</span></strong> — 23 efectos icónicos incluyendo Decapitator, EchoBoy, Little AlterBoy, SuperPlate, SpaceBlender y Effect Rack.</p><p><strong><span class="product-name">Universal Audio UAD Ultimate 14</span></strong> — La colección completa de plugins UAD con más de 100 emulaciones.</p><p><strong><span class="product-name">Celemony Melodyne 5</span></strong> — Estándar de la industria para corrección de tono y afinación vocal.</p><p><strong><span class="product-name">iZotope Ozone 12 Advanced</span></strong> — Suite de masterización con IA de nueva generación.</p><p><strong><span class="product-name">Native Instruments Komplete 26 Definitivo</span></strong> — La colección definitiva de Native Instruments.</p>';

fs.writeFileSync(p, JSON.stringify(data,null,2));
console.log('done');
