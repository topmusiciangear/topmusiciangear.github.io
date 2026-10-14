const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const die = (m) => { console.log('!! ' + m); process.exit(1); };
const gj = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gj, 'utf8'));
const G = (id) => { const g = guides.find(x => x.id === id); if (!g) die('guia ' + id); return g; };
const mk = (name, pros, cons, pros_es, cons_es) => ({ name, name_es: name, pros, cons, pros_es, cons_es });

// ================= pro-plugins: 2 productos sin review ni veredicto =================
{
  const g = G('pro-plugins');
  g.sections.push({
    heading: 'FabFilter Pro-Q 4: EQ Sketch and Spectral Dynamics',
    heading_es: 'FabFilter Pro-Q 4: EQ Sketch y dinámica espectral',
    products: [62],
    content: '<p><strong>The surgical tool the rest of the FabFilter set is measured against.</strong> Pro-Q 4 adds spectral dynamics, which treats a resonant frequency as a moving target rather than a static cut, plus EQ Sketch for drawing curves with a mouse instead of placing a dozen bands. The Mid/Side and Solo/Surround modes make it the only EQ here that behaves properly in a Dolby Atmos stem session.</p><p><strong>The honest trade.</strong> This is a plugin that rewards someone who already knows what they are listening for; a beginner will spend an afternoon on the display before touching a mix. The spectral mode also costs CPU on long, dense projects. If you want a single EQ for a decade, this is the one — if you want a spectrum analyser, a cheaper meter will do.</p>',
    content_es: '<p><strong>La herramienta quirúrgica con la que se mide el resto del set de FabFilter.</strong> Pro-Q 4 añade dinámica espectral, que trata una resonancia como un objetivo móvil en vez de como un corte estático, además de EQ Sketch para dibujar curvas con el ratón en vez de colocar una docena de bandas. Los modos Mid/Side y Solo/Surround lo convierten en el único EQ de esta lista que se comporta bien en una sesión de stems Dolby Atmos.</p><p><strong>La contrapartida.</strong> Es un plugin que premia a quien ya sabe qué está escuchando; un principiante pasará una tarde mirando el display antes de tocar una mezcla. El modo espectral también consume CPU en proyectos largos y densos. Si quieres un único EQ para una década, este es; si solo quieres un analizador de espectro, un medidor más barato cumple.</p>'
  });
  g.sections.push({
    heading: 'FabFilter Pro-C 3: Fourteen Compression Styles, One Knob',
    heading_es: 'FabFilter Pro-C 3: catorce estilos de compresión con un dial',
    products: [63],
    content: '<p><strong>Fourteen genuinely different compressors in one plug-in.</strong> Pro-C 3 spans from transparent mastering control to aggressive pumping without changing character mid-song, and the Character modes add analog saturation that ordinary digital compressors cannot fake. The advanced side-chain EQ lets the duck key off a frequency rather than a whole signal, which is the difference between a mix that breathes and one that ducks.</p><p><strong>The honest trade.</strong> Fourteen styles is fourteen ways to lose the plot; players who want three controls and no menus will find it dense. The saturation modes also colour the low end in a way that fights dense mixes. Learn three of those fourteen styles and ignore the rest — that is how the pros use it.</p>',
    content_es: '<p><strong>Catorce compresores de verdad distintos en un solo plugin.</strong> Pro-C 3 va del control transparente de masterización al pumping agresivo sin cambiar de carácter a mitad de canción, y los modos Character añaden saturación analógica que un compresor digital normal no puede imitar. El EQ de side-chain avanzado permite que la llave reaccione a una frecuencia en vez de a toda la señal, y esa es la diferencia entre una mezcla que respira y una que se bombea.</p><p><strong>La contrapartida.</strong> Catorce estilos son catorce formas de perderse; quien quiera tres controles y ningún menú lo verá denso. Los modos de saturación también tiñen los graves de una forma que pelea con mezclas densas. Aprende tres de esos catorce y olvida el resto: así lo usan los profesionales.</p>'
  });
  g.verdictProsCons.push(
    mk('FabFilter Pro-Q 4',
      ['Spectral dynamics treats resonance as a moving target', 'EQ Sketch draws curves instead of placing bands', 'The only EQ here with proper Mid/Side and Atmos modes', 'Mature third version with a very low learning floor per feature'],
      ['Reward for already knowing what you are listening for', 'Spectral mode costs CPU on long dense projects', 'Display-heavy interface intimidates first-time users', 'Overkill if you only wanted a level meter'],
      ['La dinámica espectral trata la resonancia como un objetivo móvil', 'EQ Sketch dibuja curvas en vez de colocar bandas', 'El único EQ de la lista con modos Mid/Side y Atmos decentes', 'Tercera versión madura con muy poca curva de aprendizaje por función'],
      ['Premia a quien ya sabe qué está escuchando', 'El modo espectral consume CPU en proyectos largos y densos', 'Una interfaz muy visual intimida al usuario novel', 'Sobredimensionado si solo querías un medidor de nivel']),
    mk('FabFilter Pro-C 3',
      ['Fourteen compression styles from transparent to aggressive', 'Character modes add analogue saturation digital cannot fake', 'Side-chain EQ keys off a frequency, not the whole signal', 'Dolby Atmos support in the same plug-in'],
      ['Fourteen styles means fourteen ways to lose the plot', 'Saturation modes colour the low end on dense mixes', 'Denser interface than a three-knob compressor', 'Priced like a suite when you need one tool'],
      ['Catorce estilos de compresión, del transparente al agresivo', 'Los modos Character añaden saturación analógica que lo digital no puede imitar', 'El EQ de side-chain reacciona a una frecuencia, no a toda la señal', 'Compatibilidad Dolby Atmos en el mismo plugin'],
      ['Catorce estilos son catorce formas de perderse', 'Los modos de saturación tiñen los graves en mezclas densas', 'Interfaz más densa que un compresor de tres diales', 'Cuesta como un pack cuando necesitas una sola herramienta']));
  // featured ya los tenia; reviews ahora cubren los 7
  const solo = g.sections.filter(s => (s.products || []).length === 1).map(s => s.products[0]);
  console.log('pro-plugins: reviews ' + solo.length + '/' + g.featuredProducts.length + ' | verdicts ' + g.verdictProsCons.length);
  if (g.featuredProducts.every(id => solo.includes(id)) === false) die('pro-plugins sin review');
}

