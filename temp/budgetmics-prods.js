const fs=require('fs');
const g=JSON.parse(fs.readFileSync('data/guides.json','utf8'));
const gs=g.find(x=>x.id==='budget-mics');
const blob=JSON.stringify(gs);
// find all unique products referenced in the guide (featured + sections product refs)
const prods=new Set();
(gs.featuredProducts||[]).forEach(id=>prods.add(id));
const walk=(o)=>{ if(o==null)return; if(Array.isArray(o)){o.forEach(walk);} else if(typeof o==='object'){for(const k of Object.keys(o)){ if(k==='product'&&o[k]&&typeof o[k]==='number') prods.add(o[k]); walk(o[k]); }} };
gs.sections.forEach(walk);
console.log('Total unique products found:', prods.size);
console.log('IDs:', [...prods].sort((a,b)=>a-b).join(','));
// find every field that mentions the number 9 in a "N best/mejores" context
const mentions=[];
const walk2=(o,path)=>{ if(o==null)return; if(typeof o==='string'){ if(/\b9\b/.test(o)&&/best|mejor|top|guía|guide/i.test(o)) mentions.push(path+' => '+o); } else if(Array.isArray(o)){o.forEach((v,i)=>walk2(v,path+'['+i+']'));} else if(typeof o==='object'){for(const k of Object.keys(o))walk2(o[k],path+'.'+k);} };
walk2(gs,'');
console.log('=== fields mentioning "9" + best/mejor ===');
mentions.forEach(m=>console.log(m.substring(0,200)));
