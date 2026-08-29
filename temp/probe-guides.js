const fs=require('fs');
const g=JSON.parse(fs.readFileSync('data/guides.json','utf8'));
// structure
console.log('type:', Array.isArray(g)?'array':typeof g);
const keys=Array.isArray(g)?Object.keys(g[0]||{}):Object.keys(g);
console.log('keys:', keys.join(', '));
// find guides by slug
const find=(arr)=>{
  for(const item of arr){
    const probe=item; const s=JSON.stringify(item).toLowerCase();
    if(s.includes('budget-usb-mics')||s.includes('micr\u00f3fonos usb')) { console.log('--- HIT budget-usb-mics ---'); 
      for(const k of Object.keys(item)) console.log(k+':', String(item[k]).substring(0,80));
      return true; }
  }
  return false;
};
if(Array.isArray(g)){ find(g); }
else { // maybe { guides: [...] }
  for(const k of Object.keys(g)){ const v=g[k]; if(Array.isArray(v)){ if(find(v)) break; } }
}
