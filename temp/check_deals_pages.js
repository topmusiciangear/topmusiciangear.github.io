// Verifica que las paginas de ofertas usan fotos locales.
const fs = require('fs');

for (const f of ['deals.html', 'deals_es.html']) {
  const s = fs.readFileSync(f, 'utf8');
  const imgs = [...s.matchAll(/<img[^>]+src="([^"]+)"/g)].map(m => m[1]);
  const product = imgs.filter(u => /img\/products\//.test(u));
  const ext = imgs.filter(u => /^https?:/.test(u));
  const broken = product.filter(u => !fs.existsSync(u));
  console.log(f + ': imgs totales ' + imgs.length + ' | fotos locales ' + product.length + ' | externas ' + ext.length + ' | no existen ' + broken.length);
  if (ext.length) [...new Set(ext)].slice(0, 5).forEach(u => console.log('   externa: ' + u));
  if (broken.length) broken.slice(0, 5).forEach(u => console.log('   FALTA: ' + u));
}
