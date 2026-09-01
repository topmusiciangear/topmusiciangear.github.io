#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// Load data
const guidesPath = path.join(__dirname, '..', 'data', 'guides.json');
const guides = JSON.parse(fs.readFileSync(guidesPath, 'utf8'));

// Find the3 guides
const aiGuide = guides.find(g => g.id === 'ai-tools-plugins');
const sidechainGuide = guides.find(g => g.id === 'sidechain-modulation-plugins');
const beatmakerGuide = guides.find(g => g.id === 'beatmaker-plugins');

if (!aiGuide || !sidechainGuide || !beatmakerGuide) {
  console.error('Could not find all3 guides');
  process.exit(1);
}

// ===== FIX VERDICTPROSCONS =====

// AI Tools guide - products: smart:EQ 4 (383), Neutron 4 (381), MIXROOM (385), smart:limit (384), Trash (386)
aiGuide.verdictProsCons = [
  {
    name: "Sonible smart:EQ 4",
    name_es: "Sonible smart:EQ 4",
    pros: ["AI spectral balancing across multiple tracks at once", "Profile-based learning adapts to vocals, drums, guitars, or full mixes", "Multi-track analysis finds and fixes inter-track masking automatically"],
    cons: ["Requires iLok or PACE activation", "AI suggestions sometimes need manual fine-tuning"],
    pros_es: ["Balance espectral con IA en múltiples pistas a la vez", "Aprendizaje basado en perfiles que se adapta a vocales, baterías, guitarras o mezcla completa", "Análisis multi-pista detecta y corrige enmascaramiento entre pistas automáticamente"],
    cons_es: ["Requiere activación iLok o PACE", "Las sugerencias de IA a veces necesitan ajuste manual"]
  },
  {
    name: "iZotope Neutron 4",
    name_es: "iZotope Neutron 4",
    pros: ["Mix Assistant suggests entire processing chains based on what it hears", "Unmask feature carves space between kick and bass automatically", "Includes EQ, compressor, transient shaper, and exciter in one bundle"],
    cons: ["Can be overwhelming for beginners due to the number of modules", "AI suggestions vary depending on the source material quality"],
    pros_es: ["El Mix Assistant sugiere cadenas de procesamiento completas según lo que escucha", "La función Unmask talla espacio entre bombo y bajo automáticamente", "Incluye EQ, compresor, moldeador de transientes y excitador en un solo bundle"],
    cons_es: ["Puede ser abrumador para principiantes por la cantidad de módulos", "Las sugerencias de IA varían según la calidad del material fuente"]
  },
  {
    name: "Mastering The Mix MIXROOM",
    name_es: "Mastering The Mix MIXROOM",
    pros: ["Matches your mix tonal balance to any reference track", "Operates on the master bus without destroying mix character", "Targets specific streaming platform loudness standards"],
    cons: ["Only works on the master bus, not individual tracks", "Reference matching can sound artificial if reference is too different"],
    pros_es: ["Iguala el balance tonal de tu mezcla con cualquier pista de referencia", "Opera en el bus principal sin destruir el carácter de la mezcla", "Apunta estándares de loudness específicos de plataformas de streaming"],
    cons_es: ["Solo funciona en el bus master, no en pistas individuales", "La coincidencia con referencia puede sonar artificial si la referencia es muy diferente"]
  },
  {
    name: "Sonible smart:limit",
    name_es: "Sonible smart:limit",
    pros: ["Adapts attack, release, and threshold to preserve transients in real time", "Targets loudness standards for Spotify, Apple Music, and YouTube", "Visual feedback shows exactly what the limiter is doing"],
    cons: ["Only handles the final limiting stage, not full mastering chain", "Less control than manual limiting for experienced engineers"],
    pros_es: ["Adapta ataque, release y umbral para preservar transientes en tiempo real", "Apunta estándares de loudness para Spotify, Apple Music y YouTube", "Retroalimentación visual muestra exactamente lo que hace el limitador"],
    cons_es: ["Solo maneja la etapa final de limitación, no la cadena completa de mastering", "Menos control que la limitación manual para ingenieros experimentados"]
  },
  {
    name: "iZotope Trash",
    name_es: "iZotope Trash",
    pros: ["20+ distortion algorithms from subtle saturation to aggressive clipping", "AI suggests starting points based on harmonic content analysis", "Multi-band processing applies different distortion per frequency range"],
    cons: ["Overwhelming number of options without clear guidance", "Some algorithms sound identical on certain source material"],
    pros_es: ["Más de 20 algoritmos de distorsión desde saturación sutil hasta clipping agresivo", "La IA sugiere puntos de partida según el análisis de contenido armónico", "Procesamiento multi-banda aplica distorsión diferente por rango de frecuencia"],
    cons_es: ["Cantidad abrumadora de opciones sin guía clara", "Algunos algoritmos suenan idénticos en cierto material fuente"]
  }
];

