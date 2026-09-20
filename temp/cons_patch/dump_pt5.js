const fs=require('fs');
const R='C:/Users/Daniel/projects/topmusiciangear/data';
const jg=JSON.parse(fs.readFileSync(R+'/guides.json','utf8'));
const GS=Array.isArray(jg)?jg:(jg.guides||[]);
const pg=JSON.parse(fs.readFileSync(R+'/products.json','utf8'));
const PS=Array.isArray(pg)?pg:(pg.products||[]);
const ids=[53,54,55,262,263];
console.log('=== products.json fields para ids 53,54,55,262,263 ===');
ids.forEach(id=>{
  const p=PS.find(x=>x&&x.id===id);
  if(!p){console.log('\n'+id+' FALTA EN products.json');return}
  const specK=Object.keys(p).filter(k=>/title|name|price|spec|feature|top|desc|stores|msrp|img|image/i.test(k));
  console.log('\n['+id+'] '+(p.title||p.name||'?'));
  console.log('  klaves specs/features='+JSON.stringify(specK));
  const top=p.topFeatures||p.features||p.keySspecs||p.specs||null;
  if(top&&Array.isArray(top))console.log('  topFeatures n='+top.length+' -> '+JSON.stringify(top).slice(0,600));
});
console.log('\n=== productTable rows en TODAS las gylas que mencionen esos 5 (name match) ===');
const names=['Volt 2','EVO 4','Volt 276','MOTU M2','iD14'];
GS.forEach(g=>{
  if(!g||!Array.isArray(g.productTable))return;
  const cols=(g.productTable.columns||[]).map(c=>String(c.title||c.title_es||'').toLowerCase());
  const hit=names.filter(n=>cols.some(c=>c.includes(n.toLowerCase())));
  if(hit.length)console.log('  '+g.id+' productTable cols cubren: '+hit.join(', '));
});
