const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8'));

const problemas = [];

guides.forEach(g => {
  for (let i = 1; i <= 6; i++) {
    const q = g['faq_q' + i];
    const a = g['faq_a' + i];
    const qEs = g['faq_q' + i + '_es'];
    const aEs = g['faq_a' + i + '_es'];

    if (!q && !a && !qEs && !aEs) continue;

    // Check for "previolificador" in FAQs
    if (aEs && aEs.includes('previolificador')) {
      problemas.push({ guia: g.id, campo: 'faq_a' + i + '_es', texto: aEs.slice(0, 100), problema: 'previolificador' });
    }

    // Check for missing ES translation
    if (a && !aEs) {
      problemas.push({ guia: g.id, campo: 'faq_a' + i, texto: a.slice(0, 80), problema: 'Sin traducción ES' });
    }
    if (q && !qEs) {
      problemas.push({ guia: g.id, campo: 'faq_q' + i, texto: q.slice(0, 80), problema: 'Sin traducción ES (pregunta)' });
    }

    // Check for calcos in ES
    if (aEs) {
      if (aEs.includes('suena como ')) problemas.push({ guia: g.id, campo: 'faq_a' + i + '_es', texto: aEs.slice(0, 100), problema: 'Calco: suena como' });
      if (aEs.includes('punto justo')) problemas.push({ guia: g.id, campo: 'faq_a' + i + '_es', texto: aEs.slice(0, 100), problema: 'Calco: punto justo' });
      if (aEs.includes('es el mejor para ')) problemas.push({ guia: g.id, campo: 'faq_a' + i + '_es', texto: aEs.slice(0, 100), problema: 'Calco: es el mejor para' });
    }

    // Check for specs that might be wrong (SPL > 200dB)
    if (a && a.match(/(\d+)\s*dB\s*SPL/i)) {
      const m = a.match(/(\d+)\s*dB\s*SPL/i);
      if (parseInt(m[1]) > 200) problemas.push({ guia: g.id, campo: 'faq_a' + i, texto: a.slice(0, 100), problema: 'SPL > 200dB' });
    }
    if (aEs && aEs.match(/(\d+)\s*dB\s*SPL/i)) {
      const m = aEs.match(/(\d+)\s*dB\s*SPL/i);
      if (parseInt(m[1]) > 200) problemas.push({ guia: g.id, campo: 'faq_a' + i + '_es', texto: aEs.slice(0, 100), problema: 'SPL > 200dB' });
    }

    // Check for EN text in ES FAQs (common AI translation artifact)
    if (aEs && /[<>]strong|br|a |img |href/.test(aEs)) {
      problemas.push({ guia: g.id, campo: 'faq_a' + i + '_es', texto: aEs.slice(0, 120), problema: 'HTML tags in ES FAQ' });
    }
  }
});

console.log('Total FAQs problemas:', problemas.length);
problemas.forEach(p => {
  console.log('  ' + p.guia + ' [' + p.campo + '] ' + p.problema);
  console.log('    ' + p.texto.replace(/\n/g, ' ').slice(0, 120));
});