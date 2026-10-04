const G = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
const labs = {};
G.forEach(g => {
  if (!g.productTable) return;
  (g.productTable.rows || []).forEach(r => {
    const l = (r.label || '') + ' / ' + (r.label_es || '');
    if (/pric|precio|cost|msrp/i.test(l)) {
      labs[l] = labs[l] || [];
      labs[l].push(g.id);
    }
  });
});
Object.entries(labs).forEach(([l, ids]) => console.log(ids.length + 'x [' + l + '] ' + ids.slice(0, 6).join(',')));