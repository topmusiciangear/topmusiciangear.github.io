const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8'));

console.log('=== REVISION FINAL: Calcos y traduccion artificial en TODO el corpus ===\n');

const patrones = [
  { regex: /previolificador/g, desc: 'previolificador (calco de preamp)' },
  { regex: /via Bluetooth/g, desc: 'via Bluetooth -> por Bluetooth' },
  { regex: /via USB/g, desc: 'via USB -> por USB' },
  { regex: /suena como [aeiou]/g, desc: 'suena como -> suena a' },
  { regex: /punto justo/g, desc: 'punto justo -> punto ideal' },
  { regex: /es el mejor para /g, desc: 'es el mejor para -> es ideal para' },
  { regex: /lo que hace que /g, desc: 'lo que hace que -> asi que' },
  { regex: /vale la pena/g, desc: 'vale la pena (calco, RAE acepta)' },
  { regex: /monitor-configuración/g, desc: 'monitor-configuracion (calco)' },
  { regex: /a un DAW/g, desc: 'a un DAW (calco, RAE acepta)' },
];

let total = 0;
const resultados = {};

guides.forEach(g => {
  const allText = [];
  (g.sections || []).forEach(s => {
    if (!s) return;
    if (s.content_es) allText.push({ campo: 'section', texto: s.content_es });
    if (s.heading_es) allText.push({ campo: 'heading', texto: s.heading_es });
  });
  if (g.intro_es) allText.push({ campo: 'intro', texto: g.intro_es });
  if (g.verdict_es) allText.push({ campo: 'verdict', texto: g.verdict_es });
  if (g.conclusion_es) allText.push({ campo: 'conclusion', texto: g.conclusion_es });
  (g.verdictProsCons || []).forEach(v => {
    if (!v) return;
    (v.pros_es || []).forEach(p => allText.push({ campo: 'pro', texto: p }));
    (v.cons_es || []).forEach(c => allText.push({ campo: 'con', texto: c }));
  });
  for (let i = 1; i <= 6; i++) {
    if (g['faq_a' + i + '_es']) allText.push({ campo: 'faq_a' + i + '_es', texto: g['faq_a' + i + '_es'] });
    if (g['faq_q' + i + '_es']) allText.push({ campo: 'faq_q' + i + '_es', texto: g['faq_q' + i + '_es'] });
  }
  if (g.productTable && g.productTable.rows) {
    g.productTable.rows.forEach(r => {
      if (r.values) r.values.forEach(v => {
        if (v.value_es) allText.push({ campo: 'table', texto: v.value_es });
      });
    });
  }

  allText.forEach(item => {
    if (!item.texto) return;
    patrones.forEach(p => {
      if (p.regex.test(item.texto)) {
        total++;
        if (!resultados[p.desc]) resultados[p.desc] = [];
        resultados[p.desc].push({ guia: g.id, campo: item.campo, match: item.texto.match(p.regex)[0] });
      }
    });
  });
});

console.log('Total hallazgos:', total);
console.log('');
Object.keys(resultados).sort().forEach(desc => {
  console.log('--- ' + desc + ' (' + resultados[desc].length + ') ---');
  resultados[desc].slice(0, 3).forEach(r => console.log('  ' + r.guia + ' [' + r.campo + ']'));
  if (resultados[desc].length > 3) console.log('  ... y ' + (resultados[desc].length - 3) + ' mas');
  console.log('');
});