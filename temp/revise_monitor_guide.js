// Revisión de la guía monitor-setup según el informe: avisos de compatibilidad,
// pros/contras que faltaban, tabla limpia y reordenación de bloques.
const fs = require('fs');

const guides = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const g = guides.find(x => x.id === 'monitor-setup');
if (!g) throw new Error('no existe monitor-setup');

function rep(obj, key, from, to) {
  if (typeof obj[key] !== 'string' || !obj[key].includes(from)) {
    throw new Error('no encontrado en ' + key + ': ' + from.slice(0, 90));
  }
  obj[key] = obj[key].split(from).join(to);
}

const S = (i) => g.sections[i];

/* ---------------- 1. HS8: cables ---------------- */
rep(S(1), 'content',
  'plan real stands, and add absorbent treatment. At around $399 each',
  'plan real stands, and add absorbent treatment. No audio cables ship in the box, so budget a pair of XLR or TRS cables for your interface. At around $399 each');
rep(S(1), 'content_es',
  'planifica soportes en condiciones y añade tratamiento absorbente. Por unos $399 la unidad',
  'planifica soportes en condiciones y añade tratamiento absorbente. No incluye cables de audio, así que presupuesta un par de XLR o TRS para tu interfaz. Por unos $399 la unidad');

/* ---------------- 2. Focal: cables ---------------- */
rep(S(2), 'content',
  'translates better than any rear-ported rival fighting the boundary.</p>',
  'translates better than any rear-ported rival fighting the boundary. Budget XLR or TRS cables too — none are included.</p>');
rep(S(2), 'content_es',
  'se traslada mejor que cualquier rival con puerto trasero que luche contra sus límites.</p>',
  'se traslada mejor que cualquier rival con puerto trasero que luche contra sus límites. Presupuesta también cables XLR o TRS: no incluye ninguno.</p>');

/* ---------------- 3. K&M: base y placa ---------------- */
rep(S(3), 'content',
  'and internal cable routing keeps runs tidy.</p>',
  'and internal cable routing keeps runs tidy. Its flat base takes far less floor space than the Ultimate Support MS-100, though the top plate is bare metal with small rubber dots — a thin foam pad on top improves decoupling.</p>');
rep(S(3), 'content_es',
  'y el pasacables interno ordena los cables.</p>',
  'y el pasacables interno ordena los cables. Su base plana ocupa mucho menos suelo que el Ultimate Support MS-100, aunque la placa superior es metal desnudo con pequeñas gomas: una lámina fina de espuma encima mejora el desacoplo.</p>');

/* ---------------- 5. Calibración: micrófono incluido ---------------- */
rep(S(5), 'content',
  '<p><strong>The $79 measuring companion.</strong>',
  '<p><strong>The $79 measuring companion — only on the free route.</strong>');
rep(S(5), 'content',
  'the cheapest honest ears your room will ever get.</p>',
  'the cheapest honest ears your room will ever get. SoundID Reference already includes its own calibrated microphone, so the UMIK-1 is only needed if you measure with REW.</p>');
rep(S(5), 'content_es',
  '<p><strong>Su compañero de medición cuesta $79.</strong>',
  '<p><strong>Su compañero de medición cuesta $79, solo si vas por la vía gratuita.</strong>');
rep(S(5), 'content_es',
  'la herramienta de medición más honesta y barata que pisará tu sala.</p>',
  'la herramienta de medición más honesta y barata que pisará tu sala. SoundID Reference ya incluye su propio micrófono calibrado, así que el UMIK-1 solo hace falta si mides con REW.</p>');