// Sidechain guide - products: ShaperBox 3 (374), Infiltrator 2 (380), HalfTime (376), H3000 (389), Chorus JUN-6 (390)
sidechainGuide.verdictProsCons = [
  {
    name: "Cableguys ShaperBox 3",
    name_es: "Cableguys ShaperBox 3",
    pros: ["Most versatile rhythmic modulation toolkit available", "Sidechain, pan, filter, volume, and distortion in one plugin", "Preset patterns that work instantly for any genre"],
    cons: ["Can be CPU-heavy with multiple instances", "Learning curve for creating custom patterns from scratch"],
    pros_es: ["El toolkit de modulación rítmica más versátil disponible", "Sidechain, paneo, filtro, volumen y distorsión en un solo plugin", "Patrones preestablecidos que funcionan al insta para cualquier género"],
    cons_es: ["Puede consumir mucho CPU con múltiples instancias", "Curva de aprendizaje para crear patrones personalizados desde cero"]
  },
  {
    name: "Devious Machines Infiltrator 2",
    name_es: "Devious Machines Infiltrator 2",
    pros: ["28-effect sequencer with XY pad for real-time manipulation", "Massive library of creative effects including granular and spectral processing", "Per-step modulation routing for complex rhythmic patterns"],
    cons: ["Higher CPU usage than simpler alternatives", "Interface can feel cluttered with so many options"],
    pros_es: ["Secuenciador de 28 efectos con pad XY para manipulación en tiempo real", "Biblioteca enorme de efectos creativos incluyendo procesamiento granular y espectral", "Enrutamiento de modulación por paso para patrones rítmicos complejos"],
    cons_es: ["Mayor consumo de CPU que alternativas más simples", "La interfaz puede sentirse saturada con tantas opciones"]
  },
  {
    name: "Cableguys HalfTime",
    name_es: "Cableguys HalfTime",
    pros: ["One-knob half-speed effect, incredibly easy to use", "Extremely low CPU usage even on older systems", "Works on any source from drums to vocals to full mixes"],
    cons: ["Very limited to one specific effect, not a multi-tool", "No way to automate parameter changes within the plugin"],
    pros_es: ["Efecto de media velocidad con un solo knob, increíblemente fácil de usar", "Uso de CPU extremadamente bajo incluso en sistemas antiguos", "Funciona con cualquier fuente desde baterías hasta vocales o mezclas completas"],
    cons_es: ["Muy limitado a un efecto específico, no es una herramienta multiuso", "No se pueden automatizar cambios de parámetros dentro del plugin"]
  },
  {
    name: "Eventide H3000 Band Delays MK II",
    name_es: "Eventide H3000 Band Delays MK II",
    pros: ["Legendary delay modulation with Eventide's signature algorithms", "Band-specific delay times create complex rhythmic textures", "Preset library captures decades of classic Eventide sounds"],
    cons: ["Higher price point than most delay plugins", "Interface feels dated compared to modern alternatives"],
    pros_es: ["Modulación de delay legendaria con los algoritmos insignia de Eventide", "Tiempos de delay por banda crean texturas rítmicas complejas", "Biblioteca de presets captura décadas de sonidos clásicos de Eventide"],
    cons_es: ["Precio más alto que la mayoría de plugins de delay", "La interfaz se siente anticuada comparada con alternativas modernas"]
  },
  {
    name: "Arturia Chorus JUN-6",
    name_es: "Arturia Chorus JUN-6",
    pros: ["Authentic Roland Juno-60 chorus emulation", "Two modes (I and II) match the original hardware character", "Zero-latency processing for tracking and live use"],
    cons: ["Only does chorus, not other modulation effects", "Limited to the Juno sound, not a general-purpose chorus"],
    pros_es: ["Emulación auténtica del coro del Roland Juno-60", "Dos modos (I y II) que replican el carácter del hardware original", "Procesamiento sin latencia para grabación y uso en vivo"],
    cons_es: ["Solo hace coro, no otros efectos de modulación", "Limitado al sonido Juno, no es un coro multiuso"]
  }
];

