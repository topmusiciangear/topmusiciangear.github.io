const fs=require('fs');
const path=require('path');
const dir='C:/Users/Daniel/projects/topmusiciangear/guides';
const files=fs.readdirSync(dir).filter(f=>f.endsWith('.html') && !f.endsWith('_es.html'));
let total=0;
const results=[];
for(const f of files){
  const t=fs.readFileSync(path.join(dir,f),'utf8');
  const matches=t.match(/[áéíóúñ¿¡]/g);
  if(matches){
    total++;
    // find contexts
    const ctx=new Set();
    let i;
    while((i=t.indexOf('á',0))!==-1 || (i=t.indexOf('é',0))!==-1){ break; }
    // simpler: regex context
    const reg=/[^<>]{0,40}[áéíóúñ¿¡][^<>]{0,40}/g;
    const c=t.match(reg)||[];
    results.push({file:f, count:matches.length, samples:c.slice(0,3)});
  }
}
console.log('EN files with Spanish accents:', total, 'of', files.length);
console.log(JSON.stringify(results.slice(0,20),null,2));