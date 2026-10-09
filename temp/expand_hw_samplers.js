const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const guide = g.find(x => x.id === 'best-hardware-samplers');

guide.featuredProducts = [255, 257, 256, 127, 615, 188, 625];

const newSections = [
  {
    heading: "The Viral Sketchpad: EP-133 K.O. II",
    heading_es: "El bloc de notas viral: EP-133 K.O. II",
    content: "<p><strong>El sampler de bolsillo más vendido para bocetos rápidos de beats e improvisación con efectos punch-in.</strong> El K.O. II captura el entorno con su micrófono integrado, trocea muestras con teclas sensibles a la presión y dispara efectos en vivo, todo en un chasis ultraportátil.</p><p>Sus 128 MB de memoria total pueden quedarse cortos para proyectos complejos y carece de modo canción tradicional. Pero como herramienta de diversión portátil e inmediata, sigue invicta en su categoría.</p>",
    content_es: "<p><strong>El sampler de bolsillo más vendido para bocetos rápidos de beats e improvisación con efectos punch-in.</strong> El K.O. II captura el entorno con su micrófono integrado, trocea muestras con teclas sensibles a la presión y dispara efectos en vivo, todo en un chasis ultraportátil.</p><p>Sus 128 MB de memoria total pueden quedarse cortos para proyectos complejos y carece de modo canción tradicional. Pero como herramienta de diversión portátil e inmediata, sigue invicta en su categoría.</p>",
    products: [615]
  },
  {
    heading: "The Portable Workstation: MPC Live III",
    heading_es: "La estación autónoma portátil: MPC Live III",
    content: "<p><strong>La verdadera estación autónoma portátil con batería integrada, altavoces reales, stems y pantalla táctil de 7 pulgadas pensada para el hip-hop moderno.</strong> El Live III permite esbozar ritmos en el tren, estructurarlos en el hotel y finalizarlos en el estudio, todo respaldado por los legendarios pads de Akai y expresión 3D.</p><p>Con sus 3,9 kg de peso no es precisamente un juguete de bolsillo y su precio se sitúa en terreno profesional. Aun así, gracias a sus 6 salidas físicas independientes y su compatibilidad con Stems, sigue siendo la estación todo en uno de referencia para el hip-hop moderno.</p>",
    content_es: "<p><strong>La verdadera estación autónoma portátil con batería integrada, altavoces reales, stems y pantalla táctil de 7 pulgadas pensada para el hip-hop moderno.</strong> El Live III permite esbozar ritmos en el tren, estructurarlos en el hotel y finalizarlos en el estudio, todo respaldado por los legendarios pads de Akai y expresión 3D.</p><p>Con sus 3,9 kg de peso no es precisamente un juguete de bolsillo y su precio se sitúa en terreno profesional. Aun así, gracias a sus 6 salidas físicas independientes y su compatibilidad con Stems, sigue siendo la estación todo en uno de referencia para el hip-hop moderno.</p>",
    products: [188]
  },
  {
    heading: "The Tracker Standard: Polyend Tracker Mini",
    heading_es: "El estándar tracker: Polyend Tracker Mini",
    content: "<p><strong>El estándar portátil para los productores que prefieren la composición de beats mediante tracker vertical tradicional con total precisión quirúrgica.</strong> Ocho pistas de audio estéreo dedicadas, motores de síntesis digital integrados y micrófono en un peso de tan solo 350 gramos.</p><p>Su flujo de trabajo basado en pantallas verticales, botones y cursor exige semanas de práctica. Para compositores analíticos que disfrutan estructurando la música de forma visual y numérica, ninguna caja portátil llega tan lejos.</p>",
    content_es: "<p><strong>El estándar portátil para los productores que prefieren la composición de beats mediante tracker vertical tradicional con total precisión quirúrgica.</strong> Ocho pistas de audio estéreo dedicadas, motores de síntesis digital integrados y micrófono en un peso de tan solo 350 gramos.</p><p>Su flujo de trabajo basado en pantallas verticales, botones y cursor exige semanas de práctica. Para compositores analíticos que disfrutan estructurando la música de forma visual y numérica, ninguna caja portátil llega tan lejos.</p>",
    products: [625]
  }
];

