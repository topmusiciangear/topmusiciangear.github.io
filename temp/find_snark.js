const fs=require('fs');
const data=JSON.parse(fs.readFileSync('data/guides.json','utf8'));
const g=data.find(x=>x.id==='tuners-bass-guitar');
const v=g.verdict_es;
const idx=v.indexOf('Snark ST-8 Titanium');
console.log(v.slice(idx, idx+300));
