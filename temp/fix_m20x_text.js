// 1) La seccion ya no puede decir "no tiene auriculares" ni "cubre la cadena y nada mas"
// 2) Arreglar el espacio que quedo antes de la coma tras sustituir $426
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const gf = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gf, 'utf8'));
const g = guides.find(x => x.id === 'starter-studio');

// ── seccion "The Three Budgets" ──
const sec = g.sections.find(s => /Three Budgets/.test(s.heading));

// EN
sec.content = sec.content
  .replace('covers the chain and nothing else: a Scarlett 2i2 to capture, an SM57 to capture with, a stand so the mic is not in your hand, and four acoustic panels so the room stops lying to you. It has no headphones, which means you mix on the SM57\'s own character until you add them.',
           'covers the whole chain at the lowest sensible price: a Scarlett 2i2 to capture, an SM57 to capture with, a stand so the mic is not in your hand, ATH-M20x headphones so you are not mixing blind, and four acoustic panels so the room stops lying to you. Every part is the entry model in its category, which is the only way four of them fit under five hundred dollars.');
// ES
sec.content_es = sec.content_es
  .replace('cubre la cadena y nada más: una Scarlett 2i2 para capturar, un SM57 con el que capturar, un soporte para que el micro no esté en tu mano, y cuatro paneles acústicos para que la sala deje de mentirte. No tiene auriculares, así que mezclas con el carácter del propio SM57 hasta que los añadas.',
           'cubre toda la cadena al precio más bajo que tiene sentido: una Scarlett 2i2 para capturar, un SM57 con el que capturar, un soporte para que el micro no esté en tu mano, auriculares ATH-M20x para no mezclar a ciegas y cuatro paneles acústicos para que la sala deje de mentirte. Cada pieza es el modelo de entrada de su categoría, que es la única forma de que quepan cuatro por menos de quinientos dólares.');

// ── espacios sobrantes tras sustituir el precio ──
const fixSpaces = s => s ? s.replace(/(\$485|\$816|\$905)\s+([,.])/g, '$1$2') : s;
[g.intro, g.intro_es, g.conclusion, g.conclusion_es, g.description, g.description_es].forEach((k,i)=>{
  const campos = ['intro','intro_es','conclusion','conclusion_es','description','description_es'];
  g[campos[i]] = fixSpaces(g[campos[i]]);
});
sec.content = fixSpaces(sec.content);
sec.content_es = fixSpaces(sec.content_es);
g.sections.forEach(s2=>{ s2.content = fixSpaces(s2.content); s2.content_es = fixSpaces(s2.content_es); });

fs.writeFileSync(gf, JSON.stringify(guides, null, 2), 'utf8');

// ── verificacion ──
const clean = h => String(h).replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
console.log('--- SECCION EN ---');
console.log(clean(sec.content));
console.log('');
console.log('--- SECCION ES ---');
console.log(clean(sec.content_es));
console.log('');
console.log('--- INTRO EN ---');
console.log(clean(g.intro));
console.log('');
// espacios
const s = JSON.stringify(g);
const espacios = (s.match(/\$\d+[,.]/g)||[]).length;
const conEspacio = (s.match(/\$\d+\s+[,.]/g)||[]).length;
console.log('precios con coma/punto: ' + espacios + ' | con espacio antes: ' + conEspacio);
console.log('quedan "no tiene auriculares": ' + (s.indexOf('no tiene auriculares')>-1?'SI':'no'));
console.log('quedan "It has no headphones": ' + (s.indexOf('It has no headphones')>-1?'SI':'no'));
const cjk = (s.match(/[\u4e00-\u9fff]/g)||[]);
console.log('CJK: ' + (cjk.length ? [...new Set(cjk)].join('') : 'ninguno'));