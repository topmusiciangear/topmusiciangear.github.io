// Add Bronco 536 + Mikro 537; expand guide to 10; soften Minion "shortest".
const fs = require('fs');
const P = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const V = (value, value_es) => ({ value, value_es });
const W = (t) => ({ title: t, title_es: t });
const VD = (name, pros, cons, pros_es, cons_es) => ({ name, name_es: name, pros, cons, pros_es, cons_es });
const S = (heading, heading_es, content, content_es, products) => ({ heading, heading_es, content, content_es, products });
const AW = (mid, clean) => 'https://www.awin1.com/cread.php?awinmid=' + mid + '&awinaffid=2891111&ued=' + encodeURIComponent(clean);

// 1. Catalog
P.push(
  {
    id: 536, title: 'Squier Sonic Bronco Bass', title_es: 'Squier Sonic Bronco Bass', brand: 'Squier', category: 'basses', price: 149, rating: 4.7, reviews: 11,
    desc: '30-inch (762 mm) short-scale with a punchy ceramic single-coil in S position. Poplar body, satin maple C neck, 9.5-inch radius, 19 narrow-tall frets and master Volume plus Tone. The cheapest honest Fender-family bass.',
    desc_es: 'Escala corta 30" (762 mm) con contundente single-coil cerámica en posición S. Cuerpo de álamo, mástil C de arce satinado, radio 9,5", 19 trastes narrow tall y Volumen más Tono master. El bajo honesto más barato de la familia Fender.',
    img: 'https://r2.gear4music.com/media/91/911029/1200/preview.jpg',
    stores: {
      gear4music: AW('1117', 'https://www.gear4music.com/Guitar-and-Bass/Squier-Sonic-Bronco-Bass-Tahitian-Coral/5E3O'),
      andertons: 'https://www.andertons.co.uk/squier-sonic-bronco-bass-guitar-tahitian-coral/',
      zzounds: 'https://www.zzounds.com/a--925521/item--SQU0373800'
    }
  },
  {
    id: 537, title: 'Ibanez GSRM20 Mikro Bass', title_es: 'Ibanez GSRM20 Mikro Bass', brand: 'Ibanez', category: 'basses', price: 190, rating: 4.7, reviews: 12,
    desc: '28.6-inch (726 mm) micro-scale with passive Dynamix P plus J pickups. Poplar body, maple GSRM4 neck, jatoba or pine board depending on finish, 22 medium frets and dual volumes plus master tone. Maximum versatility per inch.',
    desc_es: 'Micro-escala 28,6" (726 mm) con pastillas pasivas Dynamix P más J. Cuerpo de álamo, mástil GSRM4 de arce, diapasón jatoba o pino según acabado, 22 trastes medium y dos volúmenes más tono master. Máxima versatilidad por pulgada.',
    img: 'https://r2.gear4music.com/media/33/334902/1200/preview.jpg',
    stores: {
      gear4music: AW('1117', 'https://www.gear4music.com/Guitar-and-Bass/Ibanez-GSRM20B-GIO-miKro-Bass-Weathered-Black/2APJ'),
      andertons: 'https://www.andertons.co.uk/ibanez-gsrm20b-wnf-mikro-gio-bass-in-walnut-flat/',
      zzounds: 'https://www.zzounds.com/a--925521/item--IBAGSRM20',
      musicstore: AW('63816', 'https://www.musicstore.com/en_GB/GBP/Ibanez-miKro-GSRM20B-WNF-Walnut-Flat/art-BAS0008309-000')
    }
  }
);
fs.writeFileSync('data/products.json', JSON.stringify(P, null, 2));

// 2. Guide
const g = G.find(x => x.id === 'best-bass-home-office');
g.titleTag = '10 Quiet Basses for Home Offices Compared (2026)';
g.titleTag_es = '10 bajos silenciosos para home office: comparativa (2026)';
['Squier Sonic Bronco Bass', 'Ibanez GSRM20 Mikro Bass'].forEach(t => g.productTable.columns.push(W(t)));
const rows = {};
g.productTable.rows.forEach(r => { rows[r.label] = r; });
const put = (label, arr) => rows[label].values.push(...arr);
put('Best For', [V('Budget Fender short-scale for desks', 'Escala corta Fender económica para escritorios'), V('Micro-scale PJ versatility on a budget', 'Versatilidad PJ micro-escala económica')]);
put('Type', [V('Short-scale solid-body', 'Sólido escala corta'), V('Micro-scale solid-body', 'Sólido micro-escala')]);
put('Scale Length', [V('30 in (762 mm)', '30" (762 mm)'), V('28.6 in (726 mm)', '28,6" (726 mm)')]);
put('Weight', [V('Not published (varies by unit)', 'No publicado (varía por unidad)'), V('Not published (varies by unit)', 'No publicado (varía por unidad)')]);
put('Body', [V('Poplar, Bronco shape', 'Álamo, forma Bronco'), V('Poplar, SR Mikro', 'Álamo, SR Mikro')]);
put('Neck & Fretboard', [V('Maple C satin, 9.5 in, 19 narrow tall', 'Arce C satén, 9,5", 19 narrow tall'), V('Maple GSRM4, jatoba/pine, 22 medium', 'Arce GSRM4, jatoba/pino, 22 medium')]);
put('Pickups', [V('Ceramic single-coil (S)', 'Single-coil cerámica (S)'), V('Dynamix P + J (passive)', 'Dynamix P + J (pasivas)')]);
put('Electronics', [V('Master Vol + Tone', 'Vol + Tono master'), V('2x Vol + Tone', '2x Volumen + Tono')]);
put('Gig Bag Included', [V('No', 'No'), V('No', 'No')]);

