const fs=require('fs');
const guides=JSON.parse(fs.readFileSync('data/guides.json','utf8'));
const removePatterns=[
  'MXR Phase 95',
  'RC-5 Loop Station',
  'Peterson StroboClip HD',
  'Baby Audio Smooth Operator Pro',
  'Gibson Les Paul Standard'
];
function containsPattern(s){
  if(!s) return false;
  return removePatterns.some(p=>s.includes(p));
}
let changed=false;
for(const g of guides){
  if(Array.isArray(g.sections)){
    const before=g.sections.length;
    g.sections=g.sections.filter(s=>{
      if(containsPattern(s.heading)||containsPattern(s.heading_es)){
        changed=true;
        return false;
      }
      // also filter by product ids (already done)
      const ids=Array.isArray(s.products)?s.products:[];
      if(ids.some(id=>[136,200,61,472,7].includes(id))){
        changed=true;
        return false;
      }
      return true;
    });
    if(g.sections.length!==before) changed=true;
  }
  // clean verdict text paragraphs containing patterns
  const fields=['intro','intro_es','conclusion','conclusion_es','verdict','verdict_es','description','description_es'];
  for(const f of fields){
    if(typeof g[f]==='string'){
      const orig=g[f];
      let cleaned=orig;
      for(const p of removePatterns){
        const re=new RegExp(`<p[^>]*>.*${p.replace(/[.*+?^${}()|[\\]\\\\]/g,'\\$&')}.*?</p>`, 'gis');
        cleaned=cleaned.replace(re,'');
      }
      // remove empty strong paragraphs
      cleaned=cleaned.replace(/<p><strong>\s*<\/strong>.*?<\/p>/gis,'');
      if(cleaned!==orig){ changed=true; g[f]=cleaned; }
    }
  }
}
if(changed){
  fs.writeFileSync('data/guides.json', JSON.stringify(guides,null,2));
  console.log('sections cleaned');
}else{
  console.log('no changes');
}
