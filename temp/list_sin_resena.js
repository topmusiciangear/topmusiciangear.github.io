const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));

function stripHtml(text) {
  return text.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

let total = 0;
const results = [];
guides.forEach(g => {
  const text = stripHtml(JSON.stringify(g.sections || [])).toLowerCase();
  const mentioned = [];
  products.forEach(p => {
    const name = (p.title || '').toLowerCase();
    if (name.length > 5 && text.includes(name)) {
      const inTable = g.productTable && g.productTable.rows.some(r => 
        r.values.some(v => v.productId == p.id || v.value === p.title || v.value_es === p.title_es)
      );
      const inFeatured = (g.featuredProducts || []).includes(p.id) || (g.featuredProducts_es || []).includes(p.id);
      if (!inTable && !inFeatured) {
        mentioned.push(p.id + ' ' + p.title);
      }
    }
  });
  if (mentioned.length > 0) {
    total += mentioned.length;
    results.push('GUIA: ' + g.id);
    mentioned.forEach(m => results.push('  - ' + m));
    results.push('');
  }
});
results.push('Total productos sin resena: ' + total);
fs.writeFileSync(B + 'temp/sin_resena_list.txt', results.join('\n'), 'utf8');
console.log('Total productos sin reseña: ' + total);
console.log('Lista guardada en temp/sin_resena_list.txt');
