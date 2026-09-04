const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const targets = [6, 7, 440, 320, 103, 295, 311, 124, 65]; // probe: Gibson LP(?), PRS McCarty, AmPro II Strat, etc.
g.forEach(function (h) {
  const ids = [];
  (h.sections || []).forEach(function (s) { (s.products || []).forEach(function (p) { ids.push(p); }); });
  const uniq = ids.filter((v, i) => ids.indexOf(v) === i);
  const hits = uniq.filter(id => targets.indexOf(id) === -1);
  console.log(h.id, '| sections:', (h.sections || []).length, '| products:', uniq.join(','));
});
