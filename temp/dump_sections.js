const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(BASE+'data/guides.json','utf8'));
const g = guides.find(x=>x.id==='active-vs-passive-pa');
console.log('total sections: ' + g.sections.length);
g.sections.forEach((s,i)=>{
  console.log('\n['+i+'] ' + s.heading);
  console.log('    ES: ' + s.heading_es);
  console.log('    content length: ' + (s.content||'').length);
  console.log('    otras claves: ' + Object.keys(s).filter(k=>!['heading','heading_es','content'].includes(k)).join(', '));
});