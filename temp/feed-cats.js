const fs=require('fs');
const file='C:/Users/Daniel/AppData/Local/Temp/opencode/g4m-feed.csv';
function parseCSV(text){const rows=[];let row=[],cur='',inQ=false;for(let i=0;i<text.length;i++){const ch=text[i];if(inQ){if(ch==='"'){if(text[i+1]==='"'){cur+='"';i++;}else inQ=false;}else cur+=ch;}else{if(ch==='"')inQ=true;else if(ch===','){row.push(cur);cur='';}else if(ch==='\n'){row.push(cur);rows.push(row);row=[];cur='';}else if(ch==='\r'){}else cur+=ch;}}if(cur!==''||row.length){row.push(cur);rows.push(row);}return rows;}
const rows=parseCSV(fs.readFileSync(file,'utf8'));
const h=rows[0]; const idx=Object.fromEntries(h.map((x,i)=>[x,i]));
const catCount={};
for(let i=1;i<rows.length;i++){const r=rows[i];const c=r[idx['category_name']];catCount[c]=(catCount[c]||0)+1;}
console.log('Feed category distribution:');
Object.entries(catCount).sort((a,b)=>b[1]-a[1]).forEach(([c,n])=>console.log('  '+c+': '+n));
