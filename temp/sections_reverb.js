const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const G = JSON.parse(fs.readFileSync(DIR + 'data/guides.json', 'utf8'));
const g = G.find(v => v.id === 'best-reverb-delay');
if (!g) throw new Error('guide not found');

const RH = (oldEn, newEn, oldEs, newEs) => {
  const sec = g.sections.find(s => s.heading === oldEn);
  if (!sec) throw new Error('heading not found: ' + oldEn);
  sec.heading = newEn;
  const secEs = g.sections.find(s => s.heading_es === oldEs);
  if (!secEs) throw new Error('heading_es not found: ' + oldEs);
  secEs.heading_es = newEs;
};
RH('Is the Boss RC-5 Loop Station the Best Looper for Your Pedalboard?', 'Bonus Looping: RC-5 Loop Station',
  '¿Es el Boss RC-5 Loop Station el mejor looper para tu pedalera?', 'Extra para loopear: RC-5 Loop Station');
RH('Is the Boss DD-8 Digital Delay the Best Pedal for Your Pedalboard?', 'Eleven Delays, One Compact Box: DD-8',
  '¿Es el Boss dD-8 digital delay el mejor pedal para tu pedalera?', 'Once delays en caja compacta: DD-8');
RH('Is the TC Electronic Hall of Fame 2 the Best Pedal for Your Pedalboard?', 'MASH Footswitch Magic: Hall of Fame 2',
  '¿Es el TC electronic hall of fame 2 el mejor pedal para tu pedalera?', 'Magia del footswitch MASH: Hall of Fame 2');
RH('Is the Strymon BigSky MX the Best Pedal for Your Pedalboard?', 'The Reverb Benchmark: BigSky MX',
  '¿Es el Strymon bigSky mX el mejor pedal para tu pedalera?', 'La referencia en reverb: BigSky MX');
console.log('existing headings rewritten');

