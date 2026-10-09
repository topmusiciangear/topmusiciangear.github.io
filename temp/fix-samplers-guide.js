const fs = require('fs');
const path = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const raw = fs.readFileSync(path, 'utf8');
const data = JSON.parse(raw);
const guides = Array.isArray(data) ? data : data.guides;
const g = guides.find(x => x.id === 'best-samplers-drum-computers');
if (!g) { console.error('GUIDE NOT FOUND'); process.exit(1); }

fs.copyFileSync(path, 'C:/Users/Daniel/projects/topmusiciangear/temp/guides.json.bak-samplers');

let text = raw;
const report = [];

function replaceOnce(label, oldVal, newVal) {
  const oldNeedle = JSON.stringify(oldVal);
  const newNeedle = JSON.stringify(newVal);
  const first = text.indexOf(oldNeedle);
  if (first === -1) { console.error('NOT FOUND: ' + label); process.exit(1); }
  if (text.indexOf(oldNeedle, first + 1) !== -1) { console.error('NOT UNIQUE: ' + label); process.exit(1); }
  text = text.replace(oldNeedle, newNeedle);
  report.push(label);
}

// intro_es (section 0)
replaceOnce('intro_es', g.intro_es,
  "<p><strong>Autónomo o conectado, pads o teclas, con pantalla o sin ella — el sampler perfecto es aquel que se funde con tus hábitos.</strong> Si terminas temas en el sofá o de gira, elige una máquina autónoma con batería y almacenamiento. Si vives dentro del DAW, un flujo de trabajo basado en controlador con una integración profunda de software te llevará más lejos.</p><p>El presupuesto traza la otra línea: los samplers de bolsillo permiten esbozar ideas por menos de 300 €, las estaciones de gama media cubren producciones enteras y los modelos insignia sustituyen por completo el escritorio del estudio. Estas diez máquinas cubren cada uno de esos terrenos.</p>");

