const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const P = require(DIR + 'data/products.json');
const G = require(DIR + 'data/guides.json');
function rep(obj, key, oldS, newS, tag) {
  if (!obj[key] || !obj[key].includes(oldS)) { console.log('MISS [' + tag + ']: ' + oldS.slice(0, 90)); process.exitCode = 1; return; }
  obj[key] = obj[key].split(oldS).join(newS);
  console.log('OK ' + tag);
}
if (P.some(p => p.id === 557)) { console.log('557 EXISTS'); process.exit(1); }

// ---- 1. Catalog: new product 557 ----
P.push({
  id: 557,
  title: 'Boss Katana-50 EX Gen 3',
  title_es: 'Boss Katana-50 EX Gen 3',
  brand: 'Boss',
  category: 'amps',
  price: 399.99,
  rating: 4.8,
  reviews: 65,
  desc: 'The stage-ready Katana 50. The EX Gen 3 keeps 50 watts through a custom stage-voiced 12-inch speaker and adds what gigging players missed: full GA-FC and GA-FC EX foot controller support, a dedicated Line Out for the house PA, Stereo Expand to link a second Katana, and Power Amp In for modelers. Six amp characters including the new Pushed edge-of-breakup voice (each with a variation for 12 tones), five simultaneous effects sections, four Tone Setting memories, power scaling down to 0.5W, and USB-C recording at 11.7 kg.',
  desc_es: 'El Katana 50 listo para escenario. El EX Gen 3 mantiene 50 vatios con un altavoz de 12 pulgadas a medida con voz de escenario y añade lo que los guitarristas de directo echaban en falta: soporte completo de pedaleras GA-FC y GA-FC EX, salida de línea dedicada para la mesa, Stereo Expand para enlazar un segundo Katana y Power Amp In para modeladores. Seis caracteres con el nuevo Pushed al borde de la rotura (cada uno con variación para 12 tonos), cinco secciones de efectos simultáneos, cuatro memorias Tone Setting, escalado de potencia hasta 0,5W y grabación USB-C con 11,7 kg.',
  img: 'https://r2.gear4music.com/media/108/1082722/1200/preview.jpg',
  stores: {
    gear4music: 'https://www.gear4music.com/Guitar-and-Bass/Boss-Katana-50-EX-Gen-3-1x12-Combo/6E9C',
    musicstore: 'https://www.musicstore.com/en_OE/EUR/Boss-Katana-50-EX-Gen-3-Combo/art-GIT0061743-000',
    amazon: 'https://www.amazon.com/Katana-50-50-watt-12-inch-Combo-Amplifier/dp/B0D1ZCK91X',
    andertons: 'https://www.andertons.co.uk/boss-katana-50-ex-gen-3-50w-guitar-amp-combo/',
    zzounds: 'https://www.zzounds.com/item--BOSKTN50EXV3'
  }
});

// ---- 2. Guide swap 72 -> 557 ----
const g = G.find(x => x.id === 'guitar-bass-amps');
const tube = g.sections[0];
tube.products = tube.products.map(id => id === 72 ? 557 : id);

