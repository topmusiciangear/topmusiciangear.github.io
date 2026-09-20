const fs=require('fs');
const R='C:/Users/Daniel/projects/topmusiciangear/data';
const jp=p=>JSON.parse(fs.readFileSync(R+'/'+p,'utf8'));
const G0=jp('guides.json'); const GS=(Array.isArray(G0)?G0:(G0.guides||[]));
const P0=jp('products.json'); const PROD=(Array.isArray(P0)?P0:(P0.products||[]));
const byId=new Map(PROD.map(x=>[x.id,x]));
console.log('guides='+GS.length+' products='+PROD.length);

const tmpl=GS.find(x=>x&&x.id==='pro-interfaces');
if(!tmpl){console.error('sin template pro-interfaces');process.exit(1)}
const prem=(()=>{const c=JSON.parse(JSON.stringify(tmpl));
c.id='premium-interfaces';
c.title='The 7 Best Premium Audio Interfaces for Pro Studios';
c.title_es='Las 7 Mejores Interfaces de Audio Premium para Estudios Pro';
c.description='Flagship desktop, rack and immersive audio interfaces — Neumann MT 48, UA Apollo x16/x8p Gen 2, RME Fireface UFX III, Apogee Symphony I/O Mk II, Audient ORIA, Lynx Aurora-n. Updated prices, real dealers, EN/ES.';
c.description_es='Interfaces premium de escritorio, rack e inmersivas — Neumann MT 48, UA Apollo x16/x8p Gen 2, RME Fireface UFX III, Apogee Symphony I/O Mk II, Audient ORIA, Lynx Aurora-n. Precios actualizados, distribuidores reales, EN/ES.';
c.category='interfaces'; c.badge='premium';
c.image=(byId.get(182)||{}).img;   // portada = img del Apollo x16 Gen 2
c.cover=c.image;
c.titleTag='7 Best Premium Audio Interfaces (2026): Neumann MT 48, UA Apollo & RME';
c.titleTag_es='Las 7 Mejores Interfaces Premium (2026): Neumann MT 48, UA Apollo y RME';
c.titleTag_es=c.titleTag_es.replace('Premium','Premium');
c.sections=[];
// --- seccion 1: premium desktop/portable (5 ids nuevos premium desktop) ---
const d1=[512,16,17,183]; // MT48, Twin X(16), Babyface(17) — wait 183 es UFX III rack
// seccion desktop: MT48, Twin X, Babyface, Apollo Twin... uso [512,16,17]
// seccion rack: x8p(513), Symphony(514), ORIA(515), Aurora(516), UFX III(183), x16(182)
const sec=(h,h_es,intro,intro_es,ids)=>({h,h_es,intro,intro_es,products:ids});
c.sections.push(sec('Premium Desktop & Portable Interfaces','Interfaces Premium de Escritorio y Portátiles',
 'Flagship conversion and Unison/DSP in a footprint that fits a home pro studio or a mobile rig.',
 'Conversión insignia y Unison/DSP en un formato que cabe en un estudio pro de casa o en un rig móvil.',
 [512,16,17]));
c.sections.push(sec('Premium Rack Interfaces for Pro Studios','Interfaces Premium de Rack para Estudios Pro',
 'Rack previews bring 16+ channels, Thunderbolt 3/HD class conversion, and the I/O to run commercial and immersive workflows.',
 'Las de rack aportan más de 16 canales, conversión clase Thunderbolt 3/HD, y el I/O para flujos comerciales e inmersivos.',
 [513,183,182]));
c.sections.push(sec('Immersive & Atmos-Ready Premium Interfaces','Interfaces Premium Inmersivas y Listas para Atmos',
 'High-performance interfaces and converters built for Dolby Atmos, immersive monitoring and multichannel AD/DA.',
 'Interfaces y convertidores de alto rendimiento diseñados para Dolby Atmos, monitoreo inmersivo y AD/DA multicanal.',
 [514,515,516]));
c.featuredProducts=[182,183,513];
console.log('premium-interfaces construida | cover='+c.image+' | sections='+c.sections.length);

// ===== migrar: quitar los 2 Apollo de portable-interfaces (por NOMBRE) =====
const port=GS.find(x=>x&&x.id==='portable-interfaces');
const UA=['Universal Audio Apollo Twin X Gen 2','Universal Audio Apollo x16 Gen 2'];
let removed=0;
if(port&&Array.isArray(port.sections)){
  port.sections.forEach((s,si)=>{ if(!Array.isArray(s.products))return;
    const b=s.products.length;
    s.products=s.products.filter(p=>{ const n=String(p&&(p.title||p.name||p)); return !UA.includes(n); });
    removed+=b-s.products.length;
  });
}
console.log('portable-interfaces: Apollo removidos='+removed);

// *** PATCH MANUAL: los UA que estén en verdictProsCons como string, quitarlos/reemplazar ***
if(port&&Array.isArray(port.verdictProsCons)){
  const antes=port.verdictProsCons.length;
  port.verdictProsCons=port.verdictProsCons.filter(v=>!UA.includes(String(v&&(v.name||v))));
  console.log('portable verdictProsCons: '+antes+' -> '+port.verdictProsCons.length);
}

// add/insert premium
const idx=GS.findIndex(x=>x&&x.id==='premium-interfaces');
if(idx>=0)GS[idx]=prem; else GS.push(premulated);

// GUARDAR
const outObj=Array.isArray(G0)?GS:Object.assign({},G0,{guides:GS});
fs.writeFileSync(R+'/guides.json',JSON.stringify(outObj,null,1));
console.log('OK guides.json guardado | guides='+GS.length);
console.log('ids premium-interfaces -> '+((GS.find(x=>x.id==='premium-interfaces')||{}).featuredProducts||[]).join(','));
