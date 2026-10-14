const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const gj = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gj, 'utf8'));
const g = guides.find(x => x.id === 'best-microphone');
const die = (m) => { console.log('!! ' + m); process.exit(1); };

// ---------- 1. TABLA: orden final del usuario ----------
const keepCols = {};
g.productTable.columns.forEach((c, i) => { keepCols[c.title] = i; });
const order = ['MXL R144', 'Audio-Technica AT2020', 'Lewitt LCT 240 PRO', 'Rode NT1 Signature Series', 'Rode NT1 5th Gen', 'Aston Microphones Origin', 'Lewitt LCT 440 PURE', 'Shure SM7B', 'Shure SM7dB', 'Neumann TLM 102', 'AKG C414 XLII'];
const keepMap = { 'Audio-Technica AT2020': 'Audio-Technica AT2020', 'Rode NT1 5th Gen': 'Rode NT1 5th Gen', 'Shure SM7B': 'Shure SM7B', 'Shure SM7dB': 'Shure SM7dB' };
const newVals = {
  'MXL R144': {
    'Best For': ['Smoothing harsh vocals', 'Suavizar voces ásperas'],
    'Estimated Price': ['~$99', '~$99'],
    'Type': ['Ribbon', 'Cinta'],
    'Polar Pattern': ['Figure-8', 'Figura-8'],
    'Frequency Response': ['20 Hz – 17 kHz', '20 Hz – 17 kHz'],
    'Connection': ['XLR', 'XLR'] },
  'Lewitt LCT 240 PRO': {
    'Best For': ['Modern crisp vocals on a budget', 'Voces modernas nítidas con poco presupuesto'],
    'Estimated Price': ['~$149', '~$149'],
    'Type': ['Condenser', 'Condensador'],
    'Polar Pattern': ['Cardioid', 'Cardioide'],
    'Frequency Response': ['20 Hz – 20 kHz', '20 Hz – 20 kHz'],
    'Connection': ['XLR', 'XLR'] },
  'Rode NT1 Signature Series': {
    'Best For': ['Silent neutral studio condenser', 'Condensador de estudio neutro y silencioso'],
    'Estimated Price': ['~$159', '~$159'],
    'Type': ['Condenser', 'Condensador'],
    'Polar Pattern': ['Cardioid', 'Cardioide'],
    'Frequency Response': ['20 Hz – 20 kHz', '20 Hz – 20 kHz'],
    'Connection': ['XLR', 'XLR'] },
  'Aston Microphones Origin': {
    'Best For': ['British all-rounder with built-in pop filter', 'Todoterano británico con antipop integrado'],
    'Estimated Price': ['~$269', '~$269'],
    'Type': ['Condenser', 'Condensador'],
    'Polar Pattern': ['Cardioid', 'Cardioide'],
    'Frequency Response': ['20 Hz – 20 kHz', '20 Hz – 20 kHz'],
    'Connection': ['XLR', 'XLR'] },
  'Lewitt LCT 440 PURE': {
    'Best For': ['Mix-ready clarity, giant-killer', 'Claridad lista para mezclar'],
    'Estimated Price': ['~$269', '~$269'],
    'Type': ['Condenser', 'Condensador'],
    'Polar Pattern': ['Cardioid', 'Cardioide'],
    'Frequency Response': ['20 Hz – 20 kHz', '20 Hz – 20 kHz'],
    'Connection': ['XLR', 'XLR'] },
  'Neumann TLM 102': {
    'Best For': ['Affordable Neumann elite sound', 'Sonido Neumann de élite asequible'],
    'Estimated Price': ['~$699', '~$699'],
    'Type': ['Condenser', 'Condensador'],
    'Polar Pattern': ['Cardioid', 'Cardioide'],
    'Frequency Response': ['20 Hz – 20 kHz', '20 Hz – 20 kHz'],
    'Connection': ['XLR', 'XLR'] },
  'AKG C414 XLII': {
    'Best For': ['9-pattern studio versatility', 'Versatilidad de estudio con 9 patrones'],
    'Estimated Price': ['~$1,299', '~$1,299'],
    'Type': ['Condenser', 'Condensador'],
    'Polar Pattern': ['9 patterns', '9 patrones'],
    'Frequency Response': ['20 Hz – 20 kHz', '20 Hz – 20 kHz'],
    'Connection': ['XLR', 'XLR'] },
};
const newCols = order.map(t => ({ title: t, title_es: t }));
const newRows = g.productTable.rows.map(r => {
  const values = order.map(t => {
    if (keepMap[t]) {
      const idx = keepCols[keepMap[t]];
      if (idx === undefined) die('columna guardada no encontrada: ' + t);
      return r.values[idx];
    }
    const v = (newVals[t] || {})[r.label];
    if (!v) die('sin valores ' + t + ' / ' + r.label);
    return { value: v[0], value_es: v[1] };
  });
  return { label: r.label, label_es: r.label_es, values };
});
g.productTable.columns = newCols;
g.productTable.rows = newRows;
console.log('tabla: 11 columnas en orden del usuario');