// Section content_es replacements (sections 1-10)
const newEs = {
  1: "<p><strong>La puerta de entrada más económica al mundo MPC autónomo, sin recortar nada esencial.</strong> El One G2 corre el motor MPC completo de última generación —16 pads con velocidad, sintes virtuales en formato plugin, pantalla táctil, WiFi y Bluetooth— para que los beats empiecen y terminen sin un PC a la vista.</p><p>Aunque sus menús profundos exigen algo de navegación y sus pads piden golpes firmes, la inclusión de conectividad de audio por USB-C soluciona las limitaciones de ruteo del pasado. Para productores de hip-hop y música urbana que quieren dar el salto al formato autónomo, ninguna máquina ofrece más por cada euro.</p>",
  2: "<p><strong>Ocho pistas de sampling estéreo cableadas al mejor secuenciador por pasos del mercado de hardware.</strong> Los parameter locks, las trig conditions y la tecnología Overbridge convierten samples minúsculos en patrones llenos de vida, mientras que sus 20 GB de almacenamiento interno con soporte para streaming eliminan cualquier problema de espacio para tus librerías.</p><p>No hay pantalla táctil (todo se gestiona con encoders y botones) y la lógica de Elektron requiere semanas de aprendizaje para llegar a dominarla. Sin embargo, para productores de electrónica que secuencian primero y preguntan después, ninguna máquina piensa tan rápido.</p>",
  3: "<p><strong>Dieciséis pistas de audio, batería de litio y altavoces integrados en la propia caja.</strong> El Live III permite esbozar ritmos en el tren, estructurarlos en el hotel y finalizarlos en el estudio, todo ello respaldado por los legendarios pads de Akai, expresión 3D y una pantalla táctil de 7 pulgadas.</p><p>Con sus 3,9 kg de peso no es precisamente un juguete de bolsillo y su precio se sitúa en terreno profesional. Aun así, gracias a sus 6 salidas físicas independientes y su compatibilidad con Stems, sigue siendo la estación todo en uno de referencia para el hip-hop moderno.</p>",
  4: "<p><strong>Resamplea todo, conserva el toque analógico y ensucia el sonido directamente en vivo.</strong> Dieciséis pistas de sample, doce efectos por patrón, skip-back sampling (que graba constantemente en segundo plano para capturar accidentes felices) y el famoso DJ FX looper han hecho del 404 el sello de identidad del lo-fi y el boom-bap.</p><p>Su secuenciación MIDI es limitada, la pantalla pequeña complica la edición precisa de la onda y los pads no destacan por su sensibilidad a la velocidad. No obstante, para productores que cocinan beats de oído y por puras sensaciones, esa aspereza es precisamente su mayor virtud.</p>",
  5: "<p><strong>Groovebox autónoma sobre el escenario y controlador profundo en el estudio.</strong> Maschine+ incluye una librería de fábrica de 16 GB, ocho grupos de dieciséis pads hiperreactivos y la función snapshots con lock para transiciones instantáneas, acoplándose perfectamente al software de Maschine en cuanto vuelves al ordenador.</p><p>Su precio es considerable, requiere acostumbrarse al ruido de su ventilador interno en entornos silenciosos y te ata por completo al ecosistema de software de NI. Para productores criados con Maschine que quieren cortar el cordón umbilical con el PC, es el paso natural.</p>",
  6: "<p><strong>Una calculadora que hace sampling y que se convierte en la herramienta más rápida para pasar de la idea al beat por menos de 300 €.</strong> El K.O. II graba el entorno con su micrófono integrado, trocea muestras con teclas sensibles a la presión y dispara efectos punch-in en vivo, todo en un chasis ultraportátil.</p><p>Sus 128 MB de memoria se pueden quedar cortos para proyectos complejos, no cuenta con un flujo de resampling avanzado ni modo canción completo, y su cuerpo de plástico requiere un trato cuidadoso. Aun así, como chispa creativa portátil, es imbatible en diversión por cada euro invertido.</p>",
  7: "<p><strong>El motor completo de MPC con un teclado integrado de 37 teclas de tamaño real.</strong> El Key 37 junta dieciséis pads, un teclado con aftertouch para ejecuciones expresivas, conectividad CV/Gate y un renovado sistema operativo (MPC 3 OS) que añade un secuenciador lineal tipo DAW, haciendo que la composición y la programación de baterías convivan por fin en armonía.</p><p>Su tamaño penaliza la portabilidad frente a las opciones de escritorio y viajar con él exige una buena mochila de transporte. Para beat-makers que vienen del mundo del teclado, es el híbrido perfecto que hace que la teoría musical resulte sumamente fluida.</p>",
  8: "<p><strong>El ADN de sampling de Roland reducido al tamaño de un bolsillo y vitaminado con un motor granular.</strong> El P-6 permite samplear directamente desde dispositivos móviles por USB-C, retorcer granos de audio para crear texturas densas, aplicar los míticos efectos master SP y producir en cualquier parte gracias a su batería recargable.</p><p>Su pantalla minúscula obliga a memorizar combinaciones de comandos crípticas y sus botones diminutos complican el finger-drumming avanzado. Pese a ello, para viajeros que buscan un diseño de sonido profundo sin cargar con equipaje, rinde muy por encima de su tamaño.</p>",
  9: "<p><strong>Treinta y dos pads luminosos y cero píxeles de distracción.</strong> El Circuit Rhythm samplea directo a la máquina, trocea y resamplea en ocho pistas, y permite disparar Grid FX (vinilo, beat repeat, gater) directamente desde la rejilla con una autonomía de cuatro horas de batería.</p><p>Al no tener una visualización de la onda en pantalla te tocará fiarte de tu oído y memorizar comandos, además de depender de la aplicación Components para gestionar las librerías. Para directos y productores que prefieren guiarse por lo que escuchan antes que por lo que ven, ofrece una velocidad de trabajo adictiva.</p>",
  10: "<p><strong>Dieciséis perillas Q-Link motorizadas, cada una con su propia pantalla OLED, dejan claro que estamos ante el buque insignia absoluto antes de tocar el primer pad.</strong> El MPC XL corona el catálogo de Akai con una imponente pantalla táctil inclinable de 10,1 pulgadas, 16 salidas CV/Gate, 16 GB de RAM y un SSD NVMe de 256 GB integrado de fábrica.</p><p>Su precio es prohibitivo para aficionados, exige un espacio fijo y permanente en tu estudio y sus avanzadas opciones de ruteo analógico y digital serán excesivas si solo buscas hacer bucles sencillos. Sin embargo, para estudios profesionales que exigen un centro de mando definitivo y un funcionamiento 100% silencioso sin ordenadores de por medio, no hay nada que se le iguale.</p>"
};

