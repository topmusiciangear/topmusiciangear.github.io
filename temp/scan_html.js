const fs=require('fs');
const path=require('path');
const dir='C:/Users/Daniel/projects/topmusiciangear/guides';
let files=fs.readdirSync(dir).filter(f=>f.endsWith('.html'));
let empty=0, theIs=0, elEs=0;
for(const f of files){
  const t=fs.readFileSync(path.join(dir,f),'utf8');
  empty += (t.match(/product-name"> <\/span>/g)||[]).length;
  theIs += (t.match(/The is the /g)||[]).length;
  elEs += (t.match(/El es el /g)||[]).length;
}
console.log('files', files.length);
console.log('empty spans', empty);
console.log('The is the', theIs);
console.log('El es el', elEs);