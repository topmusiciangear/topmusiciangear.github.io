const fs = require('fs');
const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const g = G.find(x => x.id === 'budget-interfaces');
const V = (value, value_es) => ({ value, value_es });

// ---- 1. Fix garbled Volt 2 text (76 compressor is Volt 276-only) ----
const v2sec = g.sections.find(s => (s.products || []).includes(55));
v2sec.content = v2sec.content.split('The no 76 compressor (Volt 276 only) (modeled after the iconic UA 1176) adds instant punch to vocals and instruments.').join('The 76 compressor lives on the Volt 276, not here (modeled after the iconic UA 1176) — it adds instant punch to vocals and instruments.');
v2sec.content_es = v2sec.content_es.split('El compresor 76 incorporado (basado en el icónico UA 1176) añade pegada instantánea a voces e instrumentos.').join('El compresor 76 vive en la Volt 276, no aquí (basado en el icónico UA 1176) — añade pegada instantánea a voces e instrumentos.');

// ---- 2. Append 3 new sections ----
g.sections.push(
  {
    heading: 'Is the Behringer UMC1820 the Best Interface for Recording a Full Band?',
    heading_es: '¿Es la Behringer UMC1820 la mejor interfaz para grabar una banda completa?',
    content: '<strong>Eight MIDAS-designed preamps, 18 inputs and 20 outputs for $229 street — nothing else under $300 gets close on channel count.</strong> Eight XLR/TRS combos with +48V run through 24-bit/96kHz converters, plus ADAT + S/PDIF + S/MUX digital I/O and MIDI I/O. Pair the ADAT input with an ADA8200 and you have 16 MIDAS preamps for full drums. Dual phones outputs with Monitor A/B cueing feed separate mixes. Real tradeoffs: 96kHz max (no 192), USB 2.0 Type-B, and a 1U rack box — not a desktop unit.',
    content_es: '<strong>Ocho previos diseño MIDAS, 18 entradas y 20 salidas por $229 de calle — nada más bajo $300 se acerca en canales.</strong> Ocho combos XLR/TRS con +48V por conversores 24-bit/96kHz, más E/S digital ADAT + S/PDIF + S/MUX y MIDI I/O. Empareja la entrada ADAT con un ADA8200 y tienes 16 previos MIDAS para una batería completa. Doble salida de auriculares con cue Monitor A/B para mezclas separadas. Concesiones reales: 96kHz máximo (sin 192), USB 2.0 Tipo-B y caja rack 1U — no es unidad de escritorio.',
    products: [550]
  },
  {
    heading: 'Is the Universal Audio Volt 276 Worth $110 More Than the Volt 2?',
    heading_es: '¿Vale la pena la Universal Audio Volt 276 por $110 más que la Volt 2?',
    content: '<strong>Same Vintage 610 preamp as the Volt 2, plus a real analog 76 compressor (1176-inspired) with VOC, GTR and FAST presets — $299 street.</strong> Press the 76 button to cycle VOC (slow attack, smooth vocals), GTR (medium attack, longer sustain) or FAST (aggressive limiting); all analog, zero latency, printed before conversion. Same 24-bit/192kHz conversion, MIDI I/O and iOS support as the Volt 2. Buy the Volt 2 if you mix with plugins; buy the 276 if you want finished-sounding vocals going in.',
    content_es: '<strong>Mismo previo Vintage 610 que la Volt 2, más compresor analógico 76 real (inspirado en 1176) con presets VOC, GTR y FAST — $299 de calle.</strong> Pulsa el botón 76 para ciclar VOC (ataque lento, voces suaves), GTR (ataque medio, más sustain) o FAST (limitación agresiva); todo analógico, cero latencia, impreso antes de la conversión. Misma conversión 24-bit/192kHz, MIDI I/O y soporte iOS que la Volt 2. Compra la Volt 2 si mezclas con plugins; compra la 276 si quieres voces con sonido terminado desde la entrada.',
    products: [263]
  },
  {
    heading: 'Is the Arturia MiniFuse 2 the Best Interface for Laptop Producers?',
    heading_es: '¿Es la Arturia MiniFuse 2 la mejor interfaz para productores con laptop?',
    content: '<strong>Two preamps, 192kHz, a rear USB-A hub that saves a laptop port, and the strongest software bundle under $150 — $149 street.</strong> 110dB dynamic range with 5-pin DIN MIDI I/O and a stereo loopback channel for creators. The hub powers MIDI controllers up to 250mA straight from the interface. The bundle (Ableton Live Lite, Analog Lab Intro, 4 Arturia FX, Auto-Tune 3-mo, Guitar Rig 6 LE, Splice 3-mo) beats every basic pack in this guide for electronic and urban producers. Only 2 inputs — bands need the UMC1820 instead.',
    content_es: '<strong>Dos previos, 192kHz, hub USB-A trasero que ahorra un puerto del laptop y la mejor suite de software bajo $150 — $149 de calle.</strong> 110dB de rango dinámico con MIDI DIN 5 pines y canal loopback estéreo para creadores. El hub alimenta controladores MIDI hasta 250mA directo de la interfaz. La suite (Ableton Live Lite, Analog Lab Intro, 4 FX Arturia, Auto-Tune 3 meses, Guitar Rig 6 LE, Splice 3 meses) supera a todos los paquetes básicos de esta guía para productores electrónicos y urbanos. Solo 2 entradas — las bandas necesitan la UMC1820.',
    products: [551]
  }
);

