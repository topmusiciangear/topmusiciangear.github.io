const fs=require('fs');
const data=JSON.parse(fs.readFileSync('data/guides.json','utf8'));
const g=data.find(x=>x.id==='tuners-bass-guitar');
const v=g.verdict_es;
const idx=v.lastIndexOf('Snark ST-8 Titanium');
console.log(v.slice(idx-100, idx+250));
