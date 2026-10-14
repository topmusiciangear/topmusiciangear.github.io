const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const die = (m) => { console.log('!! ' + m); process.exit(1); };
const gj = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gj, 'utf8'));
const g = guides.find(x => x.id === 'streaming-interfaces');
if (g.sections.length !== 6) die('secciones inesperadas: ' + g.sections.length);

// 1. SEC0: "four units / two camps" -> siete en cuatro bandos
const s0 = g.sections[0];
const oEn = '<strong>The four units here fall into two camps.</strong> The Rodecaster Duo and Roland Bridge Cast X are all-in-one production consoles — they mix, process and route your stream with hardware controls and a touchscreen or pads. The Audient EVO 4 and Universal Audio Volt 276 are classic audio interfaces — compact units that focus on clean preamps and, in the Volt\'s case, analog compression the way in. Decide which camp matches how you create.';
if (!s0.content.includes(oEn)) die('SEC0 EN no coincide');
s0.content = s0.content.split(oEn).join('<strong>The seven here fall into four camps.</strong> The Rodecaster Duo and Roland Bridge Cast X are all-in-one production consoles — they mix, process and route your stream with hardware controls and a touchscreen or pads. The Yamaha URX44V is the streaming hub with HDMI capture and multitrack backup. The Zoom PodTrak P4next is the portable recorder with battery power. The Audient EVO 4, Universal Audio Volt 276 and Scarlett 2i2 are classic audio interfaces — compact units that focus on clean preamps and, in the Volt\'s case, analog compression the way in. Decide which camp matches how you create.');
const oEs = '<strong>Los cuatro aparatos de aquí caen en dos bandos.</strong> El Rodecaster Duo y el Roland Bridge Cast X son consolas de producción todo-en-uno — mezclan, procesan y enrutan tu directo con controles físicos y una pantalla táctil o pads. El Audient EVO 4 y el Universal Audio Volt 276 son interfaces de audio clásicas — unidades compactas centradas en previos limpios y, en el caso del Volt, en la compresión analógica a la entrada. Decide qué bando coincide con cómo creas.';
if (!s0.content_es.includes(oEs)) die('SEC0 ES no coincide');
s0.content_es = s0.content_es.split(oEs).join('<strong>Los siete de aquí caen en cuatro bandos.</strong> El Rodecaster Duo y el Roland Bridge Cast X son consolas de producción todo-en-uno — mezclan, procesan y enrutan tu directo con controles físicos y una pantalla táctil o pads. La Yamaha URX44V es el hub de streaming con captura HDMI y respaldo multipista. El Zoom PodTrak P4next es la grabadora portátil con batería. El Audient EVO 4, el Universal Audio Volt 276 y la Scarlett 2i2 son interfaces de audio clásicas — unidades compactas centradas en previos limpios y, en el caso del Volt, en la compresión analógica a la entrada. Decide qué bando coincide con cómo creas.');
console.log('SEC0 actualizado a 7 productos');

// 2. Dos secciones nuevas al final
g.sections.push({
  heading: 'Is the Audient EVO 4 the Best Budget Streaming Interface?',
  heading_es: '¿Es el Audient EVO 4 la mejor interfaz económica para streaming?',
  products: [262],
  content: '<p><strong>The Audient EVO 4 is the budget streamer that sets its own levels.</strong> Two EVO pres with 58 dB gain and phantom, Smartgain auto-leveling, loopback for OBS and a JFET instrument input — all bus-powered over USB-C in a box that fits a laptop bag.</p><p><strong>The honest trade.</strong> 58 dB runs an SM7B near maximum with audible noise, two inputs cap you at two mics, and loopback routing lives in software. For voice plus game audio on a budget near $129–$179, it is the smart start.</p>',
  content_es: '<p><strong>El Audient EVO 4 es el streamer económico que se ajusta solo.</strong> Dos previos EVO con 58 dB y phantom, Smartgain automático, loopback para OBS y entrada de instrumento JFET — todo por USB-C en una caja que cabe en la mochila del portátil.</p><p><strong>Lo honesto.</strong> Con 58 dB un SM7B trabaja casi al máximo con ruido audible, dos entradas te limitan a dos micros y el loopback vive en software. Para voz más juego con poco presupuesto por $129–$179, es el inicio inteligente.</p>'
});
g.sections.push({
  heading: 'Is the Universal Audio Volt 276 the Best Analog Voice Channel?',
  heading_es: '¿Es el Universal Audio Volt 276 el mejor canal de voz analógico?',
  products: [263],
  content: '<p><strong>The Volt 276 puts real analog hardware in a USB interface.</strong> Two pres with Vintage mode for 610 tube tone, a built-in 76 compressor in the 1176 tradition, 24-bit/192 kHz conversion, MIDI I/O and a strong headphone amp — tracking with finished-sounding voice and zero plugins.</p><p><strong>The honest trade.</strong> The 76 runs fixed presets with no attack or release tweaking, 55 dB of gain wants efficient mics, and two inputs end the story at duets. For streamers who want analog polish on the way in near ~$299, it earns it.</p>',
  content_es: '<p><strong>El Volt 276 mete hardware analógico real en una interfaz USB.</strong> Dos previos con modo Vintage para tono de tubo 610, compresor 76 integrado en la tradición 1176, conversión 24 bits/192 kHz, MIDI y un ampli de auriculares serio — grabar con voz casi mezclada y cero plugins.</p><p><strong>Lo honesto.</strong> El 76 corre presets fijos sin ataque ni release ajustables, sus 55 dB piden micros eficientes y dos entradas cierran la historia en dúos. Para streamers que quieren pulido analógico a la entrada por ~$299, lo justifica.</p>'
});
fs.writeFileSync(gj, JSON.stringify(guides, null, 2));

// Verificacion
console.log('secciones:', g.sections.length);
const heads = g.sections.map(s => s.heading);
console.log('duplicados:', heads.filter((x, i, a) => a.indexOf(x) !== i).length);
console.log('sin ES:', g.sections.filter(s => !s.heading_es || !s.content_es).length);
console.log('productos cubiertos:', [...new Set(g.sections.flatMap(s => s.products || []))].sort().join(','));