// ---------- 2. VEREDICTOS ----------
const keepV = {};
g.verdictProsCons.forEach(v => { keepV[v.name] = v; });
['Shure SM58', 'Shure MV7+', 'Royer R-121'].forEach(n => {
  if (!g.verdictProsCons.some(v => v && v.name === n)) die('veredicto a borrar no encontrado: ' + n);
});
g.verdictProsCons = g.verdictProsCons.filter(v => v && !['Shure SM58', 'Shure MV7+', 'Royer R-121'].includes(v.name));
const newV = [
  { name: 'MXL R144', pros: ['Cheapest real ribbon smoothness for harsh vocals, saxes and acoustics', 'Figure-8 nulls carve workable isolation in untreated rooms', '130dB SPL handling covers horns and guitar cabs', 'Shockmount, case and cloth included in the box'],
    cons: ['Low output demands a clean, high-gain preamp', 'Fragile foil — phantom power accidents destroy it', 'Dark top end lacks air for modern pop', 'Figure-8 hears the room behind you too'],
    pros_es: ['Suavidad de cinta real más barata para voces ásperas, saxos y acústicas', 'Los nulos en ocho recortan aislamiento útil en salas sin tratar', '130dB SPL cubre metales y pantallas de guitarra', 'Soporte, funda y paño incluidos en la caja'],
    cons_es: ['Salida baja que exige un previo limpio con mucha ganancia', 'Lámina frágil: un accidente con phantom la destruye', 'Agudos oscuros sin aire para pop moderno', 'La figura-8 también escucha la sala detrás'] },
  { name: 'Lewitt LCT 240 PRO', pros: ['Crisp modern brightness that needs little EQ', '17mm capsule, 20Hz-20kHz, 142dB SPL handling', 'Mount, windscreen and bag included', 'Versatile all-rounder for vocals, instruments and drums'],
    cons: ['19 dB-A self-noise is higher than the LCT 440 PURE', 'No pad or low-cut switches', 'Basic clip mount — shockmount costs extra', 'Hyped top end can bite on some voices'],
    pros_es: ['Brillo moderno y nítido que pide poco EQ', 'Cápsula de 17 mm, 20Hz-20kHz, 142dB SPL', 'Soporte, antipop y funda incluidos', 'Todoterano versátil para voces, instrumentos y batería'],
    cons_es: ['19 dB-A de ruido propio, más que el LCT 440 PURE', 'Sin pad ni corte de graves', 'Pinza básica: el soporte cuesta aparte', 'Agudos realzados que muerden en algunas voces'] },
  { name: 'Rode NT1 Signature Series', pros: ['4 dBA self-noise — among the quietest mics at any price', 'Smooth neutral tone with gentle 10kHz lift', 'SM6 shockmount, pop filter and XLR cable in the box', 'Needs only 48V phantom and an interface to start'],
    cons: ['Cardioid only — no multi-pattern option', 'Neutral voicing needs EQ character for some sources', 'Picks up untreated rooms mercilessly', 'No pad for very loud sources'],
    pros_es: ['4 dBA de ruido propio, de lo más silencioso a cualquier precio', 'Tono neutro y suave con realce gentil a 10kHz', 'Soporte SM6, antipop y cable XLR en la caja', 'Solo pide phantom 48V e interfaz para empezar'],
    cons_es: ['Solo cardioide, sin opción multipatrón', 'La voz neutra pide carácter de EQ en algunas fuentes', 'Retrata salas sin tratar sin piedad', 'Sin pad para fuentes muy fuertes'] },
  { name: 'Aston Microphones Origin', pros: ['Hand-selected 1-inch capsule with transformerless circuit', 'Steel-mesh pop filter and wave-form head built in', '-10dB pad and bass roll-off switches onboard', 'Direct-to-stand mounting, virtually indestructible'],
    cons: ['Cardioid only — no omni or figure-8 option', 'Needs 48V phantom power to work', 'Shockmount costs extra (SwiftShield)', 'High sensitivity exposes untreated rooms'],
    pros_es: ['Cápsula seleccionada de 1 pulgada con circuito sin transformador', 'Antipop de malla de acero y cabezal wave-form integrados', 'Pad de -10dB y corte de graves a bordo', 'Montaje directo a pie, virtualmente indestructible'],
    cons_es: ['Solo cardioide, sin opción omni ni figura-8', 'Necesita phantom 48V para funcionar', 'El soporte cuesta aparte (SwiftShield)', 'La alta sensibilidad expone salas sin tratar'] },
  { name: 'Lewitt LCT 440 PURE', pros: ['1-inch true condenser, 7 dB-A self-noise, 140dB SPL', '27.4 mV/Pa sensitivity with flat 20Hz-20kHz response', 'Shockmount, magnetic pop filter and windscreen included', 'Giant-killer clarity at a mid-tier price'],
    cons: ['Cardioid only — no multi-pattern option', 'No pad or onboard filters', 'Needs a 48V interface, no USB path', 'Fixed character — less versatile than multi-pattern mics'],
    pros_es: ['Condensador real de 1 pulgada, 7 dB-A, 140dB SPL', '27,4 mV/Pa con respuesta plana 20Hz-20kHz', 'Soporte, antipop magnético y paravientos incluidos', 'Claridad matagigantes a precio medio'],
    cons_es: ['Solo cardioide, sin opción multipatrón', 'Sin pad ni filtros a bordo', 'Necesita interfaz 48V, sin vía USB', 'Carácter fijo, menos versátil que multipatrones'] },
  { name: 'Neumann TLM 102', pros: ['Genuine Neumann large-diaphragm capsule', '12 dB-A self-noise, 144dB SPL, 132dB dynamic range', 'Integrated pop screen and transformerless circuit', 'Compact body with gentle 10kHz presence lift'],
    cons: ['No pad or roll-off switches onboard', '11 mV/Pa output wants a decent preamp', 'Basic SG2 mount — shockmount only in Studio Set', '~$699 leap from mid-tier condensers'],
    pros_es: ['Cápsula Neumann auténtica de diafragma grande', '12 dB-A, 144dB SPL y 132dB de rango dinámico', 'Antipop integrado y circuito sin transformador', 'Cuerpo compacto con realce gentil a 10kHz'],
    cons_es: ['Sin pad ni corte a bordo', 'Sus 11 mV/Pa piden un buen previo', 'Montaje SG2 básico: el soporte solo va en el Studio Set', 'Salto a ~$699 desde condensadores medios'] },
  { name: 'AKG C414 XLII', pros: ['Nine polar patterns in one flagship body', 'Detailed transient response for vocals to piano', 'Daily-professional build and tolerances', 'Pattern switching reshapes room balance without moving stands'],
    cons: ['~$1,299 flagship price', 'Menu-diving to master all nine patterns', 'Reveals bad rooms and chains mercilessly', 'Overkill if you only record one source'],
    pros_es: ['Nueve patrones polares en un cuerpo insignia', 'Respuesta de transitorios detallada de voces a piano', 'Construcción y tolerancias de uso diario profesional', 'Cambiar de patrón reequilibra la sala sin mover pies'],
    cons_es: ['Precio insignia ~$1.299', 'Menús que dominar para los nueve patrones', 'Revela salas y cadenas malas sin piedad', 'Exceso si solo grabas una fuente'] },
];
const orderV = ['MXL R144', 'Audio-Technica AT2020', 'Lewitt LCT 240 PRO', 'Rode NT1 Signature Series', 'Rode NT1 5th Generation', 'Aston Microphones Origin', 'Lewitt LCT 440 PURE', 'Shure SM7B', 'Shure SM7dB', 'Neumann TLM 102', 'AKG C414 XLII'];
const keepV2 = { 'Audio-Technica AT2020': keepV['Audio-Technica AT2020'], 'Rode NT1 5th Generation': keepV['Rode NT1 5th Generation'], 'Shure SM7B': keepV['Shure SM7B'], 'Shure SM7dB': keepV['Shure SM7dB'] };
Object.keys(keepV2).forEach(k => { if (!keepV2[k]) die('veredicto guardado no encontrado: ' + k); });
const newV2 = {};
newV.forEach(v => { newV2[v.name] = { name: v.name, name_es: v.name, pros: v.pros, cons: v.cons, pros_es: v.pros_es, cons_es: v.cons_es }; });
g.verdictProsCons = orderV.map(n => keepV2[n] || newV2[n]);
console.log('veredictos: 11 en orden del usuario, 4+4 verificados');

