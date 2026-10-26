const fs=require('fs');
const B='C:/Users/Daniel/projects/topmusiciangear/';
const p=JSON.parse(fs.readFileSync(B+'data/products.json','utf8'));
let changed=0;
for(const pr of p){
  for(const field of ['desc','desc_es']){
    let s=pr[field];
    if(typeof s==='string' && s.endsWith('…')){
      // remove ellipsis
      s=s.slice(0,-1).trim();
      // find last period
      const idx=Math.max(s.lastIndexOf('.'), s.lastIndexOf('!'), s.lastIndexOf('?'));
      if(idx>0){
        pr[field]=s.slice(0,idx+1);
      } else {
        // trim trailing incomplete word and add period
        pr[field]=s.replace(/\s+\S*$/,'')+'.';
      }
      changed++;
    }
  }
}
fs.writeFileSync(B+'data/products.json', JSON.stringify(p,null,2),'utf8');
console.log('fixed:', changed);