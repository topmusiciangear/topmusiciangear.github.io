const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const G = JSON.parse(fs.readFileSync(DIR + 'data/guides.json', 'utf8'));
const g = G.find(v => v.id === 'best-multi-effects-pedals');
if (!g) throw new Error('guide not found');

const SEC = (heading, heading_es, content, content_es, products) => ({ heading, heading_es, content, content_es, products });

g.sections.push(SEC(
  'Is the Zoom G11 the Best Pedal for Your Pedalboard?',
  '¿Es el Zoom G11 el mejor pedal para tu pedalera?',
  '<strong>If you want a full stage rig with a big touchscreen and deep routing, the G11 is Zoom\u2019s flagship floor unit.</strong> The 5-inch color display lets you drag and drop an amp plus up to nine effects, with 240 patches, dual send/return loops and 5-pin MIDI for complex rigs. The 5-minute stereo looper and 68 rhythm patterns turn it into a practice and songwriting station, and USB audio covers direct recording. It is for players who want an all-in-one floorboard with room to grow. Check the footprint on your board and that you are happy with menu-assisted editing.',
  '<strong>Si quieres un sistema completo de escenario con pantalla grande y ruteo profundo, el G11 es la unidad insignia de Zoom.</strong> La pantalla a color de 5 pulgadas deja arrastrar un ampli más hasta nueve efectos, con 240 patches, dos bucles de envío/retorno y MIDI de 5 pines para sistemas complejos. El looper estéreo de cinco minutos y los 68 patrones de ritmo lo convierten en estación de práctica y composición, y el USB cubre la grabación directa. Es para quienes quieren una pedalera todo-en-uno con margen para crecer. Revisa su tamaño en tu pedalera y que te encaje la edición asistida por menús.',
  [577]
));
g.sections.push(SEC(
  'Is the Boss GT-1000CORE the Best Pedal for Your Pedalboard?',
  '¿Es el Boss GT-1000CORE el mejor pedal para tu pedalera?',
  '<strong>If you want flagship Boss tone in the smallest possible box, the GT-1000CORE squeezes the whole GT engine into a stompbox.</strong> Up to 24 simultaneous effects blocks with AIRD amp modeling, 250 user patches and 16 user IR slots cover stage and studio, with dual FX loops, TRS MIDI and USB audio/MIDI for integration and re-amping. Switching between Memory and Manual modes recalls presets or toggles effects like individual pedals. It is for players who build complex chains in minimal space. Check that you are comfortable with compact controls and small-screen editing.',
  '<strong>Si quieres el tono insignia de Boss en la caja más pequeña posible, el GT-1000CORE mete todo el motor GT en un stompbox.</strong> Hasta 24 bloques simultáneos con modelado AIRD, 250 patches de usuario y 16 ranuras de IR cubren directo y estudio, con dos bucles de efectos, MIDI TRS y audio/MIDI USB para integrar y reampear. Alternar entre modos Memory y Manual recuerda presets o activa efectos como pedales sueltos. Es para quienes construyen cadenas complejas en mínimo espacio. Asegúrate de que te van bien los controles compactos y editar en pantalla pequeña.',
  [578]
));
g.sections.push(SEC(
  'Is the Neural DSP Quad Cortex the Best Pedal for Your Pedalboard?',
  '¿Es el Neural DSP Quad Cortex el mejor pedal para tu pedalera?',
  '<strong>If you want to clone your own amps and carry them in a compact floorboard, the Quad Cortex is built around Neural Capture.</strong> The 2GHz quad-core DSP runs amp and effect models plus your own captures, edited on a 7-inch multi-touch display with eleven stomp+rotary actuators. WiFi sharing, plugin integration and USB audio cover studio and stage, with dual expression inputs and full MIDI for control. It is for players who want one premium brain for every rig. Check the price jump over mid-range units and that you will use the capture workflow.',
  '<strong>Si quieres clonar tus propios amplis y llevarlos en una pedalera compacta, el Quad Cortex gira en torno a Neural Capture.</strong> El DSP quad-core a 2 GHz mueve modelos de amplis y efectos más tus capturas, editados en pantalla multitáctil de 7 pulgadas con once actuadores stomp+rotary. Nube por WiFi, integración de plugins y USB cubren estudio y directo, con dos entradas de expresión y MIDI total para controlar. Es para quienes quieren un único cerebro premium para todo. Valora el salto de precio frente a gamas medias y que vayas a usar el flujo de capturas.',
  [579]
));
g.sections.push(SEC(
  'Is the Mooer GE300 the Best Pedal for Your Pedalboard?',
  '¿Es el Mooer GE300 el mejor pedal para tu pedalera?',
  '<strong>If you want amp modeling plus a synth engine and sampling tricks at a lower price, the GE300 packs Mooer\u2019s flagship toolset.</strong> 108 amp models, 164 effects and 43 cab models run on dual DSP, with Tone Capture for sampling your own gear and a tri-voice synth that needs no special pickup. The 30-minute looper with undo/redo and reverse covers practice and writing, and USB audio handles direct recording. It is for tweakers who want maximum features per dollar. Check the smaller community and preset cloud versus bigger brands.',
  '<strong>Si quieres modelado más motor de sinte y trucos de muestreo a menor precio, el GE300 reúne lo mejor de Mooer.</strong> 108 modelos de ampli, 164 efectos y 43 pantallas corren en doble DSP, con Tone Capture para muestrear tu equipo y sinte de tres voces sin pastilla especial. El looper de 30 minutos con undo/redo y reverse cubre práctica y composición, y el USB graba directo. Es para trasteadores que quieren máximas funciones por euro. Ten en cuenta la comunidad menor frente a marcas grandes.',
  [580]
));
console.log('4 sections added');

