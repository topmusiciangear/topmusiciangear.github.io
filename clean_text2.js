const fs=require('fs');
let data=fs.readFileSync('data/guides.json','utf8');
const patterns=[
  'Peterson StroboClip HD',
  'Baby Audio Smooth Operator Pro',
  'Gibson Les Paul Standard',
  'MXR Phase 95',
  'Boss RC-5 Loop Station'
];
for(const p of patterns){
  const esc=p.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
  const re=new RegExp(esc,'gi');
  data=data.replace(re,'');
}
fs.writeFileSync('data/guides.json', data);
console.log('done');
