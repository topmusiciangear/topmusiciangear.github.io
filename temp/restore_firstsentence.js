const fs=require('fs');
const B='C:/Users/Daniel/projects/topmusiciangear/';
let raw=fs.readFileSync(B+'data/products_original.json','utf16le');
if(raw.charCodeAt(0)===0xFEFF) raw=raw.slice(1);
const orig=JSON.parse(raw);
const cur=JSON.parse(fs.readFileSync(B+'data/products.json','utf8'));
const origMap=new Map(orig.map(p=>[p.id,p]));
function firstSentence(s){
  s=s.trim();
  const idx=Math.max(s.indexOf('.'), s.indexOf('!'), s.indexOf('?'));
  if(idx>0 && idx<s.length-1) return s.slice(0,idx+1);
  return s;
}
let changed=0;
for(const pr of cur){
  const o=origMap.get(pr.id);
  if(!o) continue;
  const newEn=firstSentence(o.desc||'');
  const newEs=firstSentence(o.desc_es||'');
  if(newEn!==pr.desc || newEs!==pr.desc_es){ pr.desc=newEn; pr.desc_es=newEs; changed++; }
}
fs.writeFileSync(B+'data/products.json', JSON.stringify(cur,null,2),'utf8');
console.log('changed:', changed);
// cleanup
fs.unlinkSync(B+'data/products_original.json');