g.verdictProsCons.push(
  VD('Squier Sonic Bronco Bass',
    ['True 30-inch Fender short-scale under £170', 'Punchy ceramic single-coil with simple Vol plus Tone', 'Satin C neck with sealed tuners, stable tuning', 'Huge beginner community and resale market'],
    ['Single pickup limits voices', 'Only 19 frets', 'No gig bag included', 'Light poplar body feels insubstantial to full-size players'],
    ['Verdadera escala corta Fender 30" por menos de £170', 'Contundente single-coil cerámica con Vol más Tono simples', 'Mástil C satinado con clavijas selladas, afinación estable', 'Comunidad principiante y reventa enormes'],
    ['Una sola pastilla limita voces', 'Solo 19 trastes', 'Sin funda incluida', 'El cuerpo ligero de álamo se siente insustancial frente a tamaños reales']),
  VD('Ibanez GSRM20 Mikro Bass',
    ['28.6 inches ties the shortest real-wood scale', 'Dynamix PJ versatility — P punch plus J articulation', 'Light poplar body with comfy maple neck', 'Massive owner community, strings easy to find'],
    ['Only 22 medium frets', 'No gig bag included', 'Passive only — no onboard EQ', 'Cramped spacing for large hands'],
    ['28,6" empatadas como escala de madera real más corta', 'Versatilidad Dynamix PJ — pegada P más articulación J', 'Cuerpo ligero de álamo con mástil cómodo de arce', 'Comunidad enorme, cuerdas fáciles de encontrar'],
    ['Solo 22 trastes medium', 'Sin funda incluida', 'Solo pasivo — sin EQ a bordo', 'Espaciado estrecho para manos grandes'])
);

// Sections (insert before scale-tech at index 9)
g.sections.splice(9, 0,
  S('Squier Sonic Bronco: The Cheapest Fender-Family Desk Bass', 'Squier Sonic Bronco: El bajo de escritorio Fender más barato',
    '<strong>Thirty inches of Fender short-scale with one punchy ceramic single-coil and nothing to learn.</strong> Poplar Bronco body, satin maple C neck with 9.5-inch radius and 19 narrow-tall frets, master Volume plus master Tone, sealed die-cast tuners. The default answer when the budget is tight and the desk is small.',
    '<strong>Treinta pulgadas de escala corta Fender con una contundente single-coil cerámica y nada que aprender.</strong> Cuerpo Bronco de álamo, mástil C de arce satinado con radio 9,5" y 19 trastes narrow tall, Volumen master más Tono master, clavijas selladas fundidas. La respuesta por defecto con presupuesto ajustado y escritorio pequeño.', [536]),
  S('Ibanez GSRM20 Mikro: 28.6 Inches Tied for Shortest', 'Ibanez GSRM20 Mikro: 28,6 pulgadas empatadas como más corto',
    '<strong>Tied with the Minion at 28.6 inches, the Mikro answers with Dynamix PJ versatility.</strong> Passive split-coil P plus single-coil J with dual volumes and master tone, poplar body, maple GSRM4 neck with 22 medium frets. The pick when micro size must still cover jazz warmth and rock bite.',
    '<strong>Empatado con el Minion en 28,6", el Mikro responde con versatilidad Dynamix PJ.</strong> Split-coil P pasiva más single-coil J con dos volúmenes y tono master, cuerpo de álamo, mástil GSRM4 de arce con 22 trastes medium. La elección cuando el micro tamaño debe cubrir calidez jazz y mordida rock.', [537])
);
g.featuredProducts.push(536, 537);

