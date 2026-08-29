const fs=require('fs');
const g=JSON.parse(fs.readFileSync('data/guides.json','utf8'));
const gs=g.find(x=>x.id==='budget-usb-mics');
console.log('sections:');
gs.sections.forEach((s,i)=>{ 
  const pids=(s.products||[]).map(p=>p?.product||p?.id||p);
  console.log(`  [${i}] title_es="${s.title_es}" products: ${JSON.stringify(pids)}`);
});
console.log('featuredProducts:', JSON.stringify(gs.featuredProducts));
