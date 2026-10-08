const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
function assertEq(a, b, w) { if (a !== b) throw new Error('ASSERT ' + w + '\nGOT: ' + JSON.stringify(a) + '\nEXP: ' + JSON.stringify(b)); }
const G = JSON.parse(fs.readFileSync(DIR + 'data/guides.json', 'utf8'));
const o = G.find(x => x.id === 'best-drum-machine');

// ---------- TABLE ----------
const titles = ['Roland AIRA Compact T-8', 'Novation Circuit Tracks', 'Arturia DrumBrute Impact', 'Roland TR-8S', 'Akai MPC One+', 'Elektron Digitakt II', 'Elektron Syntakt', 'Erica Synths Pērkons HD-01'];
o.productTable.columns = titles.map(t => ({ title: t, title_es: t }));
const rows = {
'Best For': [['Pocket acid & boom', 'Acid y boom de bolsillo'], ['First groovebox, no screen', 'Primera groovebox sin pantalla'], ['Raw analog punch', 'Pegada analógica pura'], ['Live techno & 808/909', 'Techno en directo y 808/909'], ['Standalone hip-hop brain', 'Cerebro hip-hop autónomo'], ['Stereo sampling god', 'Dios del muestreo estéreo'], ['Hybrid analog+digital drums', 'Baterías híbridas'], ['Premium techno beast', 'Bestia techno premium']],
'Estimated Price': [['~€199', '~€199'], ['$404–$469', '$404–$469'], ['$299–$349', '$299–$349'], ['$749.99', '$749.99'], ['~$699', '~$699'], ['$1,099', '$1,099'], ['$973–$1,149', '$973–$1,149'], ['~$1,999', '~$1,999']],
'Type': [['Pocket groovebox', 'Groovebox de bolsillo'], ['Groovebox (8-track)', 'Groovebox (8 pistas)'], ['Analog drum machine', 'Caja analógica'], ['Rhythm performer', 'Rhythm performer'], ['Standalone sampler/sequencer', 'Sampler/secuenciador autónomo'], ['Drum computer + sampler', 'Caja + sampler'], ['Drum computer + synth', 'Caja + sinte'], ['Hybrid drum synth', 'Sintetizador híbrido']],
'Tracks': [['6 drum + 1 bass', '6 batería + 1 bajo'], ['2 synth + 4 drum + 2 MIDI', '2 sinte + 4 batería + 2 MIDI'], ['10 analog voices', '10 voces analógicas'], ['11 parts + trigger', '11 partes + trigger'], ['128 MIDI + 8 audio', '128 MIDI + 8 audio'], ['16 stereo/MIDI', '16 estéreo/MIDI'], ['12 (8 digital + 4 analog)', '12 (8 digital + 4 analógico)'], ['4 hybrid voices', '4 voces híbridas']],
'Sound Engine': [['ACB 808/909/606 + TB-303', 'ACB 808/909/606 + TB-303'], ['Digital synth + samples', 'Sinte digital + samples'], ['Pure analog + Color drive', 'Analógico puro + Color'], ['ACB + FM + samples', 'ACB + FM + samples'], ['MPC sampler + plugins', 'Sampler MPC + plugins'], ['Stereo samples + machines', 'Samples estéreo + máquinas'], ['37 analog/digital machines', '37 máquinas'], ['Digital + analog filters', 'Digital + filtros analógicos']],
'Sequencer': [['TR-REC, 64 patterns, 32 steps', 'TR-REC, 64 patrones, 32 pasos'], ['32-step, probability, mutate', '32 pasos, probabilidad, mutate'], ['64-step, polyrhythm, roller', '64 pasos, polirritmia, roller'], ['TR-REC, 128 patterns, scenes', 'TR-REC, 128 patrones, escenas'], ['Grid + step, touchscreen', 'Rejilla + pasos, táctil'], ['128-step, p-locks, Euclidean', '128 pasos, p-locks, euclídeo'], ['64-step, p-locks, song mode', '64 pasos, p-locks, canciones'], ['64-step, ratchets, probability', '64 pasos, ratchets, probabilidad']],
'Sample Storage': [['— (patterns only)', '— (solo patrones)'], ['microSD packs', 'packs microSD'], ['— (analog only)', '— (solo analógico)'], ['SD card, 600 s samples', 'Tarjeta SD, 600 s'], ['16 GB + SD/USB', '16 GB + SD/USB'], ['400 MB + 20 GB drive', '400 MB + disco 20 GB'], ['1 GB +Drive', '1 GB +Drive'], ['64 kits/patterns + SD', '64 kits/patrones + SD']],
'Effects': [['Delay, reverb, overdrive, sidechain', 'Delay, reverb, overdrive, sidechain'], ['Reverb, delay, sidechain', 'Reverb, delay, sidechain'], ['Distortion, stutter, randomizer', 'Distorsión, stutter, random'], ['Inst FX, reverb, delay, sidechain', 'FX inst, reverb, delay, sidechain'], ['100+ AIR FX', 'Más de 100 FX AIR'], ['Delay, reverb, chorus, bitcrush', 'Delay, reverb, chorus, bitcrush'], ['Reverb, delay, analog drive', 'Reverb, delay, drive analógico'], ['BBD delay, compressor, overdrive', 'Delay BBD, compresor, overdrive']],
'Connectivity': [['MIDI, sync, USB-C audio', 'MIDI, sync, audio USB-C'], ['MIDI, sync, USB-C', 'MIDI, sync, USB-C'], ['MIDI, USB, clock, CV', 'MIDI, USB, clock, CV'], ['6 outs, MIDI, USB audio', '6 salidas, MIDI, audio USB'], ['TRS I/O, CV/Gate, MIDI, Wi-Fi', 'TRS I/O, CV/Gate, MIDI, Wi-Fi'], ['Balanced I/O, MIDI, USB', 'I/O balanceado, MIDI, USB'], ['Balanced I/O, MIDI, USB, Overbridge', 'I/O balanceado, MIDI, USB, Overbridge'], ['MIDI, clock, trig ins, 4 outs', 'MIDI, clock, trigs, 4 salidas']],
'Power': [['Li-ion battery, 4.5 h', 'Batería Li-ion, 4,5 h'], ['Li-ion battery, 4 h', 'Batería Li-ion, 4 h'], ['DC adapter (included)', 'Adaptador DC (incluido)'], ['AC adaptor', 'Adaptador AC'], ['12V DC adapter', 'Adaptador 12V DC'], ['DC adapter (included)', 'Adaptador DC (incluido)'], ['12V DC (included)', '12V DC (incluido)'], ['12V DC (included)', '12V DC (incluido)']],
'Weight': [['0.31 kg', '0,31 kg'], ['—', '—'], ['1.84 kg', '1,84 kg'], ['2.1 kg', '2,1 kg'], ['2.1 kg', '2,1 kg'], ['1.48 kg', '1,48 kg'], ['1.53 kg', '1,53 kg'], ['3.7 kg', '3,7 kg']]
};
Object.keys(rows).forEach(label => {
  const r = o.productTable.rows.find(x => x.label === label);
  if (!r) throw new Error('no row ' + label);
  r.values = rows[label].map(([en, es]) => ({ value: en, value_es: es }));
});
console.log('table rewritten');

