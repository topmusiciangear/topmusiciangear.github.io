const fs=require('fs');
const path=require('path');
const dir='C:/Users/Daniel/projects/topmusiciangear/guides';
const files=fs.readdirSync(dir).filter(f=>f.endsWith('.html') && !f.endsWith('_es.html'));
const issues=[];
for(const f of files){
  const t=fs.readFileSync(path.join(dir,f),'utf8');
  // extract verdict text
  const vMatch=t.match(/Verdict<\/h2>\s*<p[^>]*>(.*?)<\/p>/i) || t.match(/Verdict<\/[^>]+>\s*<p[^>]*>(.*?)<\/p>/i);
  const verdict=vMatch? vMatch[1].replace(/<[^>]+>/g,'').trim():'';
  const cMatch=t.match(/Conclusion<\/h2>\s*<p[^>]*>(.*?)<\/p>/i) || t.match(/Conclusion<\/[^>]+>\s*<p[^>]*>(.*?)<\/p>/i);
  const conclusion=cMatch? cMatch[1].replace(/<[^>]+>/g,'').trim():'';
  const problems=[];
  if(!verdict) problems.push('no verdict');
  if(!conclusion) problems.push('no conclusion');
  if(verdict.length<40) problems.push('verdict too short');
  if(conclusion.length<40) problems.push('conclusion too short');
  // spanish leak in verdict
  if(/Mejores|Guía|para salas/.test(verdict)) problems.push('spanish in verdict');
  if(problems.length) issues.push({file:f, problems, verdict:verdict.slice(0,120), conclusion:conclusion.slice(0,120)});
}
console.log('guides with verdict/conclusion issues:', issues.length, 'of', files.length);
console.log(JSON.stringify(issues.slice(0,40),null,2));