const G = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
// duplicates: same product id in 2+ sections of one guide
console.log('=== DUPLICADOS POR PRODUCTO ===');
G.forEach(g => {
  const seen = {};
  (g.sections || []).forEach((s, i) => {
    (s.products || []).forEach(pid => {
      seen[pid] = seen[pid] || [];
      seen[pid].push(i);
    });
  });
  Object.entries(seen).forEach(([pid, idxs]) => {
    if (idxs.length > 1) {
      console.log(g.id + ' prod' + pid + ' en secs ' + idxs.join(',') + ' :: ' + idxs.map(i => '[' + g.sections[i].heading + ' len=' + (g.sections[i].content || '').length + ']').join(' '));
    }
  });
});