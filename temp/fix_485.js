const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const gf = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gf, 'utf8'));
const g = guides.find(x => x.id === 'starter-studio');

// 1) la seccion tiene $426 -> $485
const sec = g.sections.find(s => /Three Budgets/.test(s.heading));
if (sec) {
  sec.content = sec.content.split('$426').join('$485');
  sec.content_es = sec.content_es.split('$426').join('$485');
  console.log('seccion actualizada a $485');
}

// 2) espacios antes de coma: puede haber HTML en medio, p.ej. "$485</strong>, the middle"
const fixEspacios = s => {
  if (!s) return s;
  // elimina espacio en blanco entre un digito (o cierre de etiqueta) y , . ; :
  return s
    .replace(/(\d)(\s+)([,.;:])/g, '$1$3')
    .replace(/(<\/[a-z]+>)(\s+)([,.;:])/gi, '$1$3')
    .replace(/(\$)([.,])/g, '$1$2');
};
const CAMPOS = ['intro','intro_es','conclusion','conclusion_es','description','description_es'];
CAMPOS.forEach(c => { if (g[c]) g[c] = fixEspacios(g[c]); });
g.sections.forEach(s => { s.content = fixEspacios(s.content); s.content_es = fixEspacios(s.content_es); s.heading = fixEspacios(s.heading); s.heading_es = fixEspacios(s.heading_es); });
g.verdictProsCons.forEach(v => {
  ['pros','cons','pros_es','cons_es'].forEach(k => {
    if (Array.isArray(v[k])) v[k] = v[k].map(x => fixEspacios(x));
  });
});

fs.writeFileSync(gf, JSON.stringify(guides, null, 2), 'utf8');

// ── verificacion ──
const clean = h => String(h).replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
console.log('\n--- INTRO EN ---\n' + clean(g.intro));
console.log('\n--- INTRO ES ---\n' + clean(g.intro_es));
const s = JSON.stringify(g);
const conEspacio = (s.match(/[\d$]\s+[,.;:]/g)||[]);
console.log('\nprecios/numeros con espacio antes de puntuacion: ' + conEspacio.length);
[...new Set(conEspacio)].slice(0,8).forEach(x=>console.log('  "'+x+'"'));
const p426 = (s.match(/\$426/g)||[]).length;
console.log('restos de $426: ' + p426);
const p485 = (s.match(/\$485/g)||[]).length;
console.log('apariciones de $485: ' + p485);
const cjk = (s.match(/[\u4e00-\u9fff]/g)||[]);
console.log('CJK: ' + (cjk.length ? [...new Set(cjk)].join('') : 'ninguno'));