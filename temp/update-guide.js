const fs = require('fs');
const guidesPath = './data/guides.json';
const guides = JSON.parse(fs.readFileSync(guidesPath, 'utf8'));

const guide = guides.find((g) => g.id === 'studio-subwoofers-setup');
if (!guide) throw new Error('Guide not found');

const products = JSON.parse(fs.readFileSync('./data/products.json', 'utf8'));

const oldProductIds = [471, 469, 338]; // PMC 8 SUB, Dynaudio 9S, Genelec 7050C
const newProductIds = [479, 480, 481]; // Focal Sub12, Genelec 7370A, Barefoot MicroSub45

// ---------- 1. REPLACE SECTIONS 4,5,6 with new product sections ----------
const newSections = [
  {
    heading: 'Focal Sub12: The Best Subwoofer for Brutal Analogue Power With a French Finish',
    heading_es: 'Focal Sub12: el mejor subwoofer para una potencia analógica brutal con acabado francés',
    content:
      '<p><strong>Focal builds the Sub12 around a 13-inch "W" cone that is genuinely hand-assembled in France, and it shows in the speed of the low end.</strong> The composite sandwich membrane keeps the driver light and stiff, which is exactly what you need for sub-bass that attacks hard and stops on a dime. A 600W RMS / 1000W peak BASH Class G amplifier gives it far more headroom than any compact rival, and the front-firing laminar port — borrowed from the Trio11 midfield monitors — keeps port turbulence and distortion nearly inaudible right up to a 125 dB peak.</p><p><strong>This is the sub for engineers who want the weight and slam of a big analogue system without leaving the nearfield world.</strong> The variable low-pass and high-pass filters, continuous phase control and footswitch bypass let you flip between "with sub" and "without sub" instantly to check the translation of your lows — a mastering-grade workflow you will not find on smaller premium subs.</p>',
    content_es:
      '<p><strong>Focal monta el Sub12 en torno a un cono "W" de 13 pulgadas ensamblado realmente a mano en Francia, y se nota en la rapidez de los graves.</strong> La membrana compuesta tipo sándwich mantiene el driver ligero y rígido, que es exactamente lo que necesitas para un sub-graves que ataca con fuerza y frena en seco. El amplificador BASH Clase G de 600W RMS / 1000W de pico le da mucho más margen que cualquier rival compacto, y el puerto laminar frontal — heredado de los monitores midfield Trio11 — mantiene la turbulencia y la distorsión casi imperceptibles incluso a 125 dB de pico.</p><p><strong>Es el sub para ingenieros que quieren el peso y el golpe de un sistema analógico grande sin abandonar el mundo del campo cercano.</strong> Los filtros de paso bajo y paso alto variables, el control de fase continuo y el bypass con pedal te permiten alternar entre "con sub" y "sin sub" al instante para comprobar cómo se traducen tus graves — un flujo de trabajo digno de masterización que no encontrarás en subs premium más pequeños.</p>',
    products: [479]
  },
  {
    heading: 'Genelec 7370A SAM: The Best Subwoofer for Intelligent Immersive Bass Management',
    heading_es: 'Genelec 7370A SAM: el mejor subwoofer para una gestión de graves inmersiva e inteligente',
    content:
      '<p><strong>Where smaller Genelec subs turn knobs, the 7370A measures, calculates and corrects.</strong> Its 12-inch (305 mm) driver and 400W Class D amp reach 19 Hz, but the real story is the smart control. Built-in distributed bass management routes low-frequency content from all 7.1 channels to the sub without external hardware, while GLM AutoCal measures your room and automatically aligns level, delay, phase and frequency response — not just for the sub, but for every SAM monitor on the network.</p><p><strong>For Atmos, large commercial rooms and post houses, this is the reference-grade brain of a full system.</strong> It is not a turn-it-and-forget box; it is a networked instrument that keeps the whole monitoring chain phase-coherent as you scale from stereo to 7.1.4. If you want the low end to adapt to the room instead of the other way around, the 7370A is the definitive choice.</p>',
    content_es:
      '<p><strong>Donde los subs Genelec más pequeños se ajustan con mandos, el 7370A mide, calcula y corrige.</strong> Su driver de 12 pulgadas (305 mm) y su amplificador Clase D de 400W llegan hasta 19 Hz, pero lo realmente importante es el control inteligente. La gestión distribuida de graves integrada enruta el contenido de baja frecuencia de los 7.1 canales al sub sin hardware externo, mientras que GLM AutoCal mide tu sala y alinea automáticamente nivel, retardo, fase y respuesta en frecuencia — no solo del sub, sino de cada monitor SAM conectado a la red.</p><p><strong>Para Atmos, grandes salas comerciales y estudios de postproducción, este es el cerebro de nivel referencia de todo un sistema.</strong> No es una caja de "ajústalo y olvídate"; es un instrumento en red que mantiene toda la cadena de monitoreo con coherencia de fase mientras escalas de estéreo a 7.1.4. Si quieres que los graves se adapten a la sala y no al revés, el 7370A es la elección definitiva.</p>',
    products: [480]
  },
  {
    heading: 'Barefoot Sound MicroSub45: The Best Subwoofer for Distortion-Free High-End Monitoring',
    heading_es: 'Barefoot Sound MicroSub45: el mejor subwoofer para un monitoreo de alta gama sin distorsión',
    content:
      '<p><strong>Barefoot\'s Dual-Force technology is a genuinely different way to build a sub, and the MicroSub45 is the proof.</strong> Two opposing 8-inch drivers sit inside a sealed 18-litre cabinet with their motors mechanically locked together. As the cones push and pull in opposite directions, the equal-and-opposite forces cancel at the motor before they can reach the cabinet walls — which is why this box stays completely still while it plays. No cabinet resonance, no coloration; just fast, clean transient response.</p><p><strong>Each cabinet carries 500W (1000W for the pair) and reaches 25 Hz (-3 dB) with a fixed 80 Hz analogue high-pass.</strong> Because the filter is analogue and the low end radiates as a single point source on axis with the MicroMain45\'s tweeter, the MicroSub45 simply disappears — you hear the mains get bigger and deeper, not a subwoofer playing. For elite mastering rooms chasing the last few percent of bass accuracy, nothing else stacks up.</p>',
    content_es:
      '<p><strong>La tecnología Dual-Force de Barefoot es una forma genuinamente distinta de construir un sub, y el MicroSub45 es la prueba.</strong> Dos drivers de 8 pulgadas opuestos se alojan dentro de un gabinete sellado de 18 litros con sus motores bloqueados mecánicamente entre sí. Conforme los conos empujan y tiran en direcciones opuestas, las fuerzas iguales y opuestas se cancelan en el motor antes de llegar a las paredes de la caja — por eso esta caja permanece completamente quieta mientras suena. Sin resonancia de gabinete ni coloración; solo respuesta transitoria rápida y limpia.</p><p><strong>Cada gabinete entrega 500W (1000W el par) y alcanza los 25 Hz (-3 dB) con un paso alto analógico fijo de 80 Hz.</strong> Como el filtro es analógico y los graves se irradian como una fuente puntual alineada con el tweeter del MicroMain45, el MicroSub45 simplemente desaparece: oyes que los monitores principales crecen y se vuelven más profundos, no un subwoofer sonando. Para salas de masterización de élite que persiguen el último porcentaje de precisión en graves, nada más está a la altura.</p>',
    products: [481]
  }
];

