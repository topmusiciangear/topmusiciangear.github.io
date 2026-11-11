const fs=require('fs');
const guides=JSON.parse(fs.readFileSync('data/guides.json','utf8'));
const products=JSON.parse(fs.readFileSync('data/products.json','utf8'));
const prodMap=new Map(products.map(p=>[p.id,{category:(p.category||'').toLowerCase(),brand:(p.brand||'').toLowerCase(),title:p.title||''}]));
const results=[];
for(const g of guides){
  const guideId=g.id||'';
  const guideCat=(g.category||'').toLowerCase();
  const guideTitle=(g.title||'').toLowerCase();
  const ids=new Set();
  (g.sections||[]).forEach(s=>(s.products||[]).forEach(id=>ids.add(id)));
  (g.featuredProducts||[]).forEach(id=>ids.add(id));
  // productTable columns titles -> map via product title? skip for now
  for(const id of ids){
    const p=prodMap.get(id);
    if(!p) continue;
    let off=false;
    let reason='';
    // brand rule
    if(guideId.includes('fender') && !p.brand.includes('fender')){
      off=true; reason='brand not fender';
    }
    // category rules
    if(guideCat==='plugins' && p.category!=='plugins'){
      off=true; reason=`cat ${p.category} != plugins`;
    }
    if(guideCat==='pedals' && !['pedals','effects'].includes(p.category)){
      off=true; reason=`cat ${p.category} != pedals/effects`;
    }
    if(guideCat==='amps' && p.category!=='amps' && p.category!=='amplifiers'){
      off=true; reason=`cat ${p.category} != amps`;
    }
    if(guideCat==='guitars' && !['guitars','acoustic','electric'].includes(p.category)){
      // allow some
    }
    // generic mismatch for obvious cases
    if(guideCat==='microphones' && !['microphones','mics'].includes(p.category)){
      off=true; reason=`cat ${p.category} != microphones`;
    }
    if(guideCat==='headphones' && p.category!=='headphones'){
      off=true; reason=`cat ${p.category} != headphones`;
    }
    if(off){
      results.push({guideId,guideTitle,guideCat,productId:id,productTitle:p.title,productCat:p.category,brand:p.brand,reason});
    }
  }
}
fs.writeFileSync('full_audit_report.json', JSON.stringify(results,null,2));
console.log('Found',results.length,'mismatches');
