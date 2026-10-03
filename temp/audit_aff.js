// Audit 2: affiliate wrapping correctness per store across catalog.
const P = require('../data/products.json');
const issues = [];
const count = (s, sub) => s.split(sub).length - 1;
P.forEach(p => {
  const st = p.stores || {};
  Object.entries(st).forEach(([k, u]) => {
    if (typeof u !== 'string' || !u.startsWith('http')) { issues.push(p.id + '.' + k + ': NOT-A-URL ' + u); return; }
    if (count(u, 'awin1.com') > 1) issues.push(p.id + '.' + k + ': DOUBLE-WRAPPED awin');
    if (count(u, 'anrdoezrs.net') > 1) issues.push(p.id + '.' + k + ': DOUBLE-WRAPPED cj');
    if (count(u, 'tag=topmusicg-20') > 1) issues.push(p.id + '.' + k + ': DOUBLE-TAG amazon');
    if (k === 'gear4music' && u.includes('awin1.com') && !u.includes('awinmid=1117')) issues.push(p.id + '.g4m: WRONG MID ' + u.slice(0, 80));
    if (k === 'musicstore' && u.includes('awin1.com') && !u.includes('awinmid=63816')) issues.push(p.id + '.ms: WRONG MID ' + u.slice(0, 80));
    if (k === 'reverb' && u.includes('awin1.com') && !u.includes('awinmid=67144')) issues.push(p.id + '.rev: WRONG MID ' + u.slice(0, 80));
    if (k === 'andertons' && /irgwc=1|irpid=7292297/.test(u)) issues.push(p.id + '.andertons: OLD FORMAT ' + u.slice(0, 100));
    if (k === 'andertons' && u.includes('awin1.com')) issues.push(p.id + '.andertons: AWIN INSTEAD OF IMPACT');
    if (k === 'pluginboutique' && /65fd7463b5f28/.test(u)) issues.push(p.id + '.pb: OLD AID');
    if (k === 'pluginboutique' && u.includes('pluginboutique.com') && !u.includes('a_aid=')) issues.push(p.id + '.pb: NO AID');
    if (k === 'amazon' && /\/s\?k=/.test(u)) issues.push(p.id + '.amazon: SEARCH URL not dp ' + u.slice(0, 80));
  });
});
console.log('products:', P.length, '| issues:', issues.length);
console.log(issues.slice(0, 60).join('\n'));