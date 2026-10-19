// Corrige la conclusion de best-guitar-home-office: cita productos que NO estan
// en el catalogo ni en la tabla ("Headless Experience NX", "Donner Victim").
// Se reescribe para hablar solo de los productos que el visitante puede comprar.
const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));

fs.writeFileSync(B + 'temp/guides.before_ghfix.json', JSON.stringify(guides, null, 2), 'utf8');

const g = guides.find(x => x.id === 'best-guitar-home-office');
const antes = g.conclusion;

g.conclusion = 'For silent headphone practice at full scale, the Yamaha SLG200S is the mainstream choice, with the SLG200N covering nylon-string players who want the same approach. The Donner HUSH-I EVO2 is the smartest buy if you want a full-scale silent guitar and can stretch the budget. The Traveler Guitar Ultra-Light Steel and Ultra-Light Nylon are the most portable full-scale acoustics when every gram counts. Smart guitars like the Lava ME 4 and the Enya Nova Go Sonic bring built-in effects and apps for players who want no amp at all. And for authentic acoustic tone in a compact package, the Taylor GS Mini-e Koa is the best compact acoustic for small spaces. <p><a href="/guides/best-electric-guitars-2026.html" class="guide-link-btn">Best Electric Guitars: All Styles, All Levels</a> <a href="/guides/best-acoustic-guitars-for-beginners.html" class="guide-link-btn">Best Acoustic Guitars</a> <a href="/guides/compact-rhythm-devices.html" class="guide-link-btn">Top Compact Rhythm Devices & Pocket Samplers</a></p>';

// El veredicto tambien cita Pacifica 112V, THR10II y Spark 2 (fuera de tabla).
g.verdict = 'For most home offices, the Donner HUSH-I EVO2 is the smartest buy: full-scale, truly silent. The Taylor GS Mini-e Koa is the better choice if you want a real acoustic voice. If you want the most natural silent tone and can stretch the budget, the Yamaha SLG200S or SLG200N are the reference silent guitars, and the Traveler Ultra-Light Steel and Ultra-Light Nylon are the most portable full-scale acoustics. And if you want no amp at all, the Enya Nova Go Sonic and Lava ME 4 are the all-in-one future.';

// Verificar que ya no quedan productos inexistentes citados
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));
const tabla = new Set((g.productTable ? g.productTable.columns : []).map(c => c.title_es || c.title));
const texto = g.verdict + ' ' + g.conclusion;
['Headless Experience NX', 'Donner Victim', 'Pacifica 112V', 'THR10II', 'Spark 2'].forEach(n => {
  console.log((texto.includes(n) ? 'AUN SE CITA: ' : 'ok, ya no cita: ') + '"' + n + '"');
});
console.log('\nProductos citados que SI estan en la tabla:');
[...tabla].forEach(n => { if (texto.includes(n.split(' ')[0])) console.log('   ' + n); });

console.log('\nCONCLUSION antes:\n' + antes.substring(0, 150) + '...');
console.log('\nCONCLUSION ahora:\n' + g.conclusion.substring(0, 150) + '...');

fs.writeFileSync(B + 'data/guides.json', JSON.stringify(guides, null, 2), 'utf8');
console.log('\nBackup: temp/guides.before_ghfix.json');
console.log('data/guides.json escrito.');
