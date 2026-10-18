const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));

console.log('=== LONGITUD DE TITLE/META (muestra) ===');
guides.slice(0, 8).forEach(g => console.log('  T' + String((g.title || '').length).padEnd(4) + 'M' + String((g.metaDesc || '').length).padEnd(4) + g.id));

const bm = guides.find(g => g.id === 'budget-monitors');
console.log('\n=== budget-monitors: claves ===');
console.log(Object.keys(bm).join(', '));
console.log('\n--- title: ' + bm.title + '  (' + bm.title.length + ')');
console.log('--- title_es: ' + bm.title_es + '  (' + (bm.title_es || '').length + ')');
console.log('--- metaDesc: ' + bm.metaDesc);
console.log('--- metaDesc_es: ' + bm.metaDesc_es);
console.log('--- category: ' + bm.category + ' | lang: ' + bm.lang);
console.log('--- sections: ' + (bm.sections || []).length);
(bm.sections || []).forEach(s => console.log('    * ' + JSON.stringify(Object.keys(s)) + ' | ' + String(s.heading || s.title || '').slice(0, 50)));
console.log('--- FAQs: ' + (bm.faqs || []).length);
console.log('--- resto del objeto (claves no listadas arriba): ' + Object.keys(bm).filter(k => !['title','title_es','metaDesc','metaDesc_es','category','lang','sections','faqs','id'].includes(k)).join(', '));

console.log('\n=== EJEMPLO DE PRODUCTO (684) ===');
console.log(JSON.stringify(products.find(p => p.id === 684), null, 2));
