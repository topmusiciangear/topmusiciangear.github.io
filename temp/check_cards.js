const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(BASE+'data/guides.json','utf8'));
const arr = JSON.parse(fs.readFileSync(BASE+'data/products.json','utf8'));
const list = Array.isArray(arr)?arr:arr.products;
const N = id => { const p = list.find(x=>x.id===id); return p?p.title:'??'+id; };
const g = guides.find(x=>x.id==='starter-studio');

// Las tarjetas salen de sections[].products, no de featuredProducts
const enSecciones = new Set();
g.sections.forEach((s,i)=>(s.products||[]).forEach(p=>enSecciones.add(p)));

console.log('=== ids en sections[].products (de aqui salen las TARJETAS) ===');
[...enSecciones].sort((a,b)=>a-b).forEach(id=>console.log('  ' + id + ': ' + N(id)));

console.log('\n=== featuredProducts (no genera tarjetas) ===');
g.featuredProducts.forEach(id=>console.log('  ' + id + ': ' + N(id)));

console.log('\n=== featuredProducts SIN tarjeta ===');
g.featuredProducts.filter(id=>!enSecciones.has(id)).forEach(id=>console.log('  ' + id + ': ' + N(id)));

console.log('\n=== tarjetas en el HTML local ===');
const f = BASE+'guides/starter-studio.html';
if (fs.existsSync(f)) {
  const d = fs.readFileSync(f,'utf8');
  const cards = [...new Set([...d.matchAll(/guide-product-card-title[^>]*>([\s\S]*?)<\/h3>/g)].map(m=>m[1].replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim()))];
  console.log('  total: ' + cards.length);
  cards.forEach(c=>console.log('    - ' + c));
  console.log('\n  M20x aparece? ' + (cards.some(c=>/M20x/.test(c)) ? 'SI' : 'NO  <-- el bug'));
  console.log('  NT1 Signature aparece? ' + (cards.some(c=>/NT1 Signature/.test(c)) ? 'SI' : 'NO  <-- mismo bug'));
}