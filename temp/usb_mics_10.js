const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const load = p => JSON.parse(fs.readFileSync(BASE + p, 'utf8'));
const save = (p, d) => fs.writeFileSync(BASE + p, JSON.stringify(d, null, 2));

const NP = 'Not published';
const NP_ES = 'No publicada';

const ORDER = [
  [194, 'Shure MV7+', 'Shure MV7+'],
  [195, 'Elgato Wave:3', 'Elgato Wave:3'],
  [286, 'Audio-Technica AT2040USB', 'Audio-Technica AT2040USB'],
  [299, 'Sennheiser Profile Streaming Set', 'Sennheiser Profile Streaming Set'],
  [3,   'Rode NT1 5th Generation', 'Rode NT1 5ª Generación'],
  [666, 'Rode NT-USB+', 'Rode NT-USB+'],
  [670, 'sE Electronics NEOM USB', 'sE Electronics NEOM USB'],
  [252, 'Rode PodMic USB', 'Rode PodMic USB'],
  [291, 'Audio-Technica AT2020USB-X', 'Audio-Technica AT2020USB-X'],
  [671, 'Samson G-Track Pro', 'Samson G-Track Pro']
];

// ---- New table column data, indices 7 / 8 / 9 ----
const COL = {};

COL[7] = { // Rode PodMic USB — official RODE spec sheet
  'Best For': ['Broadcast dynamic with USB-C plus XLR backup', 'Dinámico broadcast con USB-C y respaldo XLR'],
  'Estimated Price': ['~$199', '~$199'],
  'Type': ['Dynamic (moving coil), cardioid, USB-C + XLR', 'Dinámico (bobina móvil), cardioide, USB-C + XLR'],
  'Polar Pattern': ['Cardioid', 'Cardioide'],
  'Frequency Response': ['20 Hz – 20 kHz', '20 Hz – 20 kHz'],
  'Sensitivity': ['-57 dB re 1 V/Pa (1.4 mV) ±3 dB', '-57 dB re 1 V/Pa (1.4 mV) ±3 dB'],
  'Self-Noise': ['Analogue 26 dBA / Digital 19 dBA', 'Analógico 26 dBA / Digital 19 dBA'],
  'Max SPL': ['148 dB SPL', '148 dB SPL'],
  'Output Impedance': ['460 Ω (XLR)', '460 Ω (XLR)'],
  'Signal-to-Noise Ratio': [NP, NP_ES],
  'Dynamic Range': [NP, NP_ES],
  'THD at Max SPL': [NP, NP_ES],
  'Capsule / Diaphragm': ['Moving-coil dynamic capsule', 'Cápsula dinámica de bobina móvil'],
  'Pad & High-Pass Filter': [NP, NP_ES],
  'Phantom Power': ['Not required (dynamic)', 'No requiere alimentación (dinámico)'],
  'Dimensions': ['123 × 109 × 110 mm', '123 × 109 × 110 mm'],
  'Weight': ['900 g', '900 g']
};

COL[8] = { // Audio-Technica AT2020USB-X — official AT spec table
  'Best For': ['Studio condenser sound with a real headphone mix control', 'Sonido de condensador de estudio con control de mezcla en auriculares'],
  'Estimated Price': ['~$169', '~$169'],
  'Type': ['Condenser (fixed-charge backplate), cardioid, USB-C', 'Condensador (placa posterior de carga fija), cardioide, USB-C'],
  'Polar Pattern': ['Cardioid', 'Cardioide'],
  'Frequency Response': ['20 – 20,000 Hz', '20 – 20.000 Hz'],
  'Sensitivity': [NP, NP_ES],
  'Self-Noise': [NP, NP_ES],
  'Max SPL': [NP, NP_ES],
  'Output Impedance': [NP, NP_ES],
  'Signal-to-Noise Ratio': [NP, NP_ES],
  'Dynamic Range': [NP, NP_ES],
  'THD at Max SPL': [NP, NP_ES],
  'Capsule / Diaphragm': ['Permanently polarized condenser', 'Condensador polarizado permanentemente'],
  'Pad & High-Pass Filter': [NP, NP_ES],
  'Phantom Power': ['USB power (5V DC)', 'Alimentación USB (5V DC)'],
  'Dimensions': ['142 mm long, 52 mm max body diameter', '142 mm de largo, 52 mm de diámetro máximo'],
  'Weight': ['Approx. 373 g (without stand)', 'Aprox. 373 g (sin soporte)']
};

