const fs=require('fs');
const path=require('path');
const base='C:/Users/Daniel/projects/topmusiciangear';
const dir=base+'/guides';
const files=fs.readdirSync(dir).filter(f=>f.endsWith('.html'));
const brokenLinks=[];
const brokenImgs=[];
for(const f of files){
  const t=fs.readFileSync(path.join(dir,f),'utf8');
  // links
  const links=[...t.matchAll(/href="([^"]+)"/g)].map(m=>m[1]);
  for(const l of links){
    if(l.startsWith('/guides/') || l.startsWith('guides/')){
      const target=l.replace(/^\//,'').replace(/^guides\//,'guides/');
      const full=path.join(base, target.split('?')[0].split('#')[0]);
      if(!fs.existsSync(full)) brokenLinks.push({file:f, link:l});
    } else if(l.startsWith('../guides/') || l.startsWith('./guides/')){
      const rel=l.replace(/^\.\.\//,'').replace(/^\.\//,'');
      const full=path.join(base, rel.split('?')[0].split('#')[0]);
      if(!fs.existsSync(full)) brokenLinks.push({file:f, link:l});
    }
  }
  // images
  const imgs=[...t.matchAll(/src="([^"]+)"/g)].map(m=>m[1]);
  for(const img of imgs){
    if(img.startsWith('http') || img.startsWith('data:')) continue;
    const rel=img.replace(/^\.\.\//,'').replace(/^\.\//,'');
    const full=path.join(base, rel.split('?')[0]);
    // guides are in guides/, so ../img resolves to base/img
    const resolved=path.resolve(path.join(dir, img.split('?')[0]));
    if(!fs.existsSync(resolved)) brokenImgs.push({file:f, img});
  }
}
console.log('broken internal links:', brokenLinks.length);
console.log(JSON.stringify(brokenLinks.slice(0,30),null,2));
console.log('broken images:', brokenImgs.length);
console.log(JSON.stringify(brokenImgs.slice(0,30),null,2));