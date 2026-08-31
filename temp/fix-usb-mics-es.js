var fs = require('fs');
var g = JSON.parse(fs.readFileSync('data/guides.json','utf8'));
var i = g.findIndex(x=>x.id==='usb-mics');
var guide = g[i];

// INTRO
guide.intro_es = "Un buen micrófono USB para streaming significa un solo cable, sin interfaz, y a grabar. Estos son los cinco que de verdad recomiendo para streaming y podcasting en 2026.";

// SECTION 0 - MV7+
guide.sections[0].content_es = '<strong>El Shure MV7+ es la versión del SM7B pensada para streamers: la misma voz cálida de Shure por USB-C con DSP integrado. </strong>Es un micrófono dinámico con el tono característico de la familia SM7B, pero añade una salida de auriculares con monitorización sin latencia, una pantalla táctil para checar niveles al instante, y un modo de nivel automático que ajusta la ganancia solo mientras hablas. El USB-C significa que lo conectas directo a tu PC sin necesidad de interfaz. Viene con filtro antipop y soporte antigolpes incluidos. Para la mayoría de streamers, el MV7+ te da el 90% del sonido del SM7B sin los líos de ganancia y con la mitad de cables.';

// SECTION 1 - Wave:3
guide.sections[1].content_es = '<strong>El Elgato Wave:3 es el mejor condensador USB para streamers que quieren una voz limpia y detallada sin tocar una interfaz. </strong>Su cápsula de condensador premium captura más aire y matices que un dinámico, y el filtro antipop multicapa integrado mantiene las plosivas bajo control. La tecnología Clipguard evita el clipping cuando te emocionas, el mute capacitivo es silencioso, y el dial multifunción controla ganancia, volumen de auriculares y la mezcla entre micrófono y PC. El verdadero superpoder es Wave Link: software de mezcla gratuito que separa tu micrófono, música, audio de juego y Discord en canales independientes — con efectos VST por fuente. Si tu habitación es tranquila o tiene tratamiento acústico y quieres ese sonido detallado de condensador sin equipo extra, el Wave:3 es tu mejor opción.';

// SECTION 2 - AT2040USB
guide.sections[2].content_es = '<strong>El AT2040USB trae el sonido de broadcast a un micrófono USB — una cápsula dinámica hipercardioide que rechaza el ruido de la sala y la retroalimentación como una herramienta de estudio, con la instalación más sencilla de esta guía.</strong> Es un dinámico plug-and-play: sin interfaz, sin phantom power, solo USB-C a tu portátil y listo. El patrón hipercardioide es la clave — capta tu voz y prácticamente ignora los clics del teclado, los ventiladores y el eco de la sala, que es justo lo que necesitas para streaming y podcasting. El botón táctil de silencio se ilumina en rojo cuando estás en directo, la salida de auriculares integrada ofrece monitorización sin latencia, y la captura a 24 bits/96 kHz mantiene tu voz limpia y clara. Es el mismo enfoque de broadcast que el Shure MV7 pero a una fracción del precio, y es el dinámico USB más permisivo de esta guía para habitaciones sin tratamiento. <p>Compra el Audio-Technica AT2040USB si quieres un micrófono dinámico que elimine el ruido de fondo sin equipo de audio adicional. Para más opciones económicas, consulta nuestra <a href="/guides/budget-usb-mics_es.html" class="guide-link-btn">guía de mejores micrófonos USB económicos</a></p>';

// SECTION 3 - Profile Streaming Set
guide.sections[3].content_es = '<strong>El Profile Streaming Set es el paquete USB plug-and-play más completo de esta guía — un condensador cardioide con controles físicos reales y un brazo articulado que esconde su propio cable.</strong> Sennheiser se saltó toda la complicación del software: ganancia, mezcla y volumen de auriculares son perillas físicas en el cuerpo, el silencio es un botón suave con anillo LED, y la salida de auriculares de 3,5 mm ofrece monitorización sin latencia. El brazo articulado autoblocante de 3 puntos canaliza el cable USB-C por su interior, así que todo se ve limpio en cámara, y un cable de 3 metros te da margen para colocarlo exactamente donde tu voz suena mejor. Funciona por USB-C en Mac, iPad, Windows y Android sin drivers, y la carcasa totalmente metálica se siente hecha para durar. Lo que sacrifice frente al Wave:3: no hay software de mezcla para combinar audio de juego y micrófono en una sola transmisión, así que piensa si prefieres controles físicos o enrutamiento por software. Si quieres el escritorio más limpio y los controles más directos, el Profile Streaming Set es el mejor micrófono USB que puedes comprar. <p>Compra el Sennheiser Profile Streaming Set si necesitas un setup USB completo para streaming con controles físicos. Para presupuestos más ajustados, consulta nuestra <a href="/guides/budget-usb-mics_es.html" class="guide-link-btn">guía de mejores micrófonos USB económicos</a></p>';

