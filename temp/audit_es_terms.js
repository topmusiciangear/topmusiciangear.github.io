const fs=require('fs');
const path=require('path');
const dir='C:/Users/Daniel/projects/topmusiciangear/guides';
const files=fs.readdirSync(dir).filter(f=>f.endsWith('_es.html'));
const terms=['Best monitors','Monitor setup guide','Best value','Best under'];
const report={};
for(const term of terms){
  const hit=[];
  for(const f of files){
    const t=fs.readFileSync(path.join(dir,f),'utf8');
    if(t.includes(term)) hit.push(f);
  }
  report[term]=hit.length;
}
console.log(JSON.stringify(report,null,2));