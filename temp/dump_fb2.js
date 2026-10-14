const fs = require('fs');
const guides = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const g = guides.find(x => x.id === 'fender-bass-guide');
const P = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/products.json', 'utf8'));
const arr = Array.isArray(P) ? P : P.products;
[185, 157, 158].forEach(id => {
  const p = arr.find(y => y.id === id);
  console.log('=== ' + id + ' ===');
  console.log(JSON.stringify(p, null, 1));
});
console.log('\n\n### SEC0 EN:\n' + g.sections[0].content);
console.log('\n### SEC0 ES:\n' + g.sections[0].content_es);
console.log('\n### SEC3 (review ejemplo) EN:\n' + g.sections[3].content);
console.log('\n### SEC3 ES:\n' + g.sections[3].content_es);
console.log('\n### VERDICT PROS/CONS:');
g.verdictProsCons.forEach(v => {
  if ([185, 157, 158].includes(v.productId) || /Ultra II|Classic Vibe|Affinity/.test(v.name)) {
    console.log('-- ' + v.name);
    v.pros.forEach((p, i) => console.log('   + ' + p + '  //  ' + v.pros_es[i]));
    v.cons.forEach((p, i) => console.log('   - ' + p + '  //  ' + v.cons_es[i]));
  }
});