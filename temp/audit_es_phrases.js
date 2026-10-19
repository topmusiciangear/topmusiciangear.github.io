const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));

const patrones = [
  { regex: /supera el presupuesto/gi, desc: 'supera el presupuesto' },
  { regex: /punto ideal/gi, desc: 'punto ideal' },
  { regex: /punto dulce/gi, desc: 'punto dulce' },
  { regex: /en el presupuesto/gi, desc: 'en el presupuesto' },
  { regex: /fuera de presupuesto/gi, desc: 'fuera de presupuesto' },
  { regex: /rompe el banco/gi, desc: 'rompe el banco' },
  { regex: /punto medio/gi, desc: 'punto medio' },
  { regex: /cambio de juego/gi, desc: 'cambio de juego' },
  { regex: /al siguiente nivel/gi, desc: 'al siguiente nivel' },
  { regex: /punto de inflexión/gi, desc: 'punto de inflexión' },
  { regex: /mejor elección/gi, desc: 'mejor elección' },
  { regex: /mejor opción/gi, desc: 'mejor opción' },
  { regex: /la mejor opción/gi, desc: 'la mejor opción' },
  { regex: /punto dulce/gi, desc: 'punto dulce' },
];

function auditarTexto(texto) {
  const hallazgos = [];
  for (const p of patrones) {
    const matches = texto.match(p.regex);
    if (matches) {
      matches.forEach(m => {
        hallazgos.push({ patron: p.desc, match: m.trim() });
      });
    }
  }
  return hallazgos;
}

function auditarGuia(g) {
  const resultados = [];
  const campos = [
    { valor: g.verdict_es, nombre: 'verdict_es' },
    { valor: g.conclusion_es, nombre: 'conclusion_es' },
    { valor: g.intro_es, nombre: 'intro_es' },
    { valor: g.metaDesc_es, nombre: 'metaDesc_es' },
  ];
  if (g.sections) {
    g.sections.forEach((s, i) => {
      campos.push({ valor: s.content_es, nombre: 'sections[' + i + '].content_es' });
      campos.push({ valor: s.heading_es, nombre: 'sections[' + i + '].heading_es' });
    });
  }
  if (g.faq) {
    g.faq.forEach((f, i) => {
      campos.push({ valor: f.q_es, nombre: 'faq[' + i + '].q_es' });
      campos.push({ valor: f.a_es, nombre: 'faq[' + i + '].a_es' });
    });
  }
  if (g.verdictProsCons) {
    g.verdictProsCons.forEach((v, i) => {
      campos.push({ valor: v.pros_es, nombre: 'verdictProsCons[' + i + '].pros_es' });
      campos.push({ valor: v.cons_es, nombre: 'verdictProsCons[' + i + '].cons_es' });
    });
  }

  campos.forEach(c => {
    if (c.valor && typeof c.valor === 'string') {
      const hallazgos = auditarTexto(c.valor);
      hallazgos.forEach(h => {
        console.log('  [' + g.id + '.' + c.nombre + '] ' + h.patron + ': "' + h.match + '"');
      });
    }
  });
}

function auditarProductos() {
  products.forEach(p => {
    const campos = [
      { valor: p.desc_es, nombre: 'desc_es' },
      { valor: p.title_es, nombre: 'title_es' },
    ];
    campos.forEach(c => {
      if (c.valor && typeof c.valor === 'string') {
        const hallazgos = auditarTexto(c.valor);
        hallazgos.forEach(h => {
          console.log('  [product:' + p.id + '.' + c.nombre + '] ' + h.patron + ': "' + h.match + '"');
        });
      }
    });
  });
}

console.log('=== AUDITORÍA DE FRASES EN ESPAÑOL ===\n');
guides.forEach(auditarGuia);
auditarProductos();
console.log('\nAuditoría completa.');