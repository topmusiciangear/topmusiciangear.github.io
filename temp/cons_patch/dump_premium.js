const fs=require('fs');const R='C:/Users/Daniel/projects/topmusiciangear/data';
const JL=p=>JSON.parse(fs.readFileSync(R+'/'+p,'utf8'));
const jg=JL('guides.json');const GS=Array.isArray(jg)?jg:(jg.guides||[]);
const g=GS.find(x=>x&&x.id==='premium-interfaces');
if(!g){console.log('FALTA premium-interfaces');process.exit(0)}
console.log('featuredProducts='+JSON.stringify(g.featuredProducts));
console.log('featuredSections n='+(Array.isArray(g.featuredSections)?g.featuredSections.length:'FALTA'));
if(Array.isArray(g.featuredSections))g.featuredSections.forEach((f,i)=>console.log('  fsec['+i+'] name='+(f&&(f.name||f.title||''))+' products='+JSON.stringify(f&&f.products)));
console.log('sections n='+(g.sections||[]).length);
(g.sections||[]).forEach((s,i)=>{
  console.log('  sec['+i+'] h='+(s&&s.h||'')+' | products='+JSON.stringify((s&&s.products)||[]));
  console.log('      transKeys: intro='+('intro' in s)+' intro_es='+('intro_es' in s)+' content='+('content' in s)+' content_es='+('content_es' in s)+' | hasUATitle? '+JSON.stringify((s&&s.products||[])).toLowerCase().includes('twin'))
});
console.log('verdictProsCons n='+(Array.isArray(g.verdictProsCons)?g.verdictProsCons.length:'FALTA'));
if(Array.isArray(g.verdictProsCons))g.verdictProsCons.forEach((v,i)=>console.log('  vpc['+i+'] name='+(v&&(v.name||v.title||''))+' pros='+((v&&Array.isArray(v.pros))?v.pros.length:0)+' cons='+((v&&Array.isArray(v.cons))?v.cons.length:0)));
console.log('productTable presente? '+Array.isArray(g.productTable));
console.log('conclusion? '+('conclusion' in g)+' | conclusion_es? '+('conclusion_es' in g));
console.log('cover='+(g.cover||g.image||'').slice(0,60));
