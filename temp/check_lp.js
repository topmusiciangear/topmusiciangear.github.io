const fs=require('fs');
const s=fs.readFileSync('data/guides.json','utf8');
const m=s.match(/\n    "id": "american-pro-vs-les-paul"[\s\S]*?\n    "id": "/);
const b=m?m[0]:'';
const bad=['50s Vintage','Burstbucker 1 ','Burstbucker 2','22.8"','Alnico II)'];
for(const t of bad){ if(b.includes(t)) console.log('BAD',t); }
console.log('ok');
