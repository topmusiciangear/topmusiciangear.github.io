var fs = require('fs');
var BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
var fails = [];
function R(s, a, b) { if (s.indexOf(a) === -1) { fails.push('NOT FOUND: ' + a.slice(0, 80)); return s; } return s.split(a).join(b); }

var d = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8'));
var g = d.find(function (x) { return x.id === 'usb-mics'; });
if (!g) { console.log('guide usb-mics NOT FOUND'); process.exit(1); }

// 1. Section 0 products: 330 -> 276
g.sections[0].products = g.sections[0].products.map(function (id) { return id === 330 ? 276 : id; });
// 2. Section 4 products: 330 -> 276
g.sections[4].products = g.sections[4].products.map(function (id) { return id === 330 ? 276 : id; });

// 3. Section 6: XM8500 -> Samson Q2U (unique heading, verified Samson specs)
var s6 = g.sections[6];
s6.heading = 'Start on USB, Grow to XLR: The Samson Q2U Workhorse';
s6.heading_es = 'Empieza por USB y crece a XLR: el todoterreno Samson Q2U';
s6.content = '<strong>Untreated rooms punish sensitive condensers, and an XLR-only mic forces you to buy an interface — the Q2U sidesteps both.</strong> It is a handheld dynamic cardioid with USB and XLR outputs that work simultaneously, so it plugs straight into a laptop for streaming today and into a mixer or interface tomorrow. The dynamic capsule stays focused on the voice and rejects rear and side noise, which is exactly what untreated rooms need. Zero-latency monitoring comes from the 1/8-inch headphone jack with its own level control, and the on/off switch mutes both outputs at once.</p><p><strong>The box is the argument.</strong> Tripod desk stand with extension piece, mic clip, windscreen, a 2.25m USB cable and a 3m XLR cable — everything needed to record out of the box, with 148dB max SPL headroom for loud voices. The honest trade: USB tops out at 16-bit/48kHz with no 24-bit option, and the 50Hz–15kHz response trades top-end air for room rejection. For a first streaming mic that grows with you, that trade is easy to take.';
s6.content_es = '<strong>Las habitaciones sin tratar castigan a los condensadores sensibles, y un micro solo XLR te obliga a comprar una interfaz — el Q2U esquiva ambas cosas.</strong> Es un dinámico cardioide de mano con salidas USB y XLR que funcionan a la vez, así que se enchufa directo al portátil para transmitir hoy y a una mesa o interfaz mañana. La cápsula dinámica se mantiene enfocada en la voz y rechaza el ruido trasero y lateral, que es justo lo que necesitan las habitaciones sin tratar. La monitorización sin latencia sale del jack de auriculares de 1/8 de pulgada con su propio control de nivel, y el interruptor de encendido silencia ambas salidas a la vez.</p><p><strong>La caja es el argumento.</strong> Trípode de escritorio con extensión, pinza de micro, antipop, cable USB de 2,25m y cable XLR de 3m — todo lo necesario para grabar nada más abrir la caja, con margen de 148dB de SPL máximo para voces potentes. El trato honesto: el USB llega hasta 16-bit/48kHz sin opción de 24-bit, y la respuesta de 50Hz–15kHz cambia el aire en agudos por rechazo de ruido. Para un primer micro de streaming que crece contigo, ese trato se acepta fácil.';
s6.products = [276];

// 4. verdictProsCons[18]: XM8500 -> Q2U
var vpc = g.verdictProsCons.find(function (v) { return v.name.indexOf('XM8500') > -1; });
if (!vpc) { fails.push('VPC XM8500 NOT FOUND'); } else {
  vpc.name = 'Samson Q2U USB/XLR Microphone';
  vpc.name_es = 'Samson Q2U USB/XLR Microphone';
  vpc.pros = [
    'Hybrid USB + XLR outputs work simultaneously — start on USB, move to an interface with the same mic',
    'Dynamic cardioid capsule rejects rear and side noise, made for untreated rooms',
    'Zero-latency 1/8-inch headphone output with level control plus on/off switch for both outputs',
    'Complete pack in the box: tripod stand with extension, mic clip, windscreen, USB and XLR cables',
    '148dB max SPL headroom with a solid die-cast body for loud voices and mobile use'
  ];
  vpc.pros_es = [
    'Salidas híbridas USB + XLR que funcionan a la vez — empieza por USB y pasa a interfaz con el mismo micro',
    'Cápsula dinámica cardioide que rechaza el ruido trasero y lateral, hecha para habitaciones sin tratar',
    'Salida de auriculares de 1/8 sin latencia con control de nivel más interruptor para ambas salidas',
    'Pack completo en la caja: trípode con extensión, pinza, antipop y cables USB y XLR',
    'Margen de 148dB de SPL máximo con cuerpo metálico sólido para voces potentes y uso móvil'
  ];
  vpc.cons = [
    'USB audio tops out at 16-bit/48kHz — no 24-bit recording option',
    '50Hz–15kHz response trades top-end air for room rejection',
    'Tripod stand sits low on the desk — a boom arm works better for streaming',
    'No software mixer ecosystem like Elgato Wave Link or Seiren tools'
  ];
  vpc.cons_es = [
    'El audio por USB llega hasta 16-bit/48kHz — sin opción de grabación en 24-bit',
    'La respuesta de 50Hz–15kHz cambia el aire en agudos por rechazo de ruido',
    'El trípode queda bajo en el escritorio — un brazo articulado funciona mejor para streaming',
    'Sin ecosistema de software de mezcla como Elgato Wave Link o las herramientas de Seiren'
  ];
}

fs.writeFileSync(BASE + 'data/guides.json', JSON.stringify(d, null, 2));
console.log('usb-mics updated: sec0=' + JSON.stringify(g.sections[0].products) + ' sec4=' + JSON.stringify(g.sections[4].products) + ' sec6=' + JSON.stringify(s6.products));
if (fails.length) { console.log('FAIL:\n' + fails.join('\n')); process.exit(1); }
console.log('DONE');