/* ---------------- 6. Avisos de compatibilidad (sustituye el bloque de 3 casos) ---------------- */
const warn = S(6);
warn.heading = 'What to Skip: Compatibility Warnings';
warn.heading_es = 'Qué no comprar: avisos de compatibilidad';
warn.products = [];
warn.pros = [];
warn.cons = [];
warn.pros_es = [];
warn.cons_es = [];
warn.specs = {};
warn.verdict = '';
warn.verdict_es = '';
warn.content = '<p><strong>Calibration: buy one microphone, not three.</strong> Sonarworks SoundID Reference ships with a calibrated measurement microphone, so the MiniDSP UMIK-1 is redundant — it only makes sense if you plan to measure with free software such as REW. The Genelec GLM Kit is worse than redundant here: it only works with Genelec SAM monitors, so with the Yamaha HS8 or the Focal Alpha 65 Evo it is money spent on nothing.</p><p><strong>Stands: floor or desk, not both.</strong> If you buy the K&amp;M 26722 floor stands, skip the IsoAcoustics ISO-200 and the Auralex MoPAD-XL — the monitors sit on the stands at ear height, not on the desk. Going desktop? Then the ISO-200 (or the MoPAD-XL on a tight budget) replaces the floor stands. And the Ultimate Support MS-100 only earns its $599.99 with heavy midfield monitors in a fixed room; next to a pair of HS8 on K&amp;M stands it buys you nothing but lost floor space.</p>';
warn.content_es = '<p><strong>Calibración: un micrófono, no tres.</strong> Sonarworks SoundID Reference incluye un micrófono de medición calibrado, así que el MiniDSP UMIK-1 sobra: solo tiene sentido si vas a medir con software gratuito como REW. El Genelec GLM Kit es peor que redundante: solo funciona con monitores Genelec SAM, así que con el Yamaha HS8 o el Focal Alpha 65 Evo es dinero tirado.</p><p><strong>Soportes: suelo o escritorio, no ambos.</strong> Si compras los soportes de suelo K&amp;M 26722, prescinde de los IsoAcoustics ISO-200 y de los Auralex MoPAD-XL: los monitores van en el soporte a la altura del oído, no sobre la mesa. ¿Configuración de escritorio? Entonces los ISO-200 (o los MoPAD-XL si el presupuesto aprieta) sustituyen a los soportes de suelo. Y el Ultimate Support MS-100 solo justifica sus $599,99 con monitores midfield pesados en una sala fija: junto a un par de HS8 sobre K&amp;M no te da nada salvo perder espacio.</p>';

/* ---------------- 7. UMIK: USB ---------------- */
rep(S(7), 'content',
  'you will want a longer one.',
  'you will want a longer one. Because it is USB, it plugs straight into the computer rather than your audio interface: convenient, but it cannot borrow the interface\'s clock or preamps.');
rep(S(7), 'content_es',
  'querrás uno más largo.',
  'querrás uno más largo. Como es USB, se conecta directo al ordenador y no a tu interfaz: cómodo, pero no puede usar el reloj ni los previos de la interfaz.');

/* ---------------- 8. Sonarworks: latencia ---------------- */
rep(S(8), 'content',
  'you pay for the correction filters.',
  'you pay for the correction filters. It also adds latency to the monitoring path: bypass it while you track vocals or instruments, then switch it back on to mix.');
rep(S(8), 'content_es',
  'pagas por los filtros de corrección.',
  'pagas por los filtros de corrección. También añade latencia a la ruta de monitoreo: desactívalo mientras grabas voces o instrumentos y vuelve a activarlo para mezclar.');

/* ---------------- 9. Pros/contras ---------------- */
const pc = (name) => g.verdictProsCons.find(x => x.name === name);

const hs8 = pc('Yamaha HS8');
hs8.cons.push('No audio cables in the box — budget XLR/TRS separately');
hs8.cons_es.push('Sin cables de audio en la caja — presupuesta XLR/TRS aparte');

const focal = pc('Focal Alpha 65 Evo');
focal.cons.push('No audio cables included');
focal.cons_es.push('No incluye cables de audio');

const km = pc('K&M 26722 Monitor Stands (Each)');
km.pros.push('Flat base uses far less floor space than the MS-100');
km.pros_es.push('La base plana ocupa mucho menos suelo que el MS-100');
km.cons.push('Bare metal top plate with small rubber dots — add thin foam for full decoupling');
km.cons_es.push('Placa superior de metal desnudo con gomas pequeñas — añade espuma fina para desacoplar del todo');

const sonar = pc('Sonarworks SoundID Reference');
sonar.cons = sonar.cons.map(c => c === 'Adds latency on the DAW monitoring path'
  ? 'Adds latency — bypass it while tracking, re-enable it to mix'
  : c);
