const fs=require('fs');
const src=fs.readFileSync('build-guides.js','utf8');
const start=src.indexOf('const TEST_SHOP_BTN = {');
const ob=src.indexOf('{',src.indexOf('=',start));
let depth=0,end=-1;for(let i=ob;i<src.length;i++){if(src[i]==='{')depth++;else if(src[i]==='}'){depth--;if(depth===0){end=i;break;}}}
const obj=eval('('+src.slice(ob,end+1)+')');
const products=JSON.parse(fs.readFileSync('data/products.json','utf8'));
const STORES=['zzounds','reverb','gear4music','andertons','musicstore','amazon'];
const byStore={};
let total=0;
for(const p of products){
  const id=p.id; const cfg=obj[id]; const prices=cfg&&cfg.prices||{};
  const st=(p.stores||{});
  for(const k of STORES){
    if(st[k] && !prices[k] && k!=='reverb' && !(cfg&&(cfg.oos||[]).includes(k))){
      byStore[k]=byStore[k]||[]; byStore[k].push(id+'|'+p.title); total++;
    }
  }
}
console.log('TOTAL missing (id,store) gaps: '+total);
for(const k of STORES){ console.log('\n=== '+k+' ('+((byStore[k]||[]).length)+') ==='); (byStore[k]||[]).forEach(x=>console.log('  '+x)); }
require('fs').writeFileSync('temp/gaps.json', JSON.stringify({byStore,total}));
