const fs=require('fs');
const B='C:/Users/Daniel/projects/topmusiciangear/';
const p=JSON.parse(fs.readFileSync(B+'data/products.json','utf8'));
const bad=[];
for(const pr of p){
  const en=(pr.desc||'').trim();
  const es=(pr.desc_es||'').trim();
  if(en && !/[.!?…]$/.test(en)) bad.push({id:pr.id, lang:'EN', desc:en.slice(-40)});
  if(es && !/[.!?…]$/.test(es)) bad.push({id:pr.id, lang:'ES', desc:es.slice(-40)});
}
console.log('desc not ending with punctuation:', bad.length);
console.log(JSON.stringify(bad.slice(0,40),null,2));