// La frase ES que acabo de escribir tiene dos anglicismos: "tier" y "que quepan".
// Arreglar a espanol natural.
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const gf = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gf, 'utf8'));
const g = guides.find(x => x.id === 'starter-studio');
const sec = g.sections.find(s => /Three Budgets/.test(s.heading));

console.log('ANTES ES:');
console.log('  ' + sec.content_es.split('</p>')[1].replace(/<[^>]+>/g,'').trim());

sec.content_es = sec.content_es.replace(
  'Cada pieza es el modelo de entrada de su categoría, y que cinco quepan por menos de quinientos dólares es lo único que permite que este tier llegue a la cifra sin recortar el tratamiento acústico.',
  'Cada pieza es el modelo de entrada de su categoría, y conseguir que cinco quepan por menos de quinientos dólares es lo único que permite que este nivel llegue a la cifra sin recortar el tratamiento acústico.'
);
// "tier" tambien aparece en las otras frases de la seccion
sec.content_es = sec.content_es.split('este tier').join('este nivel');
sec.content_es = sec.content_es.split('el tier que').join('el nivel que');

fs.writeFileSync(gf, JSON.stringify(guides, null, 2), 'utf8');

console.log('\nDESPUES ES:');
console.log('  ' + sec.content_es.split('</p>')[1].replace(/<[^>]+>/g,'').trim());

// ═══ VERIFICACION: barrido de anglicismos en toda la guia ES ═══
const CAMPOS_ES = [];
['intro_es','conclusion_es','title_es','description_es','titleTag_es'].forEach(c=>CAMPOS_ES.push([c,g[c]]));
g.sections.forEach((s,i)=>{ CAMPOS_ES.push(['sec['+i+'].heading_es',s.heading_es]); CAMPOS_ES.push(['sec['+i+'].content_es',s.content_es]); });
g.verdictProsCons.forEach(v=>{ CAMPOS_ES.push([v.name+'.pros_es',(v.pros_es||[]).join(' | ')]); CAMPOS_ES.push([v.name+'.cons_es',(v.cons_es||[]).join(' | ')]); });

// anglicismos que el sitio ya evita (regla: ES natural, nada de calcos)
const CALCOS = ['tier','setup','build','builds','gear','pack','packs','bundle','bundles','check','starter kit'];
const CON_PALABRAS = /\b(the|and|with|for|your|from|that|this|you|your)\b/gi;
const hallazgos = [];
CAMPOS_ES.forEach(([campo,txt])=>{
  if(!txt) return;
  CALCOS.forEach(w=>{
    const re = new RegExp('\\b'+w+'\\b','gi');
    const m = txt.match(re);
    if(m) hallazgos.push(campo+': "'+w+'" x'+m.length+'  ->  ...'+txt.substr(Math.max(0,txt.toLowerCase().indexOf(w.toLowerCase())-50), 100).replace(/\s+/g,' ')+'...');
  });
  const en = (txt.match(CON_PALABRAS)||[]).length;
  if (en > 0) hallazgos.push(campo+': '+en+' palabras inglesas (the/and/with/for...)');
});

console.log('\n=== anglicismos y palabras inglesas en campos ES ===');
console.log(hallazgos.length ? '' : '  ninguno');
hallazgos.forEach(h=>console.log('  ' + h));
const cjk = (JSON.stringify(guides).match(/[\u4e00-\u9fff]/g)||[]);
console.log('\nCJK: ' + (cjk.length ? [...new Set(cjk)].join('') : 'ninguno'));