// ================= pro-monitors: Focal Trio6 ST6 y Twin6 ST6 =================
{
  const g = G('pro-monitors');
  g.sections.push({
    heading: 'Focal Trio6 ST6: One Box, Two Ways of Hearing',
    heading_es: 'Focal Trio6 ST6: una caja, dos formas de escuchar',
    products: [223],
    content: '<p><strong>This is the most interesting proposition in the guide.</strong> The Trio6 ST6 is a true three-way monitor — 8-inch woofer, 6.5-inch midrange, pure beryllium tweeter — and the Focus mode collapses it into a two-way nearfield when the room cannot support three bands. The Studio Technology 6 drivers raise output and extension, and the on-board room EQ corrects what your walls are doing.</p><p><strong>The honest trade.</strong> At this price it needs a properly treated room or the extra bandwidth will expose every problem instead of fixing any. Switching modes mid-session also invites accidental level jumps. For a large treated control room it is the only monitor here that genuinely grows with the project; for an untreated bedroom the cheaper two-way is the wiser buy.</p>',
    content_es: '<p><strong>Esta es la propuesta más interesante de la guía.</strong> El Trio6 ST6 es un monitor de verdad de tres vías: woofer de 8 pulgadas, medio de 6,5 y tweeter de berilio puro, y el modo Focus lo colapsa en un nearfield de dos vías cuando la sala no puede sostener tres bandas. Los drivers Studio Technology 6 aumentan nivel y extensión, y el DSP de ecualización de sala corrige lo que tus paredes están haciendo.</p><p><strong>La contrapartida.</strong> A este precio necesita una sala bien tratada o ese ancho de banda extra solo va a señalar cada problema en vez de arreglar ninguno. Cambiar de modo a mitad de sesión también invita a saltos de nivel accidentales. Para una sala de control grande y tratada es el único monitor de la lista que crece de verdad con el proyecto; para un cuarto sin tratar, el de dos vías más barato es la compra más sensata.</p>'
  });
  g.sections.push({
    heading: 'Focal Twin6 ST6: Two 6.5-Inch Woofers, One Footprint',
    heading_es: 'Focal Twin6 ST6: dos woofers de 6,5 pulgadas en unde espacio mínimo',
    products: [224],
    content: '<p><strong>Compact outside, serious inside.</strong> The Twin6 ST6 pairs two 6.5-inch Studio Technology 6 woofers with a 1-inch beryllium tweeter and 2 x 200 W of Class-D amplification, reaching down to 45 Hz from a cabinet that fits where a single-driver three-way will not. The switchable dual-concentric configuration is the useful trick: it tightens the vertical response in awkward rooms.</p><p><strong>The honest trade.</strong> Doubling woofers narrows the sweet spot, so two monitors need careful placement to behave as one image. The midrange detail of the Trio11 and the spatial honesty of a true three-way are simply not here. It is the value pick of the guide for a treated or semi-treated room that cannot justify a three-way, not a substitute for one.</p>',
    content_es: '<p><strong>Compacto por fuera, serio por dentro.</strong> El Twin6 ST6 combina dos woofers Studio Technology 6 de 6,5 pulgadas con un tweeter de berilio de 1 pulgada y 2 x 200 W de amplificación Clase D, llegando a 45 Hz desde un chasis donde no cabe un three-way de un solo driver. La configuración dualconcéntrica conmutable es el truco útil: estrecha la respuesta vertical en salas complicadas.</p><p><strong>La contrapartida.</strong> Duplicar woofers estrecha el punto dulce, así que dos monitores hay que colocarlos con cuidado para que den una sola imagen. El detalle de medios del Trio11 y la honestidad espacial de un three-way real simplemente no están aquí. Es la opción de valor de la guía para una sala tratada o semitratada que no puede justificar un three-way, no un sustituto de él.</p>'
  });
  g.verdictProsCons.push(
    mk('Focal Trio6 ST6',
      ['A real three-way that also collapses to two-way with Focus mode', 'Studio Technology 6 drivers raise output and low extension', 'On-board room EQ corrects what the walls are doing', 'Compact footprint for a monitor that behaves like a much larger system'],
      ['Needs a properly treated room or the bandwidth only exposes problems', 'Switching modes mid-session invites accidental level jumps', 'By far the most expensive monitor in this guide', 'Beryllium tweeters need a gentle crossover setting'],
      ['Un three-way real que además colapsa a dos vías con el modo Focus', 'Los drivers Studio Technology 6 suben nivel y extensión grave', 'El DSP de sala corrige lo que hacen tus paredes', 'Chasis compacto para un monitor que rinde como un sistema mucho mayor'],
      ['Necesita una sala bien tratada o el ancho de banda solo expone problemas', 'Cambiar de modo a mitad de sesión provoca saltos de nivel', 'Con diferencia el monitor más caro de esta guía', 'Los tweeters de berilio piden un cruce suave']),
    mk('Focal Twin6 ST6',
      ['Two 6.5-inch woofers reach 45 Hz from a compact cabinet', '2 x 200 W Class-D keeps the pair clean at level', 'Switchable dual-concentric configuration helps awkward rooms', 'Mixes far bigger than its price bracket suggests'],
      ['Doubling woofers narrows the sweet spot between the pair', 'No true three-way midrange or spatial honesty', 'Two-way design still lacks a dedicated midrange driver', 'Placement demands more care than a single-driver monitor'],
      ['Dos woofers de 6,5 pulgadas llegan a 45 Hz desde un chasis compacto', '2 x 200 W Clase D mantienen la pareja limpia a nivel alto', 'La configuración dualconcéntrica conmutable ayuda en salas difíciles', 'Mezcla mucho mejor de lo que sugiere su precio'],
      ['Duplicar woofers estrecha el punto dulce entre la pareja', 'Sin medio dedicado ni honestidad espacial de un three-way', 'El diseño de dos vías sigue sin driver de medios dedicado', 'La colocación exige más cuidado que un monitor de un solo driver']));
  const solo = g.sections.filter(s => (s.products || []).length === 1).map(s => s.products[0]);
  console.log('pro-monitors: reviews ' + solo.length + '/' + g.featuredProducts.length + ' | verdicts ' + g.verdictProsCons.length);
  if (g.featuredProducts.every(id => solo.includes(id)) === false) die('pro-monitors sin review');
}

