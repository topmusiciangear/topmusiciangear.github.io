const fs=require('fs');
const B='C:/Users/Daniel/projects/topmusiciangear/';
const p=JSON.parse(fs.readFileSync(B+'data/products.json','utf8'));
// We need original descs; they are already trimmed. Use git to get original? Instead, reconstruct from current: many are already short. 
// Better: check current descs that end with incomplete phrase (artificial period). We'll just report lengths.
const bad=p.filter(pr=> (pr.desc||'').length<80);
console.log('descs <80 chars:', bad.length);
for(const pr of bad.slice(0,20)) console.log(pr.id, pr.title, '|', pr.desc);