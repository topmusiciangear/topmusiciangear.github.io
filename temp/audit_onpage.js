const fs=require('fs');
const path=require('path');
const dir='C:/Users/Daniel/projects/topmusiciangear/guides';
const files=fs.readdirSync(dir).filter(f=>f.endsWith('.html') && !f.endsWith('_es.html'));
const issues=[];
for(const f of files){
  const t=fs.readFileSync(path.join(dir,f),'utf8');
  const title=t.match(/<title>(.*?)<\/title>/i)?.[1]?.trim()||'';
  const h1=t.match(/<h1[^>]*>(.*?)<\/h1>/i)?.[1]?.replace(/<[^>]+>/g,'').trim()||'';
  const desc=t.match(/<meta name="description" content="(.*?)"/i)?.[1]?.trim()||'';
  const og=t.match(/<meta property="og:title" content="(.*?)"/i)?.[1]?.trim()||'';
  const problems=[];
  if(!title) problems.push('missing title');
  if(!h1) problems.push('missing H1');
  if(!desc) problems.push('missing meta description');
  if(title.length>65) problems.push('title too long');
  if(title.length<25) problems.push('title too short');
  // Spanish leak detection: Spanish words in visible text excluding UI
  const text=t.replace(/<script[\s\S]*?<\/script>/gi,'').replace(/<style[\s\S]*?<\/style>/gi,'');
  if(/Mejores|Guía|Configurar|Cómo|Análisis|Comparativa/.test(text)) problems.push('possible Spanish leak');
  if(problems.length) issues.push({file:f, problems});
}
console.log('pages with issues:', issues.length, 'of', files.length);
console.log(JSON.stringify(issues.slice(0,30),null,2));