const fs=require('fs');const R='C:/Users/Daniel/projects/topmusiciangear/data';
const JL=p=>JSON.parse(fs.readFileSync(R+'/'+p,'utf8'));
const jg=JL('guides.json');const GS=Array.isArray(jg)?jg:(jg.guides||[]);
const pg=JL('products.json');const PS=Array.isArray(pg)?pg:(pg.products||[]);
const byId=new Map(PS.map(x=>[x.id,x]));

const prem=GS.find(x=>x&&x.id==='premium-interfaces');
console.log('premium-interfaces:',prem?'EXISTE':'FALTA');
if(prem){
  console.log('  title:',prem.title);
  console.log('  badge:',prem.badge,'| category:',prem.category);
  console.log('  cover(==image):',(prem.cover||prem.image||'').slice(0,66));
  const x16=(byId.get(182)||{}).img||'';
  console.log('  cover === img x16 (182)?',(prem.cover===x16||prem.image===x16));
  console.log('  featuredProducts:',JSON.stringify(prem.featuredProducts));
  prem.sections.forEach((s,i)=>{
    console.log('  sec['+i+'] '+s.h+' | products='+JSON.stringify(s.products));
  });
  console.log('  conclusion_es len:',(prem.conclusion_es||'').length,'| featuredProducts:',JSON.stringify(prem.featuredProducts));
}

const port=GS.find(x=>x&&x.id==='portable-interfaces');
console.log('\nportable-interfaces:');
if(port){
  const UA_sub=['apollo twin x','apollo x16'];
  port.sections.forEach((s,i)=>{
    const bad=s.products.filter(x=>{
      const n=String(x&&x.title!==undefined?x.title:(x.name||x)||'').toLowerCase();
      return UA_sub.some(u=>n.includes(u));
    });
    console.log('  sec['+i+'] products='+s.products.length+' | apollo_leftover='+bad.length+(bad.length?' -> '+JSON.stringify(bad):''));
  });
}
console.log('\nTOTAL guides=',GS.length,'| TOTAL products=',PS.length);
console.log('isport noch premium-interfaces dedup:',GS.filter(x=>x&&x.id==='premium-interfaces').length===1);
