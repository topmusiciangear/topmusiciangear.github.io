// AUDIT 2/4: HTML generado (solo lectura)
const fs = require('fs'), path = require('path');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const files = fs.readdirSync(B + 'guides').filter(f => f.endsWith('.html'));
const R = [];
const titles = {};
files.forEach(f => {
  const d = fs.readFileSync(path.join(B + 'guides', f), 'utf8');
  const t = (d.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || '';
  if (!/<h1/.test(d)) R.push('sin h1: ' + f);
  if (!t) R.push('sin title: ' + f);
  titles[t] = titles[t] || []; titles[t].push(f);
  if (!/application\/ld\+json/.test(d)) R.push('sin JSON-LD: ' + f);
  if (/â‚¬|Â£|Â°/.test(d)) R.push('mojibake en HTML: ' + f);
  if (/href="undefined"/.test(d)) R.push('href=undefined: ' + f);
  if (/<img[^>]*src=""|src="undefined"/.test(d)) R.push('imagen vacia: ' + f);
  // tarjetas sin boton de compra
  const cards = (d.match(/guide-product-card-title/g) || []).length;
  const prims = (d.match(/shop-btn-primary/g) || []).length;
  if (cards > 0 && prims < cards) R.push(f + ': ' + cards + ' tarjetas pero solo ' + prims + ' primarios');
});
console.log('paginas: ' + files.length);
console.log('\n=== TITULOS DUPLICADOS ===');
Object.entries(titles).filter(([k, v]) => v.length > 1 && k).forEach(([k, v]) =>
  console.log('  "' + k.slice(0, 70) + '" en ' + v.length + ': ' + v.join(', ')));
console.log('\n=== PROBLEMAS HTML: ' + R.length + ' ===');
R.slice(0, 40).forEach(x => console.log('  - ' + x));
console.log('\n=== sitemap / robots ===');
console.log('  sitemap.xml: ' + (fs.existsSync(B + 'sitemap.xml') ? 'existe (' + (fs.readFileSync(B + 'sitemap.xml', 'utf8').match(/<loc>/g) || []).length + ' urls)' : 'NO EXISTE'));
console.log('  robots.txt: ' + (fs.existsSync(B + 'robots.txt') ? 'existe' : 'NO EXISTE'));
if (fs.existsSync(B + 'robots.txt')) console.log('  ' + fs.readFileSync(B + 'robots.txt', 'utf8').split('\n').slice(0, 5).join(' / '));
