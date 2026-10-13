const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const g = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8')).find(x => x.id === 'usb-mics');

const esAll = [g.intro_es, g.conclusion_es, g.verdict_es, g.description_es]
  .concat(g.sections.map(s => s.content_es))
  .concat(g.productTable.rows.map(r => r.values.map(v => v.value_es).join(' ')))
  .concat(g.verdictProsCons.map(v => [].concat(v.pros_es || [], v.cons_es || []).join(' ')))
  .join(' ');

console.log('=== Cuentas de productos en texto ES (reglas del sitio) ===');
['cinco', 'seis', 'siete', 'ocho', 'nueve', 'diez', '10', 'n\u00ba'].forEach(w => {
  const m = esAll.match(new RegExp('\\b' + w + '\\b', 'gi'));
  if (m) {
    console.log('  "' + w + '": ' + m.length + ' ocurrencia(s)');
    let i = 0;
    esAll.replace(new RegExp('.{70}\\b' + w + '\\b.{70}', 'gi'), s => { console.log('      ...' + s + '...'); });
  }
});

const enAll = [g.intro, g.conclusion, g.verdict, g.description]
  .concat(g.sections.map(s => s.content)).join(' ');
console.log('\n=== Cuentas de productos en texto EN ===');
['Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'ten ', '10 '].forEach(w => {
  const m = enAll.match(new RegExp('\\b' + w.trim() + '\\b', 'g'));
  if (m) {
    console.log('  "' + w.trim() + '": ' + m.length);
    enAll.replace(new RegExp('.{70}\\b' + w.trim() + '\\b.{70}', 'g'), s => console.log('      ...' + s + '...'));
  }
});

console.log('\n=== TITLE / TAG ===');
console.log('  title    : ' + g.title);
console.log('  title_es : ' + g.title_es);
console.log('  tag      : ' + g.titleTag);
console.log('  tag_es   : ' + g.titleTag_es);

console.log('\n=== FAQ preguntas EN vs ES (deben estar emparejadas) ===');
const f = g.featuredSnippet;
[1, 2, 3, 4, 5].forEach(i => {
  console.log('  Q' + i + ' EN: ' + f['faq_q' + i + '_en']);
  console.log('  Q' + i + ' ES: ' + f['faq_q' + i + '_es']);
  const ae = f['faq_a' + i + '_en'] || '', as = f['faq_a' + i + '_es'] || '';
  const ne = (ae.match(/<strong>/g) || []).length, ns = (as.match(/<strong>/g) || []).length;
  console.log('      respuestas: EN ' + ae.length + ' chars / ' + ne + ' productos | ES ' + as.length + ' chars / ' + ns + ' productos' + (Math.abs(ne - ns) > 2 ? '   [!!] desalineadas' : ''));
});

console.log('\n=== Headings de seccion: unicos? ===');
const hs = g.sections.map(s => s.heading);
const dup = hs.filter((h, i) => hs.indexOf(h) !== i);
console.log('  duplicados EN: ' + (dup.length ? dup.join(', ') : 'ninguno'));
const hse = g.sections.map(s => s.heading_es);
console.log('  duplicados ES: ' + (hse.length !== new Set(hse).size ? 'SI' : 'ninguno'));