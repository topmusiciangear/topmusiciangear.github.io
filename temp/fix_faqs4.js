const fs = require('fs');
const f = 'C:/Users/Daniel/projects/topmusiciangear/temp/add_faqs.js';
let s = fs.readFileSync(f, 'utf8');
// soporte para guias con 2 o 3 FAQs: calcular el hueco libre real
s = s.replace(
  `  let n = [1,2,3,4,5,6,7,8].filter(i => f['faq_q' + i + '_en']).length;
  if (n < 4) die(gid + ' solo tiene ' + n + ' FAQs');`,
  `  const usados = [];
  for (let i = 1; i <= 8; i++) if (f['faq_q' + i + '_en']) usados.push(i);
  let n = usados.length;
  if (n < 2) die(gid + ' solo tiene ' + n + ' FAQs');
  const huecos = [1,2,3,4,5,6,7,8].filter(i => usados.indexOf(i) === -1);
  if (NEW[gid].length > huecos.length) die(gid + ' no caben: ' + NEW[gid].length + ' > ' + huecos.length);`
);
s = s.replace(
  `    n++;
    f['faq_q' + n + '_en'] = q; f['faq_q' + n + '_es'] = qe;
    f['faq_a' + n + '_en'] = a; f['faq_a' + n + '_es'] = ae;`,
  `    const idx = huecos.shift();
    f['faq_q' + idx + '_en'] = q; f['faq_q' + idx + '_es'] = qe;
    f['faq_a' + idx + '_en'] = a; f['faq_a' + idx + '_es'] = ae;`
);
fs.writeFileSync(f, s, 'utf8');
console.log('soporte de huecos: ' + (s.includes('const huecos') ? 'ok' : 'NO'));
console.log('sintaxis:');