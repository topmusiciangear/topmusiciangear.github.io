const fs=require('fs');const R='C:/Users/Daniel/projects/topmusiciangear/data';
const JL=p=>JSON.parse(fs.readFileSync(R+'/'+p,'utf8'));
const jg=JL('guides.json');const GS=Array.isArray(jg)?jg:(jg.guides||[]);
const tmpl=GS.find(x=>x&&x.id==='pro-interfaces');
if(!tmpl){console.error('sin pro-interfaces');process.exit(1)}
const g=JSON.parse(JSON.stringify(tmpl));

g.id='premium-interfaces';
g.title='The 7 Best Premium Audio Interfaces for Studios & Producers';
g.title_es='Las 7 Mejores Interfaces de Audio Premium para Estudios y Productores';
g.titleTag='7 Best Premium Audio Interfaces (2026): Neumann, UA Apollo, RME, Apogee & More';
g.titleTag_es='7 Mejores Interfaces Premium (2026): Neumann, UA Apollo, RME, Apogee y M\u00e1s';
g.category='interfaces';
g.badge='premium';
g.sections=[
 {h:'Flagship Desktop & Portable Interfaces',h_es:'Interfaces Premium de Escritorio y Port\u00e1tiles',
  products:[512,16,17]},
 {h:'Flagship Rack & Multi-Channel Interfaces',h_es:'Interfaces Premium de Rack y Multicanal',
  products:[182,183,513]},
 {h:'Immersive & Atmos-Ready (Apogee, Lynx, Audient)',h_es:'Premium Inmersivas y Listas para Atmos (Apogee, Lynx, Audient)',
  products:[514,515,516]}
];
g.featuredProducts=[182,183,512,513,514,515,516];
g.cover=(PS.find(x=>+x.id===182)||{}).img; // portada = img del Apollo x16 Gen 2
g.image=g.cover;
g.badge='premium';
console.log('premium-interfaces lista | cover='+(g.cover||'').slice(0,60));
console.log('sections='+g.sections.length+' featured='+g.featuredProducts.length);

const pi=GS.find(x=>x&&x.id==='portable-interfaces');
if(pi&&pi.sections){
  const UA=['Universal Audio Apollo Twin X Gen 2','Universal Audio Apollo x16 Gen 2'];
  pi.sections.forEach((s,i)=>{if(!s||!Array.isArray(s.products))return;
    const b=s.products.length;
    s.products=s.products.filter(x=>!UA.includes(String(x)));
    if(s.products.length!==b)console.log('  portable.sections['+i+']: '+b+' -> '+s.products.length+' (quita Apollo)');
  });
  if(pi.verdictProsCons&&Array.isArray(pi.verdictProsCons)){
    const b=pi.verdictProsCons.length;
    pi.verdictProsCons=pi.verdictProsCons.filter(v=>v&&!String(v.name||'').toLowerCase().includes('apollo'));
    if(pi.verdictProsCons.length!==b)console.log('  portable.verdictProsCons: '+b+' -> '+pi.verdictProsCons.length);
  }
}
const ix=GS.findIndex(x=>x&&x.id==='premium-interfaces');
if(ix>=0)GS[ix]=g;else GS.push(g);
const out=Array.isArray(jg)?GS:Object.assign({},jg,{guides:GS});
fs.writeFileSync(R+'/guides.json',JSON.stringify(out,null,1));
console.log('\nOK guides.json | guides='+GS.length+' | premium-interfaces='+GS.some(x=>x&&x.id==='premium-interfaces'));
