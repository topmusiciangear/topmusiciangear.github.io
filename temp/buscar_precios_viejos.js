const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const s = g.find(x => x.id === 'starter-studio');
const re = /\$998|\$1\.077|\$1,077|\$2\.537|\$2,537|\$900|\$1\.357|\$1,357|\$2\.797/g;

console.log('=== donden quedan los precios viejos ===');
s.sections.forEach((sec, i) => {
  [['content', sec.content], ['content_es', sec.content_es]].forEach(([k, v]) => {
    if (!v) return;
    const m = v.match(re);
    if (m) console.log('  seccion [' + i + '] "' + sec.heading.slice(0, 50) + '" (' + k + '): ' + m.join(', '));
  });
});
[['', s.faq], ['intro', s.intro], ['intro_es', s.intro_es]].forEach(([k, v]) => {
  if (typeof v === 'string' && v.match(re)) console.log('  ' + k + ': ' + v.match(re).join(', '));
});
console.log('\n  claves de la guia: ' + Object.keys(s).join(', '));

console.log('\n=== contexto de cada mencion vieja ===');
const buscar = (txt, donde) => {
  if (typeof txt !== 'string') return;
  [...txt.matchAll(/[^.]{0,150}(?:\$998|\$1\.077|\$1,077|\$2\.537|\$2,537)[^.]{0,150}\./g)]
    .forEach(m => console.log('  [' + donde + '] ...' + m[0].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() + '...'));
};
s.sections.forEach((sec, i) => { buscar(sec.content, 'EN s' + i); buscar(sec.content_es, 'ES s' + i); });
buscar(s.intro, 'intro'); buscar(s.intro_es, 'intro_es');
if (s.faq) (Array.isArray(s.faq) ? s.faq : []).forEach((f, i) => { buscar(f.a || f.q || '', 'faq' + i); buscar(f.a_es || '', 'faq_es' + i); });
