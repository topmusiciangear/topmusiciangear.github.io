(async () => {
const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const H = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/126.0.0.0 Safari/537.36' };
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));
const ids = [1042, 1043, 1046, 1047, 1048, 1049];

console.log('=== ESTADO DE LOS ENLACES DIRECTOS ===');
const muertos = [];
for (const id of ids) {
  const p = products.find(x => x.id === id);
  for (const [k, v] of Object.entries(p.stores || {})) {
    if (v.includes('awin')) continue; // solo revisamos los directos
    let status = '?';
    try {
      const r = await fetch(v, { headers: H, redirect: 'follow' });
      status = r.status;
    } catch (e) { status = 'ERR'; }
    const mal = status !== 200;
    console.log('  ' + (mal ? 'MAL ' : 'OK  ') + id + ' [' + k.padEnd(11) + '] status=' + status + '  ' + v.slice(0, 96));
    if (mal) muertos.push({ id, store: k, url: v, titulo: p.title });
  }
}

console.log('\n=== ENLACES MUERTOS: ' + muertos.length + ' ===');
if (muertos.length) {
  const rp = B + 'data/products.json';
  const prods = JSON.parse(fs.readFileSync(rp, 'utf8'));
  muertos.forEach(m => {
    const p = prods.find(x => x.id === m.id);
    const busqueda = 'https://www.andertons.co.uk/search.php?search_query=' + encodeURIComponent(m.titulo).replace(/%20/g, '+');
    p.stores[m.store] = busqueda;
    console.log('  ' + m.id + ' ' + m.titulo);
    console.log('    antes: ' + m.url);
    console.log('    ahora: ' + busqueda);
    console.log('    (nombre exacto del producto en el buscador: "' + m.titulo + '")');
  });
  fs.writeFileSync(rp, JSON.stringify(prods, null, 2), 'utf8');
}

console.log('\n=== AUDITORIA AMAZON + AFILIADOS (catalogo completo) ===');
let conAmazon = 0, sinAmazon = 0, sinTag = 0, conAwina = 0;
const sinAmazonLista = [];
products.forEach(p => {
  const s = p.stores || {};
  if (s.amazon) {
    conAmazon++;
    if (!/tag=topmusicg-20/.test(s.amazon)) { sinTag++; sinAmazonLista.push(p.id + ' ' + p.title); }
  } else { sinAmazon++; }
  const awin = Object.entries(s).filter(([k, v]) => k !== 'amazon' && v.includes('awin1.com/cread.php'));
  if (awin.length) conAwina++;
});
console.log('  con enlace Amazon: ' + conAmazon + ' | sin Amazon: ' + sinAmazon);
console.log('  enlaces Amazon SIN tag=topmusicg-20 en el JSON: ' + sinTag + '  (el build lo anade)');
console.log('  productos con enlace awin (afiliado): ' + conAwina);

const sb = fs.readFileSync(B + 'js/shop-buttons.js', 'utf8');
const sinTagEnSb = (sb.match(/amazon\.com\/dp\/[A-Z0-9]{10}(?!.{0,3}tag)/g) || []).length;
console.log('  enlaces amazon SIN tag en shop-buttons.js: ' + sinTagEnSb);
})();