COL[9] = { // Samson G-Track Pro — official Samson spec table
  'Best For': ['Mic, monitor mixer and instrument input in one box', 'Micrófono, mezclador de monitoreo y entrada de instrumento en un solo equipo'],
  'Estimated Price': ['~$149', '~$149'],
  'Type': ['Condenser (back-electret), USB', 'Condensador (back-electret), USB'],
  'Polar Pattern': ['Cardioid, Bidirectional (Figure-8), Omnidirectional', 'Cardioide, Bidireccional (Figura-8), Omnidireccional'],
  'Frequency Response': ['50 Hz – 20 kHz', '50 Hz – 20 kHz'],
  'Sensitivity': ['+6 dB FS/Pa (all polar patterns)', '+6 dB FS/Pa (todos los patrones polares)'],
  'Self-Noise': [NP, NP_ES],
  'Max SPL': ['120 dB', '120 dB'],
  'Output Impedance': ['Headphone output 16 Ω', 'Salida de auriculares 16 Ω'],
  'Signal-to-Noise Ratio': [NP, NP_ES],
  'Dynamic Range': [NP, NP_ES],
  'THD at Max SPL': [NP, NP_ES],
  'Capsule / Diaphragm': ['1 inch (25 mm) diaphragm, 3 micron', 'Diafragma de 1 pulgada (25 mm), 3 micras'],
  'Pad & High-Pass Filter': [NP, NP_ES],
  'Phantom Power': ['USB powered', 'Alimentación USB'],
  'Dimensions': ['116 mm × 268.5 mm diameter', '116 mm × 268,5 mm de diámetro'],
  'Weight': ['1.6 kg', '1,6 kg']
};

const SEC_PODMIC = {
  heading: 'Rode PodMic USB: The Broadcast Mic That Escaped the Interface',
  heading_es: 'Rode PodMic USB: el micrófono broadcast que se liberó de la interfaz',
  content: '<p><strong>The Rode PodMic USB is the rare broadcast dynamic that records straight into your computer and still keeps its XLR output.</strong> Rode loads the digital path with their high-gain Revolution Preamp and on-board APHEX processing, so the USB signal comes out broadcast-ready at 24-bit/48kHz, while the 3-pin XLR lets the same mic move onto a studio preamp later. The integrated swing mount holds it at mouth height on any desk, and both an internal pop filter and an external one ship in the box.</p>',
  content_es: '<p><strong>El Rode PodMic USB es ese micrófono dinámico broadcast raro que graba directo al ordenador y aun así conserva su salida XLR.</strong> Rode carga la vía digital con su preamp Revolution de alta ganancia y procesamiento APHEX integrado, así que la señal USB sale lista para broadcast a 24-bit/48kHz, mientras que el XLR de 3 pines permite llevar ese mismo micrófono a un preamp de estudio más adelante. El soporte basculante integrado lo mantiene a la altura de la boca en cualquier escritorio, y tanto el filtro antipop interno como uno externo vienen en la caja.</p>',
  products: [252]
};

