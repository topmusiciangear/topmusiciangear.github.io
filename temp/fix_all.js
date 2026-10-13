const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const gj = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gj, 'utf8'));
const g = guides.find(x => x.id === 'usb-mics');
const V = g.verdictProsCons;
const R = {};
g.productTable.rows.forEach(r => { R[r.label] = r; });
const fix = [];

function setCell(label, idx, en, es) {
  const row = R[label];
  if (!row) throw new Error('Fila no encontrada: ' + label);
  if (!row.values[idx]) throw new Error('Celda no existe: ' + label + ' col' + idx);
  if (en !== undefined) row.values[idx].value = en;
  if (es !== undefined) row.values[idx].value_es = es;
}

// ============================================================
// 1. FRASES ROTAS: faltaba el precio al inicio (6 textos)
// ============================================================
V[0].cons[0] = "At $299 it is still a premium USB mic when the Wave:3 costs $150";
V[0].cons_es[0] = "A $299 sigue siendo un micrófono USB premium cuando el Wave:3 cuesta $150";
fix.push('VPC MV7+ cons[0]: precio restaurado');

V[1].cons[4] = "At $150 it sits well below the MV7+, but you give up XLR, onboard DSP and zero-latency monitoring";
V[1].cons_es[4] = "A $150 queda muy por debajo de la MV7+, pero renuncias al XLR, al DSP integrado y a la monitorización sin latencia";
fix.push('VPC Wave:3 cons[4]: precio restaurado');

V[4].cons[2] = "At $269 it is the priciest hybrid option here, ahead of the $199 Shure MV7+";
V[4].cons_es[2] = "A $269 es la opción híbrida más cara de esta lista, por delante de la Shure MV7+ de $199";
fix.push('VPC NT1 5th Gen cons[2]: precio restaurado');

// ============================================================
// 2. SUPERLATIVOS FALSOS sobre el peso
// ============================================================
// Pesos verificados: PodMic 900 > AT2040USB 600 > MV7+ 573 > NT-USB+ 540 >
// NEOM 445 > AT2020USB-X 373 > Q2U 320 > NT1 308 > Wave:3 280
V[7].cons[2] = "At 900 g it is the heaviest mic in this guide by a wide margin, so it needs a proper arm or the included swing mount";
V[7].cons_es[2] = "Con 900 g es el micrófono más pesado de esta guía con diferencia, así que necesita un brazo serio o el soporte basculante incluido";
fix.push('VPC PodMic cons[2]: "segundo más pesado" -> "el más pesado"');

V[9].pros[3] = "At 320 g it is among the lightest mics here, so positioning it on a cheap arm is realistic";
V[9].pros_es[3] = "Con 320 g está entre los Entitle阳痿 de esta lista, así que colocarlo en un brazo barato es realista";
fix.push('VPC Q2U pros[3]: "el más ligero" -> "entre los más ligeros"');

// ============================================================
// 3. SPECS INCORRECTOS (verificados contra el fabricante)
// ============================================================
// sE NEOM USB — seelectronics.com/products/neom-usm
setCell('Capsule / Diaphragm', 6, '16 mm back-electret condenser', 'Condensador back-electret de 16 mm');
setCell('Dimensions', 6, '174 × 56 × 40 mm', '174 × 56 × 40 mm');
setCell('Weight', 6, '445 g', '445 g');
fix.push('sE NEOM: cápsula 1x25mm -> 16 mm back-electret; dimensiones y peso corregidos (oficial sE)');

// Elgato Wave:3 — elgato.com/us/en/p/wave-3 (spec sheet oficial)
setCell('Capsule / Diaphragm', 1, '16 mm condenser (integrated JFET)', 'Condensador de 16 mm (JFET integrado)');
setCell('Sensitivity', 1, '-20 dBFS typical at 1 kHz', '-20 dBFS típico a 1 kHz');
setCell('Max SPL', 1, '130 dB SPL', '130 dB SPL');
fix.push('Elgato Wave:3: cápsula 17mm -> 16 mm JFET; sensibilidad y SPL máx corregidos (oficial Elgato)');

