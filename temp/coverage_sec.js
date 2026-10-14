const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8'));
// 1. Productos featured SIN seccion dedicada (seccion con products==[id])
const sinReview = [];
guides.forEach(g => {
  const covered = new Set();
  (g.sections || []).forEach(s => {
    if (!s || !s.products) return;
    if (s.products.length === 1) covered.add(s.products[0]);
    else s.products.forEach(id => covered.add(id));
  });
  (g.featuredProducts || []).forEach(id => {
    if (!covered.has(id)) sinReview.push(g.id + ' -> producto ' + id);
  });
});
console.log('Featured sin seccion: ' + sinReview.length);
sinReview.slice(0, 40).forEach(x => console.log('  ' + x));