sonar.cons_es = sonar.cons_es.map(c => c === 'Añade latencia en la ruta de monitoreo del DAW'
  ? 'Añade latencia — desactívalo al grabar y reactívalo al mezclar'
  : c);

const umik = pc('MiniDSP UMIK-1');
umik.cons.push('USB mic: plugs into the computer, not your interface — no shared clock or preamps');
umik.cons_es.push('Micrófono USB: va al ordenador, no a la interfaz — sin reloj ni previos compartidos');

const ms = pc('Ultimate Support MS-100 Studio Monitor Stands (Pair)');
ms.pros = ms.pros; // sin cambios

/* ---------------- 10. Tabla: quitar each/pair solo en la tabla ---------------- */
const col = (needle) => g.productTable.columns.find(c => c.title.includes(needle));
col('K&M 26722').title = 'K&M 26722 Monitor Stands';
col('K&M 26722').title_es = 'Soportes de monitor K&M 26722';
col('IsoAcoustics ISO-200').title = 'IsoAcoustics ISO-200 Studio Monitor Stands';
col('IsoAcoustics ISO-200').title_es = 'Soportes de monitor IsoAcoustics ISO-200';
col('Auralex MoPAD-XL').title = 'Auralex MoPAD-XL';
col('Auralex MoPAD-XL').title_es = 'Auralex MoPAD-XL';
col('Ultimate Support MS-100').title = 'Ultimate Support MS-100 Studio Monitor Stands';
col('Ultimate Support MS-100').title_es = 'Soportes de monitor Ultimate Support MS-100';

// MS-100: categoría más específica
const msCol = g.productTable.columns.findIndex(c => c.title.includes('Ultimate Support MS-100'));
for (const row of g.productTable.rows) {
  if (row.label === 'Category') {
    row.values[msCol].value = 'Heavy Midfield Monitor Stands';
    row.values[msCol].value_es = 'Soportes para monitores midfield pesados';
  }
  if (row.label === 'Key Feature') {
    const umikCol = g.productTable.columns.findIndex(c => c.title === 'MiniDSP UMIK-1');
    row.values[umikCol].value = 'USB plug-and-play, 24-bit/48 kHz ADC, omni 20 Hz–20 kHz, ±1 dB calibrated';
    row.values[umikCol].value_es = 'USB plug-and-play, ADC 24-bit/48 kHz, omni 20 Hz–20 kHz, ±1 dB calibrado';
  }
}

/* ---------------- 11. Veredicto y conclusión ---------------- */
g.verdict = '<p><strong>No single product wins this guide: the right chain depends on where your speakers live.</strong> Buy only the pieces your room needs, in this order.</p>' +
  '<p><strong>1. Calibration:</strong> <span class="product-name">Sonarworks SoundID Reference</span> flattens the room to ±0.5 dB and ships with its own calibrated microphone, so you do not need the UMIK-1 or the GLM Kit next to it.</p>' +
  '<p><strong>2. Monitors on the floor:</strong> <span class="product-name">Yamaha HS8</span> on <span class="product-name">K&amp;M 26722 Monitor Stands</span>. The 8-inch woofer reaches 38 Hz, the stands land the tweeters at ear height for about €156 a pair, and the MS-100 only earns its price with heavy midfield cabinets. Keep the HS8 around 40 cm from the front wall.</p>' +
  '<p><strong>3. Monitors on the desk:</strong> <span class="product-name">Focal Alpha 65 Evo</span> on <span class="product-name">IsoAcoustics ISO-200 Studio Monitor Stands</span>. The front port tolerates a wall-hugging desk and the isolators kill desk resonance better than foam; the <span class="product-name">Auralex MoPAD-XL</span> is the $40 fallback if the budget stops there.</p>' +
  '<p><strong>Skip the duplicates:</strong> GLM only if you already own Genelec SAM monitors, and no extra measurement mic if you bought SoundID\'s bundle.</p>';

