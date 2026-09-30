const fs = require('fs');
const TOK = 'GIT0064626';
for (const [lang, f] of [['EN', 'guides/best-beginner-electric-guitar.html'], ['ES', 'guides/best-beginner-electric-guitar_es.html']]) {
  const g = fs.readFileSync(f, 'utf8');
  console.log('== ' + lang);
  console.log('   MS art GIT0064626      : ' + g.includes(TOK));
  console.log('   precio MS EUR189        : ' + g.includes("data-price='\u20ac189'"));
  console.log('   fila MS ya no "No disp." : ' + !/data-store="musicstore"[^>]*>\s*(?:No disponible|Not Available)/.test(g));
  const anchors = [...g.matchAll(/<a data-store="musicstore"[^>]*>/g)];
  let withPrice = 0;
  for (const a of anchors) {
    const end = g.indexOf('</a>', a.index);
    if (/data-price='\u20ac189'/.test(g.slice(a.index, end))) withPrice++;
  }
  console.log('   filas MS en pagina      : ' + anchors.length + ' | con EUR189: ' + withPrice);
  console.log('   enlace MS awin correcto : ' + /awinmid=63816[^"]*GIT0064626/.test(g));
  console.log('   otros precios intactos  : ' + ["\u00a3159", "$249.99"].map(p => p + '=' + (g.includes("data-price='" + p + "'") ? 'ok' : 'FALTA')).join(' '));
}
const p = JSON.parse(fs.readFileSync('data/products.json', 'utf8')).find(x => x.id === 462);
console.log('\n462 excludeStores:', JSON.stringify(p.excludeStores));
console.log('462 musicstore   :', p.stores.musicstore);
console.log('462 precio canonico (sin cambios):', p.price, '| rating', p.rating, '/', p.reviews);
