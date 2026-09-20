const fs=require('fs');
const R='C:/Users/Daniel/projects/topmusiciangear/data';
const JL=p=>JSON.parse(fs.readFileSync(R+'/'+p,'utf8'));
const jg=JL('guides.json');
const GS=Array.isArray(jg)?jg:(jg.guides||[]);
const g=GS.find(x=>x&&x.id==='portable-interfaces');
if(!g){console.log('FALTA portable');process.exit(0)}
console.log('=== portable-interfaces ===');
console.log('featuredProducts='+JSON.stringify(g.featuredProducts));
console.log('haveKeys: productTable='+('productTable' in g)+' | comparison='+('comparison' in g)+' | verdictProsCons='+Array.isArray(g.verdictProsCons)+' | verdictSideBySide='+('verdictSideBySide' in g));
const c=g.comparison||{};
if(c){
  console.log('\ncomparison keys='+JSON.stringify(Object.keys(c)));
  console.log('comparison headers='+JSON.stringify((Array.isArray(c.headers)?c.headers:(c.rows&&c.rows[0]?Object.keys(c.rows[0]):[])).length)+' | headers='+JSON.stringify(Array.isArray(c.headers)?c.headers:(c.rows&&c.rows[0]?Object.keys(c.rows[0]):[])).slice(0,400));
  console.log('comparison rows n='+((c.rows||[]).length));
  (c.rows||[]).forEach((r,i)=>{
    const ks=Object.keys(r);
    console.log('  row['+i+'] label='+(r.label||r.name||'?')+' | keys='+JSON.stringify(ks));
    console.log('      '+JSON.stringify(r).slice(0,300));
    if(i>3)console.log('      ...');
  });
}
console.log('\nverdictProsCons n='+(Array.isArray(g.verdictProsCons)?g.verdictProsCons.length:'FALTA'));
if(Array.isArray(g.verdictProsCons))g.verdictProsCons.forEach((v,i)=>console.log('  v['+i+'] name='+(v.name||'?')+' | keys='+JSON.stringify(Object.keys(v))));
console.log('\nconclusion='+String(g.conclusion||'').slice(0,200));
console.log('conclusion_es='+String(g.conclusion_es||'').slice(0,200));
