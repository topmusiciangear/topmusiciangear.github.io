const fs=require('fs');const R='C:/Users/Daniel/projects/topmusiciangear/data';
const JL=p=>JSON.parse(fs.readFileSync(R+'/'+p,'utf8'));
const jg=JL('guides.json');const GS=Array.isArray(jg)?jg:(jg.guides||[]);
const pg=JL('products.json');const PS=Array.isArray(pg)?pg:(pg.products||[]);
const byId=new Map(PS.map(x=>[x.id,x]));
const UA_TS=['Universal Audio Apollo Twin X Gen 2'];
const UA_X16=['Universal Audio Apollo x16 Gen 2'];

const tmpl=GS.find(x=>x&&x.id==='pro-interfaces');
if(!tmpl){console.error('no template pro-interfaces');process.exit(1)}
const g=JSON.parse(JSON.stringify(tmpl));

g.id='premium-interfaces';
g.title='The 7 Best Premium Audio Interfaces for Pro Studios';
g.title_es='Las 7 Mejores Interfaces de Audio Premium para Estudios Pro';
g.titleTag='7 Best Premium Audio Interfaces (2026): Neumann MT 48, UA Apollo x16 & RME';
g.titleTag_es='7 Mejores Interfaces Premium (2026): Neumann MT 48, UA Apollo x16 y RME';
g.category='interfaces';
g.badge='premium';
const x16=byId.get(182)||{};
g.image=x16.img;                // PORTADA = img del Apollo x16 Gen 2
g.featuredProducts=[182,183,512,16,513,514,515,516];

g.sections=[
 {h:'Flagship Desktop & Portable Premium Interfaces',h_es:'Interfaces Premium de Escritorio y Port\u00e1tiles',
  products:[512,16,182]},
 {h:'Premium Rack & Immersive Interfaces (RME, Lynx, Apogee)',h_es:'Interfaces Premium de Rack e Inmersivas (RME, Lynx, Apogee)',
  products:[513,183,514,515,516]}
];
g.sections=g.sections.map(s=>({
  ...s,
  intro:'Flagship conversion, DSP routings and drivers that never crash — the premium tier that outlives the music.',
  intro_es:'Conversi\u00f3n insignia, ruteo DSP y drivers que nunca fallan — la gama premium que sobrevive a la m\u00fasica.'
}));

const uid=GS.findIndex(x=>x&&x.id==='premium-interfaces');
if(uid>=0)GS[uid]=g; else GS.push(g);

const port=GS.find(x=>x&&x.id==='portable-interfaces');
if(port&&Array.isArray(port.sections)){
  port.sections.forEach((s,si)=>{
    if(!s||!Array.isArray(s.products))return;
    const b=s.products.length;
    s.products=s.products.filter(x=>{
      const n=String(x&&(x.title!==undefined?x.title:(x.name||x))||'').trim();
      return !(UA_TS.includes(n)||UA_X16.includes(n));
    });
    if(s.products.length!==b)console.log('  portable.sections['+si+'] '+b+' -> '+s.products.length+' (quita Apollo)');
  });
  if(Array.isArray(port.featuredProducts)){
    const b=port.featuredProducts.length;
    port.featuredProducts=port.featuredProducts.filter(x=>![16,182].includes(x));
    if(port.featuredProducts.length!==b)console.log('  portable.featuredProducts '+b+' -> '+port.featuredProducts.length);
  }
}

const OUT=Array.isArray(jg)?GS:Object.assign({},jg,{guides:GS});
fs.writeFileSync(R+'/guides.json',JSON.stringify(OUT,null,1));
console.log('\nOK guides.json guardado | guides='+GS.length+' | premium-interfaces='+GS.some(x=>x&&x.id==='premium-interfaces'));
console.log('portable sections Apollo restantes='+(port?JSON.stringify(port.sections.map(s=>s.products.length)):'?'));
