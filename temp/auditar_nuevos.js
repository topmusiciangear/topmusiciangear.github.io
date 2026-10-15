const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const g = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8'));
const guia = g.find(x => x.id === 'starter-studio');
const arr = JSON.parse(fs.readFileSync(BASE + 'data/products.json', 'utf8'));
const list = Array.isArray(arr) ? arr : arr.products;
const byId = {}; list.forEach(p => byId[p.id] = p);

console.log('=== LOS DOS MONITORES NUEVOS EN starter-studio ===\n');
[633, 116].forEach(id => {
  const enSec = guia.sections.some(s => (s.products || []).includes(id));
  const enVer = guia.verdictProsCons.some(v => v.productId === id);
  const enFav = (guia.featuredProducts || []).includes(id);
  console.log('  id ' + id + '  ' + byId[id].title);
  console.log('     precio $' + byId[id].price + ' | tarjeta:' + (enSec ? 'si' : 'NO') +
    ' | veredicto:' + (enVer ? 'si' : 'NO') + ' | featured:' + (enFav ? 'si' : 'NO'));
  // en que guias esta ya
  const otras = g.filter(x => x.id !== 'starter-studio' &&
    ((x.sections || []).some(s => (s.products || []).includes(id)) || (x.verdictProsCons || []).some(v => v.productId === id)));
  console.log('     ya aparece en: ' + (otras.map(x => x.id).join(', ') || 'ninguna guia'));
});

console.log('\n\n=== PRODUCTOS ACTUALES DE LA GUIA ===\n');
const ids = [];
guia.sections.forEach(s => (s.products || []).forEach(p => { if (!ids.includes(p)) ids.push(p); }));
console.log('  ' + ids.length + ' productos: ' + ids.join(', '));
console.log('  veredictos: ' + guia.verdictProsCons.length);
console.log('  -> hay que llegar a ' + (ids.length + 2) + ' productos (con 633 y 116)');

console.log('\n\n=== SECCIONES QUE HABRA QUE REESCRIBIR ===\n');
guia.sections.forEach((s, i) => {
  const t = (s.content_es || '') + (s.content || '');
  if (/Solo auriculares|solo auriculares|headphones only|sin monitores|no include monitores|monitors/i.test(t) && /auricular/i.test(t)) {
    console.log('  [' + i + '] "' + (s.heading_es || s.heading) + '"  <- habla de mezclar sin monitores');
  }
});

console.log('\n=== estado de las secciones de monitores hoy ===\n');
guia.sections.forEach((s, i) => {
  const p = (s.products || []);
  if (p.includes(20) || p.includes(25) || p.includes(26) || p.includes(609)) {
    console.log('  [' + i + '] "' + (s.heading_es || s.heading) + '"  productos: ' + p.join(', '));
  }
});
