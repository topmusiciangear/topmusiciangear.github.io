const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));

// ---------- CHANNEL-STRIP-PLUGINS ----------
{
  const guide = g.find(x => x.id === 'channel-strip-plugins');
  // Sec 2 (index 2): make it truly about the Total Bundle, products [29]
  const s2 = guide.sections[2];
  s2.products = [29];
  s2.content = "<p><strong>One license, thirty-plus plug-ins, zero gaps in the chain.</strong> The Total Bundle gathers FabFilter's full mixing and mastering arsenal — Pro-Q 4 for EQ, Pro-C 3 for compression, Pro-L 2 for limiting, Pro-R 2 for reverb, Saturn 2 for saturation — all sharing the same fluid workflow and ultra-low latency. Learn one interface and you know them all.</p><p><strong>The honest cost is commitment.</strong> Buying the bundle to use two plug-ins wastes money, and the sheer depth of each module rewards study time. But if you mix regularly and want a single coherent toolkit instead of a folder of one-offs, this is the most complete mixing purchase in software.</p>";
  s2.content_es = "<p><strong>Una sola licencia, más de treinta plug-ins, cero huecos en la cadena.</strong> El Total Bundle reúne todo el arsenal de mezcla y masterización de FabFilter — Pro-Q 4 para ecualizar, Pro-C 3 para comprimir, Pro-L 2 para limitar, Pro-R 2 para reverberar, Saturn 2 para saturar — todos con el mismo flujo de trabajo fluido y latencia ultrabaja. Aprendes una interfaz y las dominas todas.</p><p><strong>El coste honesto es el compromiso.</strong> Comprar el paquete para usar dos plug-ins es tirar el dinero, y la profundidad de cada módulo pide horas de estudio. Pero si mezclas a menudo y quieres una caja de herramientas coherente en lugar de una carpeta de piezas sueltas, es la compra más completa que existe en software.</p>";

  // Insert dedicated sections for UA 1176 [60] and Pro-Q 4 [62] right after sec 2
  const newSecs = [
    {
      heading: '1176 in the Box: Does the UA 1176 Collection Nail FET Compression?',
      heading_es: '1176 en la caja: ¿clava la colección UA 1176 la compresión FET?',
      content: "<p><strong>The fastest gun in vintage compression — now as a channel insert.</strong> The UA 1176 collection bottles the legendary FET limiter's lightning attack and aggressive coloration, the sound that made countless vocals sit forward and drums crack through small speakers. Slam the input, pick 4:1 for control or all-buttons-in for attitude.</p><p><strong>What it will not do is subtle modern chores.</strong> There is no sidechain EQ, no mix knob, no lookahead — it colors everything it touches, which is exactly the point. Use it when a track needs urgency and forwardness; reach for a clean digital compressor when it needs invisible leveling.</p>",
      content_es: "<p><strong>La pistola más rápida de la compresión clásica — ahora como inserto de canal.</strong> La colección UA 1176 embotella el ataque relámpago y la coloración agresiva del legendario limitador FET, el sonido que puso innumerables voces al frente y baterías que cortan altavoces pequeños. Sube la entrada, elige 4:1 para controlar o todos los botones dentro para actitud.</p><p><strong>Lo que no hará son tareas modernas sutiles.</strong> No hay EQ de sidechain, ni mezcla paralela, ni lookahead — colorea todo lo que toca, que es precisamente la gracia. Úsalo cuando una pista necesite urgencia y presencia; recurre a un compresor digital limpio cuando necesite nivelación invisible.</p>",
      products: [60]
    },
    {
      heading: 'Scalpel Before Color: Is Pro-Q 4 the EQ Your Strip Is Missing?',
      heading_es: 'Bisturí antes que color: ¿es Pro-Q 4 el EQ que le falta a tu cadena?',
      content: "<p><strong>Put surgical correction before character color.</strong> Pro-Q 4's spectral dynamics cut resonances only when they flare up, its linear-phase mode keeps transients intact on buses, and EQ Sketch lets you draw the curve you hear in your head. It is the clean-up pass that makes every downstream emulation sound better.</p><p><strong>Pair it, do not worship it.</strong> A sterile chain of only clean digital EQ sounds lifeless — Pro-Q 4 earns its place by preparing the signal for the colorful compressor and saturator after it. Precision first, vibe second, always in that order.</p>",
      content_es: "<p><strong>Pon la corrección quirúrgica antes que el color.</strong> La dinámica espectral de Pro-Q 4 recorta resonancias solo cuando asoman, su modo de fase lineal conserva los transitorios en buses y EQ Sketch deja dibujar la curva que oyes en tu cabeza. Es la pasada de limpieza que hace que cada emulación posterior suene mejor.</p><p><strong>Combínalo, no lo idolatres.</strong> Una cadena de solo EQ digital limpio suena sin vida — Pro-Q 4 se gana el puesto preparando la señal para el compresor y el saturador con carácter que vienen después. Precisión primero, vibra después, siempre en ese orden.</p>",
      products: [62]
    }
  ];
  guide.sections.splice.apply(guide.sections, [3, 0].concat(newSecs));
  guide.featuredProducts = [119, 29, 60, 62, 121, 379];
  console.log('channel-strip: sections=' + guide.sections.length + ' fp=' + JSON.stringify(guide.featuredProducts));
}