// SECTION 4 - NT1 5th Gen
guide.sections[4].content_es = '<strong>Si tu habitación tiene tratamiento acústico y quieres la voz más rica y detallada en tu directo — para cantar, ASMR o locución profesional — el NT1 5th Generation es la mejor opción. </strong>Es un condensador de estudio con un ruido propio ultrabajo de 4 dBA y grabación a 32 bits float, así que captura más matices, aire y detalle transitorio que cualquier micrófono dinámico. La diferencia se nota al instante: las voces suenan más abiertas y pulidas. Su salida Dual Connect significa que puedes usarlo por USB-C hoy mismo sin equipo extra. El soporte antigolpes y el filtro antipop incluidos te ahorran gastos en accesorios. La contra: como condensador lo oye todo — reflexiones de la habitación, la nevera, el aire acondicionado. Úsalo en un espacio con tratamiento acústico.';

// CONCLUSION
guide.conclusion_es = 'El mejor micrófono USB para streaming es el que se ajuste a tu habitación y a tu forma de trabajar. Si quieres la voz de broadcast de Shure con un solo cable USB y sin problemas de ganancia, ve por el MV7+. Si tu habitación es tranquila y quieres un sonido de condensador detallado con software de mezcla gratis, el Wave:3. Si necesitas un dinámico que corte el ruido de fondo, el AT2040USB. Si quieres el paquete plug-and-play más completo con controles físicos, el Profile Streaming Set. Y si buscas el máximo detalle vocal para cantar o ASMR y tu espacio tiene tratamiento, el NT1 5th Generation cumple. Los cinco son micrófonos USB profesionales, listos para streaming — empieza con el que mejor se adapte a tu setup. <p>También te puede interesar: <a href="/guides/best-microphone_es.html" class="guide-link-btn">Mejor Micrófono para Voces y Grabación Casera</a> <a href="/guides/budget-mics_es.html" class="guide-link-btn">Mejores Micrófonos Económicos</a> <a href="/guides/best-mic-for-podcasting_es.html" class="guide-link-btn">Mejor Micrófono para Podcast</a></p>';

// VERDICT PROS/CONS - fix broken/awkward entries
// [0] Shure SM7B
guide.verdictProsCons[0].pros_es = [
  'El micrófono de referencia para streaming — el sonido cálido e íntimo de cada gran podcast',
  'El patrón cardioide dinámico rechaza ruido de sala, clics del teclado y el ventilador del PC',
  'Los agudos suavizados controlan la sibilancia, asi que las S y T suenan limpias incluso de cerca',
  'El soporte antigolpes integrado elimina el ruido mecánico del escritorio'
];
guide.verdictProsCons[0].cons_es = [
  'Micrófono silencioso — necesita una interfaz limpia o un Cloudlifter para mantenerse sin ruido',
  'Suma el costo del equipo de ganancia extra',
  'Solo XLR — sin opción USB de un solo cable',
  'Sin salida de auriculares ni DSP integrado — la MV7+ añade monitoreo sin latencia y auto-nivel en el propio micrófono',
  'Cuesta más que la NT1, que ofrece 32 bits float y grabación USB-C a menor precio'
];

// [1] Electro-Voice RE20
guide.verdictProsCons[1].pros_es = [
  'El estándar del broadcast radiofónico — una voz firme y con autoridad',
  'El diseño Variable-D elimina el efecto de proximidad — graves consistentes de 2 a 6 pulgadas',
  'Respuesta suave y natural con un sutil realce de presencia — necesita mucho menos EQ que la mayoría de dinámicos',
  'Igualmente legendario en bombo, gabinetes de guitarra y metales'
];
guide.verdictProsCons[1].cons_es = [
  'Solo XLR, más pesado que el SM7B y necesita un preamp limpio de alta ganancia o un Cloudlifter',
  'Cuesta más que el SM7B y es la opción más cara de esta lista',
  'Grande y pesado en un escritorio o brazo comparado con el MV7+ o el Wave:3',
  'Sin soporte antigolpes ni filtro antipop — la MV7+ y la NT1 los incluyen de serie',
  'Su respuesta de 45 Hz–18 kHz es más limitada que la de la NT1 (20 Hz–20 kHz) en ambos extremos'
];

