const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8'));
const P = JSON.parse(fs.readFileSync(BASE + 'data/products.json', 'utf8'));
const arr = Array.isArray(P) ? P : P.products;
const byTitle = {};
arr.forEach(p => { byTitle[(p.title || '').toLowerCase()] = p.id; });
function titleToId(t) {
  if (!t) return null;
  const k = t.toLowerCase().trim();
  return byTitle[k] !== undefined ? byTitle[k] : null;
}
const idToTitle = {};
arr.forEach(p => { idToTitle[p.id] = p.title; });
// Solo descuadre REAL tabla<->veredictos (mismo criterio del informe anterior)
const rows = [];
guides.forEach(g => {
  const tableIds = new Set();
  (g.productTable?.columns || []).forEach(c => { const id = titleToId(c.title); if (id !== null) tableIds.add(id); });
  const vpcIds = new Set();
  (g.verdictProsCons || []).forEach(v => { if (!v) return; const id = titleToId(v.name); if (id !== null) vpcIds.add(id); });
  const onlyV = [...vpcIds].filter(x => !tableIds.has(x));
  const onlyT = [...tableIds].filter(x => !vpcIds.has(x));
  const nTable = (g.productTable?.columns || []).length;
  if (onlyV.length || onlyT.length) rows.push({ id: g.id, t: nTable, v: (g.verdictProsCons || []).length, onlyV, onlyT });
});
rows.sort((a, b) => (b.onlyV.length + b.onlyT.length) - (a.onlyV.length + a.onlyT.length));
console.log('Guias con descuadre REAL tabla<->veredictos: ' + rows.length);
console.log('');
// Separar guias VS (tabla 0, por diseno) del resto
const vs = rows.filter(r => r.t === 0);
const resto = rows.filter(r => r.t > 0);
console.log('--- A REPARAR (con tabla) ---');
resto.forEach(r => {
  console.log(r.id + '  [tabla:' + r.t + ' veredictos:' + r.v + ']');
  if (r.onlyV.length) console.log('    falta en tabla: ' + r.onlyV.map(x => idToTitle[x]).join(' | '));
  if (r.onlyT.length) console.log('    falta en veredictos: ' + r.onlyT.map(x => idToTitle[x]).join(' | '));
});
console.log('');
console.log('--- Guias VS (tabla:0, por diseno, no requieren tabla): ' + vs.length + ' ---');
console.log(vs.map(r => r.id).join(', '));