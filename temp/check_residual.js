const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(BASE+'data/guides.json','utf8'));
const g = guides.find(x=>x.id==='starter-studio');
const s = JSON.stringify(g);

console.log('=== 1) "8 pulgadas de Kevlar" ===');
const re1 = /Ocho pulgadas de Kevlar/g;
let m1 = s.match(re1);
console.log('  "Ocho pulgadas de Kevlar": ' + (m1?m1.length:0));
// buscar el texto real
const idx = s.indexOf('Ocho pulgadas');
if (idx > -1) console.log('  contexto: ...' + s.slice(idx-80, idx+80) + '...');
else console.log('  no existe "Ocho pulgadas" en absoluto');

// buscar titulos con "Ocho"
console.log('\n  titulos de seccion con "Ocho"/"Eight":');
g.sections.forEach((sec,i)=>{
  if (/Ocho|Eight/i.test(sec.heading) || /Ocho|Eight/i.test(sec.heading_es||'')) {
    console.log('    sec['+i+']: ' + sec.heading + '  /  ' + sec.heading_es);
  }
});

console.log('\n=== 2) "Un micrófono dinámico como el SM57 no le importa" ===');
const re2 = /Un micrófono dinámico como el SM57 no le importa/g;
const m2 = s.match(re2);
console.log('  encontrado: ' + (m2?m2.length:0));
// ver el texto real
const dyn = g.sections.find(x=>/Dynamic vs the Condenser/.test(x.heading));
const i2 = dyn.content_es.indexOf('micrófono dinámico como el SM57');
if (i2 > -1) console.log('  texto real: ...' + dyn.content_es.slice(Math.max(0,i2-30), i2+90) + '...');
else console.log('  no esta en la seccion de dinamico');