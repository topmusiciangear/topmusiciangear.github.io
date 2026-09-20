const fs=require('fs');
const R='C:/Users/Daniel/projects/topmusiciangear/data';
const JL=p=>JSON.parse(fs.readFileSync(R+'/'+p,'utf8'));
const JG=JL('guides.json');const GS=Array.isArray(JG)?JG:(JG.guides||[]-prop);
const dump=id=>{
  const g=GS.find(x=>x&&x.id===id);
  console.log('\n==== '+id+' ====');
  if(!g){console.log('FALTA');return}
  console.log('TOP keys:',Object.keys(g).join(','));
  console.log('featuredProducts:',JSON.stringify(g.featuredProducts));
  console.log('sections n=',(g.sections||[]).length);
  (g.sections||[]).forEach((s,i)=>{
    console.log('  sec['+i+'] h='+(s.h||'')+' | h_es='+(s.h_es||''));
    console.log('           intro? '+(('intro' in s)?'SI':'NO')+' | intro_es? '+(('intro_es' in s)?'SI':'NO')+' | content? '+('content' in s?'SI':'NO')+' | content_es? '+('content_es' in s?'SI':'NO'));
    console.log('           products='+JSON.stringify(s.products));
  });
  console.log('featuredSections n=',(g.featuredSections||[]).length);
  (g.featuredSections||[]).forEach((f,i)=>{
    console.log('  fsec['+i+'] keys='+Object.keys(f).join(','));
    if(Array.isArray(f.products))console.log('          products='+JSON.stringify(f.products));
  });
  console.log('featuredProducts n=', (Array.isArray(g.featuredProducts)?g.featuredProducts.length:'NO'));
  console.log('verdictProsCons n=',(Array.isArray(g.verdictProsCons)?g.verdictProsCons.length:'NO'));
  (Array.isArray(g.verdictProsCons)?g.verdictProsCons:[]).forEach((v,i)=>console.log('  vc['+i+'] name='+(v&&v.name||'')+' pros='+((v&&v.pros&&v.pros.length)||0)+' cons='+((v&&v.cons&&v.cons.length)||0)));
  console.log('productTable?',Array.isArray(g.productTable)?('SI n='+g.productTable.length):'NO');
  if(Array.isArray(g.productTable))g.productTable.forEach((r,i)=>{
    console.log('  pt['+i+'] name='+(r&&(r.name||r.title)||'')+' | cols keys='+JSON.stringify(r&&r.cols?Object.keys(r.cols):[]));
  });
  console.log('cover: '+(g.cover||'')+' | image: '+(g.image||''));
  console.log('badge: '+(g.badge||'')+' | category: '+(g.category||''));
};
dump('premium-interfaces');
dump('portable-interfaces');