// Beatmaker guide - products: RC-20 (375), Transit 2 (377), Scaler 3 (382), Lifeline Expanse (387), Repeater (392)
beatmakerGuide.verdictProsCons = [
  {
    name: "XLN Audio RC-20 Retro Color",
    name_es: "XLN Audio RC-20 Retro Color",
    pros: ["Defines the lo-fi and vintage beat sound with six effect modules", "Vinyl noise, tape wobble, and saturation feel genuinely analog", "Works on individual tracks or the full mix for instant vibe"],
    cons: ["No real-time performance controls for live use", "Some presets sound too similar to each other"],
    pros_es: ["Define el sonido lo-fi y vintage con seis módulos de efectos", "El ruido de vinilo, el tambaleo de cinta y la saturación se sienten genuinamente análogos", "Funciona en pistas individuales o la mezcla completa para dar vibra al insta"],
    cons_es: ["Sin controles de performance en tiempo real para uso en vivo", "Algunos presets suenan demasiado parecidos entre sí"]
  },
  {
    name: "Baby Audio Transit 2",
    name_es: "Baby Audio Transit 2",
    pros: ["One-knob transitions, builds, and drops in seconds", "21 built-in effects including reverb, delay, and modulation", "Perfect for adding movement between song sections"],
    cons: ["Less useful for producers who do not make transition-heavy music", "Some effects sound generic compared to dedicated plugins"],
    pros_es: ["Transiciones, builds y drops con un solo knob en segundos", "21 efectos integrados incluyendo reverb, delay y modulación", "Perfecto para añadir movimiento entre secciones de la canción"],
    cons_es: ["Menos útil para productores que no hacen música con muchas transiciones", "Algunos efectos suenan genéricos comparados con plugins dedicados"]
  },
  {
    name: "Plugin Boutique Scaler 3",
    name_es: "Plugin Boutique Scaler 3",
    pros: ["Removes the music theory barrier from chord progressions", "Genre-specific chord sets that sound professional instantly", "Drag-and-drop MIDI export to any DAW"],
    cons: ["Can make your music sound formulaic if you rely only on presets", "Some chord sets are too advanced for complete beginners"],
    pros_es: ["Elimina la barrera de teoría musical para crear progresiones de acordes", "Acordes específicos por género que suenan profesionales al insta", "Exportación de MIDI por arrastrar y soltar a cualquier DAW"],
    cons_es: ["Puede hacer que tu música suene formulaica si solo dependes de presets", "Algunos acordes son demasiado avanzados para principiantes totales"]
  },
  {
    name: "Excite Audio Lifeline Expanse",
    name_es: "Excite Audio Lifeline Expanse",
    pros: ["Adds realistic room ambience that makes dry beats feel alive", "More subtle and musical than traditional reverb plugins", "Works especially well on drums, percussion, and vocals"],
    cons: ["Limited to spatial effects, no other processing tools", "Fewer presets than competing spatial plugins"],
    pros_es: ["Añade ambience realista de sala que hace que los beats secos se sientan vivos", "Más sutil y musical que los plugins de reverb tradicionales", "Funciona especialmente bien en baterías, percusión y vocales"],
    cons_es: ["Limitado a efectos espaciales, sin otras herramientas de procesamiento", "Menos presets que plugins espaciales competidores"]
  },
  {
    name: "D16 Group Repeater Delay",
    name_es: "D16 Group Repeater Delay",
    pros: ["Vintage-modeled delay with analog character and warmth", "Multiple delay models from tape to bucket brigade", "Cross-feedback and modulation for creative rhythmic echoes"],
    cons: ["Interface looks similar to other D16 delays, can confuse buyers", "No modern features like sidechain ducking or tempo sync visualization"],
    pros_es: ["Delay modelado vintage con carácter y calidez análoga", "Múltiples modelos de delay desde cinta hasta bucket brigade", "Cross-feedback y modulación para ecos rítmicos creativos"],
    cons_es: ["La interfaz se parece a otros delays de D16, puede confundir al comprador", "Sin funciones modernas como sidechain ducking o visualización de tempo sync"]
  }
];

// ===== FIX SPANISH TRANSLATIONS =====

// Fix intro_es for AI tools guide
aiGuide.intro_es = "La inteligencia artificial está transformando la producción musical: hay EQs que analizan tu mezcla en segundos, asistentes de mastering que comparan tu pista con una referencia y limitadores que se adaptan al material en tiempo real. Estos son los plugins con IA que realmente aportan algo útil.";

// Fix section content_es for AI tools guide - rewrite all to sound natural
aiGuide.sections[0].content_es = "<p><strong>Los plugins de IA no reemplazan tu oído, sino que agilizan el proceso.</strong> Las mejores herramientas se encargan de tareas repetitivas como detectar frecuencias que se enmascaran entre sí, suprimir resonancias molestas y ecualizar el loudness para que tú te dediques a las decisiones creativas. En 2026, cada desarrollador importante ha metido aprendizaje automático en sus plugins, pero solo unos pocos lo usan de forma que realmente mejora tu mezcla, en vez de ser solo un eslogan de marketing.</p><p>Los plugins de esta guía representan las aplicaciones más prácticas de la IA en audio: ecualizadores inteligentes que eliminan automáticamente frecuencias problemáticas, asistentes de mezcla que sugieren ajustes de compresores y limitadores que se adaptan a tu material en tiempo real. Cada uno se ha probado en múltiples géneros y tamaños de sesión para confirmar que la IA ayuda de verdad, no solo de vez en cuando.</p>";

// Fix all other ES sections for AI tools guide
aiGuide.sections[1].content_es = "<p><strong>El smart:EQ 4 de Sonible usa IA para analizar tu audio y crear una curva de EQ personalizada en cuestión de segundos.</strong> Su algoritmo de balance espectral detecta acumulaciones de frecuencia, enmascaramiento y desequilibrios tonales en tus pistas, y luego propone correcciones que puedes ajustar a mano. Lo que lo separa de versiones anteriores es el aprendizaje por perfiles: reconoce si estás trabajando en vocales, baterías, guitarras o una mezcla completa, y adapta sus sugerencias en consecuencia.</p><p>La función multi-pista es donde el smart:EQ 4 realmente vale su precio. Cuando lo insertas en varias pistas a la vez, la IA detecta dónde se pisan las frecuencias entre sí y sugiere movimientos de EQ que abren espacio en la mezcla sin que tengas que silenciar cada banda una por una buscando choques. Para ingenieros con sesiones grandes, esto solo puede ahorrar horas de mezcla.</p>";

aiGuide.sections[2].content_es = "<p><strong>El Neutron 4 de iZotope incluye un Mix Assistant que escucha tu pista y te propone cadenas de procesamiento completas.</strong> El asistente analiza el contenido de frecuencia, la dinámica y la imagen estéreo de tu audio, y luego recomienda módulos específicos —EQ, compresor, moldeador de transientes— con parámetros iniciales basados en lo que detecta. Tú sigues teniendo el control, pero la IA te da un punto de partida que suele estar al 70-80% de un sonido terminado.</p><p>La función Unmask es el arma secreta del Neutron 4. Detecta automáticamente los choques de frecuencia entre dos pistas (como bombo y bajo) y talla espacio usando EQ dinámico. A diferencia del sidechain manual, Unmask funciona en todo el espectro de frecuencias y se adapta en tiempo real cuando cambia la arreglación. Para productores de estudio casero sin años de experiencia en mezcla, el Neutron 4 es la forma más rápida de aprender cómo suena un procesamiento profesional.</p>";