// ---- 3. featuredProducts ----
g.featuredProducts = [15, 54, 55, 18, 53, 262, 263, 550, 551];

// ---- 4. productTable: 3 new columns ----
g.productTable.columns.push(
  { title: 'Behringer U-Phoria UMC1820', title_es: 'Behringer U-Phoria UMC1820' },
  { title: 'Universal Audio Volt 276', title_es: 'Universal Audio Volt 276' },
  { title: 'Arturia MiniFuse 2, Black', title_es: 'Arturia MiniFuse 2, Negro' }
);
const setRow = (label, enArr, esArr) => {
  const r = g.productTable.rows.find(x => x.label === label);
  enArr.forEach((en, i) => r.values.push(V(en, esArr[i])));
};
setRow('Best For',
  ['Multi-mic drums and bands on a budget', 'Finished vocals with analog compression', 'Laptop producers needing hub plus software'],
  ['Baterías y bandas multimicro con presupuesto', 'Voces terminadas con compresión analógica', 'Productores con laptop que necesitan hub más software']);
setRow('Type',
  ['Audio interface', 'Audio interface', 'Audio interface'],
  ['Interfaz de audio', 'Interfaz de audio', 'Interfaz de audio']);
setRow('Inputs / Outputs',
  ['18-in / 20-out (+ ADAT)', '2-in / 2-out', '2-in / 2-out'],
  ['18 entradas / 20 salidas (+ ADAT)', '2 entradas / 2 salidas', '2 entradas / 2 salidas']);
setRow('Preamps',
  ['8, MIDAS-designed', '2, Vintage 610 plus 76 comp', '2'],
  ['8, diseño MIDAS', '2, Vintage 610 más comp 76', '2']);
setRow('Sample Rate',
  ['96 kHz', '192 kHz', '192 kHz'],
  ['96 kHz', '192 kHz', '192 kHz']);
setRow('Bit Depth',
  ['24-bit', '24-bit', '24-bit'],
  ['24 bits', '24 bits', '24 bits']);
setRow('Connectivity',
  ['USB 2.0 (Type-B)', 'USB-C', 'USB-C plus USB-A hub'],
  ['USB 2.0 (Tipo-B)', 'USB-C', 'USB-C más hub USB-A']);
setRow('Special Features',
  ['ADAT expandable to 16 pres', 'Analog 76 compressor (VOC/GTR/FAST)', 'USB hub plus 4 Arturia FX plus loopback'],
  ['Expansible ADAT a 16 previos', 'Compresor analógico 76 (VOC/GTR/FAST)', 'Hub USB más 4 FX Arturia más loopback']);

// ---- 5. verdictProsCons 4+4 ----
const VD = (name, pros, cons, pros_es, cons_es) => ({ name, name_es: name, pros, cons, pros_es, cons_es });
g.verdictProsCons.push(
  VD('Behringer U-Phoria UMC1820',
    ['Eight MIDAS-designed preamps with 18-in/20-out for $229 street', 'ADAT input pairs with an ADA8200 for 16 MIDAS preamps total', 'Dual phones outputs with Monitor A/B cueing feed separate mixes', 'MIDI plus S/PDIF plus ADAT/S/MUX all usable at once'],
    ['96kHz max while every rival here does 192kHz', 'USB 2.0 Type-B cable, no USB-C', '1U rack format instead of a desktop unit', 'Behringer drivers trail Focusrite and MOTU polish'],
    ['Ocho previos diseño MIDAS con 18 entradas/20 salidas por $229 de calle', 'La entrada ADAT se empareja con un ADA8200 para 16 previos MIDAS en total', 'Doble salida de auriculares con cue Monitor A/B para mezclas separadas', 'MIDI más S/PDIF más ADAT/S/MUX utilizables a la vez'],
    ['96kHz máximo mientras cada rival aquí hace 192kHz', 'Cable USB 2.0 Tipo-B, sin USB-C', 'Formato rack 1U en vez de unidad de escritorio', 'Los drivers Behringer van detrás del pulido Focusrite y MOTU']),
  VD('Universal Audio Volt 276',
    ['Real analog 76 compressor, not a plugin, printed before conversion', 'VOC/GTR/FAST presets with published attack/release timings', 'Same Vintage 610 preamp plus 192kHz plus MIDI as the Volt 2', 'Finished-sounding vocals with zero latency going in'],
    ['$299 costs $110 more than the Volt 2 for one extra circuit', 'Still only 2 inputs with no room to grow', '55dB gain trails the Scarlett 4th Gen at 69dB', 'Fixed compressor presets, no full attack/release knobs'],
    ['Compresor analógico 76 real, no un plugin, impreso antes de la conversión', 'Presets VOC/GTR/FAST con tiempos de ataque/release publicados', 'Mismo previo Vintage 610 más 192kHz más MIDI que la Volt 2', 'Voces con sonido terminado y cero latencia desde la entrada'],
    ['$299 cuesta $110 más que la Volt 2 por un solo circuito extra', 'Sigue con solo 2 entradas sin margen para crecer', '55dB de ganancia por detrás de los 69dB de la Scarlett 4th Gen', 'Presets fijos de compresor, sin perillas completas de ataque/release']),
  VD('Arturia MiniFuse 2, Black',
    ['Rear USB-A hub saves a laptop port and powers MIDI gear to 250mA', 'Best software bundle under $150: Live Lite, Analog Lab Intro, 4 Arturia FX, Guitar Rig, Auto-Tune, Splice', '110dB dynamic range with 192kHz conversion', 'Stereo loopback plus DIN MIDI for creators and streamers'],
    ['Only 2 inputs with no ADAT expansion path', 'Hub capped at 250mA will not feed hungry devices', 'No onboard compression or DSP character (Volt 276 territory)', 'Backlit knobs but no metering display like the MOTU M2 LCD'],
    ['El hub USB-A trasero ahorra un puerto del laptop y alimenta MIDI hasta 250mA', 'Mejor suite de software bajo $150: Live Lite, Analog Lab Intro, 4 FX Arturia, Guitar Rig, Auto-Tune, Splice', '110dB de rango dinámico con conversión 192kHz', 'Loopback estéreo más MIDI DIN para creadores y streamers'],
    ['Solo 2 entradas sin ruta de expansión ADAT', 'Hub limitado a 250mA no alimenta dispositivos exigentes', 'Sin compresión a bordo ni carácter DSP (territorio Volt 276)', 'Perillas retroiluminadas pero sin pantalla de medición como el LCD de la MOTU M2'])
);

