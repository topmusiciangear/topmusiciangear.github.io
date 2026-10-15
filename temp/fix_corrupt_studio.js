// Barrido de texto corrupto en los campos de texto de la guia (no codigo).
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const gf = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gf, 'utf8'));
const g = guides.find(x => x.id === 'starter-studio');

// ═══ 1) correcciones conocidas ═══
const FIX = [
  ['Las pajas son prácticas', 'Las pajas son prácticas'],       // ya ok
  ['valores de la categoría de la línea: leader de su categoría', 'valores de líder de su categoría'],
  ['necesitas', 'necesitas'],
  ['Necesitas colocación cercana', 'Necesita colocación cercana'],
  ['|leader de su categoría', '| líder de su categoría']
];
let n = 0;
const aplicar = txt => {
  if (!txt) return txt;
  let r = txt;
  FIX.forEach(([a,b])=>{ if (r.indexOf(a)>-1 && a!==b) { r = r.split(a).join(b); n++; } });
  return r;
};
['intro','intro_es','conclusion','conclusion_es','title','title_es','titleTag','titleTag_es','description','description_es']
  .forEach(c=>{ if(g[c]) g[c] = aplicar(g[c]); });
g.sections.forEach(s=>{ ['content','content_es','heading','heading_es'].forEach(c=>{ if(s[c]) s[c]=aplicar(s[c]); }); });
g.verdictProsCons.forEach(v=>{
  ['pros','cons','pros_es','cons_es'].forEach(k=>{
    if(Array.isArray(v[k])) v[k]=v[k].map(aplicar);
  });
});
console.log('correcciones aplicadas: ' + n);

// ═══ 2) escaner de corrupcion en los campos de texto ═══
const CAMPOS = [];
['title','title_es','titleTag','titleTag_es','intro','intro_es','conclusion','conclusion_es','description','description_es'].forEach(c=>CAMPOS.push([c,g[c]]));
g.sections.forEach((s,i)=>{ CAMPOS.push(['sec['+i+'].heading',s.heading]); CAMPOS.push(['sec['+i+'].content',s.content]); CAMPOS.push(['sec['+i+'].heading_es',s.heading_es]); CAMPOS.push(['sec['+i+'].content_es',s.content_es]); });
g.verdictProsCons.forEach(v=>{
  ['pros','cons','pros_es','cons_es'].forEach(k=>{
    (v[k]||[]).forEach((t,j)=>CAMPOS.push([v.name+'.'+k+'['+j+']',t]));
  });
});

const CJK = /[\u4e00-\u9fff\u3040-\u30ff]/g;
const PUNTO = /[a-záéíóúñ];[a-záéíóúñ]/g;
const SUELTA = /[a-záéíóúñ][A-ZÁÉÍÓÚÑ][a-záéíóúñ]{2,}/g;

const problemas = [];
CAMPOS.forEach(([campo,txt])=>{
  if(!txt) return;
  const c = txt.match(CJK); if(c) problemas.push(campo+' CJK: '+[...new Set(c)].join(''));
  const p = txt.match(PUNTO); if(p) problemas.push(campo+' puntoycoma: '+p.join(','));
  const u = txt.match(SUELTA); if(u) problemas.push(campo+' pegada: '+[...new Set(u)].join(','));
});
console.log('\n=== problemas de corrupcion: ' + problemas.length + ' ===');
problemas.forEach(p=>console.log('  ' + p));

fs.writeFileSync(gf, JSON.stringify(guides, null, 2), 'utf8');
console.log('\nguides.json escrito');