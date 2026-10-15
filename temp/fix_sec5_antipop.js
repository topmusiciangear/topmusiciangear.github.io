const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const s = g.find(x => x.id === 'starter-studio');
const log = [];

// La seccion [5] (TLM 102) era la que decia de verdad "el filtro Aston de $49 que importa en los niveles bajos".
// El filtro Aston es la mejora OPCIONAL de la seccion [9], no parte de los niveles 1 y 2.
const cambios = [
  [5, 'content',
   'It also has an integrated pop screen, which means the $49 Aston filter that matters in the lower tiers stops being necessary here.',
   'It also has an integrated pop screen, which means the $49 Aston filter sold as an optional upgrade further down this guide stops being necessary here.'],
  [5, 'content_es',
   'Además lleva un antipop integrado, así que el filtro Aston de $49 que importa en los niveles bajos deja de ser necesario aquí.',
   'Además lleva un antipop integrado, así que el filtro Aston de $49 que más abajo de esta guía se ofrece como mejora opcional deja de ser necesario aquí.']
];
cambios.forEach(([i, k, de, a]) => {
  const sec = s.sections[i];
  if (!sec[k].includes(de)) { log.push('  FALLA sec[' + i + '].' + k); return; }
  sec[k] = sec[k].split(de).join(a);
  log.push('  ok    sec[' + i + '].' + k);
});

fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log(log.join('\n'));

const s2 = JSON.parse(fs.readFileSync(F, 'utf8')).find(x => x.id === 'starter-studio');
const txt = JSON.stringify(s2);
console.log('\n=== CONTROL ===');
console.log('  "matters in the lower tiers" / "importa en los niveles bajos": ' +
  (txt.match(/matters in the lower tiers|importa en los niveles bajos/g) || []).length + ' (debe ser 0)');
console.log('  "mejora opcional" / "optional upgrade": ' +
  (txt.match(/optional upgrade|mejora opcional/g) || []).length);
console.log('  quedan $49: ' + (txt.match(/\$49/g) || []).length + '  (el Aston sigue costando $49, correcto)');

console.log('\n=== seccion [5] · frase del antipop ===');
const p5 = s2.sections[5].content.match(/It also has an integrated pop screen[^<]*/);
console.log('  EN: ' + (p5 ? p5[0] : '(no encontrada)'));
const p5es = s2.sections[5].content_es.match(/Además lleva un antipop integrado[^<]*/);
console.log('  ES: ' + (p5es ? p5es[0] : '(no encontrada)'));

console.log('\n=== seccion [7] · ultimo parrafo ===');
const par = s2.sections[7].content.split('</p><p>').pop().replace(/<\/p>$/, '');
console.log('  EN: ' + par.replace(/<[^>]+>/g, '').trim());
const parEs = s2.sections[7].content_es.split('</p><p>').pop().replace(/<\/p>$/, '');
console.log('\n  ES: ' + parEs.replace(/<[^>]+>/g, '').trim());

console.log('\n=== seccion [1] · parrafos de los presupuestos ===');
const p1 = s2.sections[1].content.split('</p><p>');
p1[1].forEach(x => console.log('  EN: ' + x.replace(/<[^>]+>/g, '').trim().slice(0, 200)));
console.log('');
const p1es = s2.sections[1].content_es.split('</p><p>');
p1es[1].forEach(x => console.log('  ES: ' + x.replace(/<[^>]+>/g, '').trim().slice(0, 200)));