// Replace sections at indices 4, 5, 6 with the new three
guide.sections.splice(4, 3, ...newSections);

// ---------- 2. UPDATE FEATURED PRODUCTS ----------
guide.featuredProducts = [468, 337, 470, 479, 480, 481];

// ---------- 3. UPDATE VERDICT PROS/CONS ----------
const oldNames = ['PMC 8 SUB', 'Dynaudio 9S', 'Genelec 7050C'];
guide.verdictProsCons = guide.verdictProsCons.filter((v) => !oldNames.includes(v.name));

const giftName = (short, long) => (long ? short : long === false ? false : long);
function furthestLong(names, id) {
  // find matching existing long-name by id
  return names;
}

// Build new verdict entries. Determine long names from product titles.
function displayName(id) {
  const p = products.find((x) => x.id === id);
  return p ? p.title : String(id);
}

// We use short/display names consistent with existing style ("Neumann KH 810 II")
const newVerdicts = [
  {
    name: 'Focal Sub12',
    name_es: 'Focal Sub12',
    pros: [
      'Hand-assembled 13-inch "W" composite cone built in France',
      '600W RMS / 1000W peak BASH Class G amp — double the headroom of most premium subs',
      '125 dB peak SPL with front-firing laminar port and near-zero distortion',
      'Variable low-pass/high-pass, continuous phase and footswitch bypass for mastering checks'
    ],
    pros_es: [
      'Cono compuesto "W" de 13 pulgadas ensamblado a mano en Francia',
      'Amplificador BASH Clase G de 600W RMS / 1000W de pico — el doble de margen que la mayoría de los subs premium',
      '125 dB de SPL de pico con puerto laminar frontal y distorsión casi nula',
      'Paso bajo/alto variable, fase continua y bypass con pedal para comprobaciones de masterización'
    ],
    cons: [
      '58 kg — moving it for the crawl test is a two-person job',
      'BASH Class G amp draws serious power at full output',
      'No DSP room correction or network calibration included'
    ],
    cons_es: [
      'Pesa 58 kg — moverlo para la prueba del crawl requiere dos personas',
      'El amplificador BASH Clase G consume mucha energía a plena potencia',
      'No incluye corrección de sala por DSP ni calibración en red'
    ]
  },
  {
    name: 'Genelec 7370A SAM',
    name_es: 'Genelec 7370A SAM',
    pros: [
      '12-inch driver with 400W Class D reaching 19 Hz',
      'GLM AutoCal automatically corrects level, delay, phase and response across the whole network',
      'Built-in distributed bass management routes all 7.1 channels to the sub',
      'Scales seamlessly from stereo to 7.1.4 for Atmos work'
    ],
    pros_es: [
      'Driver de 12 pulgadas con 400W Clase D que llega hasta 19 Hz',
      'GLM AutoCal corrige automáticamente nivel, retardo, fase y respuesta en toda la red',
      'La gestión distribuida de graves integrada enruta los 7.1 canales al sub',
      'Escala sin fricciones de estéreo a 7.1.4 para trabajo en Atmos'
    ],
    cons: [
      'GLM calibration kit or SAM controller sold separately',
      'Full smart features lock you into the Genelec ecosystem',
      'Deeper and more capable than you need for a simple stereo desk setup'
    ],
    cons_es: [
      'El kit de calibración GLM o el controlador SAM se venden por separado',
      'Las funciones inteligentes te encierran en el ecosistema Genelec',
      'Más profundo y potente de lo que necesitas para un simple escritorio estéreo'
    ]
  },
  {
    name: 'Barefoot Sound MicroSub45',
    name_es: 'Barefoot Sound MicroSub45',
    pros: [
      'Dual-Force opposing-driver design cancels force at the source for zero cabinet vibration',
      'Sealed 18-litre cabinet delivers fast, clean transient response',
      'Reaches 25 Hz (-3 dB) with a fixed 80 Hz analogue high-pass',
      '1000W across the stereo pair with a completely analogue, transparent signal path'
    ],
    pros_es: [
      'El diseño de drivers opuestos Dual-Force cancela la fuerza en el origen para cero vibración de gabinete',
      'El gabinete sellado de 18 litros entrega una respuesta transitoria rápida y limpia',
      'Alcanza los 25 Hz (-3 dB) con un paso alto analógico fijo de 80 Hz',
      '1000W en el par estéreo con una ruta de señal completamente analógica y transparente'
    ],
    cons: [
      'Sold only as a stereo pair at a premium price',
      'Designed to pair with the MicroMain45 — not a standalone generic sub',
      'Niche availability: limited to specialist dealers rather than the big online retailers'
    ],
    cons_es: [
      'Solo se vende como par estéreo a un precio premium',
      'Diseñado para acompañar al MicroMain45 — no es un sub genérico independiente',
      'Disponibilidad reducida: se encuentra en distribuidores especializados más que en las grandes tiendas online'
    ]
  }
];

guide.verdictProsCons.push(...newVerdicts);

fs.writeFileSync(guidesPath, JSON.stringify(guides, null, 2));
console.log('guides.json updated.');
console.log('sections count:', guide.sections.length);
console.log('featuredProducts:', JSON.stringify(guide.featuredProducts));
console.log('verdicts:', guide.verdictProsCons.map((v) => v.name).join(' | '));

// ---------- SANITY: check for stale references ----------
console.log('\n--- STALE CHECK ---');
const full = JSON.stringify(guide);
oldProductIds.forEach((id) => {
  console.log('old id', id, 'referenced:', full.includes(String(id) + '"') || new RegExp(String(id) + '[^0-9]').test(full));
});
['PMC 8 SUB', 'Dynaudio 9S', 'Genelec 7050C'].forEach((n) => {
  console.log('old name "' + n + '" found:', full.includes(n));
});
