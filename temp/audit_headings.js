const fs=require('fs');
const path=require('path');
const dir='C:/Users/Daniel/projects/topmusiciangear/guides';
const files=fs.readdirSync(dir).filter(f=>f.endsWith('.html'));
const issues=[];
for(const f of files){
  const t=fs.readFileSync(path.join(dir,f),'utf8');
  // extract headings in order
  const hs=[...t.matchAll(/<h([1-6])[^>]*>(.*?)<\/h\1>/gi)].map(m=>({level:parseInt(m[1]), text:m[2].replace(/<[^>]+>/g,'').trim()}));
  const problems=[];
  // H1 count
  const h1s=hs.filter(h=>h.level===1);
  if(h1s.length===0) problems.push('no H1');
  if(h1s.length>1) problems.push('multiple H1 ('+h1s.length+')');
  // skipped levels
  let prev=0;
  for(const h of hs){
    if(prev>0 && h.level>prev+1) { problems.push('skipped level H'+prev+'->H'+h.level); break; }
    prev=h.level;
  }
  // empty headings
  if(hs.some(h=>!h.text)) problems.push('empty heading');
  if(problems.length) issues.push({file:f, problems, h1:h1s.map(h=>h.text).join(' | ')});
}
console.log('files with heading issues:', issues.length, 'of', files.length);
console.log(JSON.stringify(issues.slice(0,40),null,2));