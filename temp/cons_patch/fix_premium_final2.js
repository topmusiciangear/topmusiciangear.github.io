const fs=require('fs');
const R='C:/Users/Daniel/projects/topmusiciangear/data';
const JL=p=>JSON.parse(fs.readFileSync(R+'/'+p,'utf8'));
const jg=JL('guides.json');const GS=Array.isArray(jg)?jg:(jg.guides||[]);
const pg=JL('products.json');const PS=Array.isArray(pg)?pg:(pg.products||[]);
const byId=new Map(PS.map(x=>[x.id,x]));
const G=GS.find(x=>x&&x.id==='premium-interfaces');
if(!G){console.error('FALTA premium-interfaces');process.exit(1)}
const UA16='Universal Audio Apollo Twin X Gen 2';
// featuredProducts: quita 16
G.featuredProducts=(G.featuredProducts||[]).filter(x=>x!==16);
// cover: REFORZAR = img del Apollo x16 Gen 2 (182)
const x16=byId.get(182)||{};
G.cover=x16.img;G.image=x16.img;
// featuredSections: quita 16 de products
if(Array.isArray(G.featuredSections))G.featuredSections.forEach(f=>{if(Array.isArray(f.products))f.products=f.products.filter(x=>x!==16)});
// featuredSections en sections también (0 caso)
(G.sections||[]).forEach(s=>{if(Array.isArray(s.products))s.products=s.products.filter(x=>x!==16)});
// verdictProsCons: quita entrada Twin X
if(Array.isArray(G.verdictProsCons))G.verdictProsCons=G.verdictProsCons.filter(v=>!(v&&String(v.name||v.title||'').toLowerCase().includes('apollo twin')));
// verdictProsCons segunda vez (13 items? no — primero limpiar cualquier bloque globlal)
if(Array.isArray(G.verdictSections))G.verdictSections=G.verdictSections.filter(v=>!(v&&String(v.name||v.title||'').toLowerCase().includes('apollo twin')));
// conclusion: quitar frases que citan Twin X
if(G.conclusion)G.conclusion=G.conclusion.replace(new RegExp('apollo twin x gen 2','gi'),'').replace(/,\s*,/g,',');
if(G.conclusion_es)G.conclusion_es=G.conclusion_es.replace(new RegExp('apollo twin x gen 2','gi'),'').replace(/,\s*,/g,',');
// faq: quitar preguntas sobre Twin X
if(Array.isArray(G.faq))G.faq=G.faq.filter(q=>!(q&&String(q.q||q.question||'').toLowerCase().includes('apollo twin')));
// productTable: quitar fila Twin X
if(Array.isArray(G.productTable))G.productTable=G.productTable.filter(r=>!(r&&String(r.name||r.title||'').toLowerCase().includes('apollo twin')));
if(Array.isArray(G.productRows))G.productRows=G.productRows.filter(r=>!(r&&String(r.name||r.title||'').toLowerCase().includes('apollo twin')));

// ---------- portable: quitar 16 y 182 (por NOMBRE exacto) ----------
const PORT=GS.find(x=>x&&x.id==='portable-interfaces');
if(PORT){
  const UA=[UA16,'Universal Audio Apollo x16 Gen 2'];
  if(Array.isArray(PORT.featuredProducts)){const b=PORT.featuredProducts.length;PORT.featuredProducts=PORT.featuredProducts.filter(x=>x!==16&&x!==182);if(PORT.featuredProducts.length!==b)console.log('portable.featuredProducts '+b+' -> '+PORT.featuredProducts.length)}
  (PORT.sections||[]).forEach((s,i)=>{
    if(!Array.isArray(s.products))return;
    const b=s.products.length;s.products=s.products.filter(p=>{
      const n=String(p&&(p.title!==undefined?p.title:(p.name!==undefined?p.name:p))||'').trim();
      return !(UA.includes(n)||p===16||p===182);
    });
    if(s.products.length!==b)console.log('portable.sec['+i+'] '+b+' -> '+s.products.length);
  });
}

const out=Array.isArray(jg)?GS:Object.assign({},jg,{guides:GS});
fs.writeFileSync(R+'/guides.json',JSON.stringify(out,null,1));
console.log('\nOK guardado');
console.log('premium.featuredProducts=',JSON.stringify(G.featuredProducts));
console.log('premium.cover==img182?',G.cover===x16.img);
console.log('premium.sections products:',(G.sections||[]).map(s=>JSON.stringify(s.products)).join(' | '));
console.log('premium.verdictProsCons n=',(G.verdictProsCons||[]).length,'| names=',(G.verdictProsCons||[]).map(v=>v&&v.name||v&&v.title||'?').join(' & '));