aiGuide.sections[3].content_es = "<p><strong>MIXROOM usa IA para igualar tu mezcla con una pista de referencia, enfocándose en el balance tonal.</strong> Cargas una pista de referencia que represente el sonido que buscas, y MIXROOM analiza las diferencias de frecuencia entre tu mezcla y esa referencia. La IA luego propone correcciones de EQ que acercan tu balance tonal al objetivo sin destruir el carácter de tu mezcla.</p><p>A diferencia de otras herramientas de referencia, MIXROOM opera en el bus principal y respeta el balance general. No intenta que cada pista individual coincida con la referencia, sino que se enfoca en el panorama general, que es lo que importa para un master con sonido profesional. Para productores que les cuesta hacer referencing, MIXROOM elimina las conjeturas por completo.</p>";

aiGuide.sections[4].content_es = "<p><strong>El smart:limit analiza tu audio en tiempo real y ajusta sus parámetros de limitación para preservar transientes y dinámica.</strong> La IA detecta el género, el rango dinámico y el contenido de frecuencia de tu material, y luego configura ataque, release y umbral de forma que mantienen la sensación natural de tu mezcla mientras alcanzan niveles de loudness competitivos.</p><p>La función de igualación de loudness es lo que hace que smart:limit sea útil para mastering. Apunta a estándares de loudness específicos de plataformas de streaming (Spotify, Apple Music, YouTube) y ajusta la limitación para alcanzarlos sin sobrecomprimir. Para productores que están hartos de comparar sus masters con pistas de referencia y dudar de cada decisión de loudness, smart:limit elimina la ansiedad de la etapa final.</p>";

aiGuide.sections[5].content_es = "<p><strong>iZotope Trash ha vuelto con un motor que usa IA para sugerir tipos de distorsión según tu audio.</strong> La nueva versión analiza el contenido armónico de tu señal de entrada y recomienda entre más de 20 algoritmos de distorsión —desde saturación sutil de cinta hasta clipping digital agresivo. La IA no te encierra en sus sugerencias; te da puntos de partida que puedes mezclar y dar forma con el pad XY.</p><p>Trash no es solo para sonidos agresivos. Los modos con IA incluyen calidez sutil para vocales, compresión suave de cinta para baterías y excitación armónica para masters. El procesamiento multi-banda te permite aplicar diferentes tipos de distorsión a diferentes rangos de frecuencia, lo que significa que puedes agregar peso al grave mientras mantienes los agudos limpios —algo que antes solo se lograba con cadenas complejas de múltiples plugins.</p>";

// Fix conclusion_es and verdict_es
aiGuide.conclusion_es = "Empieza con el Sonible smart:EQ 4 si quieres la mayor mejora de proceso en tus sesiones de mezcla. Agrega el iZotope Neutron 4 si necesitas asistencia de mezcla en pistas individuales, y considera MIXROOM para la coincidencia de referencia en mastering. smart:limit maneja la etapa final de limitación, mientras que iZotope Trash añade distorsión creativa cuando tu mezcla necesita carácter.";

aiGuide.verdict_es = "Los plugins de IA no se tratan de reemplazar tu criterio, sino de eliminar las partes tediosas de la mezcla y el mastering para que puedas enfocarte en las decisiones creativas.";

// Fix sidechain guide ES translations
sidechainGuide.intro_es = "El sidechain y la modulación rítmica son los secretos detrás del bombeo, la respiración y el movimiento en la música moderna. Estos plugins te permiten crear patrones rítmicos, transiciones y texturas que dan vida a cualquier producción.";

sidechainGuide.sections[0].content_es = "<p><strong>El sidechain y la modulación rítmica no son solo para la música electrónica.</strong> Cualquier género que se beneficie del movimiento dinámico puede usar estas herramientas. El bombeo del sidechain se escucha en pop, hip-hop, R&B e incluso en bandas sonoras de cine. Lo que hace especial a estos plugins es que convierten ritmos estáticos en producciones con vida, usando modulación de volumen, filtro y paneo sincronizados al tempo.</p><p>Los plugins de esta guía cubren todo el espectro: desde el sidechain ducking más básico hasta secuenciadores de efectos de 28 pasos. Cada uno se ha elegido por su facilidad de uso, calidad de sonido y versatilidad en diferentes géneros y configuraciones de sesión.</p>";

sidechainGuide.sections[1].content_es = "<p><strong>ShaperBox 3 es probablemente el toolkit de modulación rítmica más versátil que existe.</strong> Combina sidechain, paneo, filtro, volumen y distorsión en un solo plugin, con patrones preestablecidos que funcionan al insta para casi cualquier género. Lo que lo hace especial es su interfaz de curvas: puedes dibujar la forma exacta de la modulación en cada paso del beat, desde un bombeo suave de sidechain hasta un corte agresivo de filtro.</p><p>Para productores que quieren ir más allá del sidechain básico, ShaperBox 3 ofrece posibilidades casi infinitas. Puedes encadenar múltiples formas de modulación, usar XY pads para performance en tiempo real y aplicar diferentes efectos por canal. Es el plugin que mucha gente compra pensando en sidechain y termina usando para todo.</p>";