const SEC_AT2020X = {
  heading: 'Audio-Technica AT2020USB-X: A Real Mix Knob on a Condenser',
  heading_es: 'Audio-Technica AT2020USB-X: una perilla de mezcla de verdad en un condensador',
  content: '<p><strong>The AT2020USB-X is the studio AT2020 condenser rebuilt for creators, and its standout feature is the mix control.</strong> Instead of a mute-only headphone jack, Audio-Technica gave it a headphone level knob plus a mix knob that blends your live mic signal with computer audio at whatever ratio you like, with no software mixer required. Conversion runs 16 or 24-bit at up to 96 kHz, the mute is a silent touch-sensitive button, and the custom AT8702 desk stand, threaded adapter and 2 m USB-C cable all ship in the box.</p>',
  content_es: '<p><strong>El AT2020USB-X es el condensador de estudio AT2020 reconstruido para creadores, y su rasgo estrella es el control de mezcla.</strong> En vez de una salida de auriculares que solo silencia, Audio-Technica le dio una perilla de nivel de auriculares y otra perilla de mezcla que combina la señal del micrófono con el audio del ordenador en la proporción que quieras, sin necesidad de un mezclador por software. La conversión va de 16 a 24 bits hasta 96 kHz, el mute es un botón táctil silencioso, y el soporte de escritorio AT8702, el adaptador de rosca y el cable USB-C de 2 m vienen incluidos.</p>',
  products: [291]
};

const SEC_SAMSON = {
  heading: 'Samson G-Track Pro: Mic, Monitor Mixer and Hi-Z Input in One',
  heading_es: 'Samson G-Track Pro: micrófono, mezclador de monitoreo y entrada Hi-Z en uno',
  content: '<p><strong>The Samson G-Track Pro is built around a 1-inch back-electret condenser with three switchable polar patterns: cardioid, figure-8 and omnidirectional.</strong> What sets it apart is the instrument input, a 1/4-inch 1 megaohm jack that lets you plug a guitar or bass in beside the mic and record both channels at once, with the headphone output driving the 3.5 mm jack at 83 mW into 32 ohm. Conversion is 16 or 24-bit over USB, and the body is a substantial 1.6 kg rather than the usual plastic desktop cylinder.</p>',
  content_es: '<p><strong>El Samson G-Track Pro se construye sobre un condensador back-electret de 1 pulgada con tres patrones polares conmutables: cardioide, figura-8 y omnidireccional.</strong> Lo que lo distingue es la entrada de instrumento, un jack de 1/4 pulgada de 1 megaohmio que te deja enchufar una guitarra o un bajo junto al micrófono y grabar los dos canales a la vez, con la salida de auriculares alimentando el jack de 3,5 mm a 83 mW sobre 32 ohmios. La conversión es de 16 o 24 bits por USB, y el cuerpo es un bloque firme de 1,6 kg en vez del habitual cilindro de plástico de escritorio.</p>',
  products: [671]
};

const VPC_PODMIC = {
  name: 'Rode PodMic USB', name_es: 'Rode PodMic USB',
  pros: [
    'The only mic here that keeps a 3-pin XLR output alongside USB, so you can move it to a studio preamp later without changing microphones',
    "Rode's high-gain Revolution Preamp plus on-board APHEX DSP run inside the mic, with no software effects chain",
    '148 dB max SPL, the highest headroom of any dynamic in this guide',
    'Integrated swing mount, and both an internal and an external pop filter come in the box',
    'Digital self-noise of 19 dBA is remarkably low for a broadcast dynamic',
    'Works on Windows, Mac, iOS and Android over USB-C'
  ],
  pros_es: [
    'El único micrófono de esta lista que mantiene su salida XLR de 3 pines junto al USB, así que puedes llevarlo después a un preamp de estudio sin cambiar de micrófono',
    'El preamp Revolution de alta ganancia de Rode y el DSP APHEX integrado trabajan dentro del micrófono, sin cadena de efectos por software',
    '148 dB de SPL máximo, el margen dinámico más amplio de todos los dinámicos de esta guía',
    'Soporte basculante integrado, y tanto el filtro antipop interno como uno externo vienen en la caja',
    'El ruido digital de 19 dBA es sorprendentemente bajo para un micrófono dinámico broadcast',
    'Funciona en Windows, Mac, iOS y Android por USB-C'
  ],
  cons: [
    'Cardioid only, with no omnidirectional or figure-8 option like the Samson G-Track Pro',
    '24-bit/48kHz only; there is no 96 kHz or 32-bit float mode, so it is not the pick for high-resolution capture',
    'At 900 g it is the second-heaviest mic in this guide and needs a proper arm or the included mount',
    'The headphone output is 3.5 mm rather than a studio-style 1/4-inch jack',
    'Rode Connect and the other Rode apps are needed to unlock the deeper DSP and routing options'
  ],
  cons_es: [
    'Solo cardioide, sin opción omnidireccional ni figura-8 como el Samson G-Track Pro',
    'Solo 24-bit/48kHz; no tiene modo de 96 kHz ni 32 bits flotantes, así que no es la opción para captura en alta resolución',
    'Con 900 g es el segundo micrófono más pesado de esta guía y necesita un brazo serio o el soporte incluido',
    'La salida de auriculares es de 3,5 mm en lugar del jack de 1/4 pulgada de estudio',
    'Rode Connect y el resto de apps de Rode hacen falta para abrir las opciones de DSP y ruteo'
  ]
};