g.verdict_es = '<p><strong>Aquí no gana un solo producto: la cadena correcta depende de dónde vivan tus altavoces.</strong> Compra solo lo que tu sala necesita, en este orden.</p>' +
  '<p><strong>1. Calibración:</strong> <span class="product-name">Sonarworks SoundID Reference</span> aplana la sala a ±0,5 dB e incluye su propio micrófono calibrado, así que no necesitas el UMIK-1 ni el GLM Kit a su lado.</p>' +
  '<p><strong>2. Monitores en el suelo:</strong> <span class="product-name">Yamaha HS8</span> sobre <span class="product-name">soportes K&amp;M 26722</span>. El woofer de 8 pulgadas llega a 38 Hz, los soportes dejan los tweeters a la altura del oído por unos €156 el par, y el MS-100 solo se justifica con cajas midfield pesadas. Mantén los HS8 a unos 40 cm de la pared frontal.</p>' +
  '<p><strong>3. Monitores en el escritorio:</strong> <span class="product-name">Focal Alpha 65 Evo</span> sobre <span class="product-name">soportes IsoAcoustics ISO-200</span>. El puerto frontal tolera un escritorio pegado a la pared y los aisladores eliminan la resonancia de la mesa mejor que la espuma; el <span class="product-name">Auralex MoPAD-XL</span> es la opción de $40 si el presupuesto se acaba ahí.</p>' +
  '<p><strong>Evita duplicar:</strong> GLM solo si ya tienes monitores Genelec SAM, y ningún micrófono extra si compraste el paquete de SoundID.</p>';

g.conclusion = '<p>The best setup is a chain, not a single box: <span class="product-name">Sonarworks SoundID Reference</span> for correction, then <span class="product-name">Yamaha HS8</span> on <span class="product-name">K&amp;M 26722 Monitor Stands</span> if the speakers go on the floor, or <span class="product-name">Focal Alpha 65 Evo</span> on <span class="product-name">IsoAcoustics ISO-200</span> if they stay on the desk. Skip whatever duplicates a job you already covered.</p>';
g.conclusion_es = '<p>La mejor configuración es una cadena, no un solo aparato: <span class="product-name">Sonarworks SoundID Reference</span> para corregir, y luego <span class="product-name">Yamaha HS8</span> sobre <span class="product-name">soportes K&amp;M 26722</span> si los altavoces van al suelo, o <span class="product-name">Focal Alpha 65 Evo</span> sobre <span class="product-name">soportes IsoAcoustics ISO-200</span> si se quedan en el escritorio. Prescinde de todo lo que duplique una función que ya cubriste.</p>';

/* ---------------- 12. FAQ 4: 30 grados ---------------- */
const fsnp = g.featuredSnippet;
if (!fsnp) throw new Error('sin featuredSnippet');
fsnp.faq_a4_en = fsnp.faq_a4_en.replace(
  'aimed directly at your ears, not angled too far inward,',
  'aimed directly at your ears, rotated exactly 30° toward your head,');
fsnp.faq_a4_es = fsnp.faq_a4_es.replace(
  'sin inclinarlas demasiado hacia adentro,',
  'rotadas exactamente 30° hacia tu cabeza,');
if (fsnp.faq_a4_en.includes('not angled too far inward')) throw new Error('FAQ EN sin cambios');
if (fsnp.faq_a4_es.includes('hacia adentro')) throw new Error('FAQ ES sin cambios');

/* ---------------- 13. Reordenar bloques ---------------- */
const order = [0, 1, 2, 3, 4, 10, 11, 6, 5, 8, 7, 9];
g.sections = order.map(i => S(i));

g.featuredProducts = [19, 645, 59, 646, 650, 651, 647, 648, 649];

fs.writeFileSync('data/guides.json', JSON.stringify(guides, null, 2), 'utf8');

console.log('secciones nuevas:');
g.sections.forEach((s, i) => console.log('  ' + i + '. ' + s.heading));
console.log('\ntabla:', g.productTable.columns.map(c => c.title).join(' | '));
console.log('FAQ EN contiene 30°:', fsnp.faq_a4_en.includes('30°'));
console.log('FAQ ES contiene 30°:', fsnp.faq_a4_es.includes('30°'));