// [2] Shure MV7+
guide.verdictProsCons[2].pros_es = [
  'El mismo tono cálido de la familia SM7B por USB-C, XLR o ambos, con DSP integrado',
  'Salida de auriculares con monitoreo sin latencia',
  'El modo de nivel automático ajusta tu ganancia en tiempo real mientras hablas',
  'Filtro antipop y soporte antigolpes incluidos — el 90% del sonido del SM7B sin los líos de ganancia'
];
guide.verdictProsCons[2].cons_es = [
  'Sigue siendo un micrófono USB premium cuando el Wave:3 cuesta menos',
  'No iguala del todo la profundidad del SM7B para puristas del broadcast',
  'El nivel automático y el DSP son solo USB — por XLR se comporta como un dinámico normal',
  'La respuesta de 50 Hz–16 kHz llega menos arriba que la del SM7B (50 Hz–20 kHz) — menos aire en agudos',
  'Sin 32 bits float en la vía USB — una toma fuerte se recorta, mientras que el float de la NT1 la recupera'
];

// [3] Elgato Wave:3
guide.verdictProsCons[3].pros_es = [
  'El mejor sonido de condensador USB para streamers que quieren una voz limpia y detallada',
  'El circuito Clipguard evita el clipping cuando te emocionas',
  'Mute capacitivo, dial multifunción y filtro antipop multicapa integrado',
  'Wave Link separa tu micrófono, música, audio de juego y Discord en canales independientes con efectos VST por fuente'
];
guide.verdictProsCons[3].cons_es = [
  'Solo USB — sin ruta XLR para crecer hacia un setup con interfaz',
  'El condensador capta la sala — funciona mejor en espacios tratados o silenciosos',
  'Su superpoder de mezcla depende del software Wave Link',
  'La respuesta de 70 Hz–20 kHz corta los graves profundos antes que la del SM7B (50 Hz) — bombo y bajo suenan más delgados',
  'Cuesta menos que la MV7+, pero renuncias a XLR, DSP y monitoreo sin latencia'
];

// [4] Rode NT1 5th Gen
guide.verdictProsCons[4].pros_es = [
  'Condensador de estudio con ruido propio ultrabajo de 4 dBA — más matices, aire y detalle que cualquier dinámico',
  'La grabación a 32 bits float permite rescatar tomas quemadas — ajustas la ganancia después de grabar, no antes',
  'Dual Connect XLR/USB — conéctalo por USB-C hoy o por XLR a una interfaz más tarde',
  'El soporte antigolpes y filtro antipop incluidos te ahorran en accesorios'
];
guide.verdictProsCons[4].cons_es = [
  'El condensador lo oye todo — reflexiones de la sala, la nevera, el aire acondicionado',
  'Necesita un espacio tratado o silencioso para lucirse',
  'Es el más caro de las opciones híbridas junto al SM7B',
  'El 32 bits float solo se aprovecha en software compatible — algunos DAWs siguen a 24 bits máximo',
  'Como condensador necesita phantom de 48V en la vía XLR — un puerto USB-C solo no lo alimenta'
];

// [5] Audio-Technica AT2040USB
guide.verdictProsCons[5].pros_es = [
  'El hipercardioide rechaza ruido de sala y retroalimentación como una herramienta de estudio',
  'Plug-and-play por USB-C — sin interfaz, sin phantom, sin drivers',
  'Botón táctil de silencio con anillo LED rojo cuando estás en directo',
  'Salida de auriculares integrada con monitoreo sin latencia',
  'Captura a 24 bits/96 kHz que mantiene tu voz limpia y clara'
];
guide.verdictProsCons[5].cons_es = [
  'Solo USB — sin ruta XLR para crecer hacia una interfaz',
  'El hipercardioide es muy direccional — debes estar cerca y en el eje',
  'Sin software de mezcla como el Wave Link del Wave:3',
  'El filtro de graves fijo a 80 Hz es el único control de tono'
];

// [6] Sennheiser Profile Streaming Set
guide.verdictProsCons[6].pros_es = [
  'Perillas físicas de ganancia, mezcla y volumen de auriculares — sin software',
  'Brazo articulado autoblocante de 3 puntos con gestión de cable integrada',
  'Salida de auriculares de 3,5 mm sin latencia con su propio control de nivel',
  'Alimentado por USB-C en Mac, iPad, Windows y Android sin drivers',
  'Carcasa totalmente metálica con botón de mute suave y anillo LED de estado'
];
guide.verdictProsCons[6].cons_es = [
  'Sin software de mezcla como el Wave Link del Wave:3 para enrutar juego + micrófono',
  '125 dB de SPL máximo — menos que los condensadores XLR de esta guía',
  'Solo USB — sin ruta XLR hacia una interfaz más adelante',
  'Solo cardioide — sin cambio de patrón polar'
];

fs.writeFileSync('data/guides.json', JSON.stringify(g, null, 2), 'utf8');
console.log('Done! Guide usb-mics ES translations fixed.');
