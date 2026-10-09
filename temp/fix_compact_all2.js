const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const guide = g.find(x => x.id === 'compact-rhythm-devices');

// Fix intro
guide.intro = "Los grandes estudios se quedan en casa; estas diez cajas caben en una mochila y funcionan con batería. Del sampler de bolsillo viral a la estación en forma de barra, estos son los dispositivos compactos de ritmo que demuestran que lo pequeño pega más fuerte.";
guide.intro_es = guide.intro;

// Fix verdict
guide.verdict = "El EP-133 K.O. II es el rey del impacto mediático para bocetos rápidos, el Roland P-6 se corona como el sampler de bolsillo más profundo y el Yamaha SEQTRAK es el estudio de viaje más completo. El Model:Samples y el Model:Cycles son la forma más económica de acceder al cerebro de secuenciación de Elektron; el Circuit Rhythm y el Liven Lofi-12 son las opciones ideales para la interpretación en vivo; el Volca Sample 2 es la puerta de entrada de bajo coste; el Tracker Mini es la elección del compositor analítico y la TR-6S es la esencia de Roland en formato portátil.";
guide.verdict_es = guide.verdict;

// Fix pros/cons
const pc = {
  'Roland AIRA Compact P-6': {
    pros: [
      "Un potente motor de síntesis granular alojado en un chasis de apenas 300 gramos",
      "Incluye 20 efectos master heredados directamente de la aclamada serie SP de Roland",
      "Permite samplear directamente desde el teléfono móvil a través de su conexión USB-C",
      "Secuenciador de 64 pasos con control de probabilidad por paso"
    ],
    cons: [
      "Su pantalla de solo 4 caracteres te obliga a memorizar combinaciones de comandos crípticas",
      "Los botones diminutos dificultan enormemente el finger-drumming fluido",
      "Polifonía limitada si pretendes apilar secuencias demasiado densas",
      "Su autonomía de 3 horas de batería puede cortar las sesiones de creación más largas"
    ]
  },
  'Teenage Engineering EP-133 K.O. II': {
    pros: [
      "El flujo de trabajo más rápido para pasar de la idea al ritmo por menos de 300 €",
      "Efectos punch-in 2.0 diseñados específicamente para lucirse en directo",
      "Micrófono integrado y teclas con alta sensibilidad a la presión",
      "Diseño ultra estilizado que cabe en cualquier compartimento de la mochila"
    ],
    cons: [
      "Sus 128 MB de memoria total limitan el uso de muestras excesivamente largas",
      "Carece de modo canción dedicado para estructurar arreglos complejos de forma autónoma",
      "Su chasis de plástico requiere transportarlo protegido y con cierto cuidado",
      "El flujo de trabajo interno no está optimizado para hacer resampling avanzado de forma cómoda"
    ]
  },
  'Yamaha SEQTRAK': {
    pros: [
      "Motores de síntesis AWM2 y FM que ponen a tu disposición más de 2.000 sonidos integrados",
      "Muestreo, altavoz y micrófono integrados en la propia unidad",
      "Permite transferir muestras de forma inalámbrica a través de Wi-Fi",
      "Una aplicación complementaria para dispositivos móviles excelente para la edición profunda"
    ],
    cons: [
      "Estás obligado a usar la aplicación móvil si quieres editar parches de forma minuciosa",
      "No cuenta con funciones nativas de troceo (chopping) de muestras directamente en el hardware",
      "Su diseño alargado en barra se adapta bien a las mochilas, pero olvídate de meterlo en los bolsillos"
    ]
  },
  'Elektron Model:Samples': {
    pros: [
      "El genuino secuenciador de Elektron adaptado a un precio de entrada muy accesible",
      "Control de un mando por función que elimina por completo el buceo por menús",
      "Gestión de polirritmias y escalas independientes por pista",
      "Incluye una librería de 300 sonidos cuidadosamente seleccionados por Splice"
    ],
    cons: [
      "Es una máquina de reproducción: reproduce samples pero no tiene entrada para grabarlos directamente",
      "Sus 64 MB de memoria RAM por proyecto restringen la carga de muestras masivas simultáneas",
      "La navegación por su sistema de archivos digitales se siente algo rudimentaria",
      "No incluye batería interna; requiere el adaptador de corriente o comprar su empuñadura de pilas opcional"
    ]
  },
  'Novation Circuit Rhythm': {
    pros: [
      "Su rejilla táctil libre de pantallas te obliga a producir guiándote exclusivamente por el oído",
      "Permite samplear, trocear y hacer resampling interno sin herramientas externas",
      "Los Grid FX están perfectamente diseñados para generar transiciones dinámicas en vivo",
      "Incluye una batería recargable con hasta 4 horas de autonomía real"
    ],
    cons: [
      "No ofrece visualización de la onda de audio en ningún apartado físico",
      "La gestión y el respaldo de tus librerías depende por completo de la aplicación Components",
      "La memoria de almacenamiento por proyecto es algo limitada",
      "Sus 8 pistas son estrictamente monofónicas, lo que limita el apilamiento de capas armónicas"
    ]
  },
  'Sonicware Liven Lofi-12': {
    pros: [
      "Motor de muestreo retro real que procesa el audio a unos nostálgicos 12 bits",
      "El control Laidback añade un balanceo (swing) orgánico e imperfecto a tus ritmos al instante",
      "Teclado integrado de dos octavas ideal para tocar líneas melódicas cromáticas",
      "Altavoz integrado y funcionamiento a pilas para improvisar en el sofá"
    ],
    cons: [
      "Su chasis de plástico rígido transmite una sensación algo económica al tacto",
      "El límite de 4 segundos por muestra frena las ambiciones de quienes usan loops largos",
      "No dispone de algoritmos avanzados de time-stretching",
      "Ofrece un sonido muy enfocado a un nicho concreto (Lo-Fi/Boom-Bap), restándole versatilidad"
    ]
  },
  'Korg Volca Sample 2': {
    pros: [
      "El precio más competitivo del mercado para adentrarse en el muestreo por hardware",
      "200 ranuras de memoria con una transferencia de datos ágil vía USB",
      "El sistema motion sequencing automatiza parámetros en tiempo real sobre la marcha",
      "Su función de encadenamiento de patrones permite estructurar temas completos"
    ],
    cons: [
      "Sus 8 MB de memoria total son minúsculos para los estándares actuales",
      "Depende de pilas AA tradicionales al carecer de una batería de litio integrada",
      "Su paleta de efectos es básica, ofreciendo únicamente una reverberación global",
      "Los mini potenciómetros pueden resultar incómodos si tienes dedos grandes"
    ]
  },
  'Polyend Tracker Mini': {
    pros: [
      "El flujo de trabajo completo de un tracker musical concentrado en solo 350 gramos",
      "Muestreo estéreo respaldado por 4 motores de síntesis digital integrados",
      "Hasta 8 horas de autonomía de batería e incluye una funda rígida de viaje premium de fábrica",
      "Envío de pistas de audio independientes por USB directas a tu DAW"
    ],
    cons: [
      "La navegación mediante combinaciones de botones y cursor exige una curva de aprendizaje inicial",
      "El clic mecánico de sus teclas puede resultar molesto si buscas producir en entornos completamente silenciosos",
      "Carece de la clásica cuadrícula de pads rápidos orientada a la improvisación de ritmos en vivo"
    ]
  },
  'Elektron Model:Cycles': {
    pros: [
      "La potencia del secuenciador Elektron y sus parameter locks al precio más bajo de la marca",
      "Seis pistas dedicadas a una versátil síntesis digital FM para esculpir sonidos metálicos y percusivos",
      "Diseño compacto y ligero, ideal para integrarse en sets portátiles como generador de ritmos"
    ],
    cons: [
      "Es una máquina de síntesis pura: no cuenta con motor de sampling ni reproduce archivos de audio",
      "Su diminuta pantalla OLED monocromática dificulta la edición visual fluida de los menús",
      "Los saltos físicos en el recorrido de sus potenciómetros pueden entorpecer los barridos de filtro más suaves"
    ]
  },
  'Roland TR-6S': {
    pros: [
      "Reúne 6 modelos analógicos virtuales de la tecnología ACB junto a la opción de importar tus propios samples",
      "Flexibilidad total de alimentación: funciona tanto a pilas como conectado por USB",
      "Secuenciador avanzado con controles de probabilidad, sub-pasos y variaciones de groove",
      "El sonido contundente de las legendarias cajas de Roland a pilas en un formato de mochila"
    ],
    cons: [
      "Su secuenciador está limitado estrictamente a 6 pistas simultáneas",
      "La pantalla de lectura es pequeña y requiere acostumbrarse a sus abreviaturas",
      "Su diseño compacto cuenta con un único mando de control físico global, lo que ralentiza el ajuste de niveles independientes durante una actuación en directo"
    ]
  }
};

