const fs=require('fs');
const src=fs.readFileSync('build-guides.js','utf8');
const start=src.indexOf('const TEST_SHOP_BTN = {');
const ob=src.indexOf('{',src.indexOf('=',start));
let depth=0,end=-1;for(let i=ob;i<src.length;i++){if(src[i]==='{')depth++;else if(src[i]==='}'){depth--;if(depth===0){end=i;break;}}}
let obj; try{ obj=eval('('+src.slice(ob,end+1)+')'); }catch(e){ console.log('PARSE ERR',e.message); process.exit(1);}
const products=JSON.parse(fs.readFileSync('data/products.json','utf8'));
const byId=Object.fromEntries(products.map(p=>[p.id,p]));

const issues={};
const check=(id,msg)=>{ (issues[id]=issues[id]||[]).push(msg); };

// 1) store has URL in products.json but no price in TEST_SHOP_BTN -> renders "Agotado"
// 2) musicstore price in $ instead of €
// 3) entry missing entirely (but has stores)
for(const p of products){
  const id=p.id; const st=p.stores||{};
  const cfg=obj[id]; const prices=(cfg&&cfg.prices)||{};
  const oos=cfg&&cfg.oos||[];
  const hasAnyStore=Object.keys(st).some(k=>['zzounds','reverb','gear4music','andertons','musicstore','amazon'].includes(k));
  if(!cfg){
    if(hasAnyStore && p.category!=='daw') check(id,'SIN ENTRY (tiendas: '+Object.keys(st).join(',')+')');
    continue;
  }
  if(!prices || Object.keys(prices).length===0){ check(id,'ENTRY SIN PRECIOS'); continue; }
  for(const k of ['zzounds','gear4music','andertons','musicstore','amazon']){
    if(st[k] && !prices[k] && !oos.includes(k) && k!=='reverb' && k!=='amazon'){
      check(id,'FALTA '+k+' (con link, sin precio)');
    }
  }
  // currency check for musicstore
  if(prices.musicstore && /^\$/.test(prices.musicstore)){
    check(id,'MUSICSTORE EN USD: '+prices.musicstore);
  }
  // gear4music should be £
  if(prices.gear4music && /^\$|^€/.test(prices.gear4music)){
    check(id,'GEAR4MUSIC MONEDA RARA: '+prices.gear4music);
  }
}

const ids=Object.keys(issues).map(Number).sort((a,b)=>a-b);
console.log('Productos con issues:', ids.length);
let n=0; for(const id of ids){ const p=byId[id]; console.log('--- '+id+' | '+p.title+' | cat '+p.category); issues[id].forEach(m=>console.log('    '+m)); n++; }
console.log('\nTOTAL issue-flag lines:', n);
fs.writeFileSync('temp/audit-issues.json', JSON.stringify({ids, issues},null,1));
