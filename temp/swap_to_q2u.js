const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const NP = 'Not published';
const NP_ES = 'No publicada';

// ================= NEW COLUMN 9: Samson Q2U (id 276) =================
// Specs from the live official Samson spec table
// (samsontech.com/products/microphones/usb-microphones/q2u/)
const Q2U = {
  'Best For': ['Cheapest way into USB with an XLR exit for later', 'La vía más barata al USB con salida XLR para cuando crezcas'],
  'Estimated Price': ['~$70', '~$70'],
  'Type': ['Dynamic (moving coil), cardioid, USB-C + XLR', 'Dinámico (bobina móvil), cardioide, USB-C + XLR'],
  'Polar Pattern': ['Cardioid', 'Cardioide'],
  'Frequency Response': ['50 Hz – 15 kHz', '50 Hz – 15 kHz'],
  'Sensitivity': ['-54 dBV/Pa', '-54 dBV/Pa'],
  'Self-Noise': [NP, NP_ES],
  'Max SPL': ['148 dB SPL', '148 dB SPL'],
  'Output Impedance': [NP, NP_ES],
  'Signal-to-Noise Ratio': [NP, NP_ES],
  'Dynamic Range': [NP, NP_ES],
  'THD at Max SPL': [NP, NP_ES],
  'Capsule / Diaphragm': ['End-address dynamic capsule', 'Cápsula dinámica de direccionalidad frontal'],
  'Pad & High-Pass Filter': [NP, NP_ES],
  'Phantom Power': ['Not required (dynamic)', 'No requiere alimentación (dinámico)'],
  'Dimensions': ['190 mm × 55 mm diameter', '190 mm × 55 mm de diámetro'],
  'Weight': ['0.32 kg (0.7 lb)', '0,32 kg (0,7 lb)']
};

const SEC_Q2U = {
  heading: 'Samson Q2U: The $70 Answer for "Should I Buy a Mic or an Interface?"',
  heading_es: 'Samson Q2U: la respuesta de 70 $ a "¿compro micrófono o interfaz?"',
  content: '<p><strong>The Samson Q2U solves the question every beginner asks: do I need a microphone or an audio interface?</strong> It is a dynamic cardioid mic with a USB-C output for day one and a 3-pin XLR output for the day you outgrow it, so the same microphone works whether you are on a laptop with no inputs or feeding a real preamp. The 148 dB max SPL gives it huge headroom for loud sources, and at 320 g it is the lightest mic in this guide. Samson also ships a hardware switch that mutes both the USB and XLR paths at once.</p><p>The trade-offs are real: the response runs 50 Hz to 15 kHz rather than the 20 Hz to 20 kHz the condensers here reach, and the USB side converts at up to 16-bit rather than 24-bit. In practice that means less air on cymbals and sibilance, and less headroom before clipping on a loud vocal. For speech-first content in a room you do not control, that is a trade most people are happy to make.</p>',
  content_es: '<p><strong>El Samson Q2U resuelve la duda que tiene todo el que empieza: ¿necesito un micrófono o una interfaz de audio?</strong> Es un micrófono dinámico cardioide con salida USB-C para el primer día y salida XLR de 3 pines para el día en que te quedes corto, así que el mismo micrófono te sirve tanto si estás con un portátil sin entradas como si alimentas un preamp de verdad. Los 148 dB de SPL máximo le dan un margen enorme para fuentes fuertes, y con 320 g es el micrófono más ligero de esta guía. Samson además incluye un interruptor hardware que silencia a la vez las rutas USB y XLR.</p><p>Las contras son reales: la respuesta va de 50 Hz a 15 kHz en lugar de los 20 Hz a 20 kHz que alcanzan los condensadores de aquí, y la conversión USB llega hasta 16 bits en vez de 24. En la práctica eso significa menos aire en los platos y menos brillo en las sibilantes, y menos margen antes de saturar con una voz fuerte. Para contenido centrado en voz y en una habitación que no controlas, es un intercambio que casi todo el mundo acepta.</p>',
  products: [276]
};