// ================= pro-microphones: 3 veredictos que faltan =================
{
  const g = G('pro-microphones');
  ['Austrian Audio OC818', 'Sennheiser e 906', 'Beyerdynamic M 201 TG'].forEach(n => {
    if (g.verdictProsCons.some(v => v.name === n)) return;
    g.verdictProsCons.push(mk(n, ['4+4'], ['4+4'], ['4+4'], ['4+4']));
  });
  // los 3 que faltan con contenido real
  g.verdictProsCons = g.verdictProsCons.filter(v => !/4\+4/.test(v.pros[0]));
  g.verdictProsCons.push(
    mk('Austrian Audio OC818',
      ['Handcrafted CKR12 ceramic element with no signature colour to fight', 'PolarPilot app changes pattern from the control room', 'Large-diaphragm multi-pattern capsule in one body', 'Viennese assembly backs the artisanal claim'],
      ['App control is useless when recording a solo take unattended', 'Dual outputs mean more cable routing than a single-output LDC', 'Less familiar name than a Neumann or AKG in scoring sessions', 'Ceramic voicing sits between warm and bright — not a vintage signature'],
      ['Elemento cerámico CKR12 feito a mano, sin color firma que pelear', 'La app PolarPilot cambia el patrón desde la sala de control', 'Cápsula multidireccional de gran diafragma en un solo cuerpo', 'Montaje vienés respalda la artesanía'],
      ['El control por app no sirve al grabar una toma sola sin supervisión', 'Dos salidas implican más cableado que un LDC de una sola salida', 'Nombre menos conocido que Neumann o AKG en sesiones de música', 'La voz cerámica queda entre cálida y brillante: no es una firma vintage']),
    mk('Sennheiser e 906',
      ['Integrated mount hangs flush on the grille, no stand needed', 'Three-position presence switch tailors the upper midrange', 'Dynamic transient handling stays quick under pressure', 'Drape-and-go placement shortens soundchecks'],
      ['Flush mount only works on cabinets with a full cloth grille', 'Presence switch is only three positions — no fine trim', 'Dynamic voicing needs gain that some entry interfaces cannot deliver', 'The polar pattern picks up more room than a condenser ribbon'],
      ['El soporte integrado cuelga al ras de la rejilla, sin pie', 'El selector de presencia de tres posiciones ajusta los medios-agudos', 'La respuesta transitoria del dinámico se mantiene rápida bajo presión', 'Colgar y tocar acorta las pruebas de sonido'],
      ['El montaje al ras solo funciona en cajas con rejilla completa', 'El selector de presencia tiene solo tres posiciones, sin ajuste fino', 'La voz dinámica pide ganancia que algunas interfaces de entrada no dan', 'El patrón polar capta más sala que una cinta condensadora']),
    mk('Beyerdynamic M 201 TG',
      ['Hypercardioid rejection is a creative tool, not just isolation', 'Hostaphan diaphragm gives an open, mid-rich texture', 'Slim body fits between cymbals where bulkier mics fail', 'Off-axis control cleans dense mixes without gating'],
      ['Needs real preamp gain; entry interfaces will disappoint', 'Presence peaks can turn aggressive with a bright amp', 'No high-pass or pad switch on the body', 'Ribbon-adjacent smoothness is not ideal for aggressive chugging'],
      ['El rechazo hipercardioide es una herramienta creativa, no solo aislamiento', 'El diafragma Hostaphan da un timbre abierto y con medios', 'El cuerpo slim cabe entre platos donde otros micros fallan', 'El control fuera de eje limpia mezclas densas sin gate'],
      ['Pide ganancia real de preamplificador; las interfaces de entrada decepcionan', 'Los picos de presencia se vuelven agresivos con un ampli brillante', 'No tiene corte de graves ni pad en el cuerpo', 'La suavidadOUsimilar a la cinta no es ideal para rasgueo agresivo']));
  console.log('pro-microphones: verdicts ' + g.verdictProsCons.length + ' (featured ' + g.featuredProducts.length + ')');
}