const VPC_AT2020X = {
  name: 'Audio-Technica AT2020USB-X', name_es: 'Audio-Technica AT2020USB-X',
  pros: [
    'The mix control blends mic and computer playback in hardware, so you can hear yourself over music without opening an app',
    'Separate headphone level knob plus a silent touch-sensitive mute on the body',
    '24-bit conversion up to 96 kHz, wider than the 48 kHz ceiling of the Rode PodMic USB',
    'Award-winning AT2020 studio capsule, so it does not sound like a typical USB mic',
    'Complete kit out of the box: custom AT8702 desk stand, 3/8-to-5/8 adapter and 2 m USB-C cable',
    'Cardioid pickup keeps room noise down without the artifacts a noise gate leaves behind'
  ],
  pros_es: [
    'La perilla de mezcla combina micrófono y reproducción del ordenador en hardware, así que te oyes por encima de la música sin abrir ninguna app',
    'Perilla de nivel de auriculares aparte y mute táctil silencioso en el cuerpo',
    'Conversión de 24 bits hasta 96 kHz, más amplia que el techo de 48 kHz del Rode PodMic USB',
    'Cápsula de estudio AT2020 premiada, así que no suena como un micrófono USB típico',
    'Kit completo desde el primer día: soporte de escritorio AT8702, adaptador 3/8-a-5/8 y cable USB-C de 2 m',
    'La captación cardioide mantiene bajo el ruido de la habitación sin los artefactos que deja un noise gate'
  ],
  cons: [
    'Audio-Technica does not publish sensitivity, self-noise or max SPL for this model, so headroom is hard to compare on paper',
    'No XLR output and no digital signal processing on board, unlike the Rode PodMic USB',
    'The 142 mm body is tall for a desk stand; a boom arm gives you a much better angle',
    'A condenser capsule picks up keyboard clicks, room rumble and HVAC noise, so it needs a treated room',
    'Recent models push 32-bit float, which the AT2020USB-X does not offer'
  ],
  cons_es: [
    'Audio-Technica no publica sensibilidad, ruido propio ni SPL máximo para este modelo, así que el margen dinámico es difícil de comparar en papel',
    'Sin salida XLR y sin procesamiento digital a bordo, al contrario que el Rode PodMic USB',
    'El cuerpo de 142 mm es alto para un soporte de escritorio; un brazo articulado te dará un ángulo mucho mejor',
    'Una cápsula de condensador capta clics de teclado, retumbeo de la habitación y ruido del clima, así que pide una habitación tratada',
    'Los modelos recientes ya ofrecen 32 bits flotantes, algo que el AT2020USB-X no tiene'
  ]
};