// ---------- 3. SECCIONES ----------
// quitar dedicadas salientes + USB + Live&Stage por heading (inequivoco)
const dropHeadings = ['Shure SM58: A Closer Look', 'Shure MV7+: A Closer Look', 'Audio-Technica AT2020USB-X: A Closer Look', 'Royer R-121: A Closer Look', 'USB Microphones: Plug-and-Play for Creators', 'Live & Stage Microphones: Built for the Road'];
g.sections = g.sections.filter(s => s && !dropHeadings.includes(s.heading));
console.log('secciones tras borrar salientes:', g.sections.length);
// Dynamic: [1,50,3,194,196,321] -> [1,3,196,321] + quitar SM58 del texto
const dyn = g.sections.find(s => s.heading === 'Dynamic Microphones: Dependable and Rugged');
dyn.products = [1, 3, 196, 321];
dyn.content = dyn.content.split('The Shure SM57 and SM58 are the go-to choices').join('The Shure SM57 is the go-to choice');
dyn.content_es = dyn.content_es.split('El Shure SM57 y SM58 son los estándares de la industria').join('El Shure SM57 es el estándar de la industria');
// Ribbon: [366,206] -> [366] + quitar frase R-121 + precio MXL
const rib = g.sections.find(s => s.heading === 'Ribbon Microphones: Vintage Warmth for the Modern Studio');
rib.products = [366];
rib.content = rib.content.split('The Royer R-121 is the guitar-amp mic most engineers reach for. For budget home studios, the MXL R144 at $149 gives you 90% of the ribbon character at 10% of the price.').join('For home studios, the MXL R144 at $99 gives you 90% of the ribbon character at a fraction of the price.');
rib.content_es = rib.content_es.split('El Royer R-121 es la referencia para amplificadores de guitarra. Para estudios caseros económicos, el MXL R144 a $149 te da el 90% del carácter ribbon al 10% del precio.').join('Para estudios caseros, el MXL R144 a $99 te da el 90% del carácter ribbon a una fracción del precio.');
// Condenser overview: sumar los 4 nuevos a products
const cond = g.sections.find(s => s.heading === 'Condenser Microphones: Studio Detail and Clarity');
cond.products = [4, 3, 297, 672, 652, 673, 674];
// 4 secciones dedicadas nuevas
g.sections.push({
  heading: 'Lewitt LCT 240 PRO: Modern Clarity for $149',
  heading_es: 'Lewitt LCT 240 PRO: claridad moderna por $149',
  products: [672],
  content: '<p><strong>The LCT 240 PRO is the modern budget condenser done right: crisp, detailed brightness that needs little EQ.</strong> Its 17 mm capsule covers 20 Hz to 20 kHz with 16.7 mV/Pa sensitivity, 19 dB-A self-noise and 142 dB SPL handling, so it moves from vocals to acoustic guitars to drums without complaint. Mount, windscreen and bag come in the box; it needs 48V phantom like any condenser.</p><p><strong>Know the limits.</strong> The hyped top end that makes vocals cut can bite on some voices, there is no pad or low-cut for loud sources, and the basic clip mount means budgeting a shockmount separately. One pattern, one job — done well for around $149.</p>',
  content_es: '<p><strong>El LCT 240 PRO es el condensador económico moderno bien hecho: brillo nítido y detallado que pide poco EQ.</strong> Su cápsula de 17 mm cubre 20 Hz a 20 kHz con 16,7 mV/Pa, 19 dB-A de ruido propio y 142 dB SPL, así que pasa de voces a acústicas y batería sin quejarse. Soporte, antipop y funda vienen en la caja; pide phantom 48V como cualquier condensador.</p><p><strong>Conviene saber los límites.</strong> Los agudos realzados que recortan voces pueden morder en algunas, no hay pad ni corte para fuentes fuertes y la pinza básica anticipa un soporte aparte. Un patrón, un trabajo: bien hecho por unos $149.</p>'
});
g.sections.push({
  heading: 'Lewitt LCT 440 PURE: The $269 Giant-Killer',
  heading_es: 'Lewitt LCT 440 PURE: el matagigantes de $269',
  products: [652],
  content: '<p><strong>The LCT 440 PURE is the mic that kills upgrades: a 1-inch true condenser with 7 dB-A self-noise, 140 dB SPL and 27.4 mV/Pa over a flat 20 Hz to 20 kHz response.</strong> Shockmount, magnetic pop filter and windscreen ship in the box, so it records cleanly from minute one. No pad, no filters, no gimmicks — pure simplicity aimed at vocals and instruments that must sit in a mix fast.</p><p><strong>Know the limits.</strong> Cardioid only, 48V required with no USB path, and a fixed character that a multi-pattern mic would vary. But nothing under $300 embarrasses flagships like this.</p>',
  content_es: '<p><strong>El LCT 440 PURE es el mic que mata subidas de nivel: condensador real de 1 pulgada con 7 dB-A, 140 dB SPL y 27,4 mV/Pa sobre respuesta plana 20 Hz a 20 kHz.</strong> Soporte, antipop magnético y paravientos viajan en la caja, así que graba limpio desde el minuto uno. Sin pad, sin filtros, sin trucos: simplicidad pura para voces e instrumentos que deben sentarse rápido en mezcla.</p><p><strong>Conviene saber los límites.</strong> Solo cardioide, 48V obligatorios sin vía USB y carácter fijo donde un multipatrón variaría. Pero nada bajo $300 avergüenza a insignias como este.</p>'
});
g.sections.push({
  heading: 'Aston Origin: British Steel With a Built-In Pop Filter',
  heading_es: 'Aston Origin: acero británico con antipop integrado',
  products: [673],
  content: '<p><strong>The Origin is British high-fidelity engineering you can drop: a hand-selected 1-inch capsule with transformerless circuitry covering 20 Hz to 20 kHz with 127 dB SPL handling.</strong> The wave-form steel mesh head shrugs off knocks and carries a built-in metal pop filter that beats traditional hoops, while -10 dB pad and bass roll-off switches handle loud sources and rumble. Direct-to-stand mounting included; 48V phantom required.</p><p><strong>Know the limits.</strong> Cardioid only, and the SwiftShield shockmount costs extra. Its high sensitivity flatters treated rooms and exposes untreated ones — placement and distance do the rest for around $269.</p>',
  content_es: '<p><strong>El Origin es alta fidelidad británica que puedes dejar caer: cápsula seleccionada de 1 pulgada con circuito sin transformador cubriendo 20 Hz a 20 kHz con 127 dB SPL.</strong> El cabezal wave-form de acero ignora golpes y lleva antipop metálico integrado que supera a los aros tradicionales, mientras pad de -10 dB y corte de graves doman fuentes fuertes y retumbes. Montaje directo a pie incluido; phantom 48V obligatorio.</p><p><strong>Conviene saber los límites.</strong> Solo cardioide y el soporte SwiftShield cuesta aparte. Su alta sensibilidad favorece salas tratadas y expone las demás: colocación y distancia hacen el resto por unos $269.</p>'
});
g.sections.push({
  heading: 'Neumann TLM 102: Elite Neumann Sound for $699',
  heading_es: 'Neumann TLM 102: sonido Neumann de élite por $699',
  products: [674],
  content: '<p><strong>The TLM 102 is the real Neumann passport: a genuine large-diaphragm capsule with 12 dB-A self-noise, 144 dB SPL handling and 132 dB of dynamic range.</strong> The transformerless circuit stays linear through the midrange with a gentle lift around 10 kHz for silky highs, and the integrated pop screen tames plosives without extra hardware. Compact body, cardioid only, 48V phantom.</p><p><strong>Know the limits.</strong> No pad or roll-off switches onboard, the 11 mV/Pa output wants a decent preamp, and the basic SG2 mount means the shockmount only comes in the pricier Studio Set. Around $699, it is the elite commercial-studio sound in reach of home budgets.</p>',
  content_es: '<p><strong>El TLM 102 es el pasaporte Neumann real: cápsula auténtica de diafragma grande con 12 dB-A, 144 dB SPL y 132 dB de rango dinámico.</strong> El circuito sin transformador se mantiene lineal en medios con realce gentil hacia 10 kHz para agudos sedosos, y el antipop integrado doma plosivos sin hardware extra. Cuerpo compacto, solo cardioide, phantom 48V.</p><p><strong>Conviene saber los límites.</strong> Sin pad ni corte a bordo, sus 11 mV/Pa piden un buen previo y el montaje SG2 básico deja el soporte solo para el Studio Set más caro. Por unos $699, es el sonido de élite comercial al alcance casero.</p>'
});
console.log('secciones finales:', g.sections.length);

