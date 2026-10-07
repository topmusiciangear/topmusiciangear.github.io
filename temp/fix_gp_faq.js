const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const G = JSON.parse(fs.readFileSync(DIR + 'data/guides.json', 'utf8'));
const g = G.find(v => v.id === 'guitar-pedals');
function rep1(txt, from, to) {
  const c = txt.split(from).length - 1;
  if (c !== 1) throw new Error('found ' + c + 'x: ' + from.slice(0, 70));
  return txt.split(from).join(to);
}
let t = JSON.stringify(g);
// TU-3 pro: True bypass -> Buffered
t = rep1(t, '"True bypass and a mute function for silent tuning"', '"Buffered bypass and a mute function for silent tuning"');
t = rep1(t, '"True bypass y funci\u00f3n de silencio para afinar sin sonido"', '"Buffered bypass y funci\u00f3n de silencio para afinar sin sonido"');
// GCB95 pro: Italian components -> industry standard
t = rep1(t, '"Same design and components as the legendary 1970s Italian Crybabies"', '"The undisputed industry standard for price-quality"');
t = rep1(t, '"El mismo dise\u00f1o y componentes que los legendarios Crybabies italianos de los 70"', '"El est\u00e1ndar indiscutible por calidad-precio"');
// HoF2 pro: Bluetooth app -> pickups/USB
t = rep1(t, '"TonePrint Bluetooth app loads signature sounds from your favorite guitarists"', '"TonePrint app loads signature sounds via pickups or USB"');
t = rep1(t, '"La app Bluetooth TonePrint carga sonidos caracter\u00edsticos de tus guitarristas favoritos"', '"La app TonePrint carga sonidos por pastillas o USB"');
// Phase95: Stock->Block, speed fixed->mix/depth
t = rep1(t, '"Script and Stock modes for vintage or modern phase tones"', '"Script and Block modes for vintage or modern phase tones"');
t = rep1(t, '"Modos Script y Stock para tonos de fase vintage o modernos"', '"Modos Script y Block para tonos de fase vintage o modernos"');
t = rep1(t, 'No speed or depth knob — rate is fixed per mode', 'No mix or depth controls — speed only');
t = rep1(t, 'Sin perilla de velocidad o profundidad — la velocidad está fija por modo', 'Sin controles de mezcla ni profundidad — solo velocidad');
console.log('verdicts fixed');
// FAQ rewrite (user texts, typo fixed)
const F = JSON.parse(t).featuredSnippet;
const fq = (k, to) => { if (!(k in F)) throw new Error('no key ' + k); F[k] = to; };
fq('faq_a1_en', 'Yes, it is the most famous overdrive ever built. The Ibanez TS9 Tube Screamer pushes tube amps into sweet saturation with its mid-humped EQ while tightening the lows. Its ability to boost an already-overdriven amp is why it sits on more pro pedalboards than any other pedal.');
fq('faq_a1_es', 'Sí, es el overdrive más famoso jamás construido. El Ibanez TS9 Tube Screamer empuja los amplis de válvulas a una saturación dulce con su EQ de medios realzados mientras aprieta los graves. Su capacidad como boost sobre un ampli ya saturado lo pone en más pedaleras pro que ningún otro.');
fq('faq_a2_en', 'Yes, it is the most versatile compact delay you can buy. The Boss DD-8 packs 11 advanced delay modes, from analog and tape emulations to modern modulation and shimmer. If you want one delay that reliably covers live rhythm and studio textures, the DD-8 is the safest pick.');
fq('faq_a2_es', 'Sí, es el delay compacto más versátil que puedes comprar. El Boss DD-8 incluye 11 modos avanzados, de emulaciones analógicas y de cinta a modulación moderna y shimmer. Si quieres un solo delay que cubra con fiabilidad rítmica de directo y texturas de estudio, el DD-8 es la opción más segura.');
fq('faq_a3_en', 'Yes, it is the undisputed industry standard. The Boss TU-3 tunes fast and accurately under pressure, and its rugged buffered bypass keeps signal bright through long cables and complex boards.');
fq('faq_a3_es', 'Sí, es el estándar indiscutible de la industria. El Boss TU-3 afina rápido y preciso bajo presión, y su robusto bypass con buffer mantiene la señal brillante en cables largos y pedaleras complejas.');
fq('faq_a4_en', 'Yes, if you want the classic wah sound of rock history. The Dunlop Crybaby GCB95 defined dynamic foot-controlled filtering. Its die-cast build and iconic sweep make it the mandatory reference for 60s and 70s tones.');
fq('faq_a4_es', 'Sí, si quieres el wah clásico de la historia del rock. El Dunlop Crybaby GCB95 definió el filtrado dinámico a pedal. Su chasis de fundición y barrido icónico lo hacen referencia obligada para tonos 60s y 70s.');
fq('faq_a5_en', 'Yes, it leads compact reverbs on flexibility. The TC Electronic Hall of Fame 2 offers 10 high-definition algorithms plus TonePrint transfer. Its pressure-sensitive MASH switch controls depth in real time, ideal for expanding ambience in a small chassis.');
fq('faq_a5_es', 'Sí, lidera los reverbs compactos en flexibilidad. El TC Electronic Hall of Fame 2 ofrece 10 algoritmos en alta definición más transferencia TonePrint. Su MASH sensible a la presión controla la profundidad en tiempo real, ideal para expandir ambientes en chasis pequeño.');
fq('faq_a6_en', 'Yes, it is one of the most revered analog circuits. The Electro-Harmonix Nano Small Stone delivers that liquid four-stage phase shift. Its minimal one-knob plus color-switch design goes from subtle funk swirl to intense psychedelic sweep.');
fq('faq_a6_es', 'Sí, es uno de los circuitos analógicos más reverenciados. El Electro-Harmonix Nano Small Stone entrega ese cambio de fase líquido de cuatro etapas. Su diseño mínimo de una perilla más selector de color va de remolino funk sutil a barrido psicodélico intenso.');
console.log('FAQ rewritten');
let o = JSON.parse(t);
o.featuredSnippet = F;
G[G.findIndex(v => v.id === 'guitar-pedals')] = o;
fs.writeFileSync(DIR + 'data/guides.json', JSON.stringify(G, null, 2) + '\n');
console.log('guides.json written');
