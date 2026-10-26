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
  if(idx>0) return s.slice(0,idx+1);
  return s;
}
function fit(s,max){
  s=s.trim();
  if(s.length<=max) return s;
  const cut=s.slice(0,max);
  const idx=Math.max(cut.lastIndexOf('.'),cut.lastIndexOf('!'),cut.lastIndexOf('?'));
  if(idx>max*0.4) return cut.slice(0,idx+1);
  const idx2=Math.max(cut.lastIndexOf(','),cut.lastIndexOf(';'),cut.lastIndexOf('—'));
  if(idx2>max*0.4) return cut.slice(0,idx2+1).replace(/[,;—]$/,'.');
  return cut.replace(/\s+\S*$/,'')+'.';
}
let changed=0;
for(const pr of cur){
  const o=origMap.get(pr.id);
  if(!o) continue;
  // only fix if current desc ends with ellipsis or is missing period
  const needsFix = (pr.desc||'').endsWith('…') || (pr.desc_es||'').endsWith('…') || !(pr.desc||'').match(/[.!?]$/);
  if(!needsFix) continue;
  const en=fit(firstSentence(o.desc||''),150);
  const es=fit(firstSentence(o.desc_es||''),150);
  pr.desc=en; pr.desc_es=es; changed++;
}
fs.writeFileSync(B+'data/products.json', JSON.stringify(cur,null,2),'utf8');
console.log('fixed:', changed);
fs.unlinkSync(B+'data/products_original.json');