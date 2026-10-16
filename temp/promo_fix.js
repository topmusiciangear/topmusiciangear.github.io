const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';

// 1. TEST 1040 -> promo geo
let bg = fs.readFileSync(B + 'build-guides.js', 'utf8');
const oldE = '1040: {prices:{pluginboutique:"€150.25",gear4music:"£125.00"},pbCur:{us:"$149.00",uk:"£118.59"}},\n';
const newE = '1040: {prices:{pluginboutique:"€72.00",gear4music:"£125.00"},pbCur:{us:"$71.40",uk:"£56.83"}},\n';
if (!bg.includes(oldE)) { console.log('ENTRADA 1040 NO ENCONTRADA'); process.exit(1); }
bg = bg.split(oldE).join(newE);
fs.writeFileSync(B + 'build-guides.js', bg, 'utf8');
try { new Function(bg); console.log('TEST 1040 promo OK'); }
catch (e) { console.log('SYNTAX ERROR: ' + e.message); process.exit(1); }

// 2. guide: tabla sin fila Price + FAQ sin $149 fijo
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
const g = guides.find(x => x.id === 'repitch-vs-melodyne');
g.productTable.rows = g.productTable.rows.filter(r => r.label !== 'Price');
g.productTable.rows.push({ label: 'Standout Feature', label_es: 'Característica destacada',
  values: [
    { value: 'Multi-track editing with tuning macros', value_es: 'Edición multipista con macros de afinación' },
    { value: 'Polyphonic editing in higher tiers', value_es: 'Edición polifónica en niveles superiores' }
  ] });
let s = JSON.stringify(g);
s = s.split('pay back the $149 quickly').join('pay for itself quickly');
s = s.split('amortizan los $149 rápido').join('se amortizan rápido');
const g2 = JSON.parse(s);
Object.keys(g).forEach(k => delete g[k]);
Object.assign(g, g2);
fs.writeFileSync(B + 'data/guides.json', JSON.stringify(guides, null, 2), 'utf8');
console.log('tabla: ' + g.productTable.rows.map(r => r.label).join(' | '));