const VPC_SAMSON = {
  name: 'Samson G-Track Pro', name_es: 'Samson G-Track Pro',
  pros: [
    'The only mic in this guide with real multi-pattern switching: cardioid, figure-8 and omnidirectional',
    'A 1/4-inch 1 megaohm instrument input records guitar or bass alongside the mic on two channels at once',
    'A 1-inch back-electret capsule with a 3 micron diaphragm captures far more detail than a typical USB dynamic',
    'Onboard monitor mixer plus 83 mW of headphone power into 32 ohm, enough to drive real studio headphones',
    '16 or 24-bit USB conversion with no software layer to install',
    'A substantial 1.6 kg metal body that will not wobble on a busy desk'
  ],
  pros_es: [
    'El único micrófono de esta lista con conmutación multipatrón de verdad: cardioide, figura-8 y omnidireccional',
    'Una entrada de instrumento de 1/4 pulgada y 1 megaohmio graba guitarra o bajo junto al micrófono en dos canales a la vez',
    'Una cápsula back-electret de 1 pulgada con diafragma de 3 micras capta mucho más detalle que un dinámico USB típico',
    'Mezclador de monitoreo integrado y 83 mW de potencia de auriculares sobre 32 ohmios, suficiente para auriculares de estudio reales',
    'Conversión USB de 16 o 24 bits sin capa de software que instalar',
    'Un cuerpo de metal firme de 1,6 kg que no se mueve en un escritorio con actividad'
  ],
  cons: [
    'Response bottoms out at 50 Hz rather than 20 Hz, so it will not capture the low end of a bass guitar fully',
    'Samson does not publish a sample rate for the USB converter, so 96 kHz is not a documented option',
    'There is no XLR output and no line output; the headphone jack is your only monitor path',
    'At 1.6 kg and 268 mm tall it needs real desk space or a sturdy boom arm',
    'Older on-board conversion and no companion app, so there is no clip recovery if a take runs hot'
  ],
  cons_es: [
    'La respuesta arranca en 50 Hz en vez de 20 Hz, así que no capta del todo los graves de un bajo eléctrico',
    'Samson no publica la tasa de muestreo del convertidor USB, de modo que 96 kHz no es una opción documentada',
    'No tiene salida XLR ni salida de línea; el jack de auriculares es tu única vía de monitoreo',
    'Con 1,6 kg y 268 mm de alto necesita espacio de escritorio de verdad o un brazo resistente',
    'Conversión antigua a bordo y sin app acompañante, así que no hay recuperación de clips si una toma se pasa'
  ]
};

// ================= APPLY =================
const guides = load('data/guides.json');
const g = guides.find(x => x.id === 'usb-mics');

g.productTable.columns = ORDER.map(o => ({ title: o[1], title_es: o[2] }));

g.productTable.rows.forEach(r => {
  const vals = r.values.slice(0, 7);
  [7, 8, 9].forEach(i => {
    const pair = COL[i][r.label];
    if (!pair) throw new Error('Missing row data: ' + i + ' / ' + r.label);
    vals.push({ value: pair[0], value_es: pair[1] });
  });
  r.values = vals;
});

g.sections = g.sections.slice(0, 7).concat([SEC_PODMIC, SEC_AT2020X, SEC_SAMSON]);
g.featuredProducts = ORDER.map(o => o[0]);
g.verdictProsCons = g.verdictProsCons.slice(0, 7).concat([VPC_PODMIC, VPC_AT2020X, VPC_SAMSON]);

