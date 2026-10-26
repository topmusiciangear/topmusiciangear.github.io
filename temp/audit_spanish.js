const fs=require('fs');
const path=require('path');
const dir='C:/Users/Daniel/projects/topmusiciangear/guides';
const files=fs.readdirSync(dir).filter(f=>f.endsWith('.html') && !f.endsWith('_es.html'));
let total=0;
const results=[];
for(const f of files){
  const t=fs.readFileSync(path.join(dir,f),'utf8');
  // find Spanish leaked phrases: Mejores, para salas, Guía, etc.
  const matches=t.match(/Mejores [^<]{0,80}/g);
  if(matches){
    total++;
    results.push({file:f, samples:matches.slice(0,5)});
  }
}
console.log('EN files with "Mejores":', total, 'of', files.length);
console.log(JSON.stringify(results.slice(0,10),null,2));