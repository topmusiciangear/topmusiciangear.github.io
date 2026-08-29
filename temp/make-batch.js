const fs=require('fs');
const products=JSON.parse(fs.readFileSync('data/products.json','utf8'));
const byId=Object.fromEntries(products.map(p=>[p.id,p]));
const g4mIds=[92,113,114,118,123,124,126,130,139,144,148,149,150,151,156,163,173,174,175,186,187,191,193,195,198,199,204,205,209,211,212,214,215,216,217,219,220,319,328,335,336,338,375,377,383,389,390];
const arr=g4mIds.map(id=>{const p=byId[id];return {id,name:p?p.title:'?',cat:p?p.category:'?',url:(p&&p.stores&&p.stores.gear4music)||''};});
fs.writeFileSync('temp/verify/g4m_batch.json', JSON.stringify(arr,null,1));
console.log('wrote',arr.length,'gearmusic products to verify');
// zzounds + musicstore quick worklists
const zz=[406,408].map(id=>{const p=byId[id];return {id,name:p.title,url:(p.stores||{}).zzounds};});
fs.writeFileSync('temp/verify/zz_batch.json', JSON.stringify(zz,null,1));
const ms=[{id:384,name:'Sonible smart:limit',url:byId[384].stores.musicstore}];
fs.writeFileSync('temp/verify/ms_batch.json', JSON.stringify(ms,null,1));
console.log('zzounds batch:',zz.length,'musicstore batch:',ms.length);