guide.sections = guide.sections.concat(newSections);

const newPC = [
  {
    name: "Teenage Engineering EP-133 K.O. II",
    name_es: "Teenage Engineering EP-133 K.O. II",
    pros: ["El flujo de trabajo más rápido para pasar de la idea al ritmo por menos de 300 €", "Efectos punch-in 2.0 diseñados específicamente para lucirse en directo", "Micrófono integrado y teclas con alta sensibilidad a la presión", "Diseño ultra estilizado que cabe en cualquier compartimento de la mochila"],
    pros_es: ["El flujo de trabajo más rápido para pasar de la idea al ritmo por menos de 300 €", "Efectos punch-in 2.0 diseñados específicamente para lucirse en directo", "Micrófono integrado y teclas con alta sensibilidad a la presión", "Diseño ultra estilizado que cabe en cualquier compartimento de la mochila"],
    cons: ["Sus 128 MB de memoria total limitan el uso de muestras excesivamente largas", "Carece de modo canción dedicado para estructurar arreglos complejos de forma autónoma", "Su chasis de plástico requiere transportarlo protegido y con cierto cuidado", "El flujo de trabajo interno no está optimizado para hacer resampling avanzado de forma cómoda"],
    cons_es: ["Sus 128 MB de memoria total limitan el uso de muestras excesivamente largas", "Carece de modo canción dedicado para estructurar arreglos complejos de forma autónoma", "Su chasis de plástico requiere transportarlo protegido y con cierto cuidado", "El flujo de trabajo interno no está optimizado para hacer resampling avanzado de forma cómoda"]
  },
  {
    name: "Akai MPC Live III",
    name_es: "Akai MPC Live III",
    pros: ["El mítico flujo de pads que inventó el hip-hop, ahora optimizado con el doble de potencia de procesamiento", "Estructuración y finalización de canciones directo en su pantalla táctil autónoma con soporte integrado para Stems", "Gran capacidad de trabajo con 32 instancias de plugins, 16 pistas de audio estéreo y 64 GB de almacenamiento interno", "Conectividad masiva con envío de 24 canales de audio por USB-C, Wi-Fi, Bluetooth y la renovada interfaz de MPC 3 OS"],
    pros_es: ["El mítico flujo de pads que inventó el hip-hop, ahora optimizado con el doble de potencia de procesamiento", "Estructuración y finalización de canciones directo en su pantalla táctil autónoma con soporte integrado para Stems", "Gran capacidad de trabajo con 32 instancias de plugins, 16 pistas de audio estéreo y 64 GB de almacenamiento interno", "Conectividad masiva con envío de 24 canales de audio por USB-C, Wi-Fi, Bluetooth y la renovada interfaz de MPC 3 OS"],
    cons: ["La pantalla táctil puede sentirse algo congestionada en proyectos grandes si estás acostumbrado a un monitor de ordenador de gran tamaño", "Sus 4 GB de RAM marcan el límite técnico para proyectos con un número masivo de samples pesados cargados en memoria de forma simultánea", "No cuenta con batería integrada para trabajar al aire libre de forma portátil", "Se despide de su clásica pintura roja para adoptar un diseño sobrio en color negro"],
    cons_es: ["La pantalla táctil puede sentirse algo congestionada en proyectos grandes si estás acostumbrado a un monitor de ordenador de gran tamaño", "Sus 4 GB de RAM marcan el límite técnico para proyectos con un número masivo de samples pesados cargados en memoria de forma simultánea", "No cuenta con batería integrada para trabajar al aire libre de forma portátil", "Se despide de su clásica pintura roja para adoptar un diseño sobrio en color negro"]
  },
  {
    name: "Polyend Tracker Mini",
    name_es: "Polyend Tracker Mini",
    pros: ["El flujo de trabajo completo de un tracker musical concentrado en solo 350 gramos", "Muestreo estéreo respaldado por 4 motores de síntesis digital integrados", "Hasta 8 horas de autonomía de batería e incluye una funda rígida de viaje premium de fábrica", "Envío de pistas de audio independientes por USB directas a tu DAW"],
    pros_es: ["El flujo de trabajo completo de un tracker musical concentrado en solo 350 gramos", "Muestreo estéreo respaldado por 4 motores de síntesis digital integrados", "Hasta 8 horas de autonomía de batería e incluye una funda rígida de viaje premium de fábrica", "Envío de pistas de audio independientes por USB directas a tu DAW"],
    cons: ["La navegación mediante combinaciones de botones y cursor exige una curva de aprendizaje inicial", "El clic mecánico de sus teclas puede resultar molesto si buscas producir en entornos completamente silenciosos", "Carece de la clásica cuadrícula de pads rápidos orientada a la improvisación de ritmos en vivo"],
    cons_es: ["La navegación mediante combinaciones de botones y cursor exige una curva de aprendizaje inicial", "El clic mecánico de sus teclas puede resultar molesto si buscas producir en entornos completamente silenciosos", "Carece de la clásica cuadrícula de pads rápidos orientada a la improvisación de ritmos en vivo"]
  }
];

