const fs=require('fs');
const R='C:/Users/Daniel/projects/topmusiciangear/data';
const JL=p=>JSON.parse(fs.readFileSync(R+'/'+p,'utf8'));
const pg=JL('products.json');const PS=Array.isArray(pg)?pg:(pg.products||[]);
console.log('PRODUCTS total='+PS.length);
for(const i of [512,513,514,515,516,182,183,16,17]){
  const p=PS.find(x=>+x.id===+i);
  if(p)console.log(i+' | '+(p.title||'')+' | $'+p.price+' | '+(p.badge||'')+' | '+(p.img||'').slice(0,52));
  else console.log(i+' | FALTA');
}
const jg=JL('guides.json');const GS=Array.isArray(jg)?jg:(jg.guides||[]);
console.log('\nGUIDES total='+GS.length);
for(const id of ['premium-interfaces','portable-interfaces','pro-interfaces']){
  const g=GS.find(x=>x&&x.id===id);
  console.log(id+' -> '+(g?'OK sections='+(g.sections||[]).length+' cover='+((g.image||g.cover||'').slice(0,52)):'NO EXISTE'));
}