sidechainGuide.sections[2].content_es = "<p><strong>Infiltrator 2 es un secuenciador de 28 efectos con un pad XY para manipulación en tiempo real.</strong> No es solo un plugin de sidechain: es una máquina de crear efectos creativos que van desde filtrado granular hasta procesamiento espectral, todo sincronizado al tempo de tu DAW. Cada paso de la secuencia puede activar un efecto diferente con parámetros distintos, lo que abre posibilidades rítmicas que otros plugins simplemente no ofrecen.</p><p>Lo que hace especial a Infiltrator 2 es la cantidad de efectos disponibles y la forma en que se combinan. Puedes usar granular en un paso, delay en otro y distorsión en otro, todo con modulación por paso que crea patrones complejos sin tener que programar nada manualmente. Es ideal para productores que buscan sonidos que nadie más tiene.</p>";

sidechainGuide.sections[3].content_es = "<p><strong>HalfTime es el plugin más sencillo y directo para crear efectos de media velocidad.</strong> Un solo knob reduce el audio a la mitad de su velocidad original manteniendo el tono, creando ese sonido oscuro y estirado que se escucha en todo desde trap hasta bandas sonoras de cine. Es increíblemente fácil de usar y consume muy poco CPU, lo que lo hace perfecto para pistas de referencia o uso en vivo.</p><p>Lo que hace valioso a HalfTime es su simplicidad. No necesitas entender compresión sidechain ni modulación rítmica: solo insertas el plugin, ajustas el knob y obtienes el efecto. Funciona con cualquier fuente, desde baterías hasta vocales pasando por mezclas completas, y es el plugin que mucha gente tiene abierto en casi cada sesión.</p>";

sidechainGuide.sections[4].content_es = "<p><strong>El H3000 Band Delays MK II lleva el sonido legendario de Eventide a un formato de plugin.</strong> No es un delay normal: crea ecos por banda de frecuencia, lo que significa que puedes tener diferentes tiempos de delay para el grave, el medio y los agudos, creando texturas rítmicas complejas que van mucho más allá de un simple echo. La biblioteca de presets captura décadas de sonidos clásicos de Eventide.</p><p>Lo que hace especial al H3000 es la calidad de sus algoritmos. Los delays de Eventide tienen un carácter y una musicalidad que muchos plugins modernos intentan copiar pero nunca igualan. Si buscas delays con personalidad y profundidad, el H3000 es difícil de superar, aunque su precio lo coloca en una categoría diferente a la mayoría de plugins de delay.</p>";

sidechainGuide.sections[5].content_es = "<p><strong>El Chorus JUN-6 es una emulación auténtica del coro del Roland Juno-60, uno de los sonidos más reconocibles de la síntesis analógica.</strong> Ofrece los dos modos del hardware original (I y II), cada uno con su carácter distintivo. El modo I es más sutil y denso, mientras que el modo II es más brillante y animado. Ambos añaden esa calidez analógica que hace que los sintetizadores suenen gigantes.</p><p>Lo que hace valioso al Chorus JUN-6 es su autenticidad y su simplicidad. No necesitas entender modulación ni ajustes complejos: solo activas uno de los dos modos y el sonido ya está. Funciona excelente en sintetizadores, guitarras, vocales y cualquier cosa que necesite esa amplitud stereo analógica. A su precio, es difícil encontrar un chorus con mejor relación calidad-precio.</p>";

sidechainGuide.conclusion_es = "Empieza con Cableguys ShaperBox 3 para el toolkit de modulación rítmica más versátil. Añade HalfTime por su efecto de media velocidad a un precio competitivo. Si necesitas efectos creativos más profundos, Infiltrator 2 es la máquina de efectos multiuso, mientras que el Eventide H3000 aporta la modulación de delay legendaria. El Chorus JUN-6 completa la colección con calidez analógica vintage.";

sidechainGuide.verdict_es = "La modulación rítmica es lo que separa una mezcla estática de una producción con vida y respiración. Estos plugins te dan las herramientas para añadir movimiento, groove y vida a cualquier género.";

// Fix beatmaker guide ES translations
beatmakerGuide.intro_es = "Crear beats requiere un conjunto de herramientas específico: plugins que añaden suciedad, calidez, carácter vintage y movimiento rítmico. Ya sea que estés cortando samples, programando baterías o construyendo loops, estos son los plugins que te dan el sonido y la inspiración que necesitas.";

beatmakerGuide.sections[0].content_es = "<p><strong>Los beatmakers no necesitan los mismos plugins que los ingenieros de mezcla.</strong> Mientras que un ingeniero busca transparencia y precisión, un beatmaker busca carácter, textura y vibra. Los plugins para beatmaking se centran en añadir calidez analógica, ruido de vinilo, saturación de cinta y movimiento rítmico que hacen que los beats suenen como si vinieran de un sampler vintage.</p><p>Los plugins de esta guía están elegidos por su capacidad de transformar beats secos en producciones con personalidad. Cada uno aporta algo diferente: desde el carácter lo-fi del RC-20 hasta las transiciones del Transit 2, pasando por la teoría musical accesible del Scaler 3.</p>";

