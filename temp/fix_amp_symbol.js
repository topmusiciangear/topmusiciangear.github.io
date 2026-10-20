const fs = require('fs');
const f = 'data/guides.json';
const gs = JSON.parse(fs.readFileSync(f, 'utf8'));
const g = gs.find(x => x.id === 'best-studio-monitors-under-150');
g.verdict = g.verdict.replace('(2x25 W bi-amp)', '(2\u00d725 W bi-amp)');
g.verdict_es = g.verdict_es.replace('(2x25 W bi-amplificados)', '(2\u00d725 W bi-amplificados)');
fs.writeFileSync(f, JSON.stringify(gs, null, 2));
console.log(g.verdict.includes('2\u00d725 W bi-amp'), g.verdict_es.includes('2\u00d725 W bi-amplificados'));