// ---------- 4. FEATURED en orden del usuario ----------
g.featuredProducts = [366, 196, 672, 297, 3, 673, 652, 1, 321, 674, 4];
console.log('featured: 11 en orden');

// ---------- 5. VEREDICTO ----------
g.verdict = 'For harsh voices on a budget, the MXL R144 smooths what condensers exaggerate. The AT2020, Lewitt LCT 240 PRO and Rode NT1 models cover crisp, silent budget condensers, the Aston Origin and Lewitt LCT 440 PURE add character and mix-ready clarity, the Shure SM7B and SM7dB own broadcast dynamics, and the Neumann TLM 102 and AKG C414 XLII are the premium step-ups. Start with the category that matches your workflow, and check our specialized guides for detailed reviews.';
g.verdict_es = 'Para voces ásperas con poco presupuesto, el MXL R144 suaviza lo que los condensadores exageran. El AT2020, el Lewitt LCT 240 PRO y los Rode NT1 cubren condensadores económicos nítidos y silenciosos, el Aston Origin y el Lewitt LCT 440 PURE añaden carácter y claridad lista para mezclar, los Shure SM7B y SM7dB dominan la dinámica broadcast, y el Neumann TLM 102 y el AKG C414 XLII son el salto premium. Empieza con la categoría que coincida con lo que grabas, y consulta nuestras guías especializadas para reseñas detalladas.';

