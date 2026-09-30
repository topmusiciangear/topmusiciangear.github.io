const fs = require('fs');
const pages = {
  EN: 'guides/budget-bass-like-expensive.html',
  ES: 'guides/budget-bass-like-expensive_es.html'
};
for (const [lang, f] of Object.entries(pages)) {
  const g = fs.readFileSync(f, 'utf8');
  const dataPrices = [...g.matchAll(/data-price='([^']+)'/g)].map(m => m[1]);
  // precios del producto 162 = los que caen en su fila (cercanos al art-BAS0012560 / 6V1B / EPIEIGTB6)
  const tb = [];
  for (const tok of ['art-BAS0012560', 'Thunderbird-64-Silver-Mist', 'EPIEIGTB6', 'B0CT44NB9F']) {
    let from = 0;
    while ((from = g.indexOf(tok, from)) !== -1) {
      for (const m of g.slice(Math.max(0, from - 4200), from + 4200).matchAll(/data-price='([^']+)'/g)) tb.push(m[1]);
      from += tok.length;
    }
  }
  const tbPrices = [...new Set(tb)];
  const txt = g.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
  const checks = {
    "titulo '64": g.includes("Thunderbird '64 Bass"),
    "sin '60s": !g.includes("Thunderbird '60s"),
    "ProBucker 760": g.includes('ProBucker 760'),
    "9-ply/9 capas": /9-ply|9 capas/.test(txt),
    "open-gear": /open-gear|Open-gear/i.test(txt),
    "precio MS 756 en boton": tb.some(p => p.includes('756')),
    "precio andertons 749": tb.some(p => p.includes('749')),
    "precio g4m 707": tb.some(p => p.includes('707')),
    "precios del 162": tbPrices.join(' ') + '   (esperado: £749, £707, €756 y ninguno 799/599)',
    "sin precio viejo 799": !tb.some(p => p.includes('799')),
    "sin precio viejo 599": !tb.some(p => p.includes('599')),
    "amazon B0CT44NB9F": g.includes('B0CT44NB9F'),
    "zzounds EPIEIGTB6": g.includes('EPIEIGTB6'),
    "MS BAS0012560": g.includes('BAS0012560'),
    "G4M 6V1B": g.includes('6V1B'),
    "reverb marketplace": /reverb\.com(%2F|\/)marketplace/.test(g),
    "veredicto menciona '64": /Thunderbird/.test(txt)
  };
  console.log('== ' + lang);
  for (const [k, v] of Object.entries(checks)) console.log('   ' + (v ? 'OK  ' : 'FALTA') + ' ' + k);
  const cons = /Es el bajo m.{0,12}caro de esta gu.{0,2}a/.test(txt);
  const consEn = /priciest bass in this guide/.test(txt);
  console.log('   pro/contra "mas caro/priciest": ' + (lang === 'ES' ? cons : consEn));
}
const p = JSON.parse(fs.readFileSync('data/products.json', 'utf8')).find(x => x.id === 162);
console.log('\nproducto 162:', JSON.stringify({ title: p.title, price: p.price, rating: p.rating, reviews: p.reviews, badge: p.badge, oos: p.oos || null }, null, 1));
console.log('stores:', Object.entries(p.stores).map(([k, v]) => k + '=' + v.slice(0, 62)).join('\n         '));
