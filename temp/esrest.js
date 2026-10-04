const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const G = require(F);
// NT1 Signature 4th pro ES (all guides containing it)
G.forEach(g => {
  (g.verdictProsCons || []).forEach(v => {
    if (v.name === 'Rode NT1 Signature Series' && v.pros[3] === 'Great value' && (v.pros_es || []).length === 3) {
      v.pros_es.push('Gran relación calidad-precio');
    }
    if ((v.name === 'Sennheiser e 906' || v.name === 'Sennheiser e 604') && !v.name_es) {
      v.name_es = v.name;
    }
  });
});
// mixer cells ES
['best-live-sound-mixers', 'best-digital-mixers'].forEach(id => {
  const g = G.find(x => x.id === id);
  if (!g || !g.productTable) return;
  (g.productTable.rows || []).forEach(r => {
    (r.values || []).forEach(v => {
      if (v.value === '18 (16 preamps)') v.value_es = '18 (16 previos)';
      if (v.value === '16 (8 mono + 4 stereo)') v.value_es = '16 (8 mono + 4 estéreo)';
    });
  });
});
fs.writeFileSync(F, JSON.stringify(G, null, 2));
console.log('done');