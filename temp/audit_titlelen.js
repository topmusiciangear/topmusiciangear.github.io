const fs=require('fs');
const path=require('path');
const dir='C:/Users/Daniel/projects/topmusiciangear/guides';
const files=fs.readdirSync(dir).filter(f=>f.endsWith('.html') && !f.endsWith('_es.html'));
const issues=[];
for(const f of files){
  const t=fs.readFileSync(path.join(dir,f),'utf8');
  const tm=t.match(/<title>(.*?)<\/title>/i);
  const title=tm? tm[1].trim():'';
  if(title.length>65 || title.length<30) issues.push({file:f, len:title.length, title});
}
console.log('title length issues:', issues.length);
issues.slice(0,20).forEach(i=>console.log(i.len, i.title, '|', i.file));