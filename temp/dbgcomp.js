const G = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
let withPrice = 0, without = [];
G.forEach(g => {
  if (!g.comparison) return;
  const has = (g.comparison.rows || []).some(r => /price|precio/i.test(r.label || ''));
  if (has) withPrice++;
  else without.push(g.id);
});
console.log('con Price:', withPrice, 'sin Price:', without.length);
console.log(without.join(','));