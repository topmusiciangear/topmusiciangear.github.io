const fs = require('fs');
const f = 'C:/Users/Daniel/projects/topmusiciangear/temp/add_faqs.js';
let s = fs.readFileSync(f, 'utf8');
const block = `
// j48-vs-rndi: faltaban los ES de Q1 y Q2
const g = guides.find(x => x.id === 'j48-vs-rndi');
const f = g.featuredSnippet;
if (!f.faq_q1_es) { f.faq_q1_es = '\u00bfCu\u00e1l es mejor para bajo en directo, el Radial J48 o el Rupert Neve RNDI?'; console.log('j48-vs-rndi: Q1 ES rellenado'); }
if (!f.faq_q2_es) { f.faq_q2_es = '\u00bfCu\u00e1l es la diferencia entre el Radial J48 y el Rupert Neve RNDI?'; console.log('j48-vs-rndi: Q2 ES rellenado'); }
`;
if (!s.includes(block)) { console.log('!! no encuentro el bloque final'); process.exit(1); }
s = s.replace(block, '\n');
// insertarlo justo antes del bucle principal
const anchor = `let total = 0;
Object.keys(NEW).forEach(gid => {`;
const pre = `// rellenar primero los ES que faltan en guias antiguas
guides.forEach(g => {
  const fq = g.featuredSnippet;
  if (!fq) return;
  for (let i = 1; i <= 8; i++) {
    if (fq['faq_q' + i + '_en'] && !fq['faq_q' + i + '_es']) {
      fq['faq_q' + i + '_es'] = fq['faq_q' + i + '_en'];
      console.log(g.id + ': Q' + i + ' ES rellenado (traducir)');
    }
  }
});

let total = 0;
Object.keys(NEW).forEach(gid => {`;
s = s.replace(anchor, pre);
// y poner las traducciones correctas de j48 despues
const post = `
// traducciones ES propias de j48-vs-rndi (las demas son calcadas, avisar)
const gj48 = guides.find(x => x.id === 'j48-vs-rndi');
gj48.featuredSnippet.faq_q1_es = '\u00bfCu\u00e1l es mejor para bajo en directo, el Radial J48 o el Rupert Neve RNDI?';
gj48.featuredSnippet.faq_q2_es = '\u00bfCu\u00e1l es la diferencia entre el Radial J48 y el Rupert Neve RNDI?';
console.log('j48-vs-rndi: Q1/Q2 ES con traduccion propia');
`;
s = s.replace(`fs.writeFileSync(gj, JSON.stringify(guides, null, 2));
console.log('\\nFAQS OK');`, post + `fs.writeFileSync(gj, JSON.stringify(guides, null, 2));
console.log('\\nFAQS OK');`);
fs.writeFileSync(f, s, 'utf8');
console.log('reordenado: ' + (s.includes('rellenar primero los ES') ? 'ok' : 'NO'));