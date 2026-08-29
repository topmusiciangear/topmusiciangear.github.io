const fs=require('fs');
const file='C:/Users/Daniel/AppData/Local/Temp/opencode/g4m-feed.csv';
const raw=fs.readFileSync(file,'utf8');

// Minimal CSV parser handling quotes
function parseCSV(text){
  const rows=[]; let row=[], cur='', inQ=false;
  for(let i=0;i<text.length;i++){
    const ch=text[i];
    if(inQ){
      if(ch==='"'){ if(text[i+1]==='"'){cur+='"';i++;} else inQ=false; }
      else cur+=ch;
    } else {
      if(ch==='"'){ inQ=true; }
      else if(ch===','){ row.push(cur); cur=''; }
      else if(ch==='\n'){ row.push(cur); rows.push(row); row=[]; cur=''; }
      else if(ch==='\r'){ /* skip */ }
      else cur+=ch;
    }
  }
  if(cur!==''||row.length){ row.push(cur); rows.push(row); }
  return rows;
}
const rows=parseCSV(raw);
const header=rows[0];
const col=i=>header[i];
const idx=Object.fromEntries(header.map((h,i)=>[h,i]));
console.log('Columns:', header.length, '| data rows:', rows.length-1);

// build feed map: last path segment of merchant_deep_link -> {name, price, deep, aw}
const feedMap=new Map();
let multi=0;
for(let i=1;i<rows.length;i++){
  const r=rows[i];
  const deep=r[idx['merchant_deep_link']]||'';
  const aw=r[idx['aw_deep_link']]||'';
  const name=r[idx['product_name']]||'';
  const price=r[idx['search_price']]||'';
  const disp=r[idx['display_price']]||'';
  const code=deep.trim().split('/').filter(Boolean).pop()||'';
  if(!code) continue;
  if(feedMap.has(code)){ multi++; continue; }
  feedMap.set(code,{name,price,deep,aw,disp});
}
console.log('Feed codes (last path seg):', feedMap.size, '| duplicates skipped:', multi);

// Load products.json
const products=JSON.parse(fs.readFileSync('data/products.json','utf8'));
let totalG4M=0, matched=0, mismatch=0; const misses=[], matches=[];
for(const p of products){
  const st=p.stores||{};
  const url=st.gear4music||st['gear4music'];
  if(!url) continue;
  totalG4M++;
  // decode ued
  let g4mUrl=url;
  try{ const m=url.match(/[?&]ued=([^&]*)/); if(m) g4mUrl=decodeURIComponent(m[1]); }catch(e){}
  const code=g4mUrl.trim().split('/').filter(Boolean).pop()||'';
  if(feedMap.has(code)){ matched++; matches.push({id:p.id,title:p.title,code,feed:feedMap.get(code)}); }
  else { mismatch++; misses.push({id:p.id,title:p.title,code,g4mUrl}); }
}
console.log('products with gear4music store:', totalG4M);
console.log('matched by code:', matched, '| NOT matched:', mismatch);
console.log('\n=== SAMPLE MISSES (first 12) ===');
misses.slice(0,12).forEach(m=>console.log(m.id,'|',m.title,'| code=',JSON.stringify(m.code)));
