const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));

// 1. ¿Existe ya una guia de monitores baratos?
const cand = guides.filter(g => /monitor|speaker/i.test(g.category || '') || /monitor/i.test(g.title || ''));
console.log('=== GUIAS DE MONITORES ===');
cand.forEach(g => console.log('  ' + g.id + ' | ' + g.category + ' | ' + g.title.slice(0, 62)));
const sub150 = guides.filter(g => /150|budget|barat/i.test(g.title + ' ' + g.id + ' ' + (g.metaDesc || '')));
console.log('\n=== GUIAS QUE MENCIONAN $150 O BARATO ===');
sub150.forEach(g => console.log('  ' + g.id + ' | ' + g.title.slice(0, 70)));

// 2. Los 8 productos, ¿estan en el catalogo?
console.log('\n=== LOS 8 PRODUCTOS EN EL CATALOGO ===');
['Eris 3.5', 'MR4', 'BX3', 'CR3-X', '104-BT', 'Elevate 4', 'Media 40', 'SZSM-4X'].forEach(k => {
  const hits = products.filter(p => new RegExp(k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i').test(p.title));
  hits.forEach(h => {
    const n = guides.filter(g => (g.featuredProducts || []).includes(h.id) || (g.sections || []).some(s => (s.products || []).includes(h.id))).length;
    console.log('  ' + h.id + ' | ' + h.title + ' | precio=' + h.price + ' | tiendas=' + Object.keys(h.stores || {}).length + ' | en ' + n + ' guia(s)');
  });
  if (!hits.length) console.log('  ' + k + ': NO ESTA EN EL CATALOGO');
});