// ---- 6. conclusion / verdict ----
g.conclusion = g.conclusion
  .split('Any of these will serve you well — I\'ve worked with each one and they all deliver pro results.')
  .join('Need channels? The UMC1820 packs eight MIDAS pres plus ADAT for $229. Want analog squeeze on the way in? The Volt 276. Producing on a laptop? The MiniFuse 2 hub and software bundle. Any of these will serve you well — I\'ve worked with each one and they all deliver pro results.');
g.conclusion_es = g.conclusion_es
  .split('No puedes equivocarte con ninguna de estas — he trabajado con cada una y todas dan resultados profesionales.')
  .join('¿Necesitas canales? La UMC1820 mete ocho previos MIDAS más ADAT por $229. ¿Quieres compresión analógica en la entrada? La Volt 276. ¿Produces en laptop? El hub y la suite de la MiniFuse 2. No puedes equivocarte con ninguna de estas — he trabajado con cada una y todas dan resultados profesionales.');
g.verdict = g.verdict + ' More mics? UMC1820. Analog squeeze? Volt 276. Laptop hub plus plugins? MiniFuse 2.';
g.verdict_es = g.verdict_es + ' ¿Más micros? UMC1820. ¿Compresión analógica? Volt 276. ¿Hub para laptop más plugins? MiniFuse 2.';

// ---- 7. description EN glitch ----
g.description = g.description.split('I tested the sub- class').join('I tested the sub-$300 class');

// ---- 8. featuredSnippet FAQs q6+q7 ----
const fsn = g.featuredSnippet;
fsn.faq_q6_en = 'Volt 2 or Volt 276: which should you buy?';
fsn.faq_a6_en = 'Buy the Volt 2 ($189) if you mix with plugins — same Vintage 610 preamp for less. Buy the Volt 276 ($299) if you want vocals that sound finished going in: its analog 76 compressor (VOC/GTR/FAST presets) prints 1176-style control with zero latency.';
fsn.faq_q6_es = '¿Volt 2 o Volt 276: cuál deberías comprar?';
fsn.faq_a6_es = 'Compra la Volt 2 ($189) si mezclas con plugins — mismo previo Vintage 610 por menos. Compra la Volt 276 ($299) si quieres voces con sonido terminado desde la entrada: su compresor analógico 76 (presets VOC/GTR/FAST) imprime control estilo 1176 con cero latencia.';
fsn.faq_q7_en = 'What is the cheapest interface for recording drums?';
fsn.faq_a7_en = 'The Behringer UMC1820 ($229): eight MIDAS-designed preamps and 18-in/20-out with ADAT, expandable to 16 preamps with an ADA8200. No other interface under $300 gives you that many simultaneous mic inputs.';
fsn.faq_q7_es = '¿Cuál es la interfaz más barata para grabar baterías?';
fsn.faq_a7_es = 'La Behringer UMC1820 ($229): ocho previos diseño MIDAS y 18 entradas/20 salidas con ADAT, expansible a 16 previos con un ADA8200. Ninguna otra interfaz bajo $300 te da tantas entradas de micro simultáneas.';

fs.writeFileSync('data/guides.json', JSON.stringify(G, null, 2));
console.log('guide patched: sections=' + g.sections.length + ' cols=' + g.productTable.columns.length + ' verdicts=' + g.verdictProsCons.length);