const fs=require('fs');
function parseCSV(text){const rows=[];let row=[],cur='',inQ=false;for(let i=0;i<text.length;i++){const ch=text[i];if(inQ){if(ch==='"'){if(text[i+1]==='"'){cur+='"';i++;}else inQ=false;}else cur+=ch;}else{if(ch==='"')inQ=true;else if(ch===','){row.push(cur);cur='';}else if(ch==='\n'){row.push(cur);rows.push(row);row=[];cur='';}else if(ch==='\r'){}else cur+=ch;}}if(cur!==''||row.length){row.push(cur);rows.push(row);}return rows;}
const rows=parseCSV(fs.readFileSync('C:/Users/Daniel/AppData/Local/Temp/opencode/g4m-feed.csv','utf8'));
const h=rows[0];const idx=Object.fromEntries(h.map((x,i)=>[x,i]));
const names=rows.slice(1).map(r=>r[idx['product_name']]);
const byBrand={};
for(const n of names){ const b=(n.split(' ')[0]).replace(/"/g,''); byBrand[b]=(byBrand[b]||0)+1; }
const top=Object.entries(byBrand).sort((a,b)=>b[1]-a[1]).slice(0,25);
console.log('Top brand-name prefixes in feed:');
top.forEach(([b,n])=>console.log('  '+b+': '+n));
console.log('\nSample 20 product names:');
names.slice(0,20).forEach(n=>console.log('  - '+n));