g.featuredProducts = [202, 203, 204, 205, 577, 578, 579, 580];
console.log('featured extended');

// Verified spec corrections in table + verdicts
function rep1(txt, from, to) {
  const c = txt.split(from).length - 1;
  if (c !== 1) throw new Error('found ' + c + 'x: ' + from.slice(0, 70));
  return txt.split(from).join(to);
}
let t = JSON.stringify(g);
function repN(txt, from, to, n) {
  const c = txt.split(from).length - 1;
  if (c !== n) throw new Error('found ' + c + 'x (expected ' + n + '): ' + from.slice(0, 70));
  return txt.split(from).join(to);
}
// G11: real dims 495x253x64 (Zoom official), 5-min looper (Zoom/zzounds/G4M)
t = repN(t, '273 x 164 x 60 mm', '495 x 253 x 64 mm', 2);
t = rep1(t, 'Looper 45 sec, 68 rhythm patterns', '5-minute looper, 68 rhythm patterns');
t = rep1(t, 'Looper 45 seg, 68 patrones ritmo', 'Looper de 5 min, 68 patrones ritmo');
// QC: 11 actuators + 7in display, dims 290x190x49 (Neural/G4M/zzounds)
t = rep1(t, '3 footswitches + rotary + touchscreen', '11 footswitches + rotary + 7\\" touchscreen');
t = rep1(t, '3 footswitches + rotary + táctil', '11 footswitches + rotary + táctil 7\\"');
t = repN(t, '225 x 130 x 55 mm', '290 x 190 x 49 mm', 2);
// GE300: 5in display, 108+164 (Mooer official/G4M)
t = rep1(t, '180+ amps/FX, 4.3\\" touchscreen, IR loader', '108 amps + 164 FX, 5\\" touchscreen, IR loader');
t = rep1(t, '180+ amps/FX, 4.3\\" táctil, cargador IR', '108 amps + 164 FX, táctil 5\\", cargador IR');
t = rep1(t, '180+ amps/FX, 4.3\\" touchscreen', '108 amps + 164 FX, 5\\" touchscreen');
t = rep1(t, '180+ amps/FX, 4.3\\" táctil', '108 amps + 164 FX, táctil 5\\"');
G[G.findIndex(v => v.id === 'best-multi-effects-pedals')] = JSON.parse(t);
console.log('spec corrections applied');

fs.writeFileSync(DIR + 'data/guides.json', JSON.stringify(G, null, 2) + '\n');
console.log('guides.json written');
