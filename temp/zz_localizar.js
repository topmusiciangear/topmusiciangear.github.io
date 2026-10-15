const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';

const ROTOS = {
  'https://www.zzounds.com/': 'portada vacia',
  'https://www.zzounds.com/item--SEENEOMUSB': '404',
  'https://www.zzounds.com/productreview--BEHXR18': 'pagina de resenas, no de producto',
  'https://www.zzounds.com/productreview--BEHX32COMPACT': 'pagina de resenas, no de producto'
};

const guias = fs.readdirSync(BASE + 'guides').filter(f => f.endsWith('.html'));
const mapa = {};
guias.forEach(f => {
  const d = fs.readFileSync(BASE + 'guides/' + f, 'utf8');
  [...d.matchAll(/<a [^>]*data-store="zzounds"[^>]*href="([^"]+)"/g)].forEach(m => {
    const u = m[1].replace(/&amp;/g, '&');
    if (ROTOS[u]) {
      // producto propietario: el openReviewModal mas cercano antes
      const antes = d.slice(Math.max(0, m.index - 9000), m.index);
      const mm = [...antes.matchAll(/openReviewModal\((\d+)\)/g)];
      const id = mm.length ? mm[mm.length - 1][1] : '?';
      const k = u + '|' + id;
      mapa[k] = mapa[k] || { url: u, id, motivo: ROTOS[u], guias: new Set() };
      mapa[k].guias.add(f.replace('.html', '').replace('_es', ' [ES]'));
    }
  });
});

console.log('=== LINKS A ARREGLAR ===');
Object.values(mapa).forEach(x => {
  console.log('\n  id ' + x.id + '  ' + x.url.replace('https://www.zzounds.com', '') + '   <- ' + x.motivo);
  console.log('    en ' + x.guias.size + ' pagina(s): ' + [...x.guias].slice(0, 6).join(', '));
});

// nombre del producto
const arr = JSON.parse(fs.readFileSync(BASE + 'data/products.json', 'utf8'));
const list = Array.isArray(arr) ? arr : arr.products;
console.log('\n=== NOMBRES ===');
[...new Set(Object.values(mapa).map(x => x.id))].forEach(id => {
  const p = list.find(y => String(y.id) === String(id));
  console.log('  ' + id + ': ' + (p ? p.title : '(no encontrado)'));
});
