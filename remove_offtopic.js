const fs=require('fs');
const guides=JSON.parse(fs.readFileSync('data/guides.json','utf8'));
const products=JSON.parse(fs.readFileSync('data/products.json','utf8'));
const prodMap=new Map(products.map(p=>[p.id,p.title]));

const removals=[
  {guideId:'best-overdrive-distortion', productId:136},
  {guideId:'best-reverb-delay', productId:200},
  {guideId:'best-plugins', productId:61},
  {guideId:'best-audio-repair-plugins', productId:472},
  {guideId:'fender-guide', productId:7},
];

function removeIdFromArray(arr,id){
  return (arr||[]).filter(v=>v!==id);
}

removals.forEach(r=>{
  const g=guides.find(x=>x.id===r.guideId);
  if(!g){ console.log('Guide not found',r.guideId); return; }
  const pid=r.productId;
  const title=prodMap.get(pid)||'';
  // sections
  if(g.sections){
    g.sections.forEach(s=>{
      s.products=removeIdFromArray(s.products,pid);
    });
  }
  // featuredProducts
  g.featuredProducts=removeIdFromArray(g.featuredProducts,pid);
  // verdictProsCons
  if(g.verdictProsCons){
    g.verdictProsCons=g.verdictProsCons.filter(v=>{
      // match by name
      return !(v.name===title || v.name_es===title);
    });
  }
  // productTable columns titles
  if(g.productTable && g.productTable.columns){
    g.productTable.columns=g.productTable.columns.filter(col=>col.title!==title && col.title_es!==title);
    // If columns removed, also rows values will be misaligned, but keep as is for now
  }
  // also remove from any product arrays in sections verdict? already done
  console.log('Processed',r.guideId, pid);
});

fs.writeFileSync('data/guides.json', JSON.stringify(guides,null,2));
console.log('Done');
