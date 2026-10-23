const fs = require('fs');
const path = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const raw = fs.readFileSync(path, 'utf8');
const guides = JSON.parse(raw);
const arr = Array.isArray(guides) ? guides : guides.guides || [];
const g = arr.find(x => x.id === 'best-monitors');

console.log('=== ESTADO ACTUAL DE guides.json ===\n');
console.log('1. featuredProducts:', g.featuredProducts.join(','));
console.log('   -> WS-6.2 (id 300):', g.featuredProducts.includes(300) ? 'TODAVIA AQUI' : 'ELIMINADO');
console.log('   -> Focal 1054:', g.featuredProducts.includes(1054) ? 'AQUI' : 'FALTA');

console.log('\n2. WS-6.2 en columnas tabla:', !!g.productTable.columns.find(c => c.title && c.title.includes('WS-6.2')));
console.log('   Focal en columnas tabla:', !!g.productTable.columns.find(c => c.title === 'Focal Shape 65'));

console.log('\n3. WS-6.2 en veredictos:', !!g.verdictProsCons.find(v => v.name === 'Kali Audio WS-6.2'));
console.log('   Focal en veredictos:', !!g.verdictProsCons.find(v => v.name === 'Focal Shape 65'));

console.log('\n4. WS-6.2 en FAQs:', !!g.faq.find(f => f.q.includes('WS-6.2') || f.q_es.includes('WS-6.2')));
const fFaq = g.faq.find(f => f.q.includes('Focal Shape 65'));
console.log('   Focal en FAQs:', fFaq ? 'SI' : 'FALTA');
if (fFaq) {
  console.log('     -> boomios EN:', fFaq.a.includes('boomios') ? 'SI' : 'NO');
  console.log('     -> boomios ES:', fFaq.a_es.includes('boomios') ? 'SI' : 'NO');
}

console.log('\n5. WS-6.2 en conclusion/veredicto:', (g.conclusion.includes('WS-6.2') || g.conclusion_es.includes('WS-6.2') || g.verdict.includes('WS-6.2') || g.verdict_es.includes('WS-6.2')) ? 'SI' : 'NO');

console.log('\n6. Imagen Focal:', fs.existsSync('C:/Users/Daniel/projects/topmusiciangear/img/products/567ac4d00a.webp') ? 'EXISTE' : 'FALTA');

console.log('\n7. boomios en archivo crudo:', raw.includes('boomios') ? 'SI' : 'NO');
console.log('8. WS-6.2 en archivo crudo:', raw.includes('WS-6.2') ? 'SI' : 'NO');
