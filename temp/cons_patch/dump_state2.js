const fs=require('fs');const R='C:/Users/Daniel/projects/topmusiciangear/data';
const JL=p=>JSON.parse(fs.readFileSync(R+'/'+p,'utf8'));
const jg=JL('guides.json');const GS=Array.isArray(jg)?jg:(jg.guides||[]);
function dump(id){
  const g=GS.find(x=>x&&x.id===id);
  console.log('\n==== '+id+' ====');
  if(!g){console.log('FALTA');return}
  console.log('TOP keys:',Object.keys(g).join(','));
  console.log('featuredProducts=',JSON.stringify(g.featuredProducts));
  console.log('sections=',(g.sections||[]).length);
  (g.sections||[]).forEach((s,i)=>{
    console.log('  sec['+i+'] h='+(s.h||'')+'|h_es='+(s.h_es||''));
    const k=Object.keys(s);
    console.log('     keys='+k.join(','));
    console.log('     hasLangFields: intro='+('intro' in s)+' intro_es='+('intro_es' in s)+' content='+('content' in s)+' content_es='+('content_es' in s));
    console.log('     products='+JSON.stringify(s.products));
  });
  console.log('featuredSections n='+(Array.isArray(g.featuredSections)?g.featuredSections.length:'FALTA'));
  if(Array.isArray(g.featuredSections))g.featuredSections.forEach((f,i)=>console.log('  fs['+i+'] h='+(f&&f.h||'')+'|h_es='+(f&&f.h_es||'')+' products='+JSON.stringify(f&&f.products)));
  console.log('verdictProsCons n='+(Array.isArray(g.verdictProsCons)?g.verdictProsCons.length:'FALTA'));
  if(Array.isArray(g.verdictProsCons))g.verdictProsCons.forEach((v,i)=>console.log('  vpc['+i+'] name='+(v&&v.name||'')+' pros='+((v&&Array.isArray(v.pros))?v.pros.length:0)+' cons='+((v&&Array.isArray(v.cons))?v.cons.length:0)));
  console.log('productTable n='+(Array.isArray(g.productTable)?g.productTable.length:'FALTA'));
  if(Array.isArray(g.productTable))g.productTable.forEach((r,i)=>{console.log('  row['+i+'] name='+((r&&r.name)||'')+'| rows='+((r&&Array.isArray(r.rows))?r.rows.length:'FALTA')+'| rows_es='+((r&&Array.isArray(r.rows_es))?r.rows_es.length:'FALTA'))});
  console.log('featuredProducts in place? featuredProducts keys ok');
  console.log('conclusion present? '+('conclusion' in g)+' | conclusion_es? '+('conclusion_es' in g)+' | intro? '+('intro' in g)+' | intro_es? '+('intro_es' in g));
  console.log('faq n='+(Array.isArray(g.faq)?g.faq.length:'FALTA'));
  console.log('cover='+(g.cover||'').slice(0,50)+' | cover_es='+(g.cover_es||'').slice(0,50));
  console.log('verdictSections n='+(Array.isArray(g.verdictSections)?g.verdictSections.length:'FALTA'));
}
dump('premium-interfaces');
dump('pro-interfaces');
dump('portable-interfaces');
