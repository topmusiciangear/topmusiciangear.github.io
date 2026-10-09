const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const guide = g.find(x => x.id === 'best-drum-machine');

// Fix verdictProsCons
const prosConsFixes = {
  'Roland AIRA Compact T-8': {
    pros: [
      "Los míticos sonidos de la 808, 909 y 606 combinados con el bajo de la TB-303 en apenas 310 gramos de peso",
      "Batería recargable integrada para tirar líneas de ritmos en cualquier parte",
      "Flujo de trabajo clásico TR-REC intuitivo y sin curva de aprendizaje",
      "La puerta de entrada más económica al sonido analógico virtual genuino de Roland"
    ],
    pros_es: [
      "Los míticos sonidos de la 808, 909 y 606 combinados con el bajo de la TB-303 en apenas 310 gramos de peso",
      "Batería recargable integrada para tirar líneas de ritmos en cualquier parte",
      "Flujo de trabajo clásico TR-REC intuitivo y sin curva de aprendizaje",
      "La puerta de entrada más económica al sonido analógico virtual genuino de Roland"
    ],
    cons: [
      "Las perillas diminutas castigan a quienes tienen dedos grandes",
      "No cuenta con motor de sampling propio; dependes estrictamente de sus sonidos de fábrica",
      "Las conexiones MIDI minijack de 3.5 mm te obligan a cargar con cables adaptadores",
      "Su tamaño de bolsillo lo vuelve propenso a caídas y pérdidas por descuido"
    ],
    cons_es: [
      "Las perillas diminutas castigan a quienes tienen dedos grandes",
      "No cuenta con motor de sampling propio; dependes estrictamente de sus sonidos de fábrica",
      "Las conexiones MIDI minijack de 3.5 mm te obligan a cargar con cables adaptadores",
      "Su tamaño de bolsillo lo vuelve propenso a caídas y pérdidas por descuido"
    ]
  },
  'Novation Circuit Tracks': {
    pros: [
      "Un flujo de trabajo sin pantallas que te obliga a estructurar tus canciones guiándote únicamente por el oído",
      "Batería integrada y ranura para tarjetas microSD que te permiten llevar packs enteros de samples a donde quieras",
      "Gran versatilidad: gestiona dos sintetizadores digitales, cuatro pistas de batería y dos canales MIDI adicionales en una sola caja",
      "Una de las grooveboxes más amables y rápidas de aprender del mercado"
    ],
    pros_es: [
      "Un flujo de trabajo sin pantallas que te obliga a estructurar tus canciones guiándote únicamente por el oído",
      "Batería integrada y ranura para tarjetas microSD que te permiten llevar packs enteros de samples a donde quieras",
      "Gran versatilidad: gestiona dos sintetizadores digitales, cuatro pistas de batería y dos canales MIDI adicionales en una sola caja",
      "Una de las grooveboxes más amables y rápidas de aprender del mercado"
    ],
    cons: [
      "El diseño y edición profunda de los parches de sintetizador requiere conectar obligatoriamente su aplicación de ordenador o tablet",
      "Sus secuencias básicas pueden quedarse cortas para arreglos sumamente complejos si no usas de forma agresiva sus patrones encadenados",
      "Los pads de goma acumulan desgaste estético si se les da un uso muy duro en directo"
    ],
    cons_es: [
      "El diseño y edición profunda de los parches de sintetizador requiere conectar obligatoriamente su aplicación de ordenador o tablet",
      "Sus secuencias básicas pueden quedarse cortas para arreglos sumamente complejos si no usas de forma agresiva sus patrones encadenados",
      "Los pads de goma acumulan desgaste estético si se les da un uso muy duro en directo"
    ]
  },
  'Arturia DrumBrute Impact': {
    pros: [
      "Diez voces analógicas puras con un control de distorsión Color dedicado por perilla",
      "Secuenciador polirrítmico avanzado de 64 pasos con funciones de repetición roller instantáneas",
      "Circuito de distorsión master global y salidas físicas individuales para procesar elementos por separado",
      "La mayor diversión por cada euro invertido en hardware analógico rítmico puro"
    ],
    pros_es: [
      "Diez voces analógicas puras con un control de distorsión Color dedicado por perilla",
      "Secuenciador polirrítmico avanzado de 64 pasos con funciones de repetición roller instantáneas",
      "Circuito de distorsión master global y salidas físicas individuales para procesar elementos por separado",
      "La mayor diversión por cada euro invertido en hardware analógico rítmico puro"
    ],
    cons: [
      "No tiene memoria interna para audio ni motor de samples; es una máquina de síntesis pura y dura",
      "Al ser circuitería analógica real, la afinación puede sufrir ligeras derivas de tono según la temperatura ambiente",
      "Sus graves atronadores te garantizan visitas o quejas de vecinos ruidosos si no mides el volumen"
    ],
    cons_es: [
      "No tiene memoria interna para audio ni motor de samples; es una máquina de síntesis pura y dura",
      "Al ser circuitería analógica real, la afinación puede sufrir ligeras derivas de tono según la temperatura ambiente",
      "Sus graves atronadores te garantizan visitas o quejas de vecinos ruidosos si no mides el volumen"
    ]
  },
  'Roland TR-8S': {
    pros: [
      "El estándar definitivo para live-sets de techno gracias a sus faders dedicados por canal",
      "Combina síntesis de modelado de circuitos (ACB) con la opción de importar tus propios samples",
      "Las funciones de escenas cambian kits enteros y variaciones a mitad de compás de forma fluida",
      "Seis salidas físicas independientes y envío de audio multicanal por USB directo a tu mesa de mezclas"
    ],
    pros_es: [
      "El estándar definitivo para live-sets de techno gracias a sus faders dedicados por canal",
      "Combina síntesis de modelado de circuitos (ACB) con la opción de importar tus propios samples",
      "Las funciones de escenas cambian kits enteros y variaciones a mitad de compás de forma fluida",
      "Seis salidas físicas independientes y envío de audio multicanal por USB directo a tu mesa de mezclas"
    ],
    cons: [
      "Requiere navegar a través de varias capas de menús bajo su superficie táctil para configuraciones avanzadas",
      "Sus 2,1 kg de peso y la necesidad de enchufe permanente la anclan principalmente al escenario o al estudio",
      "Su precio se sitúa en un rango premium frente a alternativas más compactas"
    ],
    cons_es: [
      "Requiere navegar a través de varias capas de menús bajo su superficie táctil para configuraciones avanzadas",
      "Sus 2,1 kg de peso y la necesidad de enchufe permanente la anclan principalmente al escenario o al estudio",
      "Su precio se sitúa en un rango premium frente a alternativas más compactas"
    ]
  },
  'Akai MPC One G2': {
    pros: [
      "El mítico flujo de pads que inventó el hip-hop, ahora optimizado con el doble de potencia de procesamiento",
      "Estructuración y finalización de canciones directo en su pantalla táctil autónoma con soporte integrado para Stems",
      "Gran capacidad de trabajo con 32 instancias de plugins, 16 pistas de audio estéreo y 64 GB de almacenamiento interno",
      "Conectividad masiva con envío de 24 canales de audio por USB-C, Wi-Fi, Bluetooth y la renovada interfaz de MPC 3 OS"
    ],
    pros_es: [
      "El mítico flujo de pads que inventó el hip-hop, ahora optimizado con el doble de potencia de procesamiento",
      "Estructuración y finalización de canciones directo en su pantalla táctil autónoma con soporte integrado para Stems",
      "Gran capacidad de trabajo con 32 instancias de plugins, 16 pistas de audio estéreo y 64 GB de almacenamiento interno",
      "Conectividad masiva con envío de 24 canales de audio por USB-C, Wi-Fi, Bluetooth y la renovada interfaz de MPC 3 OS"
    ],
    cons: [
      "La pantalla táctil puede sentirse algo congestionada en proyectos grandes si estás acostumbrado a un monitor de ordenador de gran tamaño",
      "Sus 4 GB de RAM marcan el límite técnico para proyectos con un número masivo de samples pesados cargados en memoria de forma simultánea",
      "No cuenta con batería integrada para trabajar al aire libre de forma portátil",
      "Se despide de su clásica pintura roja para adoptar un diseño sobrio en color negro"
    ],
    cons_es: [
      "La pantalla táctil puede sentirse algo congestionada en proyectos grandes si estás acostumbrado a un monitor de ordenador de gran tamaño",
      "Sus 4 GB de RAM marcan el límite técnico para proyectos con un número masivo de samples pesados cargados en memoria de forma simultánea",
      "No cuenta con batería integrada para trabajar al aire libre de forma portátil",
      "Se despide de su clásica pintura roja para adoptar un diseño sobrio en color negro"
    ]
  },
  'Elektron Digitakt II': {
    pros: [
      "Dieciséis pistas estéreo nativas para samplear absolutamente cualquier fuente de audio externa o digital",
      "Secuenciador avanzado de hasta 128 pasos con parameter locks revolucionarios y generación matemática de ritmos euclidianos",
      "Capacidad sobrada gracias a sus 400 MB de memoria RAM por proyecto y 20 GB de almacenamiento interno de alta velocidad",
      "Uno de los instrumentos digitales de muestreo más profundos e inspiradores de la guía"
    ],
    pros_es: [
      "Dieciséis pistas estéreo nativas para samplear absolutamente cualquier fuente de audio externa o digital",
      "Secuenciador avanzado de hasta 128 pasos con parameter locks revolucionarios y generación matemática de ritmos euclidianos",
      "Capacidad sobrada gracias a sus 400 MB de memoria RAM por proyecto y 20 GB de almacenamiento interno de alta velocidad",
      "Uno de los instrumentos digitales de muestreo más profundos e inspiradores de la guía"
    ],
    cons: [
      "La lógica del secuenciador de Elektron impone una curva de aprendizaje inicial exigente para principiantes",
      "Su pantalla OLED monocromática de 128x64 píxeles te obligará a entrecerrar los ojos a la hora de editar ondas complejas",
      "Su precio exige un desembolso importante antes de poder adentrarte en su ecosistema de diseño sonoro"
    ],
    cons_es: [
      "La lógica del secuenciador de Elektron impone una curva de aprendizaje inicial exigente para principiantes",
      "Su pantalla OLED monocromática de 128x64 píxeles te obligará a entrecerrar los ojos a la hora de editar ondas complejas",
      "Su precio exige un desembolso importante antes de poder adentrarte en su ecosistema de diseño sonoro"
    ]
  },
  'Elektron Syntakt': {
    pros: [
      "Lo mejor de ambos mundos: la pegada visceral de la percusión analógica y las texturas exóticas de la síntesis digital en una sola unidad",
      "Versatilidad extrema gracias a sus 37 motores de síntesis (machines) capaces de modelar desde bombos atronadores hasta acordes cristalinos",
      "Incluye modo canción completo y compatibilidad nativa con Overbridge para enviar pistas independientes por USB",
      "Cualquiera de sus 12 pistas puede transformarse instantáneamente en una pista de secuenciación MIDI externa"
    ],
    pros_es: [
      "Lo mejor de ambos mundos: la pegada visceral de la percusión analógica y las texturas exóticas de la síntesis digital en una sola unidad",
      "Versatilidad extrema gracias a sus 37 motores de síntesis (machines) capaces de modelar desde bombos atronadores hasta acordes cristalinos",
      "Incluye modo canción completo y compatibilidad nativa con Overbridge para enviar pistas independientes por USB",
      "Cualquiera de sus 12 pistas puede transformarse instantáneamente en una pista de secuenciación MIDI externa"
    ],
    cons: [
      "No cuenta con motor de sampling; depende exclusivamente de sus generadores internos de síntesis",
      "Su pantalla pequeña mantiene viva la clásica dinámica de buceo por menús típica de Elektron",
      "Su flujo de trabajo resulta más abstracto y frío que el de las grooveboxes tradicionales basadas en pads"
    ],
    cons_es: [
      "No cuenta con motor de sampling; depende exclusivamente de sus generadores internos de síntesis",
      "Su pantalla pequeña mantiene viva la clásica dinámica de buceo por menús típica de Elektron",
      "Su flujo de trabajo resulta más abstracto y frío que el de las grooveboxes tradicionales basadas en pads"
    ]
  },
  'Erica Synths Pērkons HD-01': {
    pros: [
      "Una imponente interfaz física con un control dedicado por función, chasis reforzado de tamaño maleta y cero menús digitales",
      "Filtros analógicos demoledores integrados con un módulo de delay de cinta BBD idóneo para modular texturas industriales",
      "Se toca y se comporta como un instrumento analógico interpretativo, no como una simple caja programable",
      "No hay nada en el mercado que tenga su estética agresiva ni que pegue con tanta contundencia en frecuencias graves"
    ],
    pros_es: [
      "Una imponente interfaz física con un control dedicado por función, chasis reforzado de tamaño maleta y cero menús digitales",
      "Filtros analógicos demoledores integrados con un módulo de delay de cinta BBD idóneo para modular texturas industriales",
      "Se toca y se comporta como un instrumento analógico interpretativo, no como una simple caja programable",
      "No hay nada en el mercado que tenga su estética agresiva ni que pegue con tanta contundencia en frecuencias graves"
    ],
    cons: [
      "Sus 3,7 kg de chasis metálico pesado hacen que rara vez salga de la mesa principal de tu estudio",
      "Carece por completo de opciones de muestreo (sampling) a pesar de costar un precio de gama alta",
      "Con lo que cuesta esta unidad podrías financiar un estudio o set de directo completo con múltiples máquinas alternativas"
    ],
    cons_es: [
      "Sus 3,7 kg de chasis metálico pesado hacen que rara vez salga de la mesa principal de tu estudio",
      "Carece por completo de opciones de muestreo (sampling) a pesar de costar un precio de gama alta",
      "Con lo que cuesta esta unidad podrías financiar un estudio o set de directo completo con múltiples máquinas alternativas"
    ]
  }
};

guide.verdictProsCons.forEach(v => {
  const fix = prosConsFixes[v.name];
  if (fix) {
    v.pros = fix.pros;
    v.pros_es = fix.pros_es;
    v.cons = fix.cons;
    v.cons_es = fix.cons_es;
    console.log('Fixed pros/cons:', v.name);
  }
});

// Fix verdict
guide.verdict = "Viaja ligero con el Roland T-8 o el Novation Circuit Tracks. Manda en los escenarios con el Arturia DrumBrute, la Roland TR-8S o el Akai MPC One G2. Gobierna el estudio con el Elektron Digitakt II, el Syntakt o el imponente Erica Synths Pērkons HD-01.";
guide.verdict_es = "Viaja ligero con el Roland T-8 o el Novation Circuit Tracks. Manda en los escenarios con el Arturia DrumBrute, la Roland TR-8S o el Akai MPC One G2. Gobierna el estudio con el Elektron Digitakt II, el Syntakt o el imponente Erica Synths Pērkons HD-01.";

fs.writeFileSync('data/guides.json', JSON.stringify(g, null, 2) + '\n');
console.log('Done. Pros/cons + verdict updated for', Object.keys(prosConsFixes).length, 'products.');
