const fs = require('fs');
const path = require('path');
const fp = path.join(__dirname, '..', 'data', 'guides.json');
const g = JSON.parse(fs.readFileSync(fp, 'utf8'));
const idx = g.findIndex(v => v.id === 'best-beginner-electric-guitar');
if (idx === -1) { console.error('guide not found'); process.exit(1); }
const x = g[idx];

// --- REWORK SECTION 5 (Revstar): remove Player II, redirect to 700+ tier ---
const sec5EN = '<p><strong>If your beginner budget stretches higher, the Yamaha Revstar Element RSE20 is the guitar you will never outgrow.</strong> It is a set-neck, chambered-mahogany humbucker guitar that plays beautifully from day one and stays with you for years — no need for a second guitar down the road.</p><p><strong>Why higher-budget beginners love it: </strong>A chambered mahogany body with a set-in neck gives warm, singing sustain. Two Alnico V humbuckers cover everything from clean sparkle to classic rock. The push-pull Dry Switch adds a high-pass filter for extra clarity, and the tune-o-matic bridge with stopbar keeps tuning rock-solid. It is lighter and more comfortable than a Les Paul, so it beats the premium options as a first guitar.</p><p><strong>Going above $700: </strong>This guide focuses on beginner guitars under $700. If your budget goes higher and you want a premium instrument right away — the Fender Player II series, or professional models — see our <a href="/guides/best-electric-guitar.html" class="guide-link-btn">Best Electric Guitar guide</a>, which covers the full range from mid-price to pro.</p>';

const sec5ES = '<p><strong>Si tu presupuesto de principiante alcanza un poco más, la Yamaha Revstar Element RSE20 es la guitarra que nunca superarás.</strong> Es una guitarra de humbuckers con cuerpo de caoba ahuecada y mástil set-in que toca divinamente desde el primer día y te acompañará durante años — sin necesidad de una segunda guitarra en el futuro.</p><p><strong>Por qué la quieren los principiantes de presupuesto más alto: </strong>Un cuerpo de caoba ahuecada con mástil set-in ofrece un sustain cálido y cantarín. Dos humbuckers de Alnico V cubren desde limpios brillantes hasta rock clásico. El Dry Switch push-pull añade un filtro de paso alto para más claridad, y el puente tune-o-matic con tope mantiene la afinación impecable. Es más ligera y cómoda que una Les Paul, así que gana a las opciones premium como primera guitarra.</p><p><strong>¿Buscas más de $700? </strong>Esta guía se centra en guitarras de principiante por debajo de $700. Si tu presupuesto es mayor y quieres un instrumento premium ya —la serie Fender Player II o los modelos profesionales— consulta nuestra <a href="/guides/best-electric-guitar_es.html" class="guide-link-btn">guía de la Mejor Guitarra Eléctrica</a>, que cubre toda la gama desde precio medio hasta profesional.</p>';

x.sections[5].content = sec5EN;
x.sections[5].content_es = sec5ES;
x.sections[5].products = [464];

// --- CONCLUSION ---
x.conclusion = 'For most beginners, the Yamaha Pacifica 112V is the best all-round starter — great build, versatile HSS pickups, and easy playability at a fair price. If you want the classic Strat look, the Squier Affinity Stratocaster delivers, while the Squier Sonic Stratocaster HT is the simplest, lowest-stress choice for staying in tune. If rock and metal are your thing, the Ibanez Gio GRG121DX is the best-value rocker here. If your budget stretches further, the Yamaha Revstar RSE20 is a guitar you will keep for years. And if you are ready to go above $700, see the Best Electric Guitar guide for the premium Player II and pro models. Whichever you choose, budget for a professional setup and a good amp like the Boss Katana 50. <p><a href="/guides/player-strat-vs-pacifica.html" class="guide-link-btn">Player Strat vs Pacifica</a> <a href="/guides/best-electric-guitar.html" class="guide-link-btn">Best Electric Guitar</a> <a href="/guides/beginner-guitar.html" class="guide-link-btn">Best Beginner Guitars for Songwriting</a></p>';

x.conclusion_es = 'Para la mayoría de los principiantes, la Yamaha Pacifica 112V es la mejor opción todoterreno —buena construcción, pastillas HSS versátiles y gran tocabilidad a un precio justo. Si quieres el aspecto clásico de Strat, la Squier Affinity lo ofrece, mientras que la Squier Sonic Stratocaster HT es la elección más sencilla y sin estrés para mantener la afinación. Si el rock y el metal son lo tuyo, la Ibanez Gio GRG121DX es la rockera con mejor relación calidad-precio. Si tu presupuesto alcanza más, la Yamaha Revstar RSE20 es una guitarra que conservarás durante años. Y si estás listo para pasar de $700, consulta la guía de la Mejor Guitarra Eléctrica para los modelos premium Player II y profesionales. Elijas la que elijas, presupuesta un ajuste profesional y un buen amplificador como el Boss Katana 50. <p>También te interesa: <a href="/guides/player-strat-vs-pacifica_es.html" class="guide-link-btn">Player Strat vs Pacifica</a> <a href="/guides/best-electric-guitar_es.html" class="guide-link-btn">Mejor Guitarra Eléctrica</a> <a href="/guides/beginner-guitar_es.html" class="guide-link-btn">Mejores Guitarras para Principiantes y Composición</a></p>';

