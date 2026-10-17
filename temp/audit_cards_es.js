const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));

const noDescEs = products.filter(p => p.desc && !(p.desc_es || '').trim());
const noTitleEs = products.filter(p => p.title && !(p.title_es || '').trim());
const descEsIgual = products.filter(p => p.desc && p.desc_es && p.desc_es.trim() === p.desc.trim());

console.log('total productos: ' + products.length);
console.log('sin desc_es: ' + noDescEs.length);
console.log('sin title_es: ' + noTitleEs.length);
console.log('desc_es identico al EN: ' + descEsIgual.length);
console.log('\n--- SIN desc_es (primeros 40) ---');
noDescEs.slice(0, 40).forEach(p => console.log(p.id + ' | ' + p.title + '\n    ' + (p.desc || '').slice(0, 110)));
console.log('\n--- SIN title_es ---');
noTitleEs.forEach(p => console.log(p.id + ' | ' + p.title + ' | cat=' + p.category));

// donde se usan: guias que los contienen
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
const ids = new Set([...noDescEs, ...noTitleEs].map(p => p.id));
const uso = {};
guides.forEach(g => {
  const all = [].concat(g.featuredProducts || [], ...(g.sections || []).map(s => s.products || []));
  all.forEach(id => { if (ids.has(id)) { (uso[id] = uso[id] || []).push(g.id); } });
});
const usados = Object.keys(uso).length;
console.log('\nproductos afectados que aparecen en alguna guia: ' + usados);
fs.writeFileSync(B + 'temp/missing_es.json', JSON.stringify({ noDescEs: noDescEs.map(p => ({ id: p.id, title: p.title, desc: p.desc })), noTitleEs: noTitleEs.map(p => ({ id: p.id, title: p.title })) }, null, 2), 'utf8');
console.log('guardado temp/missing_es.json');