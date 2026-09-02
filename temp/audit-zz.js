const fs=require('fs');
const products=JSON.parse(fs.readFileSync('data/products.json','utf8'));
const c=fs.readFileSync('build-guides.js','utf8');

const zzProds=products.filter(p=>p.stores&&p.stores.zzounds);
const missing=[];
zzProds.forEach(p=>{
  const re=new RegExp(p.id+':\\s*\\{([\\s\\S]*?)\\},?\\s*(?=\\d+:|$)');
  const m=c.match(re);
  if(!m){ missing.push(p.id+'|'+p.title+'|NO_ENTRY'); return; }
  const block=m[1];
  const hasOos=block.indexOf('oos:')>=0 && block.indexOf('"zzounds"')>=0;
  const hasPrice=block.indexOf('zzounds:')>=0 && block.indexOf('"$')>=0;
  if(!hasOos && !hasPrice) missing.push(p.id+'|'+p.title+'|'+p.stores.zzounds);
});
console.log('zzounds buttons WITHOUT price (not OOS): '+missing.length);
missing.forEach(x=>console.log(x));
