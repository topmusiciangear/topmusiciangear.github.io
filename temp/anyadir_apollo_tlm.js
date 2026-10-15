// Anadir Apollo Twin X Gen 2 (16) y Neumann TLM 102 (674): seccion + veredicto
// Specs tomadas de la ficha del catalogo (data/products.json), sin inventar nada
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const F = BASE + 'data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const guia = g.find(x => x.id === 'starter-studio');
const log = [];

/* ── SECCION APOLLO ── */
const secUA = {
  heading: 'Unison Preamps and UAD-2 on Board: The Last Interface Upgrade You Need',
  heading_es: 'Previos Unison y UAD-2 a bordo: la última mejora de interfaz que vas a necesitar',
  content: '<p><strong>The Apollo Twin X Gen 2 is the point where an interface stops being a box and starts being a signal chain.</strong> Everything below it in this guide converts audio and nothing else. This one carries two Unison mic preamps and a UAD-2 DUO Core DSP inside the chassis, so the analogue modelling and the compression you would normally reach for with a plugin can happen before the signal ever reaches the converter.</p>' +
    '<p>The preamps are the quieter reason to want it. Unison circuitry is a reworking of the Apollo 6110, which is a much more expensive preamp, and it arrives with Auto-Gain — the interface listens to the input and sets the level for you, which is the single hardest task for someone building a first home studio. Conversion is 24-bit at up to 192 kHz over Thunderbolt 3, and it runs on Mac and Windows alike.</p>' +
    '<p>Two honest caveats. The Essentials+ bundle it ships with is real DSP, but it is not the full UAD catalog: the plug-ins that everybody actually asks for, the Neve and the LA-2A emulation among them, still live on a card you would have to buy. And Thunderbolt means a cable and a port — on a laptop without one, the whole argument for this interface evaporates. If you are on USB-C only, buy the Volt 276 instead and keep the difference.</p>',
  content_es: '<p><strong>El Apollo Twin X Gen 2 es el punto en el que una interfaz deja de ser una caja y se convierte en parte de la cadena de señal.</strong> Todo lo que hay por debajo en esta guía convierte audio y nada más. Este lleva dentro dos previos de micrófono Unison y un DSP UAD-2 DUO Core, así que el modelado analógico y la compresión que normalmente alcanzarías con un plugin pueden ocurrir antes de que la señal llegue al convertidor.</p>' +
    '<p>Los previos son la razón más silenciosa para quererlo. El circuitry Unison es una rediseño del Apollo 6110, que es un previo mucho más caro, y llega con Auto-Gain: la interfaz escucha la entrada y ajusta el nivel por ti, que es la tarea más difícil para quien monta su primer estudio. La conversión es de 24 bits hasta 192 kHz por Thunderbolt 3, y funciona igual en Mac y en Windows.</p>' +
    '<p>Dos matices honestos. El paquete Essentials+ que incluye es DSP de verdad, pero no es el catálogo completo de UAD: los plugins que todo el mundo pide, el emulador de Neve y el de LA-2A entre ellos, siguen viviendo en una tarjeta que tendrías que comprar aparte. Y Thunderbolt implica un cable y un puerto: en un portátil que no lo tenga, todo el argumento de esta interfaz se evapora. Si solo tienes USB-C, compra el Volt 276 y guarda la diferencia.</p>',
  products: [16]
};

/* ── SECCION TLM 102 ── */
const secTLM = {
  heading: 'The Cheapest Neumann: Why a Transformerless 102 Outlasts a $3,000 Mic',
  heading_es: 'El Neumann más barato: por qué un 102 sin transformador dura más que un micrófono de 3.000',
  content: '<p><strong>The TLM 102 is the cheapest large-diaphragm condenser Neumann makes, and it is the only microphone in this guide with the brand name on the capsule.</strong> It runs 20 Hz to 20 kHz, puts out 11 mV/Pa, and has 12 dB-A of self-noise with 144 dB of maximum SPL. Those are not flagship numbers, and they are not supposed to be.</p>' +
    '<p>What you are buying is the transformerless circuit, and that is a deliberate design choice rather than a cost-cutting one. No output transformer means lower distortion and a wider frequency response than the microphones above it, at the price of a gentle lift around 10 kHz that adds a little air to a voice without touching the low end. It also has an integrated pop screen, which means the $49 Aston filter that matters in the lower tiers stops being necessary here.</p>' +
    '<p>Be clear about what it is not. It is not the U 87, it does not have the U 87’s presence peak, and it will not tell you that your mix is wrong the way a $3,000 microphone seems to. What it does is sit in the room, record cleanly, and refuse to be the reason anything sounds bad. In a home studio that is worth more than a bigger name.</p>',
  content_es: '<p><strong>El TLM 102 es el condensador de diafragma grande más barato que hace Neumann, y es el único micrófono de esta guía con el nombre de la marca en la cápsula.</strong> Cubre de 20 Hz a 20 kHz, entrega 11 mV/Pa y tiene 12 dB-A de ruido propio con 144 dB de SPL máximo. No son cifras de producto insignia, y no pretende serlo.</p>' +
    '<p>Lo que compras es el circuito sin transformador, y eso es una decisión de diseño deliberada, no un recorte de costes. Sin transformador de salida hay menos distorsión y una respuesta de frecuencia más ancha que en los micrófonos que están por encima, a cambio de un realce suave alrededor de los 10 kHz que le da un poco de aire a la voz sin tocar el grave. Además lleva un antipop integrado, así que el filtro Aston de $49 que importa en los niveles bajos deja de ser necesario aquí.</p>' +
    '<p>Sé claro con lo que no es. No es el U 87, no tiene el pico de presencia del U 87, y no te va a decir que tu mezcla está mal como parece hacer un micrófono de 3.000. Lo que hace es estar en la sala, grabar limpio y negarse a ser el motivo de que algo suene mal. En un estudio doméstico eso vale más que un nombre más grande.</p>',
  products: [674]
};

