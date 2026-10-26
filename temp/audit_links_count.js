const fs=require('fs');
const path=require('path');
const dir='C:/Users/Daniel/projects/topmusiciangear/guides';
const files=fs.readdirSync(dir).filter(f=>f.endsWith('.html'));
const noInternal=[];
const noAffiliate=[];
for(const f of files){
  const t=fs.readFileSync(path.join(dir,f),'utf8');
  const internal=(t.match(/href="\/guides\/[^"]+"/g)||[]).length;
  const aff=(t.match(/sponsored/g)||[]).length;
  if(internal===0) noInternal.push(f);
  if(aff===0) noAffiliate.push(f);
}
console.log('guides with 0 internal links:', noInternal.length);
console.log(noInternal.slice(0,20));
console.log('guides with 0 affiliate/sponsored links:', noAffiliate.length);
console.log(noAffiliate.slice(0,20));