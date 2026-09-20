const fs=require('fs');const R='C:/Users/Daniel/projects/topmusiciangear/data';
const L=p=>JSON.parse(fs.readFileSync(R+'/'+p,'utf8'));
const S=(p,d)=>fs.writeFileSync(R+'/'+p,JSON.stringify(d,null,1));

const GRAW=L('guides.json');const GS0=Array.isArray(GRAW)?GRAW:(GRAW.guides||[]);

// ---- validar products.json: Apollo x16 (182) y Twin X (16) siguen, y los 5 nuevos ----
const PRAW=L('products.json');const A0=Array.isArray(PRAW)?PRAW:(PRAW.products||[]);
const byId=new Map(A0.map(p=>[p.id,p]));
for(const id of [182,16,512,513,514,515,516]){
  const p=byId.get(id);
  if(!id) {}
  console.log((p?('OK  '):'MISSING ')+'id='+id+(p?' | '+(p.title||p.name||''):''));
}
console.log('total products='+A0.length);

// ---- template: pro-interfaces (lo MÁS parecido a premium rack) ----
const tmpl=GS0.find(g=>g&&g.id==='pro-interfaces');
if(!tmpl){console.error('NO template pro-interfaces');process.exit(1);}

// ---- crear premium-interfaces: clon del template, reescrito ----
const premium=JSON.parse(JSON.stringify(tmpl));
premium.id='premium-interfaces';
premium.title='The 7 Best Premium Audio Interfaces for Pro Studios';
premium.title_es='Las 7 Mejores Interfaces de Audio Premium para Estudios Pro';
premium.titleTag='7 Best Premium Audio Interfaces (2026): Neumann MT 48, Apollo, RME & More';
premium.titleTag_es='7 Mejores Interfaces Premium (2026): Neumann MT 48, Apollo, RME y más';
premium.category='interfaces';
premium.badge='premium';
premium.cover=byId.get(182)&&byId.get(182).img;

// secciones -> 3 groups de productos por id (desktop/portable premium; rack; immersive/especial)
premium.sections=JSON.parse(JSON.stringify(tmpl.sections||[]));
// rellenar: mantengo estructura de template pero apunto a productos premium por id
// (el template ya usaba ids numericos en sections[].products: [182,183] -> ok)
// Ahora reescribo con la lista final:
const groups=[
  {h:'Desktop & Portable Premium Interfaces',h_es:'Interfaces Premium de Escritorio y Portátiles',
   intro:'Flagship conversion and DSP in desktop and travel-friendly form — Neumann MT 48, Apollo Twin X, RME Babyface Pro FS.',
   intro_es:'Conversión insignia y DSP en formato de escritorio y de viaje — Neumann MT 48, Apollo Twin X, RME Babyface Pro FS.',
   intro_es:'Conversión insignia y DSP en escritorio y formato de viaje — Neumann MT 48, Apollo Twin X, RME Babyface Pro FS.',
   products:[512,16,17,183]},
  {h:'Premium Rack Interfaces for Pro Studios',h_es:'Interfaces Premium de Rack para Estudios Pro',
   intro:'Rack-mount converters and DSP hubs for commercial and immersive studios — Apollo x16, x8p, Fireface UFX III, Symphony I/O Mk II.',
   intro_es:'Convertidores y hubs DSP de rack para estudios comerciales e inmersivos — Apollo x16, x8p, Fireface UFX III, Symphony I/O Mk II.',
   products:[182,513,183,514]},
  {h:'Immersive & Specialty Interfaces (Atmos & Immersive)',h_es:'Interfaces Inmersivas y de Especialidad (Atmos e Inmersivo)',
   intro:'Immersive-ready interfaces and monitor controllers — Audient ORIA and Lynx Aurora-n for Dolby Atmos and beyond.',
   intro_es:'Interfaces inmersivas y controladores de monitores — Audient ORIA y Lynx Aurora-n para Dolby Atmos y más allá.',
   products:[515,516]}
];
// mapeo: sections del template eran [comparison?] — para GUIA list use sections de 3
premium.sections=groups.map((g,i)=>({
  ...g,
  h2: g.h, h2_es: g.h_es,
  paragraphs: [g.intro], paragraphs_es:[g.intro_es],
  products: g.products
}));

// featuredProducts / productTable / verdict del template ya referencian ids premium [182,183] -> ok, les anado los demas
premium.featuredProducts=[182,183,512,513,514,515,516];
if(premium.productTable&&Array.isArray(premium.productTable)){}

console.log('guia premium-interfaces lista: cover='+premium.cover);
console.log('  featuredProducts='+JSON.stringify(premium.featuredProducts));

// ---- migrar: quitar los 2 Apollo (por NOMBRE, portable usa string) de portable-interfaces ----
const portable=GS0.find(g=>g&&g.id==='portable-interfaces');
const UA_NAMES=['universal audio apollo twin x gen 2','universal audio apollo x16 gen 2'];
if(portable){
  (portable.sections||[]).forEach((s,i)=>{
    if(!s||!Array.isArray(s.products))return;
    const before=s.products.length;
    s.products=s.products.filter(x=>{
      const n=String((x&&(x.title!==undefined?x.title:(x.name!==undefined?x.name:x)))||'');
      return !UA_NAMES.includes(n.toLowerCase()) && !UA_NAMES.includes(String(x).toLowerCase());
    });
    if(s.products.length!==before)console.log('  portable.sections['+i+'] products: '+before+' -> '+s.products.length+' (quita 2 UA)');
  });
}

// ---- actualizar la lista: reemplazar portable por nueva version, agregar premium ----
const idx=GS0.findIndex(g=>g&&g.id==='portable-interfaces');
if(idx>=0)GS0[idx]=portable;
const premIdx=GS0.findIndex(g=>g&&g.id==='premium-interfaces');
if(premIdx>=0)GS0[premIdx]=premium;else GS0.push(premium);

const OUT=Array.isArray(GRAW)?GS0:Object.assign({},GRAW,{guides:GS0});
S('guides.json',OUT);
console.log('\nOK guides.json guardado | total guides='+GS0.length);