const fs_ = g.featuredSnippet;
fs_.faq_a1_en = "It depends on your setup. The <strong>Shure MV7+</strong> is best for broadcast-style voice with auto-level and XLR backup. The <strong>Elgato Wave:3</strong> wins for software mixing via Wave Link. The <strong>Audio-Technica AT2040USB</strong> is the best budget dynamic for noisy rooms. The <strong>Sennheiser Profile Streaming Set</strong> is the most complete plug-and-play kit with hardware controls. The <strong>Rode NT1 5th Generation</strong> gives the cleanest condenser vocal detail. The <strong>Rode NT-USB+</strong> upgrades the classic Yeti with internal APHEX DSP. The <strong>sE Electronics NEOM USB</strong> adds hardware mixer controls without a separate interface. The <strong>Rode PodMic USB</strong> is the only one that keeps an XLR output you can still use later. The <strong>Audio-Technica AT2020USB-X</strong> gives you a real mix knob for blending mic and computer audio. The <strong>Samson G-Track Pro</strong> is the one that records an instrument alongside your voice.";
fs_.faq_a1_es = "Depende de tu setup. El <strong>Shure MV7+</strong> es el mejor para voz broadcast con auto-nivel y respaldo XLR. El <strong>Elgato Wave:3</strong> gana por mezcla con Wave Link. El <strong>Audio-Technica AT2040USB</strong> es el mejor dinámico económico para habitaciones ruidosas. El <strong>Sennheiser Profile Streaming Set</strong> es el kit conectar-y-usar más completo con controles físicos. El <strong>Rode NT1 5th Generation</strong> da el detalle vocal de condensador más limpio. El <strong>Rode NT-USB+</strong> mejora el Yeti clásico con DSP APHEX interno. El <strong>sE Electronics NEOM USB</strong> añade controles de mezclador en hardware sin interfaz aparte. El <strong>Rode PodMic USB</strong> es el único que conserva una salida XLR que podrás seguir usando después. El <strong>Audio-Technica AT2020USB-X</strong> te da una perilla de mezcla real para combinar micrófono y audio del ordenador. El <strong>Samson G-Track Pro</strong> es el que graba un instrumento junto a tu voz.";
fs_.faq_a3_en = "The <strong>Sennheiser Profile Streaming Set</strong> has physical gain, mix and headphone knobs plus a mute button with LED ring. The <strong>sE Electronics NEOM USB</strong> goes further with three independent analog knobs: Gain, Headphone Volume and Playback Mix. The <strong>Rode NT-USB+</strong> has gain and headphone volume. The <strong>Audio-Technica AT2020USB-X</strong> has a headphone level knob plus a mix knob, but no gain control in hardware. The <strong>Samson G-Track Pro</strong> puts instrument and monitor control on the desk next to the mic.";
fs_.faq_a3_es = "El <strong>Sennheiser Profile Streaming Set</strong> tiene perillas físicas de ganancia, mezcla y auriculares más un botón de mute con anillo LED. El <strong>sE Electronics NEOM USB</strong> va más allá con tres perillas analógicas independientes: Ganancia, Volumen de Auriculares y Mezcla de Reproducción. El <strong>Rode NT-USB+</strong> tiene ganancia y volumen de auriculares. El <strong>Audio-Technica AT2020USB-X</strong> tiene perilla de nivel de auriculares y perilla de mezcla, pero sin control de ganancia en hardware. El <strong>Samson G-Track Pro</strong> pone el control de instrumento y de monitoreo en el escritorio junto al micrófono.";
fs_.faq_a4_en = "Yes. All ten microphones use standard 5/8-inch threading or ship with a 3/8-to-5/8 adapter, so they work with any standard boom arm. The <strong>Audio-Technica AT2020USB-X</strong>, <strong>sE Electronics NEOM USB</strong> and <strong>Samson G-Track Pro</strong> include desk stands that also mount on a boom arm. The <strong>Rode PodMic USB</strong> uses its own integrated swing mount instead, so it needs no adapter at all.";
fs_.faq_a4_es = "Sí. Los diez micrófonos usan rosca estándar de 5/8 pulgadas o incluyen adaptador 3/8-a-5/8, así que funcionan con cualquier brazo articulado estándar. El <strong>Audio-Technica AT2020USB-X</strong>, el <strong>sE Electronics NEOM USB</strong> y el <strong>Samson G-Track Pro</strong> incluyen soportes de escritorio que también se montan en un brazo. El <strong>Rode PodMic USB</strong> usa su propio soporte basculante integrado, así que no necesita adaptador.";
fs_.faq_a5_en = "For podcasting, prioritize voice clarity: the <strong>Shure MV7+</strong>, <strong>Rode NT1 5th Generation</strong>, <strong>Rode NT-USB+</strong> and <strong>Audio-Technica AT2020USB-X</strong>. For streaming with hardware controls and low latency: the <strong>Sennheiser Profile Streaming Set</strong>, <strong>sE Electronics NEOM USB</strong> and <strong>Elgato Wave:3</strong>. For noisy rooms on a budget: the <strong>Audio-Technica AT2040USB</strong>. For music, the <strong>Samson G-Track Pro</strong> and the <strong>Rode PodMic USB</strong> are the pair that handles voice and instrument together.";
fs_.faq_a5_es = "Para podcasting, prioriza la claridad de voz: el <strong>Shure MV7+</strong>, <strong>Rode NT1 5th Generation</strong>, <strong>Rode NT-USB+</strong> y <strong>Audio-Technica AT2020USB-X</strong>. Para streaming con controles en hardware y baja latencia: el <strong>Sennheiser Profile Streaming Set</strong>, el <strong>sE Electronics NEOM USB</strong> y el <strong>Elgato Wave:3</strong>. Para habitaciones ruidosas con presupuesto limitado: el <strong>Audio-Technica AT2040USB</strong>. Para música, el <strong>Samson G-Track Pro</strong> y el <strong>Rode PodMic USB</strong> son la pareja que resuelve voz e instrumento a la vez.";