beatmakerGuide.sections[1].content_es = "<p><strong>El RC-20 Retro Color es el plugin que define el sonido lo-fi y vintage en los beats actuales.</strong> Con seis módulos de efectos —vinilo, cinta, magneto, ruido,失真 y espacial— añade la suciedad, la calidez y la degradación que hacen que los beats suenen como si vinieran de un MPC o un SP-404. Es el plugin que ves en casi cada tutorial de beatmaking, y por buena razón.</p><p>Lo que hace especial al RC-20 es que cada módulo se puede combinar de infinitas maneras. Puedes añadir solo un poco de tambaleo de cinta para dar calidez, o saturar todo para un sonido completamente destruido. Funciona igual de bien en baterías, samples, sintetizadores o la mezcla completa, y es el plugin que más rápido transforma un beat ordinario en algo con vibra.</p>";

beatmakerGuide.sections[2].content_es = "<p><strong>El Transit 2 es un plugin de efectos de transición diseñado específicamente para builds, drops y fills.</strong> Con un solo knob, puedes crear transiciones profesionales que añaden movimiento entre secciones de la canción. Incluye 21 efectos integrados —reverb, delay, modulación, filtrado— que se combinan de formas que suenan naturales y musicales.</p><p>Lo que hace valioso al Transit 2 es su velocidad. En vez de programar transiciones manualmente con automate curves, solo insertas el plugin, ajustas el knob durante la transición y obtienes un resultado que suena profesional al insta. Es especialmente útil para beatmakers que trabajan rápido y no quieren perder tiempo en configuraciones complejas.</p>";

beatmakerGuide.sections[3].content_es = "<p><strong>Scaler 3 es una herramienta de progresiones de acordes y detección de escalas que elimina la barrera de la teoría musical para los beatmakers.</strong> Si no sabes qué acordes van juntos o cómo crear progresiones que suenen profesionales,Scaler 3 te lo resuelve al insta. Incluye conjuntos de acordes específicos por género que suenan profesionales, con exportación de MIDI por arrastrar y soltar a cualquier DAW.</p><p>Lo que hace especial a Scaler 3 es que no solo te da acordes, sino que te enseña por qué funcionan. Puedes explorar diferentes escalas, ver las relaciones entre acordes y construir progresiones que se sienten naturales. Para beatmakers que quieren que sus beats suenen más sofisticados sin estudiar teoría musical durante años, Scaler 3 es la herramienta ideal.</p>";

beatmakerGuide.sections[4].content_es = "<p><strong>Lifeline Expanse añade ambience espacial realista que hace que los beats secos suenen como si existieran en un espacio físico.</strong> A diferencia de la reverb tradicional, que puede sonar artificial y genérica, Lifeline Expanse crea espacios naturales que añaden profundidad sin cubrir los detalles de tu beat. Funciona especialmente bien en baterías, percusión y vocales.</p><p>Lo que hace valioso a Lifeline Expanse es su sutileza. Muchos productores de beats evitan la reverb porque suena demasiado obvia, pero Lifeline Expanse añade espacio de forma tan natural que los beats simplemente suenan mejor sin que puedas identificar exactamente qué cambió. Es el tipo de plugin que usas en cada sesión sin darte cuenta.</p>";

beatmakerGuide.sections[5].content_es = "<p><strong>Repeater Delay es un delay vintage modelado que añade carácter análogo y ecos rítmicos a los beats.</strong> No es un delay digital limpio y preciso: es un delay que añade saturación,失真 y calidez a cada eco, creando ese sonido cálido y orgánico que hacen los delays de cinta y bucket brigade. Los múltiples modelos de delay permiten elegir entre diferentes caracteres, desde sutil hasta agresivo.</p><p>Lo que hace especial a Repeater Delay es su musicalidad. Los ecos no solo repiten la señal, sino que la transforman con cada repetición, creando texturas rítmicas que añaden vida a los beats. La retroalimentación cruzada y la modulación abren posibilidades creativas que van mucho más allá de un simple echo. Para beatmakers que quieren delays con personalidad, Repeater es difícil de superar.</p>";

beatmakerGuide.conclusion_es = "Empieza con RC-20 Retro Color, es el plugin más impactante para beatmakers. Añade Transit 2 para las transiciones, Scaler 3 para las progresiones de acordes y Lifeline Expanse para la profundidad espacial. Repeater Delay añade el toque rítmico final que hace que los beats se sientan vivos.";

beatmakerGuide.verdict_es = "Los mejores plugins para beatmaking no son los más caros ni los más complejos, sino los que instantáneamente añaden carácter, vibra e inspiración a tus producciones.";

// ===== FIX FEATURED SNIPPET ES =====
aiGuide.featuredSnippet.text_es = "Los plugins de IA aceleran la mezcla y el mastering al encargarse de tareas repetitivas como enmascaramiento de frecuencias e igualación de loudness.";
sidechainGuide.featuredSnippet.text_es = "Los efectos de sidechain y modulación crean el bombeo y el movimiento que se siente en la música moderna.";
beatmakerGuide.featuredSnippet.text_es = "Los beatmakers necesitan plugins que añadan calidez, carácter, textura vintage y movimiento rítmico a sus producciones.";