for (let i = 1; i <= 10; i++) {
  replaceOnce('sections[' + i + '].content_es', g.sections[i].content_es, newEs[i]);
}

// EN technical error fixes
const vpc = g.verdictProsCons;
replaceOnce('vpc[0].pros[1] (MPC One G2 16->64 GB)', vpc[0].pros[1], '64 GB storage, WiFi, Bluetooth and touchscreen');
replaceOnce('vpc[0].pros_es[1] (MPC One G2 16->64 GB)', vpc[0].pros_es[1], '64 GB, WiFi, Bluetooth y pantalla táctil');
replaceOnce('vpc[1].pros[2] (Digitakt II 1->20 GB)', vpc[1].pros[2], '20 GB internal plus streaming for big libraries');
replaceOnce('vpc[1].pros_es[2] (Digitakt II vague GB)', vpc[1].pros_es[2], '20 GB internos más streaming para librerías grandes');
replaceOnce('vpc[5].cons[0] (EP-133 64->128 MB)', vpc[5].cons[0], '128 MB of memory caps longer phrases');
{
  const anchor = '"Lo más divertido por dólar en sampling"';
  const aIdx = text.indexOf(anchor);
  if (aIdx === -1 || text.indexOf(anchor, aIdx + 1) !== -1) { console.error('ANCHOR NOT FOUND/UNIQUE'); process.exit(1); }
  const target = JSON.stringify('Los 64 MB topan frases largas');
  const tIdx = text.indexOf(target, aIdx);
  if (tIdx === -1 || tIdx - aIdx > 600) { console.error('EP-133 cons_es target not found near anchor'); process.exit(1); }
  text = text.slice(0, tIdx) + JSON.stringify('Los 128 MB topan frases largas') + text.slice(tIdx + target.length);
  report.push('vpc[5].cons_es[0] (EP-133 64->128 MB, anchor-disambiguated)');
}

// Section 2 EN content: 1 GB -> 20 GB internal
replaceOnce('sections[2].content (Digitakt II 1 GB)', g.sections[2].content,
  g.sections[2].content.replace('the 1 GB pool plus streaming covers serious libraries', 'the 20 GB internal pool plus streaming covers serious libraries'));

// Section 10 EN content fixes: X SE -> XL, 8 DC-coupled -> 16 CV/Gate, fan -> silent passive cooling
const sec10en = g.sections[10].content;
if (!sec10en.includes('The X SE adds a 10.1-inch touchscreen, eight DC-coupled outputs and full audio-interface duties')) { console.error('SEC10 EN pattern A not found'); process.exit(1); }
if (!sec10en.includes('the fan can reach a live mic')) { console.error('SEC10 EN pattern B not found'); process.exit(1); }
const newSec10en = sec10en
  .replace('The X SE adds a 10.1-inch touchscreen, eight DC-coupled outputs and full audio-interface duties', 'The XL adds a 10.1-inch touchscreen, 16 CV/Gate outputs and full audio-interface duties')
  .replace('the fan can reach a live mic', 'passive cooling keeps it silent beside a live mic');
replaceOnce('sections[10].content (XL fixes)', sec10en, newSec10en);

// Conclusion X SE -> XL (EN + ES)
replaceOnce('conclusion (X SE -> XL)', g.conclusion, g.conclusion.replace('the X SE rewards studios', 'the XL rewards studios'));
replaceOnce('conclusion_es (X SE -> XL)', g.conclusion_es, g.conclusion_es.replace('el X SE premia estudios', 'el XL premia estudios'));

fs.writeFileSync(path, text, 'utf8');
console.log('OK - ' + report.length + ' replacements applied:');
report.forEach(r => console.log('  - ' + r));
