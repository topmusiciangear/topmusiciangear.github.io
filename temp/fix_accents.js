const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const gj = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gj, 'utf8'));

let totalFixes = 0;

// Global accent fixes (singular only, not plurales)
const accentFixes = [
  { from: /funcion(?!es|ó)/g, to: 'función', name: 'funcion→función' },
  { from: /opcion(?!es|ó)/g, to: 'opción', name: 'opcion→opción' },
  { from: /configuracion(?!es|ó)/g, to: 'configuración', name: 'configuracion→configuración' },
  { from: /grabacion(?!es|ó)/g, to: 'grabación', name: 'grabacion→grabación' },
  { from: /seleccion(?!es|ó)/g, to: 'selección', name: 'seleccion→selección' },
  { from: /condicion(?!es|ó)/g, to: 'condición', name: 'condicion→condición' },
  { from: /conexion(?!es|ó)/g, to: 'conexión', name: 'conexion→conexión' },
  { from: /razon(?!es|ó)/g, to: 'razón', name: 'razon→razón' },
  { from: /solucion(?!es|ó)/g, to: 'solución', name: 'solucion→solución' },
  { from: /aplicacion(?!es|ó)/g, to: 'aplicación', name: 'aplicacion→aplicación' },
  { from: /descripcion(?!es|ó)/g, to: 'descripción', name: 'descripcion→descripción' },
  { from: /microfono(?!s|ó)/g, to: 'micrófono', name: 'microfono→micrófono' },
  { from: /cancelacion(?!es|ó)/g, to: 'cancelación', name: 'cancelacion→cancelación' },
  { from: /informacion(?!es|ó)/g, to: 'información', name: 'informacion→información' },
];

function applyFixes(text) {
  let fixed = text;
  accentFixes.forEach(f => {
    fixed = fixed.replace(f.from, f.to);
  });
  // Additional accent fixes
  fixed = fixed.replace(/terminos de/g, 'términos de');
  fixed = fixed.replace(/comparacion con/g, 'comparación con');
  fixed = fixed.replace(/senala/g, 'señala');
  return fixed;
}

guides.forEach(g => {
  // Fix sections
  (g.sections || []).forEach(s => {
    if (s.content_es) s.content_es = applyFixes(s.content_es);
    if (s.heading_es) s.heading_es = applyFixes(s.heading_es);
  });
  // Fix intro, verdict, conclusion
  if (g.intro_es) g.intro_es = applyFixes(g.intro_es);
  if (g.verdict_es) g.verdict_es = applyFixes(g.verdict_es);
  if (g.conclusion_es) g.conclusion_es = applyFixes(g.conclusion_es);
  // Fix pros/cons
  (g.verdictProsCons || []).forEach(v => {
    v.pros_es = v.pros_es.map(applyFixes);
    v.cons_es = v.cons_es.map(applyFixes);
  });
  // Fix productTable rows
  if (g.productTable && g.productTable.rows) {
    g.productTable.rows.forEach(r => {
      if (r.label_es) r.label_es = applyFixes(r.label_es);
      if (r.values) r.values.forEach(v => {
        if (v.value_es) v.value_es = applyFixes(v.value_es);
      });
    });
  }
});

fs.writeFileSync(gj, JSON.stringify(guides, null, 2));
console.log('Acentos corregidos en todo el corpus');