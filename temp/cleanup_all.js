const fs = require('fs');
const path = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';

// Leer archivo
let content = fs.readFileSync(path, 'utf8');

// 1. Corregir "boomios" -> "retumbantes"
let boomiosCount = (content.match(/boomios/g) || []).length;
content = content.replace(/boomios/g, 'retumbantes');
console.log('boomios corregidos:', boomiosCount);

// 2. Parsear
const guides = JSON.parse(content);
const arr = Array.isArray(guides) ? guides : guides.guides || [];
const idx = arr.findIndex(x => x.id === 'best-monitors');
if (idx === -1) { console.error('Guía no encontrada'); process.exit(1); }
const g = arr[idx];

// 3. Remover 300 de featuredProducts
let fpAntes = g.featuredProducts.length;
g.featuredProducts = g.featuredProducts.filter(id => id !== 300);
console.log('featuredProducts:', fpAntes, '->', g.featuredProducts.length);

// 4. Remover 300 de todas las secciones
let secsEditadas = 0;
g.sections.forEach(s => {
  if (s.products && Array.isArray(s.products) && s.products.includes(300)) {
    s.products = s.products.filter(id => id !== 300);
    secsEditadas++;
  }
});
console.log('Secciones editadas (removido 300):', secsEditadas);

// 5. Remover columna WS-6.2 de productTable
let colsAntes = g.productTable.columns.length;
g.productTable.columns = g.productTable.columns.filter(c =>
  !(c.title && c.title.includes('WS-6.2')) && !(c.title_es && c.title_es.includes('WS-6.2'))
);
console.log('Columnas tabla:', colsAntes, '->', g.productTable.columns.length);

// 6. Remover valor WS-6.2 de cada fila (por posición fija)
let filasEditadas = 0;
g.productTable.rows.forEach(row => {
  if (row.values && row.values.length === colsAntes) {
    // Remover 1 elemento del índice 9 (era la columna WS-6.2)
    row.values.splice(9, 1);
    filasEditadas++;
  }
});
console.log('Filas editadas:', filasEditadas, '| Valores por fila:', g.productTable.rows[0].values.length);

// 7. Remover WS-6.2 de verdictProsCons
let vcAntes = g.verdictProsCons.length;
g.verdictProsCons = g.verdictProsCons.filter(v =>
  v.name !== 'Kali Audio WS-6.2' && v.name_es !== 'Kali Audio WS-6.2'
);
console.log('verdictProsCons:', vcAntes, '->', g.verdictProsCons.length);

// 8. Remover FAQs de WS-6.2
let faqAntes = g.faq.length;
g.faq = g.faq.filter(f =>
  !f.q.includes('WS-6.2') && !f.q_es.includes('WS-6.2') &&
  !f.a.includes('WS-6.2') && !f.a_es.includes('WS-6.2')
);
console.log('FAQs:', faqAntes, '->', g.faq.length);

// 9. Verificar Focal Shape 65
console.log('\n--- Verificacion Focal Shape 65 ---');
console.log('featuredProducts tiene 1054:', g.featuredProducts.includes(1054));
console.log('Seccion Focal:', g.sections.find(s => s.products && s.products.includes(1054)) ? 'SI' : 'NO');
console.log('Columna Focal:', !!g.productTable.columns.find(c => c.title === 'Focal Shape 65'));
console.log('Verdict Focal:', !!g.verdictProsCons.find(v => v.name === 'Focal Shape 65'));
const fFaq = g.faq.find(f => f.q.includes('Focal Shape 65'));
console.log('FAQ Focal:', fFaq ? 'SI' : 'FALTA');
if (fFaq) {
  console.log('   boomios EN:', fFaq.a.includes('boomios') ? 'SI (ERROR)' : 'NO (OK)');
  console.log('   boomios ES:', fFaq.a_es.includes('boomios') ? 'SI (ERROR)' : 'NO (OK)');
}

// 10. Verificar limpieza total de WS-6.2
const nuevoContenido = JSON.stringify(arr);
const tieneWS62 = nuevoContenido.includes('WS-6.2') || nuevoContenido.includes('Kali Audio WS-6.2');
console.log('\n--- Verificacion final ---');
console.log('WS-6.2 restante en guia:', tieneWS62 ? 'TODAVIA AQUI - PROBLEMA' : 'ELIMINADO COMPLETAMENTE');
console.log('boomios restante:', content.includes('boomios') ? 'TODAVIA AQUI - PROBLEMA' : 'ELIMINADO');

// Guardar
fs.writeFileSync(path, JSON.stringify(arr, null, 2));
console.log('\nARCHIVO GUARDADO');