const VPC_Q2U = {
  name: 'Samson Q2U',
  name_es: 'Samson Q2U',
  pros: [
    'The only mic here with both USB-C and XLR at this price, so you never have to buy again when you add an interface',
    '148 dB max SPL gives it more headroom than every condenser in this guide',
    'Dynamic cardioid rejects room noise better than any condenser here, which matters in an untreated room',
    'At 320 g it is the lightest mic in the guide and the easiest to position',
    'Hardware switch mutes USB and XLR together, so it is genuinely click-free on both paths',
    'Roughly a third of the price of the Shure MV7+ or the Rode NT1 5th Generation'
  ],
  pros_es: [
    'El único micrófono de esta lista con USB-C y XLR a este precio, así que no tienes que volver a comprar nada cuando sumes una interfaz',
    'Los 148 dB de SPL máximo le dan más margen que a cualquier condensador de esta guía',
    'El cardioide dinámico rechaza el ruido de la habitación mejor que cualquier condensador de aquí, y eso importa en una habitación sin tratar',
    'Con 320 g es el micrófono más ligero de la guía y el más fácil de colocar',
    'El interruptor hardware silencia USB y XLR a la vez, así que es realmente sin clics en ambas rutas',
    'Cuesta alrededor de un tercio de lo que el Shure MV7+ o el Rode NT1 5th Generation'
  ],
  cons: [
    'Frequency response stops at 15 kHz, so it lacks the top-end air of the 20 kHz condensers in this guide',
    'USB conversion tops out at 16-bit, not the 24-bit every other USB mic here runs',
    'Cardioid only, with no omnidirectional or figure-8 option',
    'The 1/8-inch headphone jack has no level control on the mic, so you adjust volume in software',
    'No USB-C mute button, no gain knob, no DSP; all of that lives in your DAW',
    'Samson does not publish self-noise, impedance or dynamic range, so it is hard to compare on paper'
  ],
  cons_es: [
    'La respuesta termina en 15 kHz, así que le falta el aire de agudos de los condensadores de 20 kHz de esta guía',
    'La conversión USB llega hasta 16 bits, no los 24 bits que ofrecen todos los demás micrófonos USB de aquí',
    'Solo cardioide, sin opción omnidireccional ni figura-8',
    'El jack de auriculares de 1/8 pulgadas no tiene control de nivel en el micrófono, así que ajustas el volumen por software',
    'Sin botón mute USB-C, sin perilla de ganancia y sin DSP; todo eso vive en tu DAW',
    'Samson no publica ruido propio, impedancia ni rango dinámico, así que es difícil de comparar en papel'
  ]
};

// ================= APPLY TO guides.json =================
const gj = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gj, 'utf8'));
const g = guides.find(x => x.id === 'usb-mics');

// 1) Column 9 title
g.productTable.columns[9] = { title: 'Samson Q2U', title_es: 'Samson Q2U USB/XLR' };

// 2) Column 9 values on every row
g.productTable.rows.forEach(r => {
  const pair = Q2U[r.label];
  if (!pair) throw new Error('Missing Q2U row data: ' + r.label);
  r.values[9] = { value: pair[0], value_es: pair[1] };
});

// 3) Section 9
g.sections[9] = SEC_Q2U;

// 4) featuredProducts 671 -> 276
const fp = g.featuredProducts.map(id => (id === 671 ? 276 : id));
g.featuredProducts = Array.from(new Set(fp));

// 5) VPC 9
g.verdictProsCons[9] = VPC_Q2U;

