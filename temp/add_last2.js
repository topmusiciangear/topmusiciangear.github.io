const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const G = require(DIR + 'data/guides.json');
let g = G.find(x => x.id === 'best-interface');
g.sections.push({
  heading: 'Roland Bridge Cast X: A Closer Look',
  heading_es: 'Roland Bridge Cast X: análisis detallado',
  content: '<strong>The streaming interface for setups with a console, a PC and a camera at once.</strong> Dual-bus mixing separates the stream mix from the headphone mix, while XLR with phantom power, assignable control pads and voice processing cover the microphone side. Multiple USB-C and HDMI ports swallow consoles, PCs and cameras without a separate capture card.</p><p>Gamers and IRL creators juggling several sources get a single control surface instead of three boxes and a tangle of cables. Pure podcasters who only need two mics and a phone will find it oversized — this box earns its keep where video and multi-source audio collide.',
  content_es: '<strong>La interfaz de streaming para montajes con consola, PC y cámara a la vez.</strong> La mezcla de doble bus separa la mezcla del directo de la de auriculares, mientras el XLR con phantom, los pads asignables y el procesado de voz cubren el micro. Varios puertos USB-C y HDMI tragan consolas, PCs y cámaras sin capturadora aparte.</p><p>Gamers y creadores IRL malabareando fuentes consiguen una sola superficie de control en vez de tres cajas y un nudo de cables. Podcasters puros que solo necesitan dos micros y un teléfono la verán sobredimensionada — esta caja se gana el sueldo donde el vídeo y el audio multifuente chocan.',
  products: [240]
});
g = G.find(x => x.id === 'guitar-pedals');
g.sections.push({
  heading: 'Electro-Harmonix Nano Small Stone: A Closer Look',
  heading_es: 'Electro-Harmonix Nano Small Stone: análisis detallado',
  content: '<strong>Four stages of phase in a box smaller than a phone.</strong> The Nano shrinks the classic Small Stone circuit into a die-cast mini chassis with just Rate and Color: the switch flips between a subtle sweep and a resonant, chewy phase that defined countless psych and funk records. True bypass keeps the dry tone untouched.</p><p>Minimalism is the whole point and the only caveat — no depth knob, no stereo, no presets. For players who want that one liquid sweep on the board without dedicating real estate or mental bandwidth, nothing smaller does the job.',
  content_es: '<strong>Cuatro etapas de fase en una caja más pequeña que un teléfono.</strong> El Nano encoge el circuito clásico Small Stone a un chasis mini de fundición con solo Rate y Color: el interruptor alterna entre un barrido sutil y una fase resonante y masticable que definió infinidad de discos de psicodelia y funk. El true bypass deja intacto el tono directo.</p><p>El minimalismo es todo el argumento y la única pega — sin knob de profundidad, sin estéreo, sin presets. Para quien quiere ese barrido líquido en la pedalera sin dedicar espacio ni ancho de banda mental, nada más pequeño hace el trabajo.',
  products: [443]
});
fs.writeFileSync(DIR + 'data/guides.json', JSON.stringify(G, null, 2));
console.log('added 2');