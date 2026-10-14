const fs = require('fs');
const guides = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const g = guides.find(x => x.id === 'best-instrument-mics');
let bad = 0;
g.sections.filter(s => (s.products || []).length === 1).forEach(s => {
  const en = s.content || '', es = s.content_es || '';
  const probs = [];
  if (!es) probs.push('sin ES');
  if (/[\u4e00-\u9fff]/.test(en + es)) probs.push('CJK');
  if (/[a-záéíóúñ]+'(s|re|ve|ll|d)\s/.test(es)) probs.push('apostrofe EN en ES');
  const parEN = (en.match(/<p>/g) || []).length, parES = (es.match(/<p>/g) || []).length;
  if (parEN !== parES) probs.push('parrafos ' + parEN + '/' + parES);
  if (probs.length) { bad++; console.log('X ' + s.heading + ' :: ' + probs.join(', ')); }
});
console.log('reviews con problemas: ' + bad);
const hs = g.sections.map(s => s.heading);
console.log('headings duplicados: ' + (hs.length - new Set(hs).size));
console.log('secciones: ' + g.sections.length + ' | reviews: ' + g.sections.filter(s => (s.products || []).length === 1).length);
console.log('\nheadings:');
g.sections.filter(s => (s.products || []).length === 1).forEach(s => console.log('  - ' + s.heading));
// buscar frases raras
const all = g.sections.map(s => s.content_es || '').join(' ');
['eslandmark', 'esHn', 'Subject', 'casos más ruidosos', 'los monitores y las pantallas'].forEach(w => {
  if (all.includes(w)) console.log('!! queda: ' + w);
});
const m = /En batería[^<.]*/.exec(all);
console.log('frase bateria ES: ' + (m ? m[0] : '-'));