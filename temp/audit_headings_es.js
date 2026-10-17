const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));

// Encabezados ES con Title Case: varias palabras seguidas en mayuscula inicial
const ACRO = /^[A-Z0-9&]{1,5}(\+|-|\d)*$/;
function calc(txt) {
  const palabras = String(txt || '').replace(/<[^>]+>/g, ' ').split(/[\s\-–—:,\/]+/).filter(Boolean);
  let racha = 0, maxRacha = 0;
  palabras.forEach((p, i) => {
    const c = p.replace(/^[¿¡"'(\[*]/, '');
    if (!c) return;
    const esSigla = ACRO.test(c);
    const empiezaMayus = /^[A-ZÁÉÍÓÚÑ]/.test(c);
    // solo cuenta a partir de la 2a palabra (la 1a inicializa la frase)
    if (i > 0 && !esSigla && empiezaMayus) { racha++; maxRacha = Math.max(maxRacha, racha); }
    else racha = 0;
  });
  return maxRacha;
}

const sospechosos = [];
guides.forEach(g => {
  (g.sections || []).forEach((s, i) => {
    if (!s.heading_es) return;
    if (calc(s.heading_es) >= 3) sospechosos.push({ guia: g.id, i, tipo: 'heading_es', txt: s.heading_es });
  });
  (g.faq || []).forEach((f, i) => {
    if (f.q_es && calc(f.q_es) >= 3) sospechosos.push({ guia: g.id, i, tipo: 'faq q_es', txt: f.q_es });
  });
});
console.log('encabezados/FAQ ES con >=3 palabras seguidas capitalizadas: ' + sospechosos.length + '\n');
sospechosos.forEach(x => console.log(x.guia + ' [' + x.tipo + '] ' + x.txt.slice(0, 120)));