// 6) FAQs
const fsx = g.featuredSnippet;
fsx.faq_a1_en = "It depends on your setup. The <strong>Shure MV7+</strong> is best for broadcast-style voice with auto-level and XLR backup. The <strong>Elgato Wave:3</strong> wins for software mixing via Wave Link. The <strong>Audio-Technica AT2040USB</strong> is the best budget dynamic for noisy rooms. The <strong>Sennheiser Profile Streaming Set</strong> is the most complete plug-and-play kit with hardware controls. The <strong>Rode NT1 5th Generation</strong> gives the cleanest condenser vocal detail. The <strong>Rode NT-USB+</strong> upgrades the classic Yeti with internal APHEX DSP. The <strong>sE Electronics NEOM USB</strong> adds hardware mixer controls without a separate interface. The <strong>Rode PodMic USB</strong> is the broadcast option that keeps a 3-pin XLR alongside USB. The <strong>Audio-Technica AT2020USB-X</strong> gives you a real mix knob for blending mic and computer audio. The <strong>Samson Q2U</strong> is the cheapest route into USB and still lets you graduate to an interface later.";
fsx.faq_a1_es = "Depende de tu setup. El <strong>Shure MV7+</strong> es el mejor para voz broadcast con auto-nivel y respaldo XLR. El <strong>Elgato Wave:3</strong> gana por mezcla con Wave Link. El <strong>Audio-Technica AT2040USB</strong> es el mejor dinámico económico para habitaciones ruidosas. El <strong>Sennheiser Profile Streaming Set</strong> es el kit conectar-y-usar más completo con controles físicos. El <strong>Rode NT1 5th Generation</strong> da el detalle vocal de condensador más limpio. El <strong>Rode NT-USB+</strong> mejora el Yeti clásico con DSP APHEX interno. El <strong>sE Electronics NEOM USB</strong> añade controles de mezclador en hardware sin interfaz aparte. El <strong>Rode PodMic USB</strong> es la opción broadcast que conserva el XLR de 3 pines junto al USB. El <strong>Audio-Technica AT2020USB-X</strong> te da una perilla de mezcla real para combinar micrófono y audio del ordenador. El <strong>Samson Q2U</strong> es la vía más barata al USB y aun así te deja pasar a una interfaz más adelante.";
fsx.faq_a4_en = "Yes. All ten microphones use standard 5/8-inch threading or ship with a 3/8-to-5/8 adapter, so they work with any standard boom arm. The <strong>Audio-Technica AT2020USB-X</strong>, <strong>sE Electronics NEOM USB</strong> and <strong>Samson Q2U</strong> include desk or tripod stands that also mount on a boom arm. The <strong>Rode PodMic USB</strong> uses its own integrated swing mount instead, so it needs no adapter at all.";
fsx.faq_a4_es = "Sí. Los diez micrófonos usan rosca estándar de 5/8 pulgadas o incluyen adaptador 3/8-a-5/8, así que funcionan con cualquier brazo articulado estándar. El <strong>Audio-Technica AT2020USB-X</strong>, el <strong>sE Electronics NEOM USB</strong> y el <strong>Samson Q2U</strong> incluyen soportes de escritorio o trípode que también se montan en un brazo. El <strong>Rode PodMic USB</strong> usa su propio soporte basculante integrado, así que no necesita adaptador.";
fsx.faq_a5_en = "For podcasting, prioritize voice clarity: the <strong>Shure MV7+</strong>, <strong>Rode NT1 5th Generation</strong>, <strong>Rode NT-USB+</strong> and <strong>Audio-Technica AT2020USB-X</strong>. For streaming with hardware controls and low latency: the <strong>Sennheiser Profile Streaming Set</strong>, <strong>sE Electronics NEOM USB</strong> and <strong>Elgato Wave:3</strong>. For noisy rooms on a budget: the <strong>Audio-Technica AT2040USB</strong>. For the lowest possible entry cost, the <strong>Samson Q2U</strong> gives you USB today and XLR when you are ready for an interface. For music, the <strong>Rode PodMic USB</strong> has the headroom and the XLR to grow into a studio setup.";
fsx.faq_a5_es = "Para podcasting, prioriza la claridad de voz: el <strong>Shure MV7+</strong>, <strong>Rode NT1 5th Generation</strong>, <strong>Rode NT-USB+</strong> y <strong>Audio-Technica AT2020USB-X</strong>. Para streaming con controles en hardware y baja latencia: el <strong>Sennheiser Profile Streaming Set</strong>, el <strong>sE Electronics NEOM USB</strong> y el <strong>Elgato Wave:3</strong>. Para habitaciones ruidosas con presupuesto limitado: el <strong>Audio-Technica AT2040USB</strong>. Para la entrada más barata posible, el <strong>Samson Q2U</strong> te da USB hoy y XLR cuando estés listo para una interfaz. Para música, el <strong>Rode PodMic USB</strong> tiene el margen dinámico y el XLR para crecer hacia un estudio.";

// 7) Conclusions
const LINKS_EN = '<p><a href="/guides/best-microphone.html" class="guide-link-btn">Best Microphone for Vocals &amp; Home Recording</a> <a href="/guides/budget-mics.html" class="guide-link-btn">Best Budget Microphones</a> <a href="/guides/best-mic-for-podcasting.html" class="guide-link-btn">Best Podcast Mic</a></p>';
const LINKS_ES = '<p><a href="/guides/best-microphone_es.html" class="guide-link-btn">Mejor Micrófono para Voces y Grabación Casera</a> <a href="/guides/budget-mics_es.html" class="guide-link-btn">Mejores Micrófonos Económicos</a> <a href="/guides/best-mic-for-podcasting_es.html" class="guide-link-btn">Mejor Micrófono para Podcast</a></p>';

