const fs=require('fs');
const path=require('path');
const dir='C:/Users/Daniel/projects/topmusiciangear/guides';
const files=fs.readdirSync(dir).filter(f=>f.endsWith('.html') && !f.endsWith('_es.html'));
const h1s=[];
for(const f of files){
  const t=fs.readFileSync(path.join(dir,f),'utf8');
  const m=t.match(/<h1[^>]*>(.*?)<\/h1>/i);
  h1s.push({file:f, h1: m? m[1].replace(/<[^>]+>/g,'').trim() : 'NONE'});
}
// find duplicates
const map={};
h1s.forEach(x=>{ map[x.h1]=(map[x.h1]||0)+1; });
const dups=Object.entries(map).filter(([k,v])=>v>1);
console.log('total guides:', files.length);
console.log('unique h1:', Object.keys(map).length);
console.log('duplicate h1s:', dups.length);
dups.slice(0,20).forEach(d=>console.log(d[1], '|', d[0]));
// show a few
console.log('--- samples ---');
h1s.slice(0,10).forEach(x=>console.log(x.file, '=>', x.h1));