const LINKS_EN = '<p><a href="/guides/best-microphone.html" class="guide-link-btn">Best Microphone for Vocals &amp; Home Recording</a> <a href="/guides/budget-mics.html" class="guide-link-btn">Best Budget Microphones</a> <a href="/guides/best-mic-for-podcasting.html" class="guide-link-btn">Best Podcast Mic</a></p>';
const LINKS_ES = '<p><a href="/guides/best-microphone_es.html" class="guide-link-btn">Mejor Micrófono para Voces y Grabación Casera</a> <a href="/guides/budget-mics_es.html" class="guide-link-btn">Mejores Micrófonos Económicos</a> <a href="/guides/best-mic-for-podcasting_es.html" class="guide-link-btn">Mejor Micrófono para Podcast</a></p>';

g.conclusion = 'The best USB stream mic is the one that fits your room and your setup today. If you want the characteristic Shure broadcast sound with a single USB cable and no gain issues, get the <strong>Shure MV7+</strong>. If your room is quiet and you want detailed condenser sound with free mixing software, get the <strong>Elgato Wave:3</strong>. If you want a budget dynamic that reduces background noise, get the <strong>Audio-Technica AT2040USB</strong>. If you want the most complete plug-and-play package with hardware controls, get the <strong>Sennheiser Profile Streaming Set</strong>. If you want maximum vocal detail for singing or ASMR in a treated room, the <strong>Rode NT1 5th Generation</strong> delivers. For streamers upgrading from the classic Yeti, the <strong>Rode NT-USB+</strong> brings internal APHEX DSP and 24-bit/48kHz conversion. If you need hardware mixer control without a separate interface, the <strong>sE Electronics NEOM USB</strong> is the missing link. If you plan to move to a studio preamp someday, the <strong>Rode PodMic USB</strong> is the only mic here that keeps its XLR output. If you want a studio condenser with a real mix knob so you can hear yourself over music, the <strong>Audio-Technica AT2020USB-X</strong> does it in hardware. And for the most versatile desktop box, the <strong>Samson G-Track Pro</strong> pairs three polar patterns with an instrument input so you can record voice and guitar at once. Every one of these ten is a professional, stream-ready USB microphone, so start with the one that matches your workflow. ' + LINKS_EN;

g.conclusion_es = 'El mejor micrófono USB para streaming es el que se ajuste a tu habitación y a tu forma de trabajar. Si quieres la voz de broadcast de Shure con un solo cable USB y sin problemas de ganancia, ve por el <strong>Shure MV7+</strong>. Si tu habitación es tranquila y quieres un sonido de condensador detallado con software de mezcla gratuito, el <strong>Elgato Wave:3</strong>. Si necesitas un dinámico que corte el ruido de fondo, el <strong>Audio-Technica AT2040USB</strong>. Si quieres el paquete conectar y usar más completo con controles físicos, el <strong>Sennheiser Profile Streaming Set</strong>. Y si buscas el máximo detalle vocal para cantar o ASMR en un espacio tratado, el <strong>Rode NT1 5th Generation</strong> cumple. Para streamers que vienen del Yeti clásico, el <strong>Rode NT-USB+</strong> aporta DSP APHEX interno y conversión 24-bit/48kHz. Si necesitas control de mezclador en hardware sin interfaz aparte, el <strong>sE Electronics NEOM USB</strong> es el eslabón perdido. Si algún día piensas pasar a un preamp de estudio, el <strong>Rode PodMic USB</strong> es el único de esta lista que conserva su salida XLR. Si quieres un condensador de estudio con una perilla de mezcla de verdad para oirte por encima de la música, el <strong>Audio-Technica AT2020USB-X</strong> lo hace en hardware. Y para el equipo de escritorio más versatile, el <strong>Samson G-Track Pro</strong> combina tres patrones polares con entrada de instrumento para grabar voz y guitarra a la vez. Los diez son micrófonos USB profesionales listos para streaming, así que empieza con el que mejor se adapte a tu forma de trabajar. ' + LINKS_ES;

