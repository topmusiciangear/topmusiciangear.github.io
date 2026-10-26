const fs=require('fs');
const g=JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json','utf8'));
const gu=g.find(x=>x.id==='best-monitors-for-small-rooms');
const t=JSON.stringify(gu);
const idx=t.indexOf('9.6');
console.log('9.6 contexts:', t.slice(Math.max(0,idx-120), idx+120));
const idx2=t.indexOf('Score');
console.log('Score contexts:', idx2===-1?'none':t.slice(Math.max(0,idx2-80), idx2+80));