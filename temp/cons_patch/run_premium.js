const fs=require('fs');
const R='C:/Users/Daniel/projects/topmusiciangear/data';
const JL=p=>JSON.parse(fs.readFileSync(R+'/'+p,'utf8'));
const jg=JL('guides.json');const GS=Array.isArray(jg)?jg:(jg.guides||[]);
const pg=JL('products.json');const PS=Array.isArray(pg)?pg:(pg.products||[]);
const byId=new Map(PS.map(x=>[x.id,x]));

const tmpl=GS.find(x=>x&&x.id==='pro-interfaces');
if(!tmpl){console.error('no template pro-interfaces');process.exit(1)}
const g=JSON.parse(JSON.stringify(tmpl));

g.id='premium-interfaces';
g.title='The 7 Best Premium Audio Interfaces for Pro Studios';
g.title_es='Las 7 Mejores Interfaces de Audio Premium para Estudios Pro';
g.titleTag='7 Best Premium Audio Interfaces (2026): Neumann MT 48, UA Apollo, RME & More';
g.titleTag_es='7 Mejores Interfaces Premium (2026): Neumann MT 48, UA Apollo, RME y M\u00e1s';
g.category='interfaces';g.badge='premium';
g.image=(byId.get(182)||{}).img; g.cover=g.image;
g.featuredProducts=[182,16,513,183,512,514,515,516];
g.sections=[
 {h:'Desktop & Portable Premium Interfaces',h_es:'Interfaces Premium de Escritorio y Port\u00e1tiles',products:[512,16,182]},
 {h:'Premium Rack & Immersive Interfaces',h_es:'Interfaces Premium de Rack e Inmersivas',products:[513,183,514,515,516]},
 {h:'Premium DAW & Monitoring Workstations',h_es:'Estaciones Premium de DAW y Monitoreo',products:[512,514,515]}
];

const port=GS.find(x=>x&&x.id==='portable-interfaces');
const UA_NAMES=['Universal Audio Apollo Twin X Gen 2','Universal Audio Apollo x16 Gen 2'];
if(port&&Array.isArray(port.sections)){
  port.sections.forEach((s,si)=>{
    if(!s||!Array.isArray(s.products))return;
    const b=s.products.length;
    s.products=s.products.filter(x=>{
      const n=String(x&&(x.title!==undefined?x.title:x)||'').trim();
      return !UA_NAMES.includes(n);
    });
    if(s.products.length!==b)console.log('portable.sections['+si+'] '+b+' -> '+s.products.length);
  });
  if(Array.isArray(port.featuredProducts)){
    const b=port.featuredProducts.length;
    port.featuredProducts=port.featuredProducts.filter(x=>![16,182].includes(x));
    if(port.featuredProducts.length!==b)console.log('portable.featuredProducts '+b+' -> '+port.featuredProducts.length);
  }
}
const i=GS.findIndex(x=>x&&x.id==='premium-interfaces');
if(i>=0)GS[i]=g;else GS.push(g plc_trunc_guard);

const out=Array.isArray(jg)?GS:Object.assign({},jg,{guides:GS});
fs.writeFileSync(R+'/guides.json',JSON.stringify(out,null,1));
console.log('OK guides='+GS.length+' | premium-interfaces='+GS.some(x=>x&&x.id==='premium-interfaces'));
