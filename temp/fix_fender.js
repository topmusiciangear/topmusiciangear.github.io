const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const die = (m) => { console.log('!! ' + m); process.exit(1); };
const gj = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gj, 'utf8'));
const g = guides.find(x => x.id === 'fender-bass-guide');

// ---------- 1. featured: 4 -> 7 ----------
const want = [441, 442, 155, 156, 185, 157, 158];
g.featuredProducts = want;
console.log('featured: 4 -> 7 ' + JSON.stringify(want));

// ---------- 2. Cada review con UN solo producto ----------
const fixes = { 1: 441, 2: 442, 3: 155, 4: 156 };
Object.keys(fixes).forEach(i => {
  const s = g.sections[i];
  if (!s) die('seccion ' + i + ' no existe');
  const before = JSON.stringify(s.products);
  s.products = [fixes[i]];
  if (before === JSON.stringify(s.products)) console.log('SEC' + i + ' ya era ' + fixes[i]);
  else console.log('SEC' + i + ': ' + before + ' -> [' + fixes[i] + ']');
});
// SEC0 mantiene los 7
if (!g.sections[0].products.includes(185)) g.sections[0].products = want.slice();
console.log('SEC0 prods: ' + JSON.stringify(g.sections[0].products));

// ---------- 3. Tres reviews nuevas ----------
const has = g.sections.some(s => (s.products || []).length === 1 && [185, 157, 158].includes(s.products[0]));
if (has) die('ya existen reviews de 185/157/158');