// ---------- VOCAL-PLUGINS ----------
{
  const guide = g.find(x => x.id === 'vocal-plugins');
  // Sec 1 (index 1): make it truly about the Total Bundle, products [29]
  const s1 = guide.sections[1];
  s1.products = [29];
  s1.content = "<p><strong>One toolkit for every vocal job — tune it, tame it, place it.</strong> The Total Bundle covers the full vocal path: Pro-Q 4 carves resonances with dynamic bands, Pro-C 3 grips dynamics transparently, Pro-DS handles sibilance, and Pro-R 2 adds space. A single workflow across every insert keeps sessions fast when deadlines press.</p><p><strong>The price stings if you only mix vocals occasionally.</strong> Individual purchases (Pro-Q 4, Pro-C 3) cover most vocal needs for less. But for engineers living in vocal sessions daily, the bundle pays for itself in saved clicks.</p>";
  s1.content_es = "<p><strong>Una sola caja de herramientas para cada tarea vocal — afinar, domar, colocar.</strong> El Total Bundle cubre la ruta vocal completa: Pro-Q 4 esculpe resonancias con bandas dinámicas, Pro-C 3 sujeta la dinámica con transparencia, Pro-DS controla la sibilancia y Pro-R 2 añade espacio. Un único flujo de trabajo en cada inserto mantiene las sesiones ágiles cuando aprietan los plazos.</p><p><strong>El precio escuece si solo mezclas voces de vez en cuando.</strong> Las compras individuales (Pro-Q 4, Pro-C 3) cubren casi todo lo vocal por menos. Pero para quien vive en sesiones vocales a diario, el paquete se amortiza en clics ahorrados.</p>";

  const newSecs = [
    {
      heading: 'Resonance Surgeon: Is Pro-Q 4 the Vocal EQ to Beat?',
      heading_es: 'Cirujano de resonancias: ¿es Pro-Q 4 el EQ vocal a batir?',
      content: "<p><strong>Find the nasty resonance, cut it only when it sings out, leave everything else untouched.</strong> Pro-Q 4's dynamic bands are tailor-made for vocals: harsh 2-5 kHz Honk tamed without thinning the whole performance, boomy proximity buildup controlled per phrase, air band added without harshness. The spectrum grab lets you click a peak you see and fix it in one move.</p><p><strong>It will not flatter a bad recording by itself.</strong> Surgical EQ reveals as much as it fixes — pair it with a de-esser and a character compressor downstream. Precision here, warmth after.</p>",
      content_es: "<p><strong>Localiza la resonancia molesta, recórtala solo cuando asoma y deja todo lo demás intacto.</strong> Las bandas dinámicas de Pro-Q 4 están hechas a medida para voces: aspereza de 2-5 kHz domada sin adelgazar la interpretación, gordura por proximidad controlada por frases, aire añadido sin dureza. Agarras el pico que ves en el analizador y lo corriges de un gesto.</p><p><strong>No maquillará por sí solo una mala grabación.</strong> El EQ quirúrgico revela tanto como corrige — combínalo con un de-esser y un compresor con carácter después. Precisión aquí, calidez después.</p>",
      products: [62]
    },
    {
      heading: 'Transparent Grip: Is Pro-C 3 the Vocal Compressor That Disappears?',
      heading_es: 'Agarre transparente: ¿es Pro-C 3 el compresor vocal que desaparece?',
      content: "<p><strong>Level the vocal without hearing the compressor work.</strong> Pro-C 3's vocal mode with lookahead and soft knee rides phrases evenly, while the sidechain EQ keeps low-end energy from triggering pumping. Fourteen styles mean one plug-in covers whisper-quiet verses and belted choruses alike.</p><p><strong>Transparency has a ceiling.</strong> When a vocal begs for obvious attitude and movement, reach for an 1176-style FET or a distressor flavor instead. Pro-C 3 is the invisible hand; color comes from elsewhere in the chain.</p>",
      content_es: "<p><strong>Nivela la voz sin que se note el compresor.</strong> El modo vocal de Pro-C 3 con lookahead y knee suave cabalga las frases de forma pareja, mientras su EQ de sidechain evita que la energía grave dispare el bombeo. Catorce estilos en un solo plug-in cubren por igual versos susurrados y estribillos a pleno pulmón.</p><p><strong>La transparencia tiene techo.</strong> Cuando una voz pide actitud evidente y movimiento, recurre a un FET estilo 1176 o a un sabor distressor. Pro-C 3 es la mano invisible; el color viene de otro punto de la cadena.</p>",
      products: [63]
    }
  ];
  guide.sections.splice.apply(guide.sections, [2, 0].concat(newSecs));
  guide.featuredProducts = [29, 62, 63, 120, 30, 32, 119, 122, 378];
  console.log('vocal: sections=' + guide.sections.length + ' fp=' + JSON.stringify(guide.featuredProducts));
}

fs.writeFileSync('data/guides.json', JSON.stringify(g, null, 2) + '\n');
console.log('Done.');
