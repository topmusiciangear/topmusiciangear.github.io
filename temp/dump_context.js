const d = require('../data/guides.json');
const out = [];
d.forEach(g => {
  const vp = g.verdictProsCons || [];
  vp.forEach(p => {
    const n = (p.cons && p.cons.length) || 0;
    if (n < 4) {
      out.push('### GUIDE: ' + g.id + '  [' + g.category + ']');
      out.push('TITLE: ' + (g.titleTag || g.title));
      out.push('PRODUCT: ' + p.name + '  (name_es: ' + (p.name_es || '') + ')');
      p.pros.forEach((x, i) => out.push('  PROS[' + i + '] EN: ' + x));
      (p.pros_es || []).forEach((x, i) => out.push('  PROS[' + i + '] ES: ' + x));
      p.cons.forEach((x, i) => out.push('  CONS[' + i + '] EN: ' + x));
      (p.cons_es || []).forEach((x, i) => out.push('  CONS[' + i + '] ES: ' + x));
      out.push('');
    }
  });
});
require('fs').writeFileSync('temp/cons_context.txt', out.join('\n'), 'utf8');
console.log('lines:', out.length);

const faqOut = [];
d.forEach(g => {
  if (g.faq && g.faq.length >= 1 && g.faq.length < 4) {
    faqOut.push('### GUIDE: ' + g.id);
    g.faq.forEach((f, i) => {
      faqOut.push('FAQ[' + i + '] q: ' + f.q);
      faqOut.push('FAQ[' + i + '] q_es: ' + f.q_es);
      faqOut.push('FAQ[' + i + '] a: ' + f.a);
      faqOut.push('FAQ[' + i + '] a_es: ' + f.a_es);
    });
    faqOut.push('');
  }
});
require('fs').writeFileSync('temp/faq_context.txt', faqOut.join('\n'), 'utf8');
console.log('faq lines:', faqOut.length);