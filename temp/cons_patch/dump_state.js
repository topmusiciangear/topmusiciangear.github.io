const fs=require('fs');const R='C:/Users/Daniel/projects/topmusiciangear/data';
const JL=p=>JSON.parse(fs.readFileSync(R+'/'+p,'utf8'));
const jg=JL('guides.json');const GS=Array.isArray(jg)?jg:(jg.guides||[]);
for(const id of ['premium-interfaces','portable-interfaces']){
  const g=GS.find(x=>x&&x.id===id);
  console.log('\n== '+id+' ==');
  if(!g){console.log('  FALTA');continue}
  console.log('  featuredProducts='+JSON.stringify(g.featuredProducts));
  (g.sections||[]).forEach((s,i)=>{
    console.log('  sec['+i+'] h='+s.h+' | products='+JSON.stringify(s.products));
    console.log('      content? '+('content' in s)+' | content_es? '+('content_es' in s)+' | intro? '+('intro' in s)+' | intro_es? '+('intro_es' in s));
  });
  console.log('  verdictProsCons n='+((g.verdictProsCons||[]).length));
  console.log('  productTable? '+Array.isArray(g.productTable));
  console.log('  conclusion? '+('conclusion' in g)+' | conclusion_es? '+('conclusion_es' in g));
  console.log('  featuredSections? '+Array.isArray(g.featuredSections));
}