// ---------- VERDICTS ----------
function V(name, pros, pros_es, cons, cons_es) { return { name, name_es: name, pros, pros_es, cons, cons_es }; }
o.verdictProsCons = [
V('Roland AIRA Compact T-8',
['Genuine 808/909/606 + TB-303 in 310 grams', 'Battery power for beats anywhere', 'TR-REC workflow with zero learning curve', 'Cheapest ticket into real Roland rhythm'],
['808/909/606 genuinos + TB-303 en 310 gramos', 'Batería para beats en cualquier parte', 'Flujo TR-REC sin curva de aprendizaje', 'El boleto más barato al ritmo Roland real'],
['Tiny knobs punish big fingers', 'No user sampling — Roland sounds only', 'Mini-jack MIDI needs adapter cables', 'Pocket size tempts loss and damage']),
V('Novation Circuit Tracks',
['Screen-free workflow arranges with ears', 'Battery plus microSD packs for anywhere', 'Two synths, four drums, two MIDI in one box', 'Friendliest first groovebox available'],
['Flujo sin pantalla que arregla con oídos', 'Batería más packs microSD para todo lugar', 'Dos sintes, cuatro baterías, dos MIDI en una caja', 'La primera groovebox más amable'],
['Deep synth editing needs the app', '32 steps cap long arrangements', 'Pads wear shiny with heavy use', 'No song mode for full compositions']),
V('Arturia DrumBrute Impact',
['Ten pure analog voices with per-knob Color', 'Polyrhythmic 64-step sequencer with roller', 'Master distortion and individual outs', 'Most fun per euro in rhythm hardware'],
['Diez voces analógicas puras con Color por mando', 'Secuenciador polirrítmico de 64 pasos con roller', 'Distorsión master y salidas individuales', 'La diversión por euro en hardware rítmico'],
['No memory, no samples, no mercy', 'Analog tuning drifts by design', 'Single mono output limits mixing', 'Loud neighbors guaranteed']),
V('Roland TR-8S',
['The live techno standard with faders', 'ACB drums plus user samples combined', 'Scene morphing changes kits mid-bar', 'Six outs and USB audio for the desk'],
['El estándar techno en directo con faders', 'Baterías ACB más samples propios', 'Las escenas cambian kits a mitad de compás', 'Seis salidas y audio USB para la mesa'],
['No deep song mode for arrangements', '2.1 kg plus wall power stays on stage', 'Menu layers hide under the hands-on top', 'Price stings next to compact rivals']),
V('Akai MPC One+',
['The pad workflow that invented hip-hop', 'Standalone touchscreen song finishing', '128 MIDI + 8 audio tracks with plugins', 'Wi-Fi, Bluetooth and CV for everything'],
['El flujo de pads que inventó el hip-hop', 'Canciones terminadas en táctil autónoma', '128 MIDI + 8 audio con plugins', 'Wi-Fi, Bluetooth y CV para todo'],
['Small screen next to a real DAW', '2 GB RAM caps giant projects', 'No battery for the park', 'G2 successor taking over shelves']),
V('Elektron Digitakt II',
['16 stereo tracks of anything samplable', '128 steps with locks and Euclidean math', '400 MB plus 20 GB of sample room', 'Deepest instrument in this guide'],
['16 pistas estéreo de lo sampleable', '128 pasos con locks y matemática euclídea', '400 MB más 20 GB de espacio', 'El instrumento más profundo de la guía'],
['Elektron workflow taxes beginners', '1.48 kg of steel wants a desk', 'Screen squinting at 128x64 pixels', 'Price of admission to the deep end']),
V('Elektron Syntakt',
['Analog punch plus digital weirdness together', '37 machines from thunder to glass', 'Song mode and Overbridge included', 'Every track flippable to MIDI'],
['Pegada analógica más rarezas digitales juntas', '37 máquinas del trueno al cristal', 'Modo canción y Overbridge incluidos', 'Cada pista cambiable a MIDI'],
['Neither deepest analog nor widest digital', 'Small OLED keeps menu-diving alive', 'Learning curve steeper than grooveboxes', 'GAS for the Digitakt next']),
V('Erica Synths Pērkons HD-01',
['Knob-per-function panel the size of luggage', 'Analog filters plus BBD delay thunder', 'Performs like an instrument, not a box', 'Nothing else looks or hits like it'],
['Panel de un mando por función tamaño maleta', 'Filtros analógicos más delay BBD atronadores', 'Se toca como instrumento, no como caja', 'Nada más se ve ni pega como él'],
['3.7 kg never leaves the studio', 'No sampling engine at flagship money', 'Price funds entire setups elsewhere', 'Neighbors will file complaints'])
];
// fill ES for verdicts (mirror EN with translations)
const esMap = {
'Roland AIRA Compact T-8': [['808/909/606 genuinos + TB-303 en 310 gramos', 'Batería para beats en cualquier parte', 'Flujo TR-REC sin curva de aprendizaje', 'El boleto más barato al ritmo Roland real'], ['Mandos diminutos castigan dedos grandes', 'Sin sampling propio — solo sonidos Roland', 'El MIDI minijack pide cables adaptadores', 'El tamaño bolsillo tienta pérdidas y daños']],
'Novation Circuit Tracks': [['Flujo sin pantalla que arregla con oídos', 'Batería más packs microSD para todo lugar', 'Dos sintes, cuatro baterías, dos MIDI en una caja', 'La primera groovebox más amable'], ['La edición profunda pide la app', '32 pasos topan arreglos largos', 'Los pads brillan con uso duro', 'Sin modo canción para composiciones']],
'Arturia DrumBrute Impact': [['Diez voces analógicas puras con Color por mando', 'Secuenciador polirrítmico de 64 pasos con roller', 'Distorsión master y salidas individuales', 'La diversión por euro en hardware rítmico'], ['Sin memoria, sin samples, sin piedad', 'La afinación analógica deriva por diseño', 'Una salida mono limita mezclas', 'Vecinos ruidosos garantizados']],
'Roland TR-8S': [['El estándar techno en directo con faders', 'Baterías ACB más samples propios combinados', 'Las escenas cambian kits a mitad de compás', 'Seis salidas y audio USB para la mesa'], ['Sin modo canción profundo para arreglos', '2,1 kg más enchufe se quedan en el escenario', 'Capas de menú bajo la superficie táctil', 'El precio escuece junto a rivales compactos']],
'Akai MPC One+': [['El flujo de pads que inventó el hip-hop', 'Canciones terminadas en táctil autónoma', '128 MIDI + 8 audio con plugins', 'Wi-Fi, Bluetooth y CV para todo'], ['Pantalla pequeña junto a un DAW real', '2 GB de RAM topan proyectos gigantes', 'Sin batería para el parque', 'El sucesor G2 toma las estanterías']],
'Elektron Digitakt II': [['16 pistas estéreo de lo sampleable', '128 pasos con locks y matemática euclídea', '400 MB más 20 GB de espacio', 'El instrumento más profundo de la guía'], ['El flujo Elektron tasa a principiantes', '1,48 kg de acero piden escritorio', 'Entrecerrar ojos en 128x64 píxeles', 'Precio de entrada a lo profundo']],
'Elektron Syntakt': [['Pegada analógica más rarezas digitales juntas', '37 máquinas del trueno al cristal', 'Modo canción y Overbridge incluidos', 'Cada pista cambiable a MIDI'], ['Ni el analógico más profundo ni el digital más amplio', 'El pequeño OLED mantiene vivo el buceo en menús', 'Curva más dura que las grooveboxes', 'GAS por el Digitakt de al lado']],
'Erica Synths Pērkons HD-01': [['Panel de un mando por función tamaño maleta', 'Filtros analógicos más delay BBD atronadores', 'Se toca como instrumento, no como caja', 'Nada más se ve ni pega como él'], ['3,7 kg que nunca salen del estudio', 'Sin motor de sampling por dinero insignia', 'El precio financia equipos enteros en otro lado', 'Los vecinos pondrán denuncias']]
};
o.verdictProsCons.forEach(v => {
  const m = esMap[v.name];
  if (!m) throw new Error('no es for ' + v.name);
  v.pros_es = m[0]; v.cons_es = m[1];
});
console.log('verdicts rewritten');