/* ── VEREDICTOS ── */
const veredictos = [
  {
    name: 'Universal Audio Apollo Twin X Gen 2', name_es: 'Universal Audio Apollo Twin X Gen 2', productId: 16,
    pros: [
      'Two Unison mic preamps — a reworked Apollo 6110 circuit — with Auto-Gain that sets your level for you',
      'UAD-2 DUO Core DSP on board: analogue modelling and compression happen before the converter, not after',
      'Thunderbolt 3 at 24-bit/192kHz, and it runs on Mac and Windows alike',
      'Ten inputs and six outputs, so instruments, monitors and a talkback mic all fit without a hub'
    ],
    cons: [
      'The bundled Essentials+ is not the full UAD catalog — the Neve and LA-2A emulations still need a card',
      'Thunderbolt only: on a USB-C laptop with no port, the reason to buy it disappears',
      'It is the single largest line in this guide, and it does nothing for the room',
      'Front-end quality is not a substitute for acoustic treatment — a clean preamp records the room exactly as faithfully as a dirty one'
    ],
    pros_es: [
      'Dos previos de micrófono Unison —un rediseño del circuito Apollo 6110— con Auto-Gain que ajusta el nivel por ti',
      'DSP UAD-2 DUO Core a bordo: el modelado analógico y la compresión ocurren antes del convertidor, no después',
      'Thunderbolt 3 a 24 bits/192 kHz, y funciona igual en Mac y en Windows',
      'Diez entradas y seis salidas, así que instrumentos, monitores y un micrófono de talkback caben sin un hub'
    ],
    cons_es: [
      'El Essentials+ incluido no es el catálogo completo de UAD: los emuladores de Neve y LA-2A siguen necesitando una tarjeta',
      'Solo Thunderbolt: en un portátil con USB-C y sin ese puerto, desaparece la razón para comprarlo',
      'Es la línea más cara de esta guía y no hace nada por la sala',
      'La calidad del frontal no sustituye el tratamiento acústico: un previo limpio graba la sala igual de fiel que uno sucio'
    ]
  },
  {
    name: 'Neumann TLM 102', name_es: 'Neumann TLM 102', productId: 674,
    pros: [
      'The only microphone here with a Neumann capsule on it, at a third of what the flagship costs',
      'Transformerless circuit: lower distortion and a wider response than the mics above it',
      'Integrated pop screen, so the $49 filter the lower tiers need stops being a purchase',
      '144 dB maximum SPL means you can record a cymbal crash from a foot away without thinking about it'
    ],
    cons: [
      'A gentle lift around 10 kHz adds air to a voice — on a bright mix that is one more thing to fight',
      '12 dB-A of self-noise is fine here and would not be in a treated commercial room',
      'No pattern switch and no polar options: cardioid only, so it will not help with a roomy acoustic guitar',
      'Needs 48V phantom, so it rules out a passive ribbon you might have wanted for the same voice'
    ],
    pros_es: [
      'El único micrófono de aquí con una cápsula Neumann, por un tercio de lo que cuesta el insignia',
      'Circuito sin transformador: menos distorsión y respuesta más ancha que los micrófonos de arriba',
      'Antipop integrado, así que el filtro de $49 que necesitan los niveles bajos deja de ser una compra',
      '144 dB de SPL máximo: grabas un crash a un palmo de distancia sin pensar en ello'
    ],
    cons_es: [
      'El realce suave alrededor de los 10 kHz le da aire a la voz, y en una mezcla brillante es una cosa más contra la que pelear',
      '12 dB-A de ruido propio van bien aquí y no irían en una sala comercial tratada',
      'Sin selector de patrón ni opciones polares: solo cardioide, así que no ayuda con una guitarra acústica reverberante',
      'Necesita phantom de 48V, así que descarta la cinta pasiva que igual querías para esa misma voz'
    ]
  }
];

/* ── APLICAR ── */
veredictos.forEach(v => {
  if (!guia.verdictProsCons.some(x => x.productId === v.productId)) { guia.verdictProsCons.push(v); log.push('veredicto += ' + v.productId); }
});
[16, 674].forEach(id => {
  if (!guia.featuredProducts.includes(id)) { guia.featuredProducts.push(id); log.push('featuredProducts += ' + id); }
});

// insertar secciones tras la de monitores (indice actual 5: rokit + jbl)
const iMon = guia.sections.findIndex(s => (s.heading_es || '').indexOf('Monitores en los tres niveles') > -1);
const pos = iMon > -1 ? iMon + 1 : 5;
guia.sections.splice(pos, 0, secUA, secTLM);
log.push('secciones insertadas en ' + pos + ' y ' + (pos + 1));

fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log(log.join('\n'));

const ids = [...new Set([].concat(...guia.sections.map(s => s.products || [])))];
console.log('\n=== CONTROL ===');
console.log('  productos en tarjetas: ' + ids.length);
console.log('  veredictos: ' + guia.verdictProsCons.length);
console.log('  featuredProducts: ' + guia.featuredProducts.length);
console.log('  4+4: ' + guia.verdictProsCons.filter(v => v.pros.length >= 4 && v.cons.length >= 4).length + '/' + guia.verdictProsCons.length);
[16, 674].forEach(id => console.log('  id ' + id + ': tarjeta=' + (guia.sections.some(s => (s.products || []).includes(id)) ? 'si' : 'NO') + ' veredicto=' + (guia.verdictProsCons.some(v => v.productId === id) ? 'si' : 'NO')));
console.log('  mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
