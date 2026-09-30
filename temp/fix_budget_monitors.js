// budget-monitors: drop over-budget intruders (IN-UNF 304, 8351B 331),
// complete table/verdicts/sections/FAQ/conclusion for IN-8 V2 + LP-UNF.
const fs = require('fs');
const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const g = G.find(x => x.id === 'budget-monitors');
const ref = G.find(x => x.id === 'best-monitors');
if (!g || !ref) throw new Error('missing guide');

g.sections[2].products = [117, 199, 307];
g.sections[3].products = [20];
g.sections[4].products = [19];

const V = (value, value_es) => ({ value, value_es });
g.productTable.columns.push(
  { title: 'Kali Audio IN-8 V2', title_es: 'Kali Audio IN-8 V2' },
  { title: 'Kali Audio LP-UNF', title_es: 'Kali Audio LP-UNF' }
);
const rows = {};
g.productTable.rows.forEach(r => { rows[r.label] = r; });
rows['Best For'].values.push(
  V('Full-range 3-way accuracy', 'Precisión de 3 vías de rango completo'),
  V('Compact desktop stereo pair', 'Par estéreo compacto de escritorio')
);
rows['Type'].values.push(
  V('3-way powered', 'Triamplificado de 3 vías'),
  V('2-way pair powered', 'Par amplificado de 2 vías')
);
rows['Woofer'].values.push(V('8"', '8"'), V('4.5"', '4,5"'));
rows['Tweeter'].values.push(
  V('1" (coaxial)', '1" (coaxial)'),
  V('1" textile dome', 'Cúpula de tela de 1"')
);
rows['Power'].values.push(
  V('140W (60W + 40W + 40W)', '140W (60W + 40W + 40W)'),
  V('160W (2 x 40W + 2 x 40W)', '160W (2 x 40W + 2 x 40W)')
);
rows['Frequency Response'].values.push(
  V('45 Hz – 21 kHz (±3 dB)', '45 Hz – 21 kHz (±3 dB)'),
  V('54 Hz – 21 kHz (±3 dB)', '54 Hz – 21 kHz (±3 dB)')
);
rows['Max SPL'].values.push(V('117 dB', '117 dB'), V('103 dB', '103 dB'));
rows['Dimensions'].values.push(
  V('17.75 x 10 x 11.25 in', '45,1 x 25,4 x 28,5 cm'),
  V('10 x 6.5 x 7.4 in (each)', '25,4 x 16,4 x 18,6 cm (cada uno)')
);

['Kali Audio IN-8 V2', 'Kali Audio LP-UNF'].forEach(n => {
  const src = ref.verdictProsCons.find(v => v.name === n);
  g.verdictProsCons.push(JSON.parse(JSON.stringify(src)));
});

// detail sections: reuse product-focused copy from best-monitors
const secIn8 = ref.sections.find(s => (s.products || [])[0] === 199 && s.heading.includes('IN-8 V2'));
const secLpunf = ref.sections.find(s => (s.products || [])[0] === 307);
g.sections.push(JSON.parse(JSON.stringify(secIn8)), JSON.parse(JSON.stringify(secLpunf)));

// FAQ q6/q7 from best-monitors faq entries
const fIn8 = ref.faq.find(f => f.q.includes('IN-8 V2'));
const fLp = ref.faq.find(f => f.q.includes('LP-UNF'));
Object.assign(g.featuredSnippet, {
  faq_q6_en: fIn8.q, faq_a6_en: fIn8.a, faq_q6_es: fIn8.q_es, faq_a6_es: fIn8.a_es,
  faq_q7_en: fLp.q, faq_a7_en: fLp.a, faq_q7_es: fLp.q_es, faq_a7_es: fLp.a_es,
});

g.verdict += ' Kali IN-8 V2 is the 3-way stretch goal that stays under $500 each. Kali LP-UNF is the compact desk pair for small rooms.';
g.verdict_es += ' El Kali IN-8 V2 es la meta de 3 vías que no pasa de $500 la unidad. El Kali LP-UNF es el par compacto de escritorio para salas pequeñas.';
g.conclusion = g.conclusion
  .replace('Four monitors, four price points', 'Need real 3-way accuracy without crossing $500 each? The Kali IN-8 V2 coaxial point source gets you there. Mixing on a small apartment desk? The Kali LP-UNF pair fits the space and the budget. Six monitors, six price points');
g.conclusion_es = g.conclusion_es
  .replace('Cuatro monitores, cuatro niveles de precio', '¿Necesitas precisión real de 3 vías sin pasar de $500 por unidad? La fuente puntual coaxial del Kali IN-8 V2 te lleva hasta ahí. ¿Mezclas en el escritorio de un apartamento pequeño? El par Kali LP-UNF cabe en el espacio y en el presupuesto. Seis monitores, seis niveles de precio');

fs.writeFileSync('data/guides.json', JSON.stringify(G, null, 2));
const gg = JSON.parse(fs.readFileSync('data/guides.json', 'utf8')).find(x => x.id === 'budget-monitors');
const union = [...new Set(gg.sections.flatMap(s => s.products))];
console.log('cards: ' + union.join(','));
console.log('cols=' + gg.productTable.columns.length + ' verdict=' + gg.verdictProsCons.length + ' sections=' + gg.sections.length);
console.log('rows ok: ' + gg.productTable.rows.every(r => r.values.length === 6));
