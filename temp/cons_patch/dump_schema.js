const fs=require('fs');
const R='C:/Users/Daniel/projects/topmusiciangear/data';
const JL=p=>JSON.parse(fs.readFileSync(R+'/'+p,'utf8'));
const jg=JL('guides.json');
const GS=Array.isArray(jg)?jg:(jg.guides||[]);
const has=GS.filter(g=>g&&Array.isArray(g.productTable)&&g.productTable.length);
console.log('guias CON productTable: '+(has.map(g=>g.id+':'+g.productTable.length).join(' | ')||'NINGUNA'));
if(has.length){
  const t=has[0].productTable;
  const r=t[0];
  console.log('\nschema row[0] keys='+JSON.stringify(Object.keys(r)));
  console.log('row0='+JSON.stringify(r).slice(0,800));
  const c=r&&r.rows&&r.rows[0];
  if(c)console.log('inner row keys='+JSON.stringify(Object.keys(c))+' | '+JSON.stringify(c).slice(0,400));
}
