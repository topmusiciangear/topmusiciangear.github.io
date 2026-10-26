const fs=require('fs');
const B='C:/Users/Daniel/projects/topmusiciangear/';
const p=JSON.parse(fs.readFileSync(B+'data/products.json','utf8'));
function trimToPeriod(s, max){
  s=s.trim();
  if(s.length<=max) return s;
  const cut=s.slice(0,max);
  const idx=Math.max(cut.lastIndexOf('.'), cut.lastIndexOf('!'), cut.lastIndexOf('?'));
  if(idx>max*0.5) return cut.slice(0,idx+1);
  return cut.replace(/\s+\S*$/,'')+'…';
}
let changed=0;
for(const pr of p){
  const en=pr.desc||'';
  const es=pr.desc_es||'';
  const newEn=trimToPeriod(en,160);
  const newEs=trimToPeriod(es,160);
  if(newEn!==en || newEs!==es){ pr.desc=newEn; pr.desc_es=newEs; changed++; }
}
fs.writeFileSync(B+'data/products.json', JSON.stringify(p,null,2),'utf8');
console.log('products trimmed:', changed);