guide.verdictProsCons.forEach(v => {
  const fix = pc[v.name];
  if (fix) {
    v.pros = fix.pros;
    v.pros_es = fix.pros;
    v.cons = fix.cons;
    v.cons_es = fix.cons;
    console.log('Fixed:', v.name);
  }
});

// Fix FAQ
const snip = guide.featuredSnippet;
const faq = {
  'faq_q1': "¿Es el Teenage Engineering EP-133 el mejor sampler de bolsillo para empezar?",
  'faq_a1': "Por velocidad de trabajo y diversión, rotundamente sí. El EP-133 K.O. II te permite transformar ideas en ritmos en cuestión de segundos gracias a su micrófono integrado, sus teclas sensibles y sus adictivos efectos punch-in. No obstante, sus 128 MB de memoria total y la ausencia de un modo canción tradicional pueden limitar la producción de temas enteros de forma autónoma. Lo ideal es combinarlo con un DAW o dar el salto al Roland P-6 si buscas herramientas de muestreo más profundas.",
  'faq_q2': "Roland P-6 vs. EP-133: ¿Qué sampler de bolsillo es el ganador?",
  'faq_a2': "La profundidad técnica le pertenece al Roland P-6: cuenta con un motor de síntesis granular nativo, 20 efectos master profesionales y un secuenciador de 64 pasos con control de probabilidad. Por contra, la velocidad y el encanto inmediato son del EP-133: es más rápido para plasmar ideas y sus efectos en vivo son más divertidos. Los diseñadores de sonido preferirán el P-6, mientras que los productores que busquen capturar chispas creativas al vuelo elegirán el EP-133.",
  'faq_q3': "¿Funciona el Yamaha SEQTRAK de forma autónoma sin la aplicación móvil?",
  'faq_a3': "Sí, la composición de beats y las funciones de directo operan al 100% de manera autónoma: el muestreo, la secuenciación, el altavoz integrado y la batería no requieren el teléfono para nada. Sin embargo, la edición profunda de los sintetizadores depende por completo de la aplicación oficial de SEQTRAK, y la unidad no permite trocear muestras (chopping) desde su interfaz física. Lo ideal es plantear el hardware como el instrumento interpretativo y la app como el editor de laboratorio.",
  'faq_q4': "Elektron Model:Samples vs. Model:Cycles: ¿Cuál debería elegir?",
  'faq_a4': "El Model:Samples trabaja con tus propios archivos de audio: ofrece seis pistas de reproducción de samples con el potente secuenciador de Elektron, pero no graba audio externo de forma directa. El Model:Cycles, por su parte, es un sintetizador puro: cuenta con seis motores (machines) de síntesis FM y carece por completo de muestreo. Si quieres disparar tus librerías en directo, elige el Samples; si prefieres esculpir texturas metálicas desde cero, opta por el Cycles.",
  'faq_q5': "¿Puede una groovebox compacta reemplazar por completo a un DAW?",
  'faq_a5': "Para esbozar ideas y tocar en directo, sí. Estas cajas de bolsillo te permiten armar patrones, encadenar secuencias, programar baterías o sintetizadores y actuar sin un PC delante. Sin embargo, las tareas de mezcla quirúrgica, masterización final y edición detallada de audio siguen siendo terreno exclusivo del DAW. El flujo de trabajo clásico y más eficiente consiste en usar la groovebox para la chispa creativa inicial y el DAW para pulir el tema.",
  'faq_q6': "¿Qué caja rítmica compacta es la más fácil para comenzar?",
  'faq_a6': "El Korg Volca Sample 2 es la puerta de entrada más económica: ofrece 200 ranuras de memoria, automatización en tiempo real (motion sequencing) y encadenamiento de patrones con una curva de aprendizaje prácticamente nula. El EP-133 es la opción más divertida y visual, mientras que el Tracker Mini y el Model:Cycles requieren más paciencia, pero recompensan al usuario con herramientas sustancialmente más profundas.",
  'faq_q7': "¿Es suficiente la Roland TR-6S para tener las baterías clásicas de Roland en formato portátil?",
  'faq_a7': "Para la gran mayoría de productores, sí. La TR-6S condensa los modelos ACB analógicos virtuales de la marca, síntesis FM editable, soporte para muestras y secuenciación por probabilidad en una caja compacta a pilas. Aunque sacrificas el número de pistas simultáneas, las salidas individuales y los faders físicos frente al modelo insignia (la TR-8S), la TR-6S se consolida como la compra más inteligente para llevar en la mochila."
};

Object.keys(faq).forEach(k => { snip[k] = faq[k]; });

// Fix conclusion
guide.conclusion = "Elige tu dispositivo en función de tus hábitos de viaje: si tu prioridad es capturar bocetos rápidos en cualquier rincón, tu sitio está en el EP-133 K.O. II, el Roland P-6 o el Volca Sample 2; si buscas montar un estudio completo en la mochila, el Yamaha SEQTRAK o el Tracker Mini son las mejores estaciones todo en uno; si prefieres la improvisación táctil en vivo, tu flujo encajará con el Circuit Rhythm o el Liven Lofi-12. Por último, los Model:Samples y Model:Cycles representan la escuela perfecta para aprender la metódica filosofía de secuenciación de Elektron por muy poco, mientras que la TR-6S mantiene el legado rítmico de Roland totalmente portátil.";
guide.conclusion_es = guide.conclusion;

fs.writeFileSync('data/guides.json', JSON.stringify(g, null, 2) + '\n');
console.log('Done.');
