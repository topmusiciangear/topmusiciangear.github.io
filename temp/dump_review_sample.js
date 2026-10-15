const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(BASE+'data/guides.json','utf8'));
const g = guides.find(x=>x.id==='active-vs-passive-pa');
// review del JRX215 (producto pasivo) y del EON712 (producto activo)
const s = g.sections.find(x=>/JRX215/.test(x.heading));
console.log('=== JRX215 (pasivo) ===');
console.log('heading: ' + s.heading);
console.log('heading_es: ' + s.heading_es);
console.log('products: ' + JSON.stringify(s.products));
console.log('content:\n' + s.content);
console.log('\ncontent_es:\n' + s.content_es);
console.log('\n\n');
const s2 = g.sections.find(x=>/EON712/.test(x.heading));
console.log('=== EON712 (activo) ===');
console.log('heading: ' + s2.heading);
console.log('content:\n' + s2.content);
console.log('\ncontent_es:\n' + s2.content_es);