const kat = g.sections.find(s => s.products.length === 1 && s.products[0] === 72);
kat.heading = 'Boss Katana-50 EX Gen 3: The Gig-Ready Modeling Amp';
kat.heading_es = 'Boss Katana-50 EX Gen 3: El ampli de modelado listo para el escenario';
kat.content = '<strong>The standard Katana 50\'s weakness was stage control — the EX fixes exactly that.</strong> The Katana-50 EX Gen 3 keeps the 50W formula and adds what gigging players missed: full GA-FC and GA-FC EX foot controller support (8 memories, effects switching, expression), a dedicated Line Out for the house PA, Stereo Expand to link a second Katana, an upgraded stage-voiced 12-inch speaker and Power Amp In for modelers. Six amp characters including the new Pushed edge-of-breakup voice, each with a variation, plus five simultaneous effects sections and USB-C recording complete the package. I have gigged the standard 50 and missed hands-free switching every set; the EX removes that ceiling. Made for rehearsing guitarists stepping onto stages. Check foot controller budget (GA-FC sold separately), Line Out needs and speaker expectations before buying.';
kat.content_es = '<strong>El punto débil del Katana 50 estándar era el control en escenario — el EX lo corrige exactamente.</strong> El Katana-50 EX Gen 3 mantiene la fórmula de 50W y añade lo que los guitarristas de directo echaban en falta: soporte completo de pedaleras GA-FC y GA-FC EX (8 memorias, cambio de efectos, expresión), salida de línea dedicada para la mesa, Stereo Expand para enlazar un segundo Katana, altavoz de 12 pulgadas mejorado con voz de escenario y Power Amp In para modeladores. Seis caracteres de amplificador con el nuevo Pushed al borde de la rotura, cada uno con variación, más cinco secciones de efectos simultáneos y grabación USB-C completan el paquete. He tocado con el 50 estándar y eché en falta el cambio manos libres en cada concierto; el EX elimina ese techo. Pensado para guitarristas que ensayan y suben al escenario. Revisa el presupuesto de pedalera (GA-FC se vende aparte), si necesitas salida de línea y las expectativas del altavoz antes de comprar.';
kat.products = [557];

// verdict entry
const vi = g.verdictProsCons.findIndex(v => v.name === 'Boss Katana 50 Gen 3');
g.verdictProsCons[vi] = {
  name: 'Boss Katana-50 EX Gen 3',
  name_es: 'Boss Katana-50 EX Gen 3',
  pros: [
    'GA-FC and GA-FC EX foot controller support — full hands-free stage control the standard 50 lacks',
    'Dedicated Line Out plus Stereo Expand — feed the house PA or link a second Katana',
    'Six amp characters including Pushed, each with a variation — 12 stage-ready tones',
    'USB-C recording, Power Amp In and power scaling — studio, modelers and bedroom volume covered'
  ],
  pros_es: [
    'Soporte de pedaleras GA-FC y GA-FC EX — control total manos libres que el 50 estándar no tiene',
    'Salida de línea dedicada más Stereo Expand — alimenta la mesa o enlaza un segundo Katana',
    'Seis caracteres con Pushed, cada uno con variación — 12 tonos listos para escenario',
    'Grabación USB-C, Power Amp In y escalado de potencia — estudio, modeladores y volumen de dormitorio cubiertos'
  ],
  cons: [
    'No effects loop for pedalboard integration',
    'GA-FC foot controller sold separately — stage control costs extra',
    'Single 12-inch speaker cannot move air like a 2x12 on big stages',
    'No speaker output — cannot drive an external cab',
    'Bluetooth adapter (BT-DUAL) sold separately — wireless editing costs extra'
  ],
  cons_es: [
    'Sin effects loop para integrar pedaleras',
    'Pedalera GA-FC se vende aparte — el control de escenario cuesta extra',
    'Un solo altavoz de 12 pulgadas no mueve aire como un 2x12 en escenarios grandes',
    'Sin salida de altavoz — no mueve una cabina externa',
    'Adaptador Bluetooth (BT-DUAL) se vende aparte — la edición inalámbrica cuesta extra'
  ]
};

// table column + values
const pt = g.productTable;
const ci = pt.columns.findIndex(c => c.title === 'Boss Katana 50 Gen 3');
pt.columns[ci] = { title: 'Boss Katana-50 EX Gen 3', title_es: 'Boss Katana-50 EX Gen 3' };
for (const row of pt.rows) {
  const V = row.values[ci];
  if (row.label === 'Best For') { V.value = 'Gig-ready modeling amp for home and stage'; V.value_es = 'Ampli de modelado listo para casa y escenario'; }
  if (row.label === 'Estimated Price') { V.value = '~$399.99'; V.value_es = '~$399.99'; }
  if (row.label === 'Channels') { V.value_es = '6 tipos de ampli'; }
  if (row.label === 'Outputs') { V.value = 'Headphones, REC out, Line out, GA-FC support'; V.value_es = 'Auriculares, salida REC, salida de línea, soporte GA-FC'; }
  if (row.label === 'Weight / Power Source') { V.value = '25.8 lb (11.7 kg), mains powered'; V.value_es = '11,7 kg, red eléctrica'; }
}

