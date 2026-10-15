const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const guia = g.find(x => x.id === 'best-monitors-for-small-rooms');

console.log('=== ESTRUCTURA DE UN VEREDICTO ===\n');
console.log(JSON.stringify(guia.verdictProsCons[11], null, 1));

console.log('\n\n=== ESTRUCTURA DE UNA SECCION (la del Rokit 5) ===\n');
const s = guia.sections.find(x => (x.products || []).includes(633));
console.log('claves: ' + Object.keys(s).join(', '));
console.log(JSON.stringify(s, null, 1).slice(0, 1400));

console.log('\n\n=== VALORES COMPLETOS DE LA COLUMNA 11 (Rokit 5 G5) ===\n');
guia.productTable.rows.forEach(r => {
  const v = r.values[11] || {};
  console.log('  ' + (r.label_es || r.label).padEnd(22) + '| EN: ' + (v.value || '-'));
  console.log('  ' + ' '.repeat(22) + '| ES: ' + (v.value_es || '-'));
});

console.log('\n\n=== COLUMNA 0 (JBL 305P) para no repetir ===\n');
guia.productTable.rows.forEach(r => {
  const v = r.values[0] || {};
  console.log('  ' + (r.label_es || r.label).padEnd(22) + v.value_es);
});

console.log('\n\n=== INTRO / CONCLUSION / FAQ: mencionan el numero de productos? ===\n');
['intro', 'intro_es', 'conclusion', 'conclusion_es', 'description', 'description_es'].forEach(k => {
  if (guia[k] && /\b(twelve|doce|12|thirteen|trece|13)\b/i.test(guia[k])) {
    console.log('  ' + k + ': ' + (guia[k].match(/.{70}\b(doce|twelve|12|trece|thirteen|13)\b.{70}/i) || [''])[0].replace(/\s+/g, ' '));
  }
});
console.log('\n  title: ' + guia.title);
console.log('  title_es: ' + (guia.title_es || '(no)'));
console.log('  featuredProducts: ' + JSON.stringify(guia.featuredProducts));