// ---------- CONCLUSION / VERDICT / FAQ ----------
o.conclusion = 'Eight machines, three missions: travel light, command the stage, or rule the studio. The Roland T-8 and Circuit Tracks prove pocket money buys real rhythm. The DrumBrute Impact, TR-8S and MPC One+ are the working middle — analog attitude, live faders, and hip-hop brains. The Digitakt II, Syntakt and Pērkons HD-01 are the deep end: sampling gods, hybrid fusion and a suitcase of knobs. Pick your mission and start without the computer. <p>For beat-making gear, see <a class="guide-link-btn" href="/guides/beat-making.html">Beat-making studio guide</a></p>';
o.conclusion_es = 'Ocho máquinas, tres misiones: viajar ligero, mandar en el escenario o gobernar el estudio. El Roland T-8 y Circuit Tracks prueban que poco dinero compra ritmo real. DrumBrute Impact, TR-8S y MPC One+ son el medio trabajador — actitud analógica, faders en directo y cerebros hip-hop. Digitakt II, Syntakt y Pērkons HD-01 son lo profundo: dioses del muestreo, fusión híbrida y una maleta de mandos. Elige tu misión y empieza sin ordenador. <p>Para equipo de beats, consulta nuestra <a class="guide-link-btn" href="/guides/beat-making_es.html">Guía de estudio beat-making</a></p>';
o.verdict = 'Travel light with the T-8 or Circuit Tracks. Command stages with the DrumBrute, TR-8S or MPC One+. Rule the studio with Digitakt II, Syntakt or the Pērkons HD-01.';
o.verdict_es = 'Viaja ligero con el T-8 o Circuit Tracks. Manda en escenarios con DrumBrute, TR-8S o MPC One+. Gobierna el estudio con Digitakt II, Syntakt o el Pērkons HD-01.';
const f = o.featuredSnippet;
f.faq_q1_en = 'Which drum machine should a complete beginner buy?';
f.faq_a1_en = 'The Roland T-8 for pocket money or the Novation Circuit Tracks for a real groovebox. The T-8 gives genuine 808/909/606 drums plus TB-303 bass with a battery; Circuit Tracks adds synths, samples and MIDI tracks with no screen to fear. Both make songs without a computer from day one.';
f.faq_q1_es = '¿Qué caja de ritmos debe comprar un principiante total?';
f.faq_a1_es = 'El Roland T-8 con poco dinero o Novation Circuit Tracks para una groovebox real. El T-8 da baterías 808/909/606 genuinas más bajo TB-303 con batería; Circuit Tracks suma sintes, samples y pistas MIDI sin pantalla que temer. Ambos hacen canciones sin ordenador desde el día uno.';
f.faq_q2_en = 'Is the MPC One+ better than using a computer and DAW for beat-making?';
f.faq_a2_en = 'For hands-on, distraction-free work, yes. The Akai MPC One+ runs standalone — sampling, sequencing and finishing tracks with pads, plugin synths and 100+ effects, no computer needed. A DAW offers more power and screen, but the MPC gives a tactile hip-hop environment many producers find faster.';
f.faq_q2_es = '¿Es la MPC One+ mejor que usar ordenador y DAW para hacer beats?';
f.faq_a2_es = 'Para trabajo táctil sin distracciones, sí. La Akai MPC One+ funciona autónoma — samplear, secuenciar y terminar temas con pads, sintes plugin y más de 100 efectos, sin ordenador. Un DAW da más potencia y pantalla, pero la MPC da un entorno hip-hop táctil que muchos encuentran más rápido.';
f.faq_q3_en = 'Do I need a drum machine if I already have a DAW?';
f.faq_a3_en = 'No, but it changes how you work. Hardware like the TR-8S, Digitakt II or Syntakt removes the computer from the creative loop — you jam and arrange with hands instead of a mouse. The T-8 and Circuit Tracks are best for portable sketches; the MPC One+ and Pērkons HD-01 for finished productions.';
f.faq_q3_es = '¿Necesito una caja de ritmos si ya tengo un DAW?';
f.faq_a3_es = 'No, pero cambia cómo trabajas. Hardware como TR-8S, Digitakt II o Syntakt saca el ordenador del bucle creativo — improvisas y arreglas con manos en vez de ratón. El T-8 y Circuit Tracks van mejor para bocetos portátiles; la MPC One+ y el Pērkons HD-01 para producciones terminadas.';
f.faq_q4_en = 'Digitakt II or Syntakt — which Elektron should you get?';
f.faq_a4_en = 'Digitakt II for sampling, Syntakt for synthesis. The Digitakt II gives 16 stereo tracks, 400 MB of samples and machines that slice and warp audio. The Syntakt gives 12 tracks of analog plus digital drum synthesis with 37 machines. Both share the 64-step sequencer with parameter locks and song mode.';
f.faq_q4_es = '¿Digitakt II o Syntakt — qué Elektron elegir?';
f.faq_a4_es = 'Digitakt II para samplear, Syntakt para sintetizar. El Digitakt II da 16 pistas estéreo, 400 MB de samples y máquinas que trocean y deforman audio. El Syntakt da 12 pistas de síntesis analógica más digital con 37 máquinas. Ambos comparten secuenciador de 64 pasos con parameter locks y modo canción.';
f.faq_q5_en = 'Which drum machine is best for techno: TR-8S, Syntakt or Pērkons?';
f.faq_a5_en = 'TR-8S for live sets with faders and scenes, Syntakt for hybrid sound design in one box, Pērkons HD-01 for a premium knob-per-function techno instrument. All three are stage-worthy; the budget decides between working tool and aspirational grail.';
f.faq_q5_es = '¿Qué caja es mejor para techno: TR-8S, Syntakt o Pērkons?';
f.faq_a5_es = 'TR-8S para directos con faders y escenas, Syntakt para diseño híbrido en una caja, Pērkons HD-01 como instrumento techno premium de un mando por función. Las tres valen para escenario; el presupuesto decide entre herramienta de trabajo y grial aspiracional.';
console.log('conclusion/verdict/faq rewritten');
fs.writeFileSync(DIR + 'data/guides.json', JSON.stringify(G, null, 2) + '\n');
console.log('guides.json written');