g.sections.push({
  heading: 'Fender American Ultra II Precision Bass: The Modern Flagship',
  heading_es: 'Fender American Ultra II Precision Bass: el insignia moderno',
  products: [185],
  content: '<p><strong>The Ultra II is what Fender builds when it stops compromising.</strong> The Ultra II Noiseless split-coil P and matching bridge J give you the thump of a classic P-Bass with zero hum and no battery-free whine, and the active preamp with S-1 switching and 3-band EQ finally lets you shape a Precision instead of just accepting it.</p><p><strong>Why it earns the flagship money.</strong> The quartersawn maple Modern D neck with a 10-14 inch compound radius bends smoothly and still feels flat enough for classic lines, the sculpted heel gives real access to the upper frets, and the HiMass bridge keeps intonation honest under heavy strings. For session work, touring, or a player who wants one bass to cover everything, nothing else in the range comes close.</p>',
  content_es: '<p><strong>El Ultra II es lo que Fender construye cuando deja deanorzar.</strong> La split-coil P Ultra II Noiseless y la J de puente a juego te dan el golpe de un P-Bass clásico sin zumbido ni quejido de batería, y el previo activo con conmutación S-1 y EQ de 3 bandas por fin te deja moldear un Precision en vez de solo aceptarlo.</p><p><strong>Por qué se gana el precio insignia.</strong> El mástil de maple de cuartos Modern D con radio compuesto de 10-14 pulgadas permite bending suaves sin dejar de sentirse plano para las líneas clásicas, el talón esculpido da acceso real a los trastes altos y el puente HiMass mantiene la afinación honesta con cuerdas gruesas. Para sesiones, gira o un músico que quiere un solo bajo para todo, nada más en la gama se acerca.</p>'
});
g.sections.push({
  heading: "Squier Classic Vibe '60s Jazz Bass: Vintage Spec, Beginner Price",
  heading_es: "Squier Classic Vibe '60s Jazz Bass: specs vintage, precio de principiante",
  products: [157],
  content: '<p><strong>If you want the Jazz Bass formula without the Fender invoice, this is the one.</strong> Fender-designed alnico single-coils deliver the same punchy, articulate J-Bass voice, the vintage tint and tortoiseshell guard sell the 1960s look, and the slim C neck with a 9.5-inch radius board plays like a proper vintage Jazz.</p><p><strong>Why it belongs in a Fender guide.</strong> It is the cheapest honest route to the real J-Bass tone rather than an approximation — same pickup design philosophy, same neck geometry, roughly a fifth of the price of a made-in-USA Jazz. The catch is hardware and consistency: vintage-style open-gear tuners, no locking stability, and poplar weight that varies unit to unit. Play it, love it, upgrade the tuners later.</p>',
  content_es: '<p><strong>Si quieres la fórmula Jazz Bass sin la factura Fender, este es el bajo.</strong> Las single-coils alnico diseñadas por Fender dan la misma voz de J-Bass pegada y articulada, el tinte vintage y el golpeador carey venden el look de los 60, y el mástil C fino con diapasón de radio 9,5 se toca como un Jazz vintage de verdad.</p><p><strong>Por qué encaja en una guía de Fender.</strong> Es la ruta barata y honesta al tono real de J-Bass en vez de a una aproximación: misma filosofía de pastilla, misma geometría de mástil, alrededor de una quinta parte del precio de un Jazz made in USA. La contra son el hardware y la consistencia: clavijas abiertas vintage sin estabilidad de bloqueo y un peso de álamo que varía por unidad. Tócalo, encántalo y mejora las clavijas después.</p>'
});
g.sections.push({
  heading: 'Squier Affinity PJ: Two Pickups, Starter Money',
  heading_es: 'Squier Affinity PJ: dos pastillas, dinero de principiante',
  products: [158],
  content: '<p><strong>The cheapest way to hear both Fender voices at once.</strong> A split-coil Precision pickup in the neck and a single-coil Jazz in the bridge give you the thump and the snap from one bass — a genuine P/J layout, not a compromise — on a lightweight poplar body with a slim C maple neck and 20 frets.</p><p><strong>Why it earns a place here.</strong> For a first Fender-family instrument it is hard to argue with the price, and the P/J switching teaches you how pickups shape tone instead of hiding it behind one fixed voice. The honest limits are budget ones: ceramic pickups have less alnico complexity, the electronics are basic enough to want an upgrade, and the thin finish and fretwork vary from unit to unit. Learn on it, replace it when you know what you want.</p>',
  content_es: '<p><strong>La forma más barata de oír las dos voces Fender a la vez.</strong> Una split-coil Precision en el mástil y una single-coil Jazz en el puente te dan el golpe y el snap desde un solo bajo: un P/J real, no un apaño, sobre un cuerpo ligero de álamo con mástil C de maple y 20 trastes.</p><p><strong>Por qué se gana su sitio aquí.</strong> Como primer instrumento de la familia Fender, el precio es difícil de discutir, y cambiar entre P y J te enseña cómo las pastillas dan forma al tono en vez de esconderlo tras una única voz fija. Los límites honestos son de presupuesto: las cerámicas tienen menos complejidad que las alnico, la electrónica es tan básica que pide mejora, y el acabado fino y los trastes varían por unidad. Aprende con él y cámbialo cuando sepas qué buscas.</p>'
});
console.log('reviews nuevas: Ultra II, Classic Vibe 60s, Affinity PJ');

fs.writeFileSync(gj, JSON.stringify(guides, null, 2));

// ---------- VERIFICACION ----------
const solo = g.sections.filter(s => s.products && s.products.length === 1);
console.log('\nsecciones:', g.sections.length, '| reviews de 1 producto:', solo.length);
console.log('cada producto con review:', want.every(id => solo.some(s => s.products[0] === id)));
console.log('sin duplicar productos en reviews:', new Set(solo.map(s => s.products[0])).size === solo.length);
console.log('headings unicos:', new Set(g.sections.map(s => s.heading)).size === g.sections.length);
console.log('ES headings completos:', g.sections.every(s => !s.heading || s.heading_es));
console.log('tabla cols:', g.productTable.columns.length, '| featured:', g.featuredProducts.length);
console.log('desalineadas:', g.productTable.rows.filter(r => r.values.length !== g.productTable.columns.length).length);