guide.verdictProsCons = guide.verdictProsCons.concat(newPC);

// Add productTable columns for new products
const cols = guide.productTable.columns.map(c => c.title);
['Teenage Engineering EP-133 K.O. II', 'Akai MPC Live III', 'Polyend Tracker Mini'].forEach(title => {
  if (!cols.includes(title)) {
    guide.productTable.columns.push({ title, title_es: title });
  }
});

// Add rows for new products
const newRows = {
  'Teenage Engineering EP-133 K.O. II': {
    'Best For': "Pocket sketching and punch-in performance FX",
    'Estimated Price': "~$299",
    'Type': "Pocket Sampler / Composer",
    'Tracks': "4 groups x 99 patterns",
    'Sample Memory': "128 MB internal (999 slots)",
    'Sequencer': "Multi-track step / real-time",
    'Effects': "6 master FX + 12 punch-in FX",
    'Weight': "0.62 kg"
  },
  'Akai MPC Live III': {
    'Best For': "Mobile production with Stems and 3D expression",
    'Estimated Price': "$1,699",
    'Type': "Portable Standalone Workstation",
    'Tracks': "32 plugin + 16 stereo audio",
    'Sample Memory': "8 GB RAM / 128 GB storage",
    'Sequencer': "Linear arranger / step / clip matrix",
    'Effects': "MPC3 Pro FX pack, XYFX",
    'Weight': "3.9 kg"
  },
  'Polyend Tracker Mini': {
    'Best For': "Analytical composition and surgical precision",
    'Estimated Price': "$799",
    'Type': "Portable Tracker Workstation",
    'Tracks': "8 audio + 8 synth/MIDI",
    'Sample Memory': "400 MB per project / 20 GB internal",
    'Sequencer': "Tracker vertical, parameter locks",
    'Effects': "Reverb, delay, chorus, bitcrush, compressor, overdrive",
    'Weight': "0.35 kg"
  }
};

guide.productTable.rows.forEach(row => {
  Object.keys(newRows).forEach(productName => {
    const data = newRows[productName];
    if (data[row.label]) {
      const colIdx = cols.indexOf(productName);
      if (colIdx >= 0 && row.values[colIdx]) {
        row.values[colIdx].value = data[row.label];
        row.values[colIdx].value_es = data[row.label];
      }
    }
  });
});

fs.writeFileSync('data/guides.json', JSON.stringify(g, null, 2) + '\n');
console.log('Done. Products:', guide.featuredProducts.length, 'Sections:', guide.sections.length, 'PC:', guide.verdictProsCons.length);
