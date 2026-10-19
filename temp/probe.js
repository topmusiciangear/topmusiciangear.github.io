const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));

guides.forEach(g => {
  const nombres = new Set();
  (g.verdictProsCons || []).forEach(v => { if (v.name) nombres.add(v.name); });
  if (g.productTable && g.productTable.columns) g.productTable.columns.forEach(c => { if (c.title_es || c.title) nombres.add(c.title_es || c.title); });
  const hits = [...nombres].filter(n => /NDH|Neumann/i.test(n));
  if (hits.length) console.log(g.id + ' -> ' + hits.join(', '));
});
