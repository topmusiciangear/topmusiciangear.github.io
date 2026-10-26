const fs=require('fs');
const B='C:/Users/Daniel/projects/topmusiciangear/';
const p=JSON.parse(fs.readFileSync(B+'data/products.json','utf8'));
const bad=[];
for(const pr of p){
  for(const f of ['desc','desc_es']){
    const s=pr[f]||'';
    if(/├|â|Â|Ã|�/.test(s)) bad.push({id:pr.id, field:f, title:pr.title, snippet:s.slice(0,80)});
  }
}
console.log('mojibake products:', bad.length);
console.log(JSON.stringify(bad.slice(0,30),null,2));