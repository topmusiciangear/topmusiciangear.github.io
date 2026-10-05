const fs=require('fs');
const prods=JSON.parse(fs.readFileSync('data/products.json','utf8'));
const guides=JSON.parse(fs.readFileSync('data/guides.json','utf8'));
const ids=[270,1,16,52,53,55,121,182,263,18,112,115,26,307,117,103,310,462,463,313,464,309,256,488,552,492,136,335,151,475,476,477,145,410,486,413,411,334,442,441];
const pmap={}; for(const p of prods) if(ids.includes(p.id)) pmap[p.id]=p;
fs.writeFileSync('temp/needed_products.json', JSON.stringify(pmap,null,2));
const wanted=["best-guitar-home-office","fix-clipping-scarlett","best-daw-for-beginners","best-headphones-for-mixing","best-monitors-for-small-rooms","best-beginner-electric-guitar","best-samplers-drum-computers","best-practice-amps","best-bass-amps","best-bass-practice-amps","best-overdrive-distortion","best-live-sound-mixers","best-pa-speakers","best-synthesizers","best-digital-mixers","best-analog-mixers","precision-vs-jazz"];
let out={};
for(const g of guides){ if(wanted.includes(g.id)){ out[g.id]={title:g.title,productTable:g.productTable||g.table||null,sections:(g.sections||[]).map(s=>({heading:s.heading}))}; } }
fs.writeFileSync('temp/needed_guides.json', JSON.stringify(out,null,2).slice(0,20000));
console.log('wrote ok '+Object.keys(pmap).length);
