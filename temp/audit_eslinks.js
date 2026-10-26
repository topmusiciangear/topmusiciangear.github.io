const fs=require('fs');
const path=require('path');
const dir='C:/Users/Daniel/projects/topmusiciangear/guides';
const files=fs.readdirSync(dir).filter(f=>f.endsWith('.html') && !f.endsWith('_es.html'));
let total=0;
const res=[];
for(const f of files){
  const t=fs.readFileSync(path.join(dir,f),'utf8');
  const m=t.match(/href="\/guides\/[^"]*_es\.html"/g);
  if(m){
    total++;
    res.push({file:f, count:m.length, sample:m[0]});
  }
}
console.log('EN files linking to _es guides:', total);
console.log(JSON.stringify(res.slice(0,30),null,2));