// ---------- 6. CONCLUSION ----------
const cEnOld1 = 'Dynamic mics like the SM57 and SM58 are built tough and sound great for amps, drums, and live vocals. ';
if (!g.conclusion.includes(cEnOld1)) die('conclusion EN SM58 no encontrada');
g.conclusion = g.conclusion.split(cEnOld1).join('Dynamic mics like the Shure SM7B are built tough and sound great for loud rock and rap vocals in untreated rooms. ');
const cEnOld2 = 'Condenser mics capture studio detail for vocals, acoustic instruments, and overheads. USB mics skip the interface for simple podcasting and streaming. Stage mics survive the road. ';
if (!g.conclusion.includes(cEnOld2)) die('conclusion EN categorias no encontrada');
g.conclusion = g.conclusion.split(cEnOld2).join('Condenser mics capture studio detail for vocals and acoustic instruments — from the Lewitt LCT 240 PRO and Audio-Technica AT2020 under $150 to the Neumann TLM 102 and AKG C414 XLII at the top. The MXL R144 ribbon smooths harsh sources that condensers exaggerate. ');
const cEsOld1 = 'Los dinámicos como el SM57 y SM58 son trabajadores indestructibles para amplificadores, batería y voces en vivo. ';
if (!g.conclusion_es.includes(cEsOld1)) die('conclusion ES SM58 no encontrada');
g.conclusion_es = g.conclusion_es.split(cEsOld1).join('Los dinámicos como el Shure SM7B son indestructibles y suenan genial para rock y rap fuerte en salas sin tratar. ');
const cEsOld2 = 'Los condensadores capturan el detalle de estudio para voces, instrumentos acústicos y overheads. Los USB eliminan la interfaz para podcasts y streaming simples. Los de escenario sobreviven la gira. ';
if (!g.conclusion_es.includes(cEsOld2)) die('conclusion ES categorias no encontrada');
g.conclusion_es = g.conclusion_es.split(cEsOld2).join('Los condensadores capturan el detalle de estudio para voces e instrumentos acústicos — del Lewitt LCT 240 PRO y el Audio-Technica AT2020 por menos de $150 al Neumann TLM 102 y el AKG C414 XLII en la cima. El ribbon MXL R144 suaviza las fuentes ásperas que los condensadores exageran. ');