const SEC = (heading, heading_es, content, content_es, products) => ({ heading, heading_es, content, content_es, products });
g.sections.push(SEC(
  'Twelve Machines, Endless Echoes: TimeLine',
  'Doce máquinas, ecos infinitos: TimeLine',
  '<strong>Studio-class stereo delay means twelve machines, not one trick: the TimeLine covers tape, analog, digital and weird.</strong> 200 presets, 30-second stereo looper routable pre or post, full MIDI and expression input shape every repeat. It is for delay tweakers who program sounds for songs. Just note the size and the learning curve of deep menus.',
  '<strong>Delay estéreo de clase estudio son doce máquinas, no un truco: el TimeLine cubre tape, analógico, digital y rarezas.</strong> 200 presets, looper estéreo de 30 segundos antes o después, MIDI total y expresión moldean cada repetición. Es para trasteadores del delay que programan sonidos por tema. Solo cuenta con su tamaño y la curva de menús profundos.',
  [591]
));
g.sections.push(SEC(
  'Design Your Own Delay: Meris LVX',
  'Diseña tu propio delay: Meris LVX',
  '<strong>Preset delay types bore you? The LVX hands you processing blocks to wire your own.</strong> A 60-second stereo looper, 99 presets, color-screen UI, MIDI and expression control plus premium analog path reward experimenters. It is for sound designers who build delays from scratch. Just expect a steeper learning curve than knob-per-function pedals.',
  '<strong>¿Te aburren los tipos prefijados? El LVX te da bloques para cablear el tuyo.</strong> Looper estéreo de 60 segundos, 99 presets, UI a color, MIDI y expresión más ruta analógica premium premian a experimentadores. Es para diseñadores que construyen delays desde cero. Solo espera más curva que pedales de mando por función.',
  [592]
));
g.sections.push(SEC(
  'Two Delays at Once: TimeFactor',
  'Dos delays a la vez: TimeFactor',
  '<strong>Dual delay lines with independent control: the TimeFactor runs two Eventide delays as one.</strong> Ten delay types, 12-second looper, 27 presets, true analog bypass, MIDI, expression input and USB upgrades cover studio-grade echo. It is for players who layer rhythmic delays. Just know the interface shows its age next to touchscreens.',
  '<strong>Doble línea con control independiente: el TimeFactor corre dos delays Eventide como uno.</strong> Diez tipos, looper de 12 segundos, 27 presets, bypass analógico real, MIDI, expresión y mejoras USB cubren eco de estudio. Es para quienes apilan delays rítmicos. Solo sabe que la interfaz acusa años frente a pantallas táctiles.',
  [593]
));
g.sections.push(SEC(
  '26 Engines, One App Away: Nemesis',
  '26 motores a una app de distancia: Nemesis',
  '<strong>Twelve onboard engines plus fourteen more in the Neuro app: the Nemesis ADT stretches one pedal across everything.</strong> Analog dry-through keeps tone intact, 100 factory presets, full MIDI, tap tempo and freeze cover stage needs, with included 9V supply. It is for preset surfers who edit on the phone. Just note deep editing lives in the app, not on the pedal.',
  '<strong>Doce motores a bordo más catorce en la app Neuro: el Nemesis ADT estira un pedal a todo.</strong> El dry analógico conserva el tono, 100 presets de fábrica, MIDI total, tap tempo y freeze cubren el directo, con fuente 9V incluida. Es para surfeadores de presets que editan en el móvil. Solo nota que lo profundo vive en la app, no en el pedal.',
  [594]
));
g.sections.push(SEC(
  'Reverb Meets Delay in One Box: Caverns V2',
  'Reverb y delay en una caja: Caverns V2',
  '<strong>One side reverb, one side delay, zero tap-dancing: the Caverns V2 pairs both beautifully.</strong> 650ms of modulated tape-style echo plus spring, shimmer and modulated reverbs, true-bypass or trails switching, 9V battery or adapter at 75mA. It is for boards that need ambience without two pedals. Just accept mono operation throughout.',
  '<strong>Un lado reverb, otro delay, cero zapateo: el Caverns V2 casa ambos de maravilla.</strong> 650 ms de eco tape modulado más reverbs spring, shimmer y modulada, true-bypass o trails, pila 9V o adaptador a 75 mA. Es para pedaleras que piden ambiente sin dos pedales. Solo acepta operación mono.',
  [595]
));
g.sections.push(SEC(
  'Vintage Space, Modern Box: Del-Verb',
  'Espacio vintage, caja moderna: Del-Verb',
  '<strong>Three classic reverbs plus three classic delays, no menus: the Del-Verb is pure UAFX vibe.</strong> Spring, plate and hall meet tape, analog and digital engines with tap tempo and app control for extra voicings. It is for players who want instant character without programming. Just know deep tweaking happens in the app.',
  '<strong>Tres reverbs clásicas más tres delays clásicos, sin menús: el Del-Verb es puro rollo UAFX.</strong> Spring, plate y hall junto a motores tape, analógicos y digitales con tap tempo y app para voces extra. Es para quienes quieren carácter inmediato sin programar. Solo sabe que lo profundo se ajusta en la app.',
  [596]
));
g.sections.push(SEC(
  'Warm Analog Repeats, Three Knobs: Carbon Copy',
  'Repeticiones cálidas, tres mandos: Carbon Copy',
  '<strong>Bucket-brigade warmth with nothing to learn: the Carbon Copy stays an analog classic for a reason.</strong> 600ms of delay, modulation switch, Delay/Mix/Regen layout, true bypass, 9V battery or adapter. It is for dark, musical repeats that sit behind the dry tone. Just note 600ms caps long ambient washes.',
  '<strong>Calidez bucket-brigade sin nada que aprender: el Carbon Copy sigue clásico por algo.</strong> 600 ms de delay, modulación, mandos Delay/Mix/Regen, true bypass, pila 9V o adaptador. Es para repeticiones oscuras y musicales tras el seco. Solo nota que 600 ms limitan ambientes largos.',
  [597]
));
g.sections.push(SEC(
  'Golden Springs and German Plates: Golden Reverberator',
  'Springs dorados y plates alemanas: Golden Reverberator',
  '<strong>Captured tanks and plates, not approximations: the Golden bottles three springs, three plates and vintage digital.</strong> Dual engines, Live/Preset modes, true or trails bypass with spillover, app control with extra voicings. It is for reverb connoisseurs chasing studio realism. Just weigh the price against simpler needs.',
  '<strong>Tanques y plates capturados, no aproximados: el Golden embotella tres springs, tres plates y digital vintage.</strong> Motores duales, modos Live/Preset, bypass true o trails con spillover, app con voces extra. Es para sibaritas de la reverb tras realismo de estudio. Solo sopesa el precio frente a necesidades simples.',
  [598]
));
g.sections.push(SEC(
  'Twelve Verbs, 127 Memories: RV-200',
  'Doce reverbs, 127 memorias: RV-200',
  '<strong>Boss compact power for reverb lovers: the RV-200 packs twelve types plus Arpverb into a 200-series box.</strong> 127 memories, Hold/Warp/Twist performance tricks, TRS MIDI, stereo I/O, 3xAA or adapter power. It is for ambient explorers who save everything. Just note the small screen next to flagship workstations.',
  '<strong>Potencia Boss compacta para amantes de la reverb: el RV-200 mete doce tipos más Arpverb en caja serie 200.</strong> 127 memorias, trucos Hold/Warp/Twist, MIDI TRS, estéreo, 3xAA o adaptador. Es para exploradores ambient que lo guardan todo. Solo nota la pantalla pequeña frente a estaciones insignia.',
  [599]
));
console.log('9 sections added');

g.featuredProducts = [97, 100, 135, 200, 591, 592, 593, 594, 595, 596, 597, 598, 599];
console.log('featured extended');

// Verified price cells (zzounds/official)
const row = g.productTable.rows.find(r => r.label === 'Estimated Price');
const setP = (i, from, to) => {
  if (row.values[i].value !== from) throw new Error('price [' + i + '] unexpected: ' + row.values[i].value);
  row.values[i].value = to; row.values[i].value_es = to;
};
setP(2, '~$679', '$679.00');
setP(3, '~$449', '$449.00');
setP(4, '~$599', '$599.00');
setP(6, '~$499', '$499.00');
setP(7, '~$349', '$299.99');
setP(8, '~$199', '$199.00');
setP(9, '~$349', '$349.00');
setP(10, '~$159.99', '$149.99–$159.99');
setP(11, '~$399', '$349.00–$399.00');
setP(12, '~$269', '$296.99–$320.99');
// Caverns current draw 300mA -> 75mA (Keeley/zzounds specs)
const cur = g.productTable.rows.find(r => r.label === 'Current Draw');
console.log('Caverns current cell: ' + cur.values[8].value);
console.log('guides.json NOT written yet - review above');
fs.writeFileSync(DIR + 'data/guides.json', JSON.stringify(G, null, 2) + '\n');
console.log('guides.json written');