save('data/guides.json', guides);

// ================= PRODUCTS =================
const prods = load('data/products.json');
const by = {};
prods.forEach(p => { by[p.id] = p; });

const p252 = by[252];
p252.desc = "Rode's PodMic USB pairs the broadcast sound of the classic dynamic PodMic with both XLR and USB-C outputs, so it works straight into a laptop or phone without an interface. It keeps the integrated swing mount and internal pop filter, adds a zero-latency headphone output with level control, and runs Rode's high-gain Revolution Preamp plus on-board APHEX DSP at 24-bit/48kHz.";
p252.desc_es = 'El PodMic USB de Rode combina el sonido broadcast del clásico PodMic dinámico con salidas XLR y USB-C, así que funciona directo a un portátil o teléfono sin interfaz. Mantiene el soporte basculante integrado y el filtro antipop interno, añade salida de auriculares sin latencia con control de nivel, y trabaja con el preamp Revolution de alta ganancia de Rode y DSP APHEX a bordo a 24-bit/48kHz.';
p252.oos = ['zzounds'];

const p291 = by[291];
if (p291.stores) { delete p291.stores.musicstore; delete p291.stores.andertons; }
p291.desc = "The AT2020USB-X brings Audio-Technica's studio AT2020 condenser sound to USB-C. Its standout feature is a real mix control that blends your mic with computer audio in hardware, plus a separate headphone level knob and a silent touch mute. 24-bit conversion up to 96 kHz, cardioid pickup, and the custom AT8702 desk stand, threaded adapter and 2 m USB-C cable are all included.";
p291.desc_es = 'El AT2020USB-X lleva el sonido del condensador de estudio AT2020 de Audio-Technica al USB-C. Su rasgo estrella es un control de mezcla real que combina tu micrófono con el audio del ordenador en hardware, más una perilla aparte de nivel de auriculares y un mute táctil silencioso. Conversión de 24 bits hasta 96 kHz, captación cardioide, y vienen incluidos el soporte de escritorio AT8702, el adaptador de rosca y el cable USB-C de 2 m.';

const p671 = by[671];
p671.img = 'https://storage.googleapis.com/samson-production/uploads/original_images/G-Track-Pro-HO.jpg';
p671.desc = 'The Samson G-Track Pro is a USB condenser microphone with a 1-inch back-electret capsule, three switchable polar patterns (cardioid, figure-8, omnidirectional) and a 1/4-inch instrument input so you can record guitar or bass alongside your voice. 16 or 24-bit USB conversion, an onboard monitor mixer and a 3.5 mm headphone output at 83 mW into 32 ohm, in a solid 1.6 kg metal body.';
p671.desc_es = 'El Samson G-Track Pro es un micrófono condensador USB con cápsula back-electret de 1 pulgada, tres patrones polares conmutables (cardioide, figura-8, omnidireccional) y entrada de instrumento de 1/4 pulgada para grabar guitarra o bajo junto a tu voz. Conversión USB de 16 o 24 bits, mezclador de monitoreo integrado y salida de auriculares de 3,5 mm a 83 mW sobre 32 ohmios, en un cuerpo firme de metal de 1,6 kg.';
p671.stores = {};
delete p671.excludeStores;
p671.oos = ['amazon', 'zzounds', 'andertons', 'gear4music', 'musicstore', 'reverb'];

save('data/products.json', prods);

console.log('OK - guides.json + products.json updated');