const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const gf = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gf, 'utf8'));
const g = guides.find(x => x.id === 'starter-studio');

// 1) "whatever gastes" -> "gastes lo que gastes"
if (g.conclusion_es && g.conclusion_es.indexOf('Y whatever gastes en lo demás') > -1) {
  g.conclusion_es = g.conclusion_es.replace('Y whatever gastes en lo demás', 'Y gastes lo que gastes en lo demás');
  console.log('conclusion_es corregido: "whatever gastes" -> "gastes lo que gastes"');
}
// 2) "assembled con productos" -> "armados con productos"
if (g.intro_es && g.intro_es.indexOf('armados con productos sueltos') > -1) {
  console.log('intro_es ya correcto');
}

// 3) barrido general de palabras inglesas sueltas en el ES de esta guia
const PALABRAS = ['whatever','assembled','the ',' and ',' with ',' for ',' from ',' your ',' studio ',' setup ',' build '];
const CAMPOS_ES = ['intro_es','conclusion_es','title_es','description_es'];
let encontrados = [];
CAMPOS_ES.forEach(c=>{
  const v = g[c];
  if(!v) return;
  PALABRAS.forEach(p=>{
    if(p.includes(' ') || p==='whatever' || p==='assembled'){
      const n = (v.split(p).length-1);
      if(n) encontrados.push(c+': "'+p+'" x'+n);
    }
  });
});
(g.sections||[]).forEach((s,i)=>{
  const v = s.content_es||'';
  PALABRAS.forEach(p=>{
    if(p==='whatever' || p==='assembled'){
      const n = (v.split(p).length-1);
      if(n) encontrados.push('secciones['+i+'].content_es: "'+p+'" x'+n);
    }
  });
});
(g.verdictProsCons||[]).forEach(v=>{
  ['pros_es','cons_es'].forEach(c=>{
    (v[c]||[]).forEach(t=>{
      PALABRAS.forEach(p=>{
        if(p==='whatever' || p==='assembled'){
          if(t.indexOf(p)>-1) encontrados.push('veredicto '+v.name+'.'+c+': "'+p+'" en "'+t.slice(0,60)+'"');
        }
      });
    });
  });
});
console.log('\npalabras inglesas sueltas encontradas: ' + encontrados.length);
encontrados.forEach(x=>console.log('  ' + x));

fs.writeFileSync(gf, JSON.stringify(guides, null, 2), 'utf8');
console.log('\nguides.json escrito');