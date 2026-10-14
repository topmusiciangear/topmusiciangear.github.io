const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8'));
const P = JSON.parse(fs.readFileSync(BASE + 'data/products.json', 'utf8'));
const arr = Array.isArray(P) ? P : P.products;

// title -> id (exact + normalized fallback)
const byTitle = {};
arr.forEach(p => { byTitle[(p.title || '').toLowerCase()] = p.id; if (p.title_es) byTitle[(p.title_es || '').toLowerCase()] = p.id; });
function titleToId(t) {
  if (!t) return null;
  const k = t.toLowerCase().trim();
  if (byTitle[k] !== undefined) return byTitle[k];
  // fallback: quitar marca inicial
  const noBrand = k.replace(/^(rode|shure|sennheiser|audio-technica|sony|jbl|yamaha|behringer|mackie|presonus|tascam|fifine|maono|tonor|razer|hyperx|blue|elgato|tc helicon|roland|røde)\s+/i, '');
  for (const key of Object.keys(byTitle)) {
    if (key.endsWith(noBrand) || noBrand.endsWith(key)) return byTitle[key];
  }
  return null;
}
const idToTitle = {};
arr.forEach(p => { idToTitle[p.id] = p.title; });

const mismatched = [];
guides.forEach(g => {
  const tableIds = new Set();
  const tableUnmatched = [];
  (g.productTable?.columns || []).forEach(c => {
    const id = titleToId(c.title);
    if (id === null) tableUnmatched.push(c.title);
    else tableIds.add(id);
  });
  const vpcIds = new Set();
  const vpcUnmatched = [];
  (g.verdictProsCons || []).forEach(v => {
    if (!v) return;
    const id = titleToId(v.name);
    if (id === null) vpcUnmatched.push(v.name);
    else vpcIds.add(id);
  });
  const featIds = new Set(g.featuredProducts || []);
  const secIds = new Set();
  (g.sections || []).forEach(s => { if (s && s.products) s.products.forEach(id => secIds.add(id)); });

  const eq = (a, b) => a.size === b.size && [...a].every(x => b.has(x));
  const tEqV = eq(tableIds, vpcIds);
  const tEqF = eq(tableIds, featIds);
  if (!tEqV || !tEqF || tableUnmatched.length || vpcUnmatched.length) {
    const onlyV = [...vpcIds].filter(x => !tableIds.has(x)).map(x => x + '=' + (idToTitle[x] || '?'));
    const onlyT = [...tableIds].filter(x => !vpcIds.has(x)).map(x => x + '=' + (idToTitle[x] || '?'));
    const onlyF = [...featIds].filter(x => !tableIds.has(x)).map(x => x + '=' + (idToTitle[x] || '?'));
    const missF = [...tableIds].filter(x => !featIds.has(x)).map(x => x + '=' + (idToTitle[x] || '?'));
    mismatched.push({ id: g.id, t: tableIds.size, v: vpcIds.size, f: featIds.size, onlyV, onlyT, onlyF, missF, tableUnmatched, vpcUnmatched });
  }
});

console.log('Guias totales: ' + guides.length);
console.log('Guias con descuadre: ' + mismatched.length);
console.log('Guias alineadas: ' + (guides.length - mismatched.length));
console.log('');
mismatched.forEach(m => {
  console.log('=== ' + m.id + ' (tabla:' + m.t + ' veredictos:' + m.v + ' featured:' + m.f + ')');
  if (m.onlyV.length) console.log('  en veredictos pero NO en tabla: ' + m.onlyV.join(' | '));
  if (m.onlyT.length) console.log('  en tabla pero NO en veredictos: ' + m.onlyT.join(' | '));
  if (m.onlyF.length) console.log('  en featured pero NO en tabla: ' + m.onlyF.join(' | '));
  if (m.missF.length) console.log('  en tabla pero NO en featured: ' + m.missF.join(' | '));
  if (m.tableUnmatched.length) console.log('  columnas sin match en catalogo: ' + m.tableUnmatched.join(' | '));
  if (m.vpcUnmatched.length) console.log('  veredictos sin match en catalogo: ' + m.vpcUnmatched.join(' | '));
});