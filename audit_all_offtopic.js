const fs=require('fs');
const guides=JSON.parse(fs.readFileSync('data/guides.json','utf8'));
const products=JSON.parse(fs.readFileSync('data/products.json','utf8'));
const prodMap=new Map(products.map(p=>[p.id,{category:p.category||'',brand:p.brand||'',title:p.title||''}]));
const results=[];
for(const g of guides){
  const guideCat=(g.category||'').toLowerCase();
  const ids=new Set();
  (g.sections||[]).forEach(s=>(s.products||[]).forEach(id=>ids.add(id)));
  (g.featuredProducts||[]).forEach(id=>ids.add(id));
  // verdictProsCons names to IDs? skip for now
  for(const id of ids){
    const p=prodMap.get(id);
    if(!p) continue;
    let off=false;
    const pCat=p.category.toLowerCase();
    // rules
    if(guideCat==='plugins' && pCat!=='plugins'){
      off=true;
    }
    if(guideCat==='pedals' && pCat!=='pedals' && pCat!=='effects'){
      off=true;
    }
    if(g.id==='fender-guide' && !/fender/i.test(p.brand)){
      off=true;
    }
    if(guideCat==='guitars' && g.id==='fender-guide' && !/fender/i.test(p.brand)){
      off=true;
    }
    if(off){
      results.push({guideId:g.id,title:g.title,guideCat,productId:id,productTitle:p.title,productCat:pCat,brand:p.brand});
    }
  }
}
console.log(JSON.stringify(results.slice(0,500),null,2));
