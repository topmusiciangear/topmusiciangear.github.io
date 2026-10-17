const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));

// el template añade el sufijo de unidad al título, hay que quitarlo para comparar
const SUF = [' (cada uno)', ' (par)', ' (2 auriculares)', ' (2 headsets)'];
const norm = t => { let s = t.trim(); SUF.forEach(x => { if (s.endsWith(x)) s = s.slice(0, -x.length); }); return s.trim(); };
const index = {};
products.forEach(p => { index[norm(p.title)] = p; index[norm(p.title_es || '')] = p; index[p.id] = p; });

const files = fs.readdirSync(B + 'guides').filter(f => f.endsWith('_es.html'));
let cards = 0, sinTraducir = [], distintos = [], noEncontrados = [];
files.forEach(f => {
  const h = fs.readFileSync(B + 'guides/' + f, 'utf8');
  const re = /guide-product-card-title">([^<]+)<\/h3>[\s\S]{0,900}?guide-product-card-desc">([^<]*)</g;
  let m;
  while ((m = re.exec(h)) !== null) {
    cards++;
    const desc = m[2].trim();
    const prod = index[norm(m[1])];
    if (!prod) { noEncontrados.push(f + ' | ' + m[1]); continue; }
    if (!(prod.desc_es || '').trim()) { sinTraducir.push(f + ' | ' + prod.title); continue; }
    const esperado = prod.desc_es.slice(0, 50);
    if (desc.slice(0, 50) !== esperado) distintos.push(f + ' | ' + prod.title + '\n      card: ' + desc.slice(0, 60) + '\n      json: ' + esperado);
  }
});
console.log('paginas ES: ' + files.length + ' | cards en ES: ' + cards);
console.log('cards con desc EN sin traducir: ' + sinTraducir.length);
sinTraducir.slice(0, 10).forEach(x => console.log('   ' + x));
console.log('cards cuyo texto NO coincide con desc_es: ' + distintos.length);
distintos.slice(0, 10).forEach(x => console.log('   ' + x));
console.log('titulos nomappedos: ' + noEncontrados.length);
noEncontrados.slice(0, 8).forEach(x => console.log('   ' + x));