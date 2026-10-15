const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const gf = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gf, 'utf8'));
const g = guides.find(x => x.id === 'starter-studio');

// "tres montajes assembled con productos" -> "tres montajes armados con productos"
if (g.sections[1].content_es && g.sections[1].content_es.indexOf('assembled') > -1) {
  g.sections[1].content_es = g.sections[1].content_es.replace('assembled con productos', 'armados con productos');
  console.log('corregido: "assembled con productos" -> "armados con productos"');
}

// verificacion final: barrido amplio de palabras inglesas en TODO el ES de la guia
const v = JSON.stringify(g);
const INGLES = ['whatever','assembled','build ','setup ','the ',' and ',' with ',' for ',' your ',' from ','home '];
console.log('\n=== barrido final en toda la guia (incluye EN, por eso "the " es esperado) ===');
INGLES.forEach(p=>{
  const n = v.split('"').length; // no sirve, ignorado
});
// solo campos ES
const CAMPOS_ES = [];
['intro_es','conclusion_es','title_es','description_es'].forEach(c=>CAMPOS_ES.push([c,g[c]]));
(g.sections||[]).forEach((s,i)=>{ CAMPOS_ES.push(['sec['+i+'].heading_es',s.heading_es]); CAMPOS_ES.push(['sec['+i+'].content_es',s.content_es]); });
(g.verdictProsCons||[]).forEach(x=>{ CAMPOS_ES.push(['veredicto '+x.name+'.pros_es',(x.pros_es||[]).join(' | ')]); CAMPOS_ES.push(['veredicto '+x.name+'.cons_es',(x.cons_es||[]).join(' | ')]); });
let restos = 0;
CAMPOS_ES.forEach(([campo,txt])=>{
  if(!txt) return;
  INGLES.forEach(p=>{
    if(txt.indexOf(p)>-1 && p!=='the ' && p!==' and ' && p!==' with ' && p!==' for '){
      console.log('  ' + campo + ': "' + p.trim() + '"');
      restos++;
    }
  });
});
console.log('restos sospechosos: ' + restos);

fs.writeFileSync(gf, JSON.stringify(guides, null, 2), 'utf8');
console.log('\nguides.json escrito');