// Fix FAQ ES translations for all3 guides
// AI tools
aiGuide.featuredSnippet.faq_q1_es = "¿Son mejores los plugins de IA que mezclar a oído?";
aiGuide.featuredSnippet.faq_a1_es = "Los plugins de IA no reemplazan tu oído, sino que aceleran tu flujo de trabajo al encargarse de tareas repetitivas. Tú sigues tomando las decisiones creativas, pero la IA te da un mejor punto de partida.";
aiGuide.featuredSnippet.faq_q2_es = "¿Qué plugin de IA debería comprar primero?";
aiGuide.featuredSnippet.faq_a2_es = "Empieza con el Sonible smart:EQ 4 si quieres la mayor mejora de proceso en tus sesiones de mezcla. Agrega el iZotope Neutron 4 si necesitas asistencia en pistas individuales.";
aiGuide.featuredSnippet.faq_q3_es = "¿Funcionan los plugins de IA en todos los géneros?";
aiGuide.featuredSnippet.faq_a3_es = "Sí, los mejores plugins de IA como smart:EQ 4 y Neutron 4 se adaptan a cualquier género. Analizan tu audio y ajustan sus sugerencias según el contenido de frecuencia y dinámica que detectan.";
aiGuide.featuredSnippet.faq_q4_es = "¿Las herramientas de mastering con IA son tan buenas como un ingeniero profesional?";
aiGuide.featuredSnippet.faq_a4_es = "Las herramientas de mastering con IA pueden llevarte al 80-90% del camino a un master profesional. Son excelentes para demos y lanzamientos independientes, pero un ingeniero de mastering aún aporta el último 10% de pulido y objetividad.";
aiGuide.featuredSnippet.faq_q5_es = "¿Cuánto cuestan los plugins de IA para producción musical?";
aiGuide.featuredSnippet.faq_a5_es = "Los plugins de IA individuales van de $49 a $250. Bundles como el iZotope Neutron 4 ofrecen más valor si necesitas varias herramientas de procesamiento. Muchos desarrolladores ofrecen pruebas gratuitas para que puedas probar la IA antes de comprar.";

// Sidechain
sidechainGuide.featuredSnippet.faq_q1_es = "¿Qué es la compresión sidechain y por qué se usa?";
sidechainGuide.featuredSnippet.faq_a1_es = "La compresión sidechain reduce una señal de audio cuando otra señal está presente. El uso más común es hacer que el bajo baje de volumen cuando golpea el bombo, creando el efecto de bombeo que se escucha en la música electrónica.";
sidechainGuide.featuredSnippet.faq_q2_es = "¿Puedo usar estos plugins para géneros que no sean EDM?";
sidechainGuide.featuredSnippet.faq_a2_es = "Claro que sí. El sidechain y la modulación rítmica se usan en pop, hip-hop, bandas sonoras e incluso en música clásica. Cualquier género que se beneficie del movimiento dinámico puede aprovechar estas herramientas.";
sidechainGuide.featuredSnippet.faq_q3_es = "¿Qué plugin debo comprar para sidechain ducking simple?";
sidechainGuide.featuredSnippet.faq_a3_es = "Para sidechain ducking simple, empieza con el Cableguys ShaperBox 3. Es la opción más intuitiva y versátil, con patrones de sidechain preestablecidos que funcionan al insta.";
sidechainGuide.featuredSnippet.faq_q4_es = "¿Qué es el efecto de media velocidad y qué plugin lo crea?";
sidechainGuide.featuredSnippet.faq_a4_es = "El efecto de media velocidad reduce el audio a la mitad de su velocidad original manteniendo el tono, creando un sonido oscuro y estirado. El Cableguys HalfTime es el plugin más popular y económico para este efecto.";
sidechainGuide.featuredSnippet.faq_q5_es = "¿Estos plugins consumen mucha CPU?";
sidechainGuide.featuredSnippet.faq_a5_es = "La mayoría están optimizados para bajo consumo de CPU. ShaperBox 3 y HalfTime son muy ligeros. Infiltrator 2 con muchos efectos activos puede usar más CPU, pero funciona eficientemente en sistemas modernos.";

// Beatmaker
beatmakerGuide.featuredSnippet.faq_q1_es = "¿Cuál es el plugin más importante para beatmaking lo-fi?";
beatmakerGuide.featuredSnippet.faq_a1_es = "El XLN Audio RC-20 Retro Color es el plugin más esencial para beatmaking lo-fi. Añade la calidez vintage, el ruido de vinilo y la degradación de cinta que definen el sonido lo-fi.";
beatmakerGuide.featuredSnippet.faq_q2_es = "¿Necesito plugins caros para hacer beats con sonido profesional?";
beatmakerGuide.featuredSnippet.faq_a2_es = "No. Muchos de los mejores plugins para beatmaking cuestan menos de $100. El RC-20 Retro Color ($99), Cableguys HalfTime ($12) y Scaler 3 ($99) pueden dar resultados profesionales a una fracción del costo del hardware.";
beatmakerGuide.featuredSnippet.faq_q3_es = "¿Se pueden usar estos plugins para géneros que no sean hip-hop?";
beatmakerGuide.featuredSnippet.faq_a3_es = "Claro que sí. Estos plugins funcionan en pop, R&B, electrónica, bandas sonoras y cualquier género que se beneficie de carácter vintage y movimiento rítmico.";
beatmakerGuide.featuredSnippet.faq_q4_es = "¿Cuál es el mejor plugin para crear progresiones de acordes sin saber teoría musical?";
beatmakerGuide.featuredSnippet.faq_a4_es = "El Plugin Boutique Scaler 3 es la mejor herramienta para esto. Proporciona progresiones de acordes específicas por género que suenan profesionales, con exportación de MIDI por arrastrar y soltar.";
beatmakerGuide.featuredSnippet.faq_q5_es = "¿Cómo añado espacio y profundidad a mis beats?";
beatmakerGuide.featuredSnippet.faq_a5_es = "El Excite Audio Lifeline Expanse añade ambience realista de sala que hace que los beats secos se sientan como si existieran en un espacio real. Es más sutil y musical que la reverb tradicional.";

