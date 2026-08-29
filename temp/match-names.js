const fs=require('fs');
function parseCSV(text){const rows=[];let row=[],cur='',inQ=false;for(let i=0;i<text.length;i++){const ch=text[i];if(inQ){if(ch==='"'){if(text[i+1]==='"'){cur+='"';i++;}else inQ=false;}else cur+=ch;}else{if(ch==='"')inQ=true;else if(ch===','){row.push(cur);cur='';}else if(ch==='\n'){row.push(cur);rows.push(row);row=[];cur='';}else if(ch==='\r'){}else cur+=ch;}}if(cur!==''||row.length){row.push(cur);rows.push(row);}return rows;}
const rows=parseCSV(fs.readFileSync('C:/Users/Daniel/AppData/Local/Temp/opencode/g4m-feed.csv','utf8'));
const h=rows[0];const idx=Object.fromEntries(h.map((x,i)=>[x,i]));
const norm=s=>String(s||'').toLowerCase().replace(/[^a-z0-9]+/g,' ').replace(/^\s+|\s+$/g,'');
const feedByCode=new Map(), feedNames=[];
for(let i=1;i<rows.length;i++){const r=rows[i];const deep=r[idx['merchant_deep_link']]||'';const code=deep.trim().split('/').filter(Boolean).pop()||'';const name=norm(r[idx['product_name']]);feedByCode.set(code,{r,i,name});feedNames.push({name,code,i});}
const products=JSON.parse(fs.readFileSync('data/products.json','utf8'));
let codeMatch=0,nameMatch=0,no=0;const nameHits=[];
for(const p of products){
  const url=(p.stores||{}).gear4music; if(!url) continue;
  let g4mUrl=url; try{const m=url.match(/[?&]ued=([^&]*)/); if(m)g4mUrl=decodeURIComponent(m[1]);}catch(e){}
  const code=g4mUrl.trim().split('/').filter(Boolean).pop()||'';
  if(feedByCode.has(code)){codeMatch++;continue;}
  // name fallback: if any feed name contains full site title words significantly
  const t=norm(p.title); const words=t.split(' ').filter(w=>w.length>1);
  let best=null,bestScore=0;
  for(const f of feedNames){ let hits=0; for(const w of words) if(f.name.includes(w)) hits++; const score=hits/words.length; if(score>bestScore){bestScore=score;best=f;} }
  if(best && bestScore>=0.6){ nameMatch++; nameHits.push({id:p.id,title:p.title,feed:best.name,score:bestScore}); }
  else no++;
}
console.log('Site products w/ g4m:', products.filter(p=>(p.stores||{}).gear4music).length);
console.log('code match:', codeMatch, '| name match(>=0.6):', nameMatch, '| none:', no);
console.log('\nName fallback hits (up to 15):');
nameHits.slice(0,15).forEach(x=>console.log('  '+x.id,'|',x.title,' => feed:',x.feed,'('+x.score.toFixed(2)+')'));