// Text updates: counts, Minion softening, verdict + conclusion, new FAQ
let s = JSON.stringify(g);
const R = [
  ['eight basses in this guide', 'ten basses in this guide'],
  ['Los ocho bajos de esta guía', 'Los diez bajos de esta guía'],
  ['any of these eight basses', 'any of these ten basses'],
  ['cualquiera de estos ocho bajos', 'cualquiera de estos diez bajos'],
  ['For the other seven basses', 'For the other nine basses'],
  ['Para los otros siete', 'Para los otros nueve'],
  ['Jackson JS1X Minion: The Shortest Real-Wood Bass', 'Jackson JS1X Minion: Micro-Scale Value at 28.6 Inches'],
  ['Jackson JS1X Minion: El bajo de madera real más corto', 'Jackson JS1X Minion: Valor micro-escala en 28,6 pulgadas'],
  ['Need the shortest real-wood bass for quick lines? Jackson Minion.', 'Need the cheapest micro-scale bass for quick lines? Jackson Minion.'],
  ['¿El bajo de madera real más corto para líneas rápidas? Jackson Minion.', '¿El micro-escala más barato para líneas rápidas? Jackson Minion.'],
  ['Shortest real-wood bass for the desk', 'Cheapest micro-scale bass for the desk'],
  ['Bajo de madera real más corto para el escritorio', 'Micro-escala más barato para el escritorio']
];
R.forEach(([a, b]) => { s = s.split(a).join(b); });
g.__tmp = null;
const g2 = JSON.parse(s);
const gi = G.findIndex(x => x.id === 'best-bass-home-office');
G[gi] = g2;

// Minion verdict pros[0]
const mv = G[gi].verdictProsCons.find(v => v.name === 'Jackson JS1X Concert Bass Minion');
if (mv) {
  mv.pros[0] = 'Micro-scale tied-shortest at 28.6 inches';
  const pes = mv.pros_es[0] || '';
  mv.pros_es[0] = 'Micro-escala empatada como más corta con 28,6"';
}
// Verdict lines + conclusion
const V_ = G[gi].verdict;
G[gi].verdict = V_.split('Need the cheapest micro-scale bass for quick lines? Jackson Minion.').join('Need the cheapest micro-scale bass for quick lines? Jackson Minion. Need the cheapest Fender short-scale? Squier Bronco. Need PJ versatility at micro size? Ibanez Mikro.');
const Ve = G[gi].verdict_es;
G[gi].verdict_es = Ve.split('¿El micro-escala más barato para líneas rápidas? Jackson Minion.').join('¿El micro-escala más barato para líneas rápidas? Jackson Minion. ¿La escala corta Fender más barata? Squier Bronco. ¿Versatilidad PJ en micro tamaño? Ibanez Mikro.');
G[gi].conclusion = G[gi].conclusion + ' On a tight budget, the Squier Bronco brings honest Fender short-scale tone and the Ibanez Mikro brings PJ versatility — both micro-desk friendly.';
G[gi].conclusion_es = G[gi].conclusion_es + ' Con presupuesto ajustado, el Squier Bronco aporta tono honesto de escala corta Fender y el Ibanez Mikro aporta versatilidad PJ — ambos amigables con micro escritorios.';
// New FAQ: community travel recommendation
G[gi].faq.push(
  { q: 'Which travel bass do experienced players recommend most?', a: 'For flying with a full 34-inch scale, the Steinberger XT-2 is the longtime community default: decades of tour use, 38.5 inches and 7.5 lb, with DoubleBall tuning stability players trust. For absolute lightest weight, the 1.55 kg Traveler Ultra-Light is the pick. Choose scale realism (XT-2) or minimum weight (Ultra-Light).', q_es: '¿Qué bajo de viaje recomiendan más los experimentados?', a_es: 'Para volar con escala completa de 34", el Steinberger XT-2 es el clásico de la comunidad: décadas de giras, 38,5" y 7,5 lb, con estabilidad DoubleBall de confianza. Para el peso mínimo absoluto, el Traveler Ultra-Light de 1,55 kg. Elige realismo de escala (XT-2) o peso mínimo (Ultra-Light).' }
);
fs.writeFileSync('data/guides.json', JSON.stringify(G, null, 2));
const gg = JSON.parse(fs.readFileSync('data/guides.json', 'utf8')).find(x => x.id === 'best-bass-home-office');
console.log('cols=' + gg.productTable.columns.length + ' verdict=' + gg.verdictProsCons.length + ' sections=' + gg.sections.length + ' faq=' + gg.faq.length + ' rowsok=' + gg.productTable.rows.every(r => r.values.length === gg.productTable.columns.length));
const left = JSON.stringify(gg).match(/hortest real-wood|ocho bajos|other seven|eight basses/g);
console.log('restos: ' + (left ? [...new Set(left)].join(',') : 'none'));