// --- VERDICT ---
x.verdict = 'The Yamaha Pacifica 112V is the best value beginner electric — it plays above its price and grows with you. The Squier Sonic Stratocaster HT is the easiest for staying in tune, the Squier Affinity is the classic Strat pick, and the Ibanez Gio GRG121DX is the best rock/metal choice. If your budget is higher, the Yamaha Revstar RSE20 is a guitar you won\'t outgrow.';

x.verdict_es = 'La Yamaha Pacifica 112V es la mejor eléctrica de inicio en valor —se toca por encima de su precio y crece contigo. La Squier Sonic Stratocaster HT es la más fácil de mantener afinada, la Squier Affinity es la clásica, y la Ibanez Gio GRG121DX es la mejor para rock y metal. Si tu presupuesto es mayor, la Yamaha Revstar RSE20 es una guitarra que no superarás.';

// --- PRODUCT TABLE: ALL 8 BEGINNER GUITARS ---
x.productTable = {
  title: 'Best Beginner Electric Guitars Compared',
  title_es: 'Comparativa de las mejores guitarras eléctricas para principiantes',
  columns: [
    { title: 'Yamaha Pacifica 112V', title_es: 'Yamaha Pacifica 112V' },
    { title: 'Squier Affinity Stratocaster', title_es: 'Squier Affinity Stratocaster' },
    { title: 'Squier Sonic Stratocaster HT', title_es: 'Squier Sonic Stratocaster HT' },
    { title: 'Squier Sonic Mustang', title_es: 'Squier Sonic Mustang' },
    { title: 'Squier Debut Stratocaster', title_es: 'Squier Debut Stratocaster' },
    { title: 'Enya Nova Go Sonic', title_es: 'Enya Nova Go Sonic' },
    { title: 'Ibanez Gio GRG121DX', title_es: 'Ibanez Gio GRG121DX' },
    { title: 'Yamaha Revstar Element RSE20', title_es: 'Yamaha Revstar Element RSE20' }
  ],
  rows: [
    { label: 'Price', label_es: 'Precio', values: [
      { value: '$349', value_es: '$349' },
      { value: '$320', value_es: '$320' },
      { value: '$159', value_es: '$159' },
      { value: '$209', value_es: '$209' },
      { value: '$147', value_es: '$147' },
      { value: '$369.99', value_es: '$369,99' },
      { value: '$199', value_es: '$199' },
      { value: '$439', value_es: '$439' }
    ]},
    { label: 'Best For', label_es: 'Ideal Para', values: [
      { value: 'Best all-rounder for most beginners', value_es: 'La mejor todoterreno para la mayoría' },
      { value: 'Classic Stratocaster look on a budget', value_es: 'Aspecto clásico de Stratocaster económico' },
      { value: 'Starting simple, staying in tune', value_es: 'Empezar sencillo, mantener la afinación' },
      { value: 'Kids & smaller hands', value_es: 'Niños y manos pequeñas' },
      { value: 'Cheapest real Strat experience', value_es: 'La experiencia Strat real más barata' },
      { value: 'Play anywhere, no amp needed', value_es: 'Tocar en cualquier sitio, sin amplificador' },
      { value: 'Rock, punk & metal beginners', value_es: 'Principiantes de rock, punk y metal' },
      { value: 'Higher budget, keep it for years', value_es: 'Presupuesto alto, conservarla años' }
    ]},
    { label: 'Body Wood', label_es: 'Madera del Cuerpo', values: [
      { value: 'Alder', value_es: 'Aliso' },
      { value: 'Poplar', value_es: 'Álamo' },
      { value: 'Poplar', value_es: 'Álamo' },
      { value: 'Poplar (offset)', value_es: 'Álamo (offset)' },
      { value: 'Poplar', value_es: 'Álamo' },
      { value: 'Carbon fiber', value_es: 'Fibra de carbono' },
      { value: 'Poplar', value_es: 'Álamo' },
      { value: 'Chambered mahogany', value_es: 'Caoba ahuecada' }
    ]},
    { label: 'Neck', label_es: 'Mástil', values: [
      { value: 'C-shape maple', value_es: 'Arce en C' },
      { value: 'C-shape maple, satin', value_es: 'Arce en C satinado' },
      { value: 'Slim C-shape maple', value_es: 'Arce en C delgado' },
      { value: 'Slim C-shape maple', value_es: 'Arce en C delgado' },
      { value: 'Slim C-shape maple', value_es: 'Arce en C delgado' },
      { value: 'C-shape composite', value_es: 'Compuesto en C' },
      { value: 'Slim GRG maple', value_es: 'Arce GRG delgado' },
      { value: 'Set-in C', value_es: 'C set-in' }
    ]},
    { label: 'Frets & Fretboard', label_es: 'Trastes y Diapasón', values: [
      { value: '22 medium, rosewood', value_es: '22 medium, palo rosa' },
      { value: '21 medium jumbo, maple/laurel', value_es: '21 medium jumbo, arce/laurel' },
      { value: '21 medium, maple', value_es: '21 medium, arce' },
      { value: '21 medium jumbo, maple/laurel', value_es: '21 medium jumbo, arce/laurel' },
      { value: '21 medium jumbo, maple', value_es: '21 medium jumbo, arce' },
      { value: '22, composite', value_es: '22, compuesto' },
      { value: '24, maple', value_es: '24, arce' },
      { value: '22 medium, rosewood', value_es: '22 medium, palo rosa' }
    ]},
    { label: 'Pickups', label_es: 'Pastillas', values: [
      { value: 'HSS — humbucker + 2 single coils', value_es: 'HSS — humbucker + 2 single coils' },
      { value: '3 ceramic single coils', value_es: '3 single coils cerámicas' },
      { value: '3 ceramic single coils', value_es: '3 single coils cerámicas' },
      { value: '2 ceramic single coils', value_es: '2 single coils cerámicas' },
      { value: '3 ceramic single coils', value_es: '3 single coils cerámicas' },
      { value: 'Humbucker + single coil', value_es: 'Humbucker + single coil' },
      { value: '2 IBZ-6 humbuckers', value_es: '2 humbuckers IBZ-6' },
      { value: '2 Alnico V humbuckers', value_es: '2 humbuckers Alnico V' }
    ]},
    { label: 'Scale Length', label_es: 'Longitud de Escala', values: [
      { value: '25.5 in (648 mm)', value_es: '25,5" (648 mm)' },
      { value: '25.5 in (648 mm)', value_es: '25,5" (648 mm)' },
      { value: '25.5 in (648 mm)', value_es: '25,5" (648 mm)' },
      { value: '24 in (610 mm)', value_es: '24" (610 mm)' },
      { value: '25.5 in (648 mm)', value_es: '25,5" (648 mm)' },
      { value: '25.5 in (648 mm)', value_es: '25,5" (648 mm)' },
      { value: '25.5 in (648 mm)', value_es: '25,5" (648 mm)' },
      { value: '24.75 in (628 mm)', value_es: '24,75" (628 mm)' }
    ]},
    { label: 'Tremolo / Bridge', label_es: 'Trémolo / Puente', values: [
      { value: 'Vintage-style tremolo', value_es: 'Trémolo estilo vintage' },
      { value: '2-point sync tremolo', value_es: 'Trémolo sincronizado de 2 puntos' },
      { value: 'Fixed (hardtail)', value_es: 'Fijo (hardtail)' },
      { value: 'Fixed 6-saddle hardtail', value_es: 'Hardtail fijo de 6 selletas' },
      { value: 'Tremolo with removable arm', value_es: 'Trémolo con palanca extraíble' },
      { value: 'Fixed', value_es: 'Fijo' },
      { value: 'Fixed F106 bridge', value_es: 'Puente fijo F106' },
      { value: 'Tune-o-matic + stopbar', value_es: 'Tune-o-matic + tope' }
    ]},
    { label: 'Tuners', label_es: 'Clavijas', values: [
      { value: 'Sealed die-cast', value_es: 'Selladas de fundición' },
      { value: 'Sealed die-cast', value_es: 'Selladas de fundición' },
      { value: 'Sealed', value_es: 'Selladas' },
      { value: 'Sealed die-cast', value_es: 'Selladas de fundición' },
      { value: 'Sealed-gear', value_es: 'Con engranaje sellado' },
      { value: 'Sealed', value_es: 'Selladas' },
      { value: 'Die-cast', value_es: 'De fundición' },
      { value: 'Sealed', value_es: 'Selladas' }
    ]},
    { label: 'Weight', label_es: 'Peso', values: [
      { value: '~7.5 lb (3.4 kg)', value_es: '~3,4 kg' },
      { value: '~7.5 lb (3.4 kg)', value_es: '~3,4 kg' },
      { value: '~7.0 lb (3.2 kg)', value_es: '~3,2 kg' },
      { value: '~6.0 lb (2.7 kg)', value_es: '~2,7 kg' },
      { value: '~7.0 lb (3.2 kg)', value_es: '~3,2 kg' },
      { value: '~6.0 lb (2.7 kg)', value_es: '~2,7 kg' },
      { value: '~7.7 lb (3.5 kg)', value_es: '~3,5 kg' },
      { value: '~7.3 lb (3.3 kg)', value_es: '~3,3 kg' }
    ]}
  ]
};

// --- VERDICT PROS/CONS stays with the 4 hero picks, but update names to match table order ---
// already: Pacifica, Sonic HT, Affinity, Gio — fine.

g[idx] = x;
fs.writeFileSync(fp, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('updated: removed Player II from sec5, expanded table to 8 guitars, updated conclusion/verdict');