// FAQ q2
const fs2 = g.featuredSnippet;
rep(fs2, 'faq_q2_en', 'Is the Boss Katana 50 Gen 3 the best budget modeling amp?', 'Is the Boss Katana-50 EX Gen 3 the best modeling amp for stage and home?', 'faq2q-en');
rep(fs2, 'faq_a2_en', 'Yes, it is the best value in practice amps. The Katana 50 Gen 3 packs five amp voicings and 55 built-in effects into a lightweight combo, making it the most versatile modeling amp for practicing, recording and small gigs. Its headphone output with cab simulation makes silent practice easy, which is why it is the most recommended starter amp.', 'Yes, it is the best value in gig-ready modeling. The Katana-50 EX Gen 3 packs six amp voicings (including Pushed) with variations, GA-FC foot controller support, Line Out and Stereo Expand into a 50W 1x12 combo, making it the most versatile modeling amp for practicing, recording and gigging. Its headphone output with cab simulation makes silent practice easy, which is why it is the most recommended step-up amp.', 'faq2a-en');
rep(fs2, 'faq_q2_es', '¿Es el Boss Katana 50 Gen 3 el mejor amplificador de modelado económico?', '¿Es el Boss Katana-50 EX Gen 3 el mejor ampli de modelado para escenario y casa?', 'faq2q-es');
rep(fs2, 'faq_a2_es', 'Sí, es la mejor compra en amplificadores de práctica. El Katana 50 Gen 3 incluye cinco modos de amplificador y 55 efectos en un combo ligero, convirtiéndolo en el ampli de modelado más versátil para practicar, grabar y conciertos pequeños. Su salida de auriculares con simulación de caja facilita la práctica silenciosa, por eso es el ampli más recomendado para empezar.', 'Sí, es la mejor compra en modelado listo para escenario. El Katana-50 EX Gen 3 reúne seis voces (con Pushed) con variaciones, soporte de pedalera GA-FC, salida de línea y Stereo Expand en un combo 1x12 de 50W, convirtiéndolo en el ampli de modelado más versátil para practicar, grabar y tocar. Su salida de auriculares con simulación de caja facilita la práctica silenciosa, por eso es el salto más recomendado.', 'faq2a-es');

// verdict + conclusion mentions
rep(g, 'verdict', 'Boss Katana 50 for practice (no GA-FC footswitch support — step up to the Katana-100 for stage switching)', 'Boss Katana-50 EX for practice and stage (GA-FC support, Line Out and an upgraded speaker fix the standard 50 limits)', 'verdict-en');
rep(g, 'verdict_es', 'Boss Katana 50 para practicar (sin soporte de footswitch GA-FC — sube al Katana-100 para cambiar en escenario)', 'Boss Katana-50 EX para practicar y tocar (soporte GA-FC, salida de línea y altavoz mejorado corrigen los límites del 50 estándar)', 'verdict-es');
rep(g, 'conclusion', 'Start with a Boss Katana 50 for versatility at home (remember it cannot take the GA-FC footswitch — the Katana-100 can)', 'Start with a Boss Katana-50 EX for versatility at home and on stage (GA-FC support, Line Out and an upgraded speaker over the standard 50)', 'conc-en');
rep(g, 'conclusion_es', 'Empieza con un Boss Katana 50 por versatilidad en casa (recuerda que no acepta el footswitch GA-FC — el Katana-100 sí)', 'Empieza con un Boss Katana-50 EX por versatilidad en casa y escenario (soporte GA-FC, salida de línea y altavoz mejorado sobre el 50 estándar)', 'conc-es');

// featured
g.featuredProducts = g.featuredProducts.map(id => id === 72 ? 557 : id);

fs.writeFileSync(DIR + 'data/products.json', JSON.stringify(P, null, 2));
fs.writeFileSync(DIR + 'data/guides.json', JSON.stringify(G, null, 2));
console.log('DONE exit=' + (process.exitCode || 0));