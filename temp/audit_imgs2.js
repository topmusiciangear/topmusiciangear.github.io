const fs=require('fs');
const path=require('path');
const base='C:/Users/Daniel/projects/topmusiciangear';
const dir=base+'/guides';
const files=fs.readdirSync(dir).filter(f=>f.endsWith('.html'));
const brokenImgs=[];
for(const f of files){
  const t=fs.readFileSync(path.join(dir,f),'utf8');
  const imgs=[...t.matchAll(/src="([^"]+)"/g)].map(m=>m[1]);
  for(const img of imgs){
    if(img.startsWith('http') || img.startsWith('data:')) continue;
    const clean=img.split('?')[0];
    let full;
    if(clean.startsWith('/')) full=path.join(base, clean);
    else full=path.resolve(path.join(dir, clean));
    if(!fs.existsSync(full)) brokenImgs.push({file:f, img});
  }
}
console.log('broken images:', brokenImgs.length);
// unique missing images
const uniq=new Set(brokenImgs.map(x=>x.img));
console.log('unique missing:', uniq.size);
console.log([...uniq].slice(0,30));