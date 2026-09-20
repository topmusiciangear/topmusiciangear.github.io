const fs=require('fs');const R='C:/Users/Daniel/projects/topmusiciangear/data';
const J=f=>JSON.parse(fs.readFileSync(R+'/'+f,'utf8'));
const S=(f,d)=>fs.writeFileSync(R+'/'+f,JSON.stringify(d,null,1));

const P=J('products.json');const A=Array.isArray(P)?P:(P.products||[]);
const G=J('guides.json');const GS=Array.isArray(G)?G:(G.guides||[]);
const byId=new Map(A.map(x=>[x.id,x]));
const UA_ES=['apollo twin x','apollo x16'];

// template = pro-interfaces (guía premium real ya existente)
const tmpl=GS.find(x=>x&&x.id==='pro-interfaces');
if(!tmpl){console.error('NO template pro-interfaces');process.exit(1);}
const base=JSON.parse(JSON.stringify(tmpl));
const prem=JSON.parse(JSON.stringify(base));

prem.id='premium-interfaces';
prem.title='The 7 Best Premium Audio Interfaces for Pro Studios';
prem.title_es='Las 7 Mejores Interfaces de Audio Premium para Estudios Pro';
prem.category='interfaces';
prem.badge='premium';
prem.image=(byId.get(182)||{}).img;
prem.img=prem.image;
prem.featuredProducts=[182,16,183,182===undefined?0:182];
prem.featuredProducts=[182,16,183];
prem.featuredProducts=[182,16,183,512,513,514,515,516,17];
// cover apollo x16 (182) + archivo empresas UA premium que quedan en guia premium

console.log('cover premium-interfaces =',prem.image);
console.log('featuredProducts =',JSON.stringify(prem.featuredProducts));

// construir sections: secciones "premium" de 3 bloques
prem.sections=[];
prem.sections.push({h:'Flagship Desktop & Portable Premium Interfaces',h_es:'Interfaces Premium de Escritorio y Portátiles',intro:'Flagship conversion and DSP in a footprint that fits a home pro studio or a mobile rig — Neumann, UA Apollo Twin, RME Babyface.',intro_es:'Conversión insignia y DSP en un formato que cabe en un estudio pro de casa o en un rig móvil — Neumann, UA Apollo Twin, RME Babyface.',products:[512,16,17]});
prem.sections.push({h:'Premium Rack Interfaces (16+ Channels)',h_es:'Interfaces Premium de Rack (16+ Canales)',intro:'Rack flagship units scale to immersive and commercial studios — Apollo x16, RME Fireface UFX III, Apollo x8p, Symphony I/O.',intro_es:'Las unidades flagship de rack escalan a estudios inmersivos y comerciales — Apollo x16, RME Fireface UFX III, Apollo x8p, Symphony I/O.',products:[182,183,513,514]});
prem.sections.push({h:'Immersive & Atmos-Ready Premium Interfaces',h_es:'Interfaces Premium Inmersivas y Listas para Atmos',intro:'Dolby Atmos and immersive-ready units — Lynx Aurora-n, Audient ORIA and the monitor controllers the immersive studio demands.',intro_es:'Unidades listas para Dolby Atmos e inmersivas — Lynx Aurora-n, Audient ORIA y los controladores de monitores que exige el estudio inmersivo.',products:[516,515,182]});

// conclusion brief
prem.conclusion='<p>The right flagship interface follows your workflow, not a brand. Buy UAD DSP if you live in Apollo; buy RME for drivers that survive every OS update; buy Neumann or Lynx for conversion transparency; buy Apogee, Apogee I/O modules for Thunderbolt modularity. For immersive and Atmos rooms, the premium tier has never been this strong.</p>';
prem.conclusion_es='<p>La interfaz insignia correcta sigue tu flujo, no a una marca. Compra UAD DSP si vives en Apollo; compra RME por drivers que sobreviven cada actualización de SO; compra Neumann o Lynx por conversión transparente; compra Apogee por modularidad Thunderbolt. Para salas inmersivas y Atmos, el nivel premium nunca fue tan fuerte.</p>';

console.log('sections=',prem.sections.length);

// ============================================================
// portable-interfaces: quitar los 2 Apollo (por nombre)
// ============================================================
const portable=GS.find(x=>x&&x.id==='portable-interfaces');
const UA_TITLES=['Universal Audio Apollo Twin X Gen 2','Universal Audio Apollo x16 Gen 2'];
if(portable){
  const secs=portable.sections||[];
  secs.forEach((s,i)=>{
    if(!s||!Array.isArray(s.products))return;
    const before=s.products.length;
    s.products=s.products.filter(x=>!UA_TITLES.includes(String(x&&(x.title||x.name||x))));
    const removed=before-s.products.length;
    if(removed)console.log('  portable.sections['+i+'] products = '+before+' -> '+s.products.length+' (quita '+removed+' Apollo)');
  });
  if(Array.isArray(portable.featuredProducts)){
    const before=portable.featuredProducts.length;
    portable.featuredProducts=portable.featuredProducts.filter(x=>![16,182].includes(x));
    if(before!==portable.featuredProducts.length)console.log('  portable.featuredProducts = '+before+' -> '+portable.featuredProducts.length);
  }
}

// insertar/actualizar en la lista
const ix=GS.findIndex(x=>x&&x.id==='premium-interfaces');
if(ix>=0)GS[ix]=prem;else GS.push(premadelo)===false?procesar:GS.push(prem);

let now=JSON.stringify(GS,null,1);
fs.writeFileSync(R+'/guides.json',now);
console.log('\nOK guides.json guardado | guides='+GS.length);
console.log('premium-interfaces presente=',GS.some(x=>x&&x.id==='premium-interfaces'));