// ===== ADD COMPARISON TABLES =====
aiGuide.comparison = {
  rows: [
    { label: "Type", label_es: "Tipo", val1: "Smart EQ", val2: "Mixing Suite", val1_es: "EQ Inteligente", val2_es: "Suite de Mezcla" },
    { label: "AI Features", label_es: "Funciones IA", val1: "Spectral balancing, multi-track masking detection", val2: "Mix Assistant, Unmask, module suggestions", val1_es: "Balance espectral, detección de enmascaramiento multi-pista", val2_es: "Mix Assistant, Unmask, sugerencias de módulos" },
    { label: "Tracks", label_es: "Pistas", val1: "Multi-track analysis", val2: "Single or multi-track", val1_es: "Análisis multi-pista", val2_es: "Individual o multi-pista" },
    { label: "Best For", label_es: "Ideal Para", val1: "EQ across all mixing sessions", val2: "Individual track mixing assistance", val1_es: "EQ en todas las sesiones de mezcla", val2_es: "Asistencia de mezcla en pistas individuales" },
    { label: "Modules", label_es: "Módulos", val1: "1 (EQ)", val2: "5 (EQ, Compressor, Transient Shaper, Exciter, Clipper)", val1_es: "1 (EQ)", val2_es: "5 (EQ, Compresor, Moldeador de Transientes, Excitador, Clipper)" },
    { label: "Price", label_es: "Precio", val1: "$129", val2: "$299", val1_es: "$129", val2_es: "$299" }
  ]
};

sidechainGuide.comparison = {
  rows: [
    { label: "Type", label_es: "Tipo", val1: "Rhythmic Multi-FX", val2: "Multi-Effect Sequencer", val1_es: "Multi-FX Rítmico", val2_es: "Secuenciador de Multi-Efectos" },
    { label: "Effects", label_es: "Efectos", val1: "Sidechain, filter, pan, volume, distortion", val2: "28 effects including granular, spectral", val1_es: "Sidechain, filtro, paneo, volumen, distorsión", val2_es: "28 efectos incluyendo granular, espectral" },
    { label: "Ease of Use", label_es: "Facilidad de Uso", val1: "Preset patterns, visual curves", val2: "Per-step modulation, XY pad", val1_es: "Patrones preestablecidos, curvas visuales", val2_es: "Modulación por paso, pad XY" },
    { label: "Best For", label_es: "Ideal Para", val1: "Everyday rhythmic modulation", val2: "Experimental creative effects", val1_es: "Modulación rítmica diaria", val2_es: "Efectos creativos experimentales" },
    { label: "CPU Usage", label_es: "Uso de CPU", val1: "Moderate", val2: "Higher with many effects", val1_es: "Moderado", val2_es: "Mayor con muchos efectos" },
    { label: "Price", label_es: "Precio", val1: "$99", val2: "$129", val1_es: "$99", val2_es: "$129" }
  ]
};

beatmakerGuide.comparison = {
  rows: [
    { label: "Type", label_es: "Tipo", val1: "Lo-Fi & Vintage FX", val2: "Transition Effects", val1_es: "FX Lo-Fi y Vintage", val2_es: "Efectos de Transición" },
    { label: "Effect Modules", label_es: "Módulos de Efectos", val1: "6 (Vinyl, Tape, Magneto, Noise, Distortion, Space)", val2: "21 built-in effects", val1_es: "6 (Vinilo, Cinta, Magneto, Ruido, Distorsión, Espacial)", val2_es: "21 efectos integrados" },
    { label: "Workflow", label_es: "Flujo de Trabajo", val1: "Per-track character layering", val2: "One-knob transitions and builds", val1_es: "Capas de carácter por pista", val2_es: "Transiciones y builds con un knob" },
    { label: "Best For", label_es: "Ideal Para", val1: "Adding vintage warmth and texture", val2: "Creating builds, drops and fills", val1_es: "Añadir calidez y textura vintage", val2_es: "Crear builds, drops y fills" },
    { label: "Genre Fit", label_es: "Género Ideal", val1: "Lo-fi, hip-hop, R&B", val2: "EDM, pop, hip-hop, any", val1_es: "Lo-fi, hip-hop, R&B", val2_es: "EDM, pop, hip-hop, cualquier género" },
    { label: "Price", label_es: "Precio", val1: "$99", val2: "$129", val1_es: "$99", val2_es: "$129" }
  ]
};

// Write back
fs.writeFileSync(guidesPath, JSON.stringify(guides, null, 2), 'utf8');
console.log('Fixed verdictProsCons, Spanish translations, FAQ translations, and added comparison tables for all3 guides');
