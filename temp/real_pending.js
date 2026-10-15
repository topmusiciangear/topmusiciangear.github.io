const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8'));
const P = JSON.parse(fs.readFileSync(BASE + 'data/products.json', 'utf8'));
const arr = Array.isArray(P) ? P : P.products;
const byId = {}; arr.forEach(p => byId[p.id] = p);
const isHub = (g) => /-vs-/.test(g.id) || /^pro-/.test(g.id);

// lineup real = featuredProducts + ids que aparecen en section.products
// producto "pendiente" = parte de la lineup, tiene veredicto, y NO tiene seccion propia
const rows = []; let N = 0, HN = 0;
guides.forEach(g => {
  const solo = (g.sections || []).filter(s => Array.isArray(s.products) && s.products.length === 1).map(s => s.products[0]);
  const inSec = new Set();
  (g.sections || []).forEach(s => (s.products || []).forEach(p => inSec.add(p)));
  const vpIds = new Set((g.featuredProducts || []).filter(id => byId[id]));
  (g.featuredProducts || []).forEach(id => { if (byId[id]) vpIds.add(id); });
  const cand = [...vpIds].filter(id => !solo.includes(id) && byId[id]);
  // solo los que ademas tienen veredicto
  const conVeredicto = cand.filter(id => {
    const t = byId[id].title;
    return (g.verdictProsCons || []).some(v => {
      const n = v.name || v.title || '';
      return n === t || t.indexOf(n) === 0 || n.indexOf(t) === 0;
    });
  });
  if (!conVeredicto.length) return;
  const list = conVeredicto.map(id => ({ id, t: byId[id].title }));
  N += list.length;
  if (isHub(g)) HN += list.length; else rows.push({ g, list, solo });
});
rows.sort((a, b) => b.list.length - a.list.length);
console.log('CORRECCION: reviews realmente pendientes');
console.log('  guias de listado: ' + rows.reduce((s, r) => s + r.list.length, 0) + ' en ' + rows.length + ' guias');
console.log('  guias comparativas/hub: ' + HN);
console.log('  TOTAL: ' + N + '\n');
rows.forEach((r, i) => {
  console.log((i + 1) + '. ' + r.g.title_es + '  |  ' + r.g.sections.filter(s => (s.products || []).length === 1).length + ' fichas |  FALTAN ' + r.list.length);
  r.list.forEach(p => console.log('     - ' + p.t + ' (id ' + p.id + ')'));
});