const fs=require('fs');
const products=JSON.parse(fs.readFileSync('data/products.json','utf8'));
const byId=Object.fromEntries(products.map(p=>[p.id,p]));
// get oos lists from build-guides
const src=fs.readFileSync('build-guides.js','utf8');
const ob=src.indexOf('{',src.indexOf('const TEST_SHOP_BTN'));
let depth=0,end=-1;for(let i=ob;i<src.length;i++){if(src[i]==='{')depth++;else if(src[i]==='}'){depth--;if(depth===0){end=i;break;}}}
const obj=eval('('+src.slice(ob,end+1)+')');

// products where gear4music is in oos -> renders "Agotado" for g4m
const g4mOos=[];
for(const id in obj){ const c=obj[id]; if(c.oos&&c.oos.includes('gear4music')) g4mOos.push(+id); }
console.log('Productos con gear4music en oos (boton g4m = Agotado):', g4mOos.length);
for(const id of g4mOos.sort((a,b)=>a-b)){ const p=byId[id]; console.log('  '+id+' | '+p.title+' | cat '+p.category); }
fs.writeFileSync('temp/g4m-oos-ids.json', JSON.stringify(g4mOos));
