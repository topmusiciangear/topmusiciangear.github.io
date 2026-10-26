const fs=require('fs');
const path=require('path');
const dir='C:/Users/Daniel/projects/topmusiciangear/guides';
const files=fs.readdirSync(dir).filter(f=>f.endsWith('.html') && !f.endsWith('_es.html'));
const terms=['Mejores','Cómo','Configurar','Guía','Comparativa','Análisis','para salas','estudio para'];
const report={};
for(const term of terms){
  let count=0; const filesHit=[];
  for(const f of files){
    const t=fs.readFileSync(path.join(dir,f),'utf8');
    if(t.includes(term)){ count++; filesHit.push(f); }
  }
  report[term]={count, files:filesHit};
}
console.log(JSON.stringify(report,null,2));