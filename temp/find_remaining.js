const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(BASE+'data/guides.json','utf8'));
const g = guides.find(x=>x.id==='starter-studio');

const buscar = (re, etiqueta) => {
  console.log('\n### ' + etiqueta);
  const campos = [
    ['intro',g.intro],['intro_es',g.intro_es],['conclusion',g.conclusion],['conclusion_es',g.conclusion_es],
    ['description_es',g.description_es]
  ];
  g.sections.forEach((s,i)=>{
    campos.push(['sec['+i+'] '+s.heading.slice(0,40), s.content]);
    campos.push(['sec['+i+'].es', s.content_es]);
    campos.push(['sec['+i+'].head_es', s.heading_es]);
  });
  g.verdictProsCons.forEach(v=>{
    ['pros','cons','pros_es','cons_es'].forEach(k=>{
      (v[k]||[]).forEach((t,j)=>campos.push([v.name+'.'+k+'['+j+']', t]));
    });
  });
  campos.forEach(([campo,txt])=>{
    if(!txt) return;
    const m = txt.match(re);
    if(m){
      const i = txt.indexOf(m[0]);
      console.log('  [' + campo + ']');
      console.log('     ...' + txt.slice(Math.max(0,i-80), i+m[0].length+90).replace(/\s+/g,' ') + '...');
    }
  });
};

buscar(/woofer de 8 pulgadas/i, 'woofer de 8 pulgadas (ES)');
buscar(/8-inch woven Kevlar woofer|8-inch woven/i, '8-inch woofer (EN)');
buscar(/trapping de graves/i, 'trapping de graves');
buscar(/es la misma interfaz/i, 'es la misma interfaz');