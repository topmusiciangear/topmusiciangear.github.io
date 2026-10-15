const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const gf = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gf, 'utf8'));
const g = guides.find(x => x.id === 'starter-studio');
const s = g.sections[3];

s.content_es = s.content_es.replace(
  'son lo que hace viable el tier barato',
  'son lo que hace viable el montaje barato'
);
fs.writeFileSync(gf, JSON.stringify(guides, null, 2), 'utf8');

const txt = s.content_es;
const m = txt.match(/\btier\b/gi);
console.log('"tier" en sec[3]: ' + (m ? m.length : 0));

// barrido final
const CAMPOS_ES = [];
['intro_es','conclusion_es','title_es','description_es','titleTag_es'].forEach(c=>CAMPOS_ES.push([c,g[c]]));
g.sections.forEach((x,i)=>{ CAMPOS_ES.push(['sec['+i+'].heading_es',x.heading_es]); CAMPOS_ES.push(['sec['+i+'].content_es',x.content_es]); });
g.verdictProsCons.forEach(v=>{ CAMPOS_ES.push([v.name+'.pros_es',(v.pros_es||[]).join(' | ')]); CAMPOS_ES.push([v.name+'.cons_es',(v.cons_es||[]).join(' | ')]); });
let tier = 0;
CAMPOS_ES.forEach(([campo,txt2])=>{ if(txt2 && /\btier\b/i.test(txt2)) { tier++; console.log('  !! tier en ' + campo); } });
console.log('"tier" en toda la guia ES: ' + tier);

// texto final de la seccion 3 en espanol
const clean = h => String(h).replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
console.log('\n--- sec[3] ES ---\n' + clean(s.content_es));
const cjk = (JSON.stringify(guides).match(/[一-鿿]/g)||[]);
console.log('\nCJK: ' + (cjk.length ? [...new Set(cjk)].join('') : 'ninguno'));