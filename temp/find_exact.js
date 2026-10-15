const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(BASE+'data/guides.json','utf8'));
const g = guides.find(x=>x.id==='starter-studio');
const P = re => { const m = JSON.stringify(g).match(re); return m?m[0]:null; };

console.log('=== cadenas exactas que quedan ===');
[['woofer de 8 pulgadas', /[^"]{0,60}woofer de 8 pulgadas[^"]{0,60}/i],
 ['8-inch woven', /[^"]{0,60}8-inch woven[^"]{0,60}/i],
 ['8 pulgadas de Kevlar', /[^"]{0,50}8 pulgadas de Kevlar[^"]{0,50}/i]]
.forEach(([label,re])=>{
  const m = P(re);
  console.log('\n' + label + ':');
  console.log('  ' + (m ? m[0] : 'NO ENCONTRADO'));
});

// volcar el veredicto KRK completo
const krk = g.verdictProsCons.find(v=>/Rokit/.test(v.name));
console.log('\n=== VEREDICTO KRK ===');
console.log('name: ' + krk.name);
console.log('pros[0]:     ' + krk.pros[0]);
console.log('pros_es[0]:  ' + krk.pros_es[0]);

// volcar la seccion de monitores EN
const secM = g.sections.find(s=>/Monitors You Cannot/.test(s.heading));
console.log('\n=== SEC MONITORES EN (parrafo 2) ===');
console.log(secM.content.split('</p>')[1]);