g.conclusion = 'The best USB stream mic is the one that fits your room and your setup today. If you want the characteristic Shure broadcast sound with a single USB cable and no gain issues, get the <strong>Shure MV7+</strong>. If your room is quiet and you want detailed condenser sound with free mixing software, get the <strong>Elgato Wave:3</strong>. If you want a budget dynamic that reduces background noise, get the <strong>Audio-Technica AT2040USB</strong>. If you want the most complete plug-and-play package with hardware controls, get the <strong>Sennheiser Profile Streaming Set</strong>. If you want maximum vocal detail for singing or ASMR in a treated room, the <strong>Rode NT1 5th Generation</strong> delivers. For streamers upgrading from the classic Yeti, the <strong>Rode NT-USB+</strong> brings internal APHEX DSP and 24-bit/48kHz conversion. If you need hardware mixer control without a separate interface, the <strong>sE Electronics NEOM USB</strong> is the missing link. If you plan to move to a studio preamp someday, the <strong>Rode PodMic USB</strong> is the only mic here that keeps its XLR output. If you want a studio condenser with a real mix knob so you can hear yourself over music, the <strong>Audio-Technica AT2020USB-X</strong> does it in hardware. And if you want to spend as little as possible without locking yourself in, the <strong>Samson Q2U</strong> gives you USB today plus an XLR for whenever you are ready to buy an interface. Every one of these ten is a professional, stream-ready USB microphone, so start with the one that matches your workflow. ' + LINKS_EN;

g.conclusion_es = 'El mejor micrófono USB para streaming es el que se ajuste a tu habitación y a tu forma de trabajar. Si quieres la voz de broadcast de Shure con un solo cable USB y sin problemas de ganancia, ve por el <strong>Shure MV7+</strong>. Si tu habitación es tranquila y quieres un sonido de condensador detallado con software de mezcla gratuito, el <strong>Elgato Wave:3</strong>. Si necesitas un dinámico que corte el ruido de fondo, el <strong>Audio-Technica AT2040USB</strong>. Si quieres el paquete conectar y usar más completo con controles físicos, el <strong>Sennheiser Profile Streaming Set</strong>. Y si buscas el máximo detalle vocal para cantar o ASMR en un espacio tratado, el <strong>Rode NT1 5th Generation</strong> cumple. Para streamers que vienen del Yeti clásico, el <strong>Rode NT-USB+</strong> aporta DSP APHEX interno y conversión 24-bit/48kHz. Si necesitas control de mezclador en hardware sin interfaz aparte, el <strong>sE Electronics NEOM USB</strong> es el eslabón perdido. Si algún día piensas pasar a un preamp de estudio, el <strong>Rode PodMic USB</strong> es el único de esta lista que conserva su salida XLR. Si quieres un condensador de estudio con una perilla de mezcla de verdad para oirte por encima de la música, el <strong>Audio-Technica AT2020USB-X</strong> lo hace en hardware. Y si quieres gastar lo mínimo sin quedarte atado, el <strong>Samson Q2U</strong> te da USB hoy y un XLR para cuando estés listo a comprar una interfaz. Los diez son micrófonos USB profesionales listos para streaming, así que empieza con el que mejor se adapte a tu forma de trabajar. ' + LINKS_ES;

fs.writeFileSync(gj, JSON.stringify(guides, null, 2));
console.log('guides.json: G-Track Pro -> Samson Q2U done');

// ================= PRODUCTS: drop the unused G-Track Pro (671) =================
const pj = BASE + 'data/products.json';
const prods = JSON.parse(fs.readFileSync(pj, 'utf8'));
const idx = prods.findIndex(x => x.id === 671);
if (idx !== -1) {
  prods.splice(idx, 1);
  fs.writeFileSync(pj, JSON.stringify(prods, null, 2));
  console.log('products.json: removed id 671 (Samson G-Track Pro, unused)');
}

// ================= build-guides.js: drop TEST_SHOP_BTN 671 =================
const bj = BASE + 'build-guides.js';
let s = fs.readFileSync(bj, 'utf8');
const i = s.indexOf('\n  671: {');
if (i !== -1) {
  const b = s.indexOf('{', i);
  let depth = 0, k = b;
  while (k < s.length) {
    if (s[k] === '{') depth++;
    else if (s[k] === '}') { depth--; if (depth === 0) break; }
    k++;
  }
  let end = k + 1;
  if (s[end] === ',') end++;
  s = s.substring(0, i) + s.substring(end);
  fs.writeFileSync(bj, s);
  console.log('build-guides.js: removed TEST_SHOP_BTN 671');
}
new (require('vm').Script)(s, { filename: 'build-guides.js' });
console.log('SYNTAX OK');