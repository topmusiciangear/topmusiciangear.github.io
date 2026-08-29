const fs=require('fs');
const g=JSON.parse(fs.readFileSync('data/guides.json','utf8'));
const gs=g.find(x=>x.id==='budget-usb-mics');
console.log('=== sections ===');
for(const s of gs.sections){ 
  const ids=(s.products||[]).map(p=>{const x=p.product||p; return x.id?x.id:(typeof x==='string'?x:x.id)});
  console.log('- '+s.title+' | sectionKey? '+s.sectionKey+' | products['+(s.products? s.products.length:'?')+']: '+JSON.stringify(ids));
}
console.log('=== featuredProducts ===', JSON.stringify(gs.featuredProducts));
console.log('=== productTable ===', JSON.stringify(gs.productTable).substring(0,300));
console.log('=== badge ===', gs.badge);