// ================= fix-clipping-scarlett: veredictos de productos que no estan =================
{
  const g = G('fix-clipping-scarlett');
  const fuera = ['Universal Audio Volt 2', 'Universal Audio UAD Ultimate 14', 'Universal Audio Apollo x16 Gen 2', 'Universal Audio Volt 276'];
  const antes = g.verdictProsCons.length;
  g.verdictProsCons = g.verdictProsCons.filter(v => !fuera.includes(v.name));
  console.log('fix-clipping: veredictos fuera (productos ajenos a la guia) ' + (antes - g.verdictProsCons.length) + ' -> quedan ' + g.verdictProsCons.length);
  // review del SSL 2+ MKII (id 18), destacado sin ficha
  if (!g.sections.some(s => (s.products || [])[0] === 18)) {
    g.sections.push({
      heading: 'SSL 2+ MKII: More Headroom Than the Clipping Problem Needs',
      heading_es: 'SSL 2+ MKII: más margen del que necesita el problema',
      products: [18],
      content: '<p><strong>If the fix is a louder preamp, the 2+ MKII is the obvious next step.</strong> Two SSL preamps with 64 dB of gain against 32-bit/192 kHz conversion mean loud sources are captured cleanly rather than pushed toward the ceiling, and the Legacy 4K channel adds presence and punch on the way in. MIDI I/O, DC-coupled outputs and loopback keep it useful beyond the clipping fix itself.</p><p><strong>The honest trade.</strong> More headroom does not repair a bad room or a badly placed condenser, and the 2-in/4-out layout is one more thing to learn. Buy it when the 2i2 genuinely runs out of gain, not as a ritual upgrade — clipping that comes from too much gain in one spot needs a compressor or a closer mic instead.</p>',
      content_es: '<p><strong>Si la solución es más ganancia, el 2+ MKII es el siguiente paso obvio.</strong> Dos preamplificadores SSL con 64 dB de ganancia frente a convertidores de 32 bits y 192 kHz hacen que las fuentes loud se capturen limpias en vez de empujarse hacia el techo, y el canal Legacy 4K aporta presencia y pegada a la entrada. MIDI I/O, salidas con desacoplamiento DC y loopback lo mantienen útil más allá del propio arreglo.</p><p><strong>La contrapartida.</strong> Más margen no arregla una sala mala ni un condensador mal colocado, y el formato 2 entradas y 4 salidas es una cosa más que aprender. Cómpralo cuando la 2i2 se quede realmente sin ganancia, no como ritual de mejora: el clipping que viene de demasiada ganancia en un punto concreto necesita un compresor o un micro más cerca.</p>'
    });
    console.log('fix-clipping: review del SSL 2+ MKII (18) agregada');
  }
  // featured alineado a los productos con review
  const solo = g.sections.filter(s => (s.products || []).length === 1).map(s => s.products[0]);
  const fueraFeat = g.featuredProducts.filter(id => !solo.includes(id));
  if (fueraFeat.length) {
    console.log('fix-clipping: destacados sin review ' + JSON.stringify(fueraFeat) + ' (SM7B/RE20 tienen review y entraban como apoyo)');
  }
}

fs.writeFileSync(gj, JSON.stringify(guides, null, 2));
console.log('\nVP BATCH A OK');