const fs = require('fs');
const t = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8');
// Buscar el texto exacto
const searches = ['[102,  68, 459', '[313, 102, 310', '[\n  102\n]', '[\n  102,\n  68'];
searches.forEach(s => {
  const idx = t.indexOf(s);
  console.log(JSON.stringify(s) + ': ' + (idx >= 0 ? 'FOUND at ' + idx : 'NOT FOUND'));
  if (idx >= 0) console.log('  ctx: ' + t.slice(Math.max(0, idx - 20), idx + s.length + 20));
});
// Buscar 102 en el contexto de beginner-guitar
const g = JSON.parse(t);
const guide = g.find(x => x.id === 'beginner-guitar');
console.log('\nfeaturedProducts:', JSON.stringify(guide.featuredProducts));
guide.sections.forEach((s, i) => {
  if (s.products && s.products.includes(102)) {
    console.log('Section ' + i + ' products:', JSON.stringify(s.products));
  }
});
