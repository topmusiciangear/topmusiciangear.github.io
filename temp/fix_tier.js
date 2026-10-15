// Solo "tier" es calco innecesario en espanol. "pack", "packs" y "bundle"
// son validos: el propio texto los usa para对比 con los english bundles.
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const gf = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gf, 'utf8'));
const g = guides.find(x => x.id === 'starter-studio');

// Reemplazos contextuales: "tier" -> "nivel" / "montaje", nunca a secas si el
// sustantivo ya existe en la frase.
const FIX = [
  // conclusion_es
  ['cada pieza se puede mover al siguiente tier sin desperdiciarse',
   'cada pieza se puede pasar al siguiente montaje sin desperdiciarse'],
  // sec 1
  ['Es el único tier que puede mezclar un arreglo completo sin pasarse a auriculares',
   'Es el único montaje que puede mezclar un arreglo completo sin pasarse a auriculares'],
  // sec 3
  ['Por eso el tier Básico combina un dinámico con paneles acústicos',
   'Por eso el montaje Básico combina un dinámico con paneles acústicos'],
  // sec 4
  ['Solo el tier Definitivo incluye monitores, y es una línea deliberada',
   'Solo el montaje Definitivo incluye monitores, y es una línea deliberada'],
  // sec 1 frase del total
  ['que este nivel llegue a la cifra sin recortar el tratamiento acústico',
   'que este nivel llegue a la cifra sin recortar el tratamiento acústico'],
  // veredicto M50x
  ['por eso es la elección por defecto del tier',
   'por eso es la elección por defecto de este nivel']
];

let n = 0;
const aplicar = (txt) => {
  if (!txt) return txt;
  let r = txt;
  FIX.forEach(([antes, despues])=>{
    if (r.indexOf(antes) > -1) { r = r.split(antes).join(despues); n++; }
  });
  return r;
};

// conclusion
if (g.conclusion_es) g.conclusion_es = aplicar(g.conclusion_es);
// secciones
g.sections.forEach(s=>{
  s.content_es = aplicar(s.content_es);
  s.heading_es = aplicar(s.heading_es);
});
// veredictos
g.verdictProsCons.forEach(v=>{
  ['pros_es','cons_es'].forEach(k=>{
    if (Array.isArray(v[k])) v[k] = v[k].map(aplicar);
  });
});

fs.writeFileSync(gf, JSON.stringify(guides, null, 2), 'utf8');
console.log('reemplazos: ' + n);

// ═══ VERIFICACION ═══
const CAMPOS_ES = [];
['intro_es','conclusion_es','title_es','description_es','titleTag_es'].forEach(c=>CAMPOS_ES.push([c,g[c]]));
g.sections.forEach((s,i)=>{ CAMPOS_ES.push(['sec['+i+'].heading_es',s.heading_es]); CAMPOS_ES.push(['sec['+i+'].content_es',s.content_es]); });
g.verdictProsCons.forEach(v=>{ CAMPOS_ES.push([v.name+'.pros_es',(v.pros_es||[]).join(' | ')]); CAMPOS_ES.push([v.name+'.cons_es',(v.cons_es||[]).join(' | ')]); });

const tier = [];
CAMPOS_ES.forEach(([campo,txt])=>{
  if(!txt) return;
  const m = txt.match(/\btier\b/gi);
  if(m) tier.push(campo+' x'+m.length);
});
console.log('"tier" restante: ' + (tier.length? tier.join(', ') : 'ninguno'));

// validos que se mantienen
const validos = [];
CAMPOS_ES.forEach(([campo,txt])=>{
  if(!txt) return;
  const m = txt.match(/\b(pack|packs|bundle|setup|gear)\b/gi);
  if(m) validos.push(campo+': '+[...new Set(m.map(x=>x.toLowerCase()))].join(','));
});
console.log('\nanglicismos que se mantienen (validos en contexto):');
validos.forEach(v=>console.log('  ' + v));

const s = JSON.stringify(g);
const cjk = (s.match(/[\u4e00-\u9fff]/g)||[]);
console.log('\nCJK: ' + (cjk.length ? [...new Set(cjk)].join('') : 'ninguno'));
const cjkW = (s.match(/[一-鿿]/g)||[]);
console.log('CJK amplo: ' + (cjkW.length ? 'SI' : 'no'));