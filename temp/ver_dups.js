const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));

const ids = [173, 440, 441, 120, 1032, 210, 634];
ids.forEach(id => {
  const p = products.find(x => x.id === id);
  if (!p) { console.log(id + ': NO EXISTE'); return; }
  const uso = [];
  guides.forEach(g => {
    const enSec = (g.sections || []).some(s => (s.products || []).includes(id));
    const feat = (g.featuredProducts || []).includes(id);
    if (enSec || feat) uso.push(g.id + (feat ? '(featured)' : ''));
  });
  const tabla = (g => g && (g.productTable || {}).columns ? 1 : 0)(null);
  console.log('--- ' + id + ' | ' + p.title);
  console.log('    title_es: ' + p.title_es);
  console.log('    price: ' + p.price + ' | brand: ' + p.brand + ' | cat: ' + p.category);
  console.log('    img: ' + (p.img ? 'SI' : 'NO'));
  console.log('    amazon: ' + ((p.stores || {}).amazon || 'ninguno'));
  console.log('    tiendas: ' + Object.keys(p.stores || {}).join(','));
  console.log('    desc: ' + String(p.desc).slice(0, 90));
  console.log('    usado en: ' + (uso.length ? uso.join(', ') : 'NINGUNA GUIA'));
});

// comprobarMelodyne en guias de plugins
console.log('\n=== referencias a melodyne / e906 en guias ===');
guides.forEach(g => {
  const txt = JSON.stringify(g);
  if (/melodyne/i.test(txt)) console.log('  ' + g.id + ' -> ' +
    ((g.sections || []).filter(s => (s.products || []).some(id => id === 120 || id === 1032)).length) + ' secciones con 120/1032' +
    ' featured=' + JSON.stringify((g.featuredProducts || []).filter(id => id === 120 || id === 1032)));
  if (txt.includes('e 906') || txt.includes('e906')) console.log('  ' + g.id + ' -> MENCIONA e906');
});