// ---------- 7. FAQ SM58 ----------
const fsn = g.featuredSnippet || {};
[['faq_a2_en', 'SM57 and SM58 handle', 'SM57 handles'], ['faq_a2_es', 'SM57 y SM58 manejan', 'SM57 manejan']].forEach(([k, a, b]) => {
  if (fsn[k] && fsn[k].includes(a)) fsn[k] = fsn[k].split(a).join(b);
});

fs.writeFileSync(gj, JSON.stringify(guides, null, 2));

// ---------- VERIFICACION ----------
const all = JSON.stringify(g);
['Rodecaster', 'Bridge Cast', 'Shure MV7+', 'AT2020USB-X', 'Royer R-121', 'Shure SM58'].forEach(w => {
  const n = (all.match(new RegExp(w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
  console.log('"' + w + '" restante: ' + n);
});
console.log('columnas:', g.productTable.columns.length, '| veredictos:', g.verdictProsCons.length, '| featured:', g.featuredProducts.length);
const bad = g.productTable.rows.filter(r => r.values.length !== g.productTable.columns.length);
console.log('filas desalineadas:', bad.length);
console.log('paridad veredictos:', g.verdictProsCons.every(v => v.pros.length === v.pros_es.length && v.cons.length === v.cons_es.length && v.pros.length >= 4 && v.cons.length >= 4));