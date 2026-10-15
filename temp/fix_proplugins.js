// pro-plugins: es una guia "X vs Y" -> solo 2 productos.
// Se quitan las 5 secciones sobrantes + sus tarjetas + los 2 veredictos de Pro-Q/Pro-C.
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const gf = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gf, 'utf8'));
const P = JSON.parse(fs.readFileSync(BASE+'data/products.json','utf8'));
const arr = Array.isArray(P) ? P : P.products;
const byId = {}; arr.forEach(p => byId[p.id] = p);
const g = guides.find(x => x.id === 'pro-plugins');

const QUITAR = [60, 61, 122, 62, 63];  // UA 1176, TDR Kotelnikov, iZotope RX 12, Pro-Q 4, Pro-C 3

console.log('=== VA A DESAPARECER DE pro-plugins ===\n');
console.log('SECCIONES QUE SE BORRAN (con su texto):');
g.sections.forEach((s, i) => {
  if ((s.products||[]).some(p => QUITAR.indexOf(p) > -1)) {
    const txt = String(s.content || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    console.log('\n  [' + i + '] ' + (s.heading || s.h));
    console.log('      ES: ' + (s.heading_es || s.h_es));
    console.log('      texto EN (' + txt.length + ' caracteres): ' + txt.slice(0, 190) + '...');
    console.log('      texto ES (' + String(s.content_es||'').length + ' caracteres)');
    console.log('      productos: ' + JSON.stringify(s.products) + ' -> ' + (s.products||[]).map(p=>byId[p]?byId[p].title:p).join(', '));
  }
});

console.log('\n\nTARJETAS QUE DESAPARECEN (ya no habra foto/precio/botones de):');
QUITAR.forEach(id => console.log('  - ' + byId[id].title + ' (id ' + id + ')'));

console.log('\nVEREDICTOS 4+4 QUE SE BORRAN:');
g.verdictProsCons.forEach(v => {
  const n = v.name || v.title;
  const id = arr.find(p => p.title === n);
  if (id && QUITAR.indexOf(id.id) > -1) console.log('  - ' + n + ' (' + v.pros.length + ' pros / ' + v.cons.length + ' contras, EN+ES)');
});

console.log('\nLO QUE SE QUEDA (2 productos):');
[29, 123].forEach(id => console.log('  * ' + byId[id].title + ' (id ' + id + ')'));

if (process.argv[2] !== '--aplicar') {
  console.log('\n\n(cambios en memoria, NO escritos. Usa --aplicar para confirmar)');
  process.exit(0);
}

// ---- aplicar ----
g.sections = g.sections.filter(s => !(s.products||[]).some(p => QUITAR.indexOf(p) > -1));
g.featuredProducts = (g.featuredProducts||[]).filter(id => QUITAR.indexOf(id) < 0);
const antes = g.verdictProsCons.length;
g.verdictProsCons = g.verdictProsCons.filter(v => {
  const id = arr.find(p => p.title === (v.name||v.title));
  return !(id && QUITAR.indexOf(id.id) > -1);
});
console.log('\naplicado: secciones ' + g.sections.length + ' | featured ' + JSON.stringify(g.featuredProducts) +
  ' | veredictos ' + g.verdictProsCons.length + ' (antes ' + antes + ')');

// ---- verificacion ----
const ids = new Set();
(g.featuredProducts||[]).forEach(i=>ids.add(i));
g.sections.forEach(s=>(s.products||[]).forEach(i=>ids.add(i)));
console.log('\nproductos en la guia: ' + ids.size + ' -> ' + [...ids].map(i=>byId[i].title).join(' | '));
const huerf = [...ids].filter(i => QUITAR.indexOf(i) > -1);
console.log('sobran productos de los quitados: ' + (huerf.length ? huerf.join(', ') : 'ninguno'));

fs.writeFileSync(gf, JSON.stringify(guides, null, 2), 'utf8');
console.log('\nguides.json escrito');