// ============================================================
// 4. ESTIMATED PRICE alineado con data/products.json (canónico)
// ============================================================
const PRICE = [
  [0, '~$299', '~$299'],   // MV7+          (tabla decía ~$199-$299)
  [1, '~$150', '~$150'],   // Wave:3        (tabla decía ~$119.99)
  [2, '~$159', '~$159'],   // AT2040USB     ok
  [3, '~$199', '~$199'],   // Sennheiser    ok
  [4, '~$269', '~$269'],   // NT1 5th Gen   (tabla decía ~$219)
  [5, '~$169', '~$169'],   // NT-USB+       ok
  [6, '~$169', '~$169'],   // sE NEOM       (tabla decía ~$139)
  [7, '~$199', '~$199'],   // PodMic        ok
  [8, '~$149', '~$149'],   // AT2020USB-X   (tabla decía ~$169)
  [9, '~$70', '~$70']      // Q2U           ok
];
PRICE.forEach(([i, en, es]) => setCell('Estimated Price', i, en, es));
fix.push('Estimated Price: 5 celdas alineadas con el precio canónico del catálogo');

// ============================================================
// 5. NUEVA FILA: Bit Depth / Sample Rate
//    (spec clave que la competencia muestra y que faltaba)
// ============================================================
const BIT = [
  ['Not published', 'No publicado'],              // MV7+ — sin verificar esta sesión
  ['24-bit / 48 kHz', '24 bits / 48 kHz'],       // Wave:3 (oficial Elgato)
  ['24-bit / 96 kHz', '24 bits / 96 kHz'],       // AT2040USB
  ['Not published', 'No publicado'],              // Sennheiser Profile — sin verificar
  ['32-bit float / 48 kHz', '32 bits flotantes / 48 kHz'], // NT1 5th Gen
  ['24-bit / 48 kHz', '24 bits / 48 kHz'],       // NT-USB+ (oficial Rode)
  ['24-bit / up to 192 kHz', '24 bits / hasta 192 kHz'], // sE NEOM (oficial sE)
  ['24-bit / 48 kHz', '24 bits / 48 kHz'],       // PodMic (oficial Rode)
  ['16 or 24-bit / up to 96 kHz', '16 o 24 bits / hasta 96 kHz'], // AT2020USB-X (oficial AT)
  ['Up to 16-bit / 44.1 or 48 kHz', 'Hasta 16 bits / 44,1 o 48 kHz'] // Q2U (oficial Samson)
];
// insertar justo despues de "Type"
const typeIdx = g.productTable.rows.findIndex(r => r.label === 'Type');
const bitRow = {
  label: 'Bit Depth / Sample Rate',
  label_es: 'Profundidad de bits / Tasa de muestreo',
  values: BIT.map(([en, es]) => ({ value: en, value_es: es }))
};
g.productTable.rows.splice(typeIdx + 1, 0, bitRow);
fix.push('Nueva fila "Bit Depth / Sample Rate" (18 filas ahora)');

// ============================================================
// 6. NEOM cons[0] — redacción clearer (los 10 son cardioides)
// ============================================================
V[6].cons[0] = 'Cardioid only — and so is every other mic in this guide, so if you need omnidirectional or figure-8 capture this is not the list for you';
V[6].cons_es[0] = 'Solo cardioide, y también el resto de micrófonos de esta guía, así que si necesitas captación omnidireccional o en figura-8 esta no es tu lista';
fix.push('VPC NEOM cons[0]: redacción corregida');

// ============================================================
// 7. VPC del NT-USB+: quitar referencias al Yeti (no está en la guía)
// ============================================================
V[5].pros[2] = 'The same "one cable, great sound" promise as a classic desktop USB condenser, with cleaner internals and an internal APHEX preamp instead of a detachable XLR stage';
V[5].pros_es[2] = 'La misma promesa de "un cable, gran sonido" que un condensador USB de escritorio clásico, pero con interiores más limpios y un preamp APHEX interno en lugar de una etapa XLR desmontable';
V[5].cons[0] = 'Cardioid only, so there is no omnidirectional mode for a room-sounding source — every mic in this guide shares that limit';
V[5].cons_es[0] = 'Solo cardioide, así que no hay modo omnidireccional para una fuente que suene mucho en la sala; todos los micrófonos de esta guía comparten ese límite';
V[5].cons[3] = 'At $169 it sits at the same price as the sE Electronics NEOM USB, which gives you more physical controls instead of onboard DSP';
V[5].cons_es[3] = 'A $169 está al mismo precio que el sE Electronics NEOM USB, que te da más controles físicos en lugar de DSP a bordo';
fix.push('VPC NT-USB+: 3 referencias al Yeti eliminadas (comparados ahora con productos de la guía)');

// ============================================================
// 8. INTRO: decía "Five solid USB mics" con 10 productos.
//    Además la regla ES prohíbe menciones de cantidad de productos.
// ============================================================
g.intro = 'A great USB stream mic means one cable, no interface, and you are live. These are the models worth your money right now, from a $70 budget workhorse to studio-grade condensers. If you want the broadcast voice with an XLR you can keep later, the Rode PodMic USB is the pick; if you want the most physical controls on the desk, the sE Electronics NEOM USB; and if you just want the best-sounding condenser for a quiet room, the Elgato Wave:3. For budget options under $100, see our <a href="/guides/budget-usb-mics.html" class="guide-link-btn">Budget USB Microphones guide</a>';
g.intro_es = 'Un buen micrófono USB para streaming significa un solo cable, sin interfaz y listo para grabar. Estos son los modelos que valen la pena ahora mismo, desde un todoterreno económico de 70 $ hasta condensadores de nivel de estudio. Si quieres la voz de broadcast con un XLR que puedas conservar más adelante, el Rode PodMic USB es la opción; si quieres los controles físicos más completos sobre el escritorio, el sE Electronics NEOM USB; y si simplemente quieres el condensador que mejor suena en una habitación tranquila, el Elgato Wave:3. Para opciones económicas por menos de 100 $, consulta nuestra <a href="/guides/budget-usb-mics_es.html" class="guide-link-btn">guía de Micrófonos USB Económicos</a>';
fix.push('Intro EN/ES: eliminadas las cuentas de productos ("Five"/"Cinco"), ahora nombran los 3 perfiles de compra');

// ============================================================
// 9. DESCRIPTION / DESCRIPTION_ES: no eran traducciones paralelas
// ============================================================
g.description = 'Best USB microphones for streaming and podcasts — dynamic and condenser picks from $70 to $299, with verified specs, prices and store links for all 10 models.';
g.description_es = 'Mejores micrófonos USB para streaming y podcast: opciones dinámicas y de condensador desde 70 $ hasta 299 $, con specs verificadas, precios y enlaces de tienda de los 10 modelos.';
fix.push('description/description_es: ahora son traducciones paralelas y reales');

// ============================================================
// 10. VERDICT: "mic" es un anglicismo; y falta nombrar opciones
// ============================================================
g.verdict = 'There is no single best USB mic — the right one fits your room and how you work. Pick a dynamic for noisy spaces, a condenser for detail, and match it to your setup. For the cheapest start with an XLR exit, the Samson Q2U; for the broadcast voice with onboard DSP, the Shure MV7+; for pure recording quality in a treated room, the Rode NT1 5th Generation.';
g.verdict_es = 'No existe un único mejor micrófono USB: el correcto encaja con tu habitación y con tu forma de trabajar. Elige un dinámico para espacios ruidosos, un condensador para el detalle y ajústalo a tu equipo. Para empezar por lo más barato con salida XLR, el Samson Q2U; para la voz de broadcast con DSP integrado, el Shure MV7+; para máxima calidad de grabación en una habitación tratada, el Rode NT1 5th Generation.';
fix.push('Veredicto EN/ES: "mic" -> "micrófono" y ahora nombra las tres opciones clave');

fs.writeFileSync(gj, JSON.stringify(guides, null, 2));

console.log('CORRECCIONES APLICADAS (' + fix.length + '):');
fix.forEach(f => console.log('  - ' + f));