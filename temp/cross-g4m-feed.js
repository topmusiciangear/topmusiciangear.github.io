const fs=require('fs');
const feed='C:/Users/Daniel/AppData/Local/Temp/opencode/g4m-feed.csv';
// read only product_name + search_price + merchant_deep_link
const lines=fs.readFileSync(feed,'utf8').split(/\r?\n/);
const byName=new Map();
for(let i=1;i<lines.length;i++){
  const line=lines[i]; if(!line) continue;
  // naive parse: split commas but names in quotes may contain commas; handle quoted name
  const m=line.match(/^[^,]*,"((?:[^"]|"")*)"/); 
  const name=m?m[1]:null;
  if(!name) continue;
  // price = display_price usually at end; find GBPxx
  const dp=(line.match(/,GBP([\d.,]+)$/)||[])[1];
  const dl=(line.match(/,https:\/\/www\.gear4music\.com\/[^,]*(?=,|$)/)||[])[0];
  byName.set(name.toLowerCase(),{price:dp,link:dl});
}
// products to check
const products=JSON.parse(fs.readFileSync('data/products.json','utf8'));
const byId=Object.fromEntries(products.map(p=>[p.id,p]));
const ids=[92,118,156,195,209,319,335,336,338,170,291];
const norm=s=>s.toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
for(const id of ids){
  const p=byId[id]; const n=norm(p.title);
  // exact + token search
  const exact=byName.get(p.title.toLowerCase());
  let found=exact;
  if(!found){
    const toks=n.split(' ').filter(t=>t.length>2);
    // find best match by token overlap
    let best=null,bestScore=0;
    for(const [fn,fv] of byName){ const fnN=norm(fn); const ft=fnN.split(' ').filter(t=>t.length>2); let s=0; for(const t of toks) if(ft.includes(t))s++; if(s>bestScore&&s>=3){bestScore=s;best=[fn,fv];} }
    found=best&&bestScore>=3?best[1]:null;
    if(found) console.log(`  (fuzzy ${bestScore}) ${best[0]}`);
  }
  console.log(`${id} | ${p.title}`);
  console.log('   '+ (found?`EXISTE: £${found.price} ${found.link}`:'NO en feed (o no dice)'));
}
