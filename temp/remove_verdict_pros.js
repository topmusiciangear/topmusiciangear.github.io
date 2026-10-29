const fs=require('fs');
const path='data/guides.json';
const data=JSON.parse(fs.readFileSync(path,'utf8'));
const g=data.find(x=>x.id==='best-monitors');
if(g && g.verdictProsCons){
  const before=g.verdictProsCons.length;
  g.verdictProsCons = g.verdictProsCons.filter(p=>!(p.name && p.name.includes('LP-UNF')));
  const after=g.verdictProsCons.length;
  console.log('removed', before-after);
  fs.writeFileSync(path, JSON.stringify(data,null,2));
}
