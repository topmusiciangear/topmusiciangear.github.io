const fs=require('fs');
const path=require('path');
const dir='C:/Users/Daniel/projects/topmusiciangear/guides';
const files=fs.readdirSync(dir).filter(f=>f.endsWith('.html') && !f.endsWith('_es.html'));
let mism=0;
const samples=[];
for(const f of files){
  const t=fs.readFileSync(path.join(dir,f),'utf8');
  const h1m=t.match(/<h1[^>]*>(.*?)<\/h1>/i);
  const tm=t.match(/<title>(.*?)<\/title>/i);
  const h1=h1m? h1m[1].replace(/<[^>]+>/g,'').trim():'';
  const title=tm? tm[1].trim():'';
  if(h1!==title){ mism++; if(samples.length<20) samples.push({file:f,h1,title}); }
}
console.log('H1 != title:', mism, 'of', files.length);
console.log(JSON.stringify(samples.slice(0,10),null,2));