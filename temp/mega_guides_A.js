const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
const G = id => guides.find(g => g.id === id);
function swap(guide, pairs) {
  let s = JSON.stringify(guide);
  pairs.forEach(([a, b]) => { s = s.split(a).join(b); });
  const g2 = JSON.parse(s);
  Object.keys(guide).forEach(k => delete guide[k]);
  Object.assign(guide, g2);
}

// ==================== BEST-SYNTH-VSTS ====================
(function () {
  const gd = G('best-synth-vsts');
  gd.sections[4] = {
    heading: 'Reveal Sound Spire: The Trance Workhorse That Refuses to Age',
    heading_es: 'Reveal Sound Spire: El Todoterreno del Trance Que Se Niega a Envejecer',
    products: [1005],
    content: '<p><strong>Spire is built around four versatile multimode oscillators with deep modulation and a hands-on layout.</strong> You get subtractive, FM and noise-based synthesis with unison that stacks voices wide, dual filters, steppers for rhythmic movement, and a solid built-in effects section. It loads fast, programs faster, and sits in a mix with minimal effort.</p><p>Ask any trance or progressive producer what defined the genre sound of the last decade and Spire comes up constantly. The leads cut, the basses punch, and the plucks need almost no processing. For big-room energy and melodic electronic music, it remains a safe investment years after release.</p>',
    content_es: '<p><strong>Spire está construido alrededor de cuatro versátiles osciladores multimodo con modulación profunda y un diseño práctico.</strong> Obtienes síntesis sustractiva, FM y basada en ruido con unísono que abre las voces, filtros duales, secuenciadores por pasos para movimiento rítmico y una sólida sección de efectos integrada. Carga rápido, se programa más rápido y se sitúa en la mezcla con mínimo esfuerzo.</p><p>Pregunta a cualquier productor de trance o progressive qué definió el sonido del género en la última década y Spire aparece constantemente. Los leads cortan, los bajos pegan y los plucks casi no necesitan procesamiento. Para energía big-room y música electrónica melódica, sigue siendo una inversión segura años después de su lanzamiento.</p>',
    pros: ['Four versatile multimode oscillators with deep modulation', 'A defining sound of trance, big-room and progressive', 'Fast workflow: programs quickly and sits in mixes easily', 'Huge third-party preset ecosystem'],
    pros_es: ['Cuatro versátiles osciladores multimodo con modulación profunda', 'Un sonido definitorio del trance, big-room y progressive', 'Flujo rápido: se programa veloz y se sitúa fácil en mezclas', 'Enorme ecosistema de presets de terceros'],
    cons: ['Interface feels dated next to Pigments or Phase Plant', 'No wavetable import or granular engine', 'CPU load climbs with high unison counts', 'Factory library leans heavily toward EDM'],
    cons_es: ['La interfaz se siente anticuada junto a Pigments o Phase Plant', 'Sin importación de tablas de ondas ni motor granular', 'La carga de CPU sube con conteos altos de unísono', 'La biblioteca de fábrica se inclina mucho al EDM']
  };
  gd.verdictProsCons[4] = {
    name: 'Spire', name_es: 'Spire',
    pros: ['Versatile multimode oscillators', 'Trance and big-room staple', 'Fast, mix-ready results', 'Massive preset ecosystem'],
    pros_es: ['Osciladores multimodo versátiles', 'Estándar del trance y big-room', 'Resultados rápidos listos para mezcla', 'Enorme ecosistema de presets'],
    cons: ['Dated interface', 'No wavetable or granular synthesis', 'Heavy CPU with high unison', 'EDM-focused factory sounds'],
    cons_es: ['Interfaz anticuada', 'Sin síntesis granular ni por tabla de ondas', 'CPU pesado con unísono alto', 'Sonidos de fábrica enfocados al EDM']
  };
  gd.faq[1] = {
    q: 'Is Spire still worth buying in 2026?',
    q_es: '¿Sigue mereciendo la pena comprar Spire en 2026?',
    q_a: 'Yes. Spire remains a staple for trance, progressive and big-room producers. Its oscillators, unison and effects deliver mix-ready leads, basses and plucks with minimal processing. While newer synths offer more visual feedback, Spire programs faster than almost anything else in its class.',
    q_a_es: 'Sí. Spire sigue siendo un estándar para productores de trance, progressive y big-room. Sus osciladores, unísono y efectos ofrecen leads, bajos y plucks listos para mezcla con mínimo procesamiento. Aunque sintes más nuevos ofrecen más retroalimentación visual, Spire se programa más rápido que casi cualquier otro de su clase.'
  };
  swap(gd, [
    ['Xfer Serum for bass music', 'Reveal Sound Spire for trance leads and basses'],
    ['Xfer Serum para música de bajos', 'Reveal Sound Spire para leads y bajos trance'],
    ['an entire project in Serum', 'an entire project in Spire'],
    ['un proyecto entero en Serum', 'un proyecto entero en Spire'],
    ['Pigments or Serum may be more practical', 'Pigments or Spire may be more practical'],
    ['Pigments o Serum pueden ser más prácticos', 'Pigments o Spire pueden ser más prácticos'],
    ['Serum dominates bass music.', 'Spire defines trance and progressive.'],
    ['Serum domina la música de bajos.', 'Spire define el trance y el progressive.'],
    ['Pigments 7, Diva, Phase Plant, Serum, Massive X', 'Pigments 7, Diva, Phase Plant, Spire, Massive X'],
    ['Pigments 7, Diva, Phase Plant, Serum, Massive X y más', 'Pigments 7, Diva, Phase Plant, Spire, Massive X y más'],
    ['Xfer Serum', 'Reveal Sound Spire'],
    ['Serum', 'Spire']
  ]);
  gd.verdictProsCons[4].name = 'Spire'; gd.verdictProsCons[4].name_es = 'Spire';
  console.log('synth done');
})();

// ==================== BEST-MIDI-THEORY-PLUGINS ====================
(function () {
  const gd = G('best-midi-theory-plugins');
  gd.sections[1] = {
    heading: 'SongWish reMIDI 4: The MIDI Sampler That Turns Loops Into Instruments',
    heading_es: 'SongWish reMIDI 4: El Sampler MIDI Que Convierte Loops en Instrumentos',
    products: [1008],
    content: '<p><strong>reMIDI 4 is a one-of-a-kind MIDI sampler: load any MIDI file and play it like an instrument.</strong> Drop in loops from your library, slice them across keys, rearrange phrases, change keys and tempos on the fly, and export the result as MIDI straight into your DAW. It comes with a built-in MIDI library so you can start sketching immediately.</p><p>Where theory plugins generate notes for you, reMIDI 4 recycles the MIDI you already own. That makes it perfect for producers sitting on gigabytes of loops and packs: old ideas become new basslines, chord stabs and melodies in minutes. For loop-based writers, it pays for itself fast.</p>',
    content_es: '<p><strong>reMIDI 4 es un sampler MIDI único: carga cualquier archivo MIDI y tócalo como un instrumento.</strong> Suelta loops de tu biblioteca, córtalos entre teclas, reordena frases, cambia tonalidades y tempos al vuelo, y exporta el resultado como MIDI directo a tu DAW. Incluye una biblioteca MIDI integrada para empezar a esbozar de inmediato.</p><p>Mientras los plugins de teoría generan notas por ti, reMIDI 4 recicla el MIDI que ya tienes. Eso lo hace perfecto para productores con gigabytes de loops y packs: ideas viejas se convierten en nuevas líneas de bajo, stabs de acordes y melodías en minutos. Para quienes escriben con loops, se paga solo rápidamente.</p>',
    pros: ['Turn any MIDI file into a playable instrument', 'Slice, rearrange and re-pitch loops in real time', 'Built-in MIDI library included', 'Drag-and-drop MIDI export to any DAW'],
    pros_es: ['Convierte cualquier archivo MIDI en un instrumento tocable', 'Corta, reordena y re-afina loops en tiempo real', 'Biblioteca MIDI integrada incluida', 'Exportación MIDI de arrastrar y soltar a cualquier DAW'],
    cons: ['Needs your own MIDI library to shine', 'No chord or scale generation of its own', 'Interface prioritizes function over beauty', 'Loop-based workflow does not suit every genre'],
    cons_es: ['Necesita tu propia biblioteca MIDI para brillar', 'Sin generación propia de acordes o escalas', 'La interfaz prioriza función sobre belleza', 'El flujo basado en loops no sirve para cada género']
  };
  gd.sections[4] = {
    heading: 'Audiomodern Riffer 4: Generative Melodies That Stay in Key',
    heading_es: 'Audiomodern Riffer 4: Melodías Generativas Que Se Mantienen en Tono',
    products: [1011],
    content: '<p><strong>Riffer 4 is a generative MIDI sequencer that writes melodies, basslines and riffs locked to your scale.</strong> Pick a key and mood, dial in density and complexity, and let it generate endless variations. Nothing ever lands out of key, and every idea exports as MIDI for editing in your DAW.</p><p>The difference from pure random generators is control. You shape rhythm, pitch range, note density and motif length, so results follow your direction instead of wandering. For breaking blocks and sketching top-lines fast, Riffer 4 is one of the quickest idea machines available.</p>',
    content_es: '<p><strong>Riffer 4 es un secuenciador MIDI generativo que escribe melodías, líneas de bajo y riffs fijados a tu escala.</strong> Elige una tonalidad y ambiente, ajusta densidad y complejidad, y deja que genere variaciones infinitas. Nada cae fuera de tono, y cada idea se exporta como MIDI para editar en tu DAW.</p><p>La diferencia con los generadores puramente aleatorios es el control. Moldeas ritmo, rango de tono, densidad de notas y longitud de motivos, así los resultados siguen tu dirección en lugar de divagar. Para romper bloqueos y esbozar top-lines rápido, Riffer 4 es una de las máquinas de ideas más veloces disponibles.</p>',
    pros: ['Endless generative melodies locked to your scale', 'Density, rhythm and motif controls that actually steer results', 'Instant MIDI export to any DAW', 'Fast block-breaker for top-lines and basslines'],
    pros_es: ['Melodías generativas infinitas fijadas a tu escala', 'Controles de densidad, ritmo y motivos que dirigen resultados', 'Exportación MIDI instantánea a cualquier DAW', 'Rompebloqueos veloz para top-lines y bajos'],
    cons: ['Generated ideas still need human arrangement', 'Melodic character varies by settings', 'MIDI only, no built-in sounds', 'Can feel samey if you never touch the controls'],
    cons_es: ['Las ideas generadas aún necesitan arreglo humano', 'El carácter melódico varía según ajustes', 'Solo MIDI, sin sonidos integrados', 'Puede sentirse repetitivo si nunca tocas los controles']
  };
  gd.verdictProsCons[1] = {
    name: 'reMIDI 4', name_es: 'reMIDI 4',
    pros: ['MIDI files become playable instruments', 'Slice and remix loops fast', 'Built-in MIDI library', 'Drag-and-drop MIDI export'],
    pros_es: ['Los archivos MIDI se vuelven instrumentos tocables', 'Corta y remezcla loops rápido', 'Biblioteca MIDI integrada', 'Exportación MIDI de arrastrar y soltar'],
    cons: ['Needs your own MIDI files', 'No theory generation', 'Functional interface', 'Loop workflow, not for everyone'],
    cons_es: ['Necesita tus propios archivos MIDI', 'Sin generación de teoría', 'Interfaz funcional', 'Flujo de loops, no para todos']
  };
  gd.verdictProsCons[4] = {
    name: 'Riffer 4', name_es: 'Riffer 4',
    pros: ['Generative melodies in key', 'Steerable density and rhythm', 'Instant MIDI export', 'Fast idea machine'],
    pros_es: ['Melodías generativas en tono', 'Densidad y ritmo dirigibles', 'Exportación MIDI instantánea', 'Máquina de ideas veloz'],
    cons: ['Needs human arrangement', 'Quality depends on settings', 'MIDI only', 'Can feel samey untouched'],
    cons_es: ['Necesita arreglo humano', 'La calidad depende de ajustes', 'Solo MIDI', 'Puede sentirse repetitivo intacto']
  };
  gd.faq[1] = {
    q: 'Can generative plugins like Riffer 4 replace songwriting?',
    q_es: '¿Pueden los plugins generativos como Riffer 4 reemplazar la composición?',
    q_a: 'No. Generative plugins like Riffer 4 are sketchpads, not songwriters. They produce endless melodic starting points locked to your scale, and you refine, arrange and humanize the keepers. The best results come from steering the controls toward your taste, then editing the exported MIDI like any other part.',
    q_a_es: 'No. Los plugins generativos como Riffer 4 son cuadernos de bocetos, no compositores. Producen puntos de partida melódicos infinitos fijados a tu escala, y tú refinas, arreglas y humanizas los elegidos. Los mejores resultados provienen de dirigir los controles hacia tu gusto, luego editar el MIDI exportado como cualquier otra parte.'
  };
  gd.faq[2] = {
    q: 'What is the difference between Scaler 3 and reMIDI 4?',
    q_es: '¿Cuál es la diferencia entre Scaler 3 y reMIDI 4?',
    q_a: 'Scaler 3 is a theory engine: it detects your key, suggests chords, and generates basslines and melodies. reMIDI 4 is a MIDI sampler: it loads MIDI files you already own, slices them across keys, and turns loops into playable instruments. Scaler teaches progressions, reMIDI recycles your library. Many producers use both.',
    q_a_es: 'Scaler 3 es un motor de teoría: detecta tu tonalidad, sugiere acordes y genera líneas de bajo y melodía. reMIDI 4 es un sampler MIDI: carga archivos MIDI que ya tienes, los corta entre teclas y convierte loops en instrumentos tocables. Scaler enseña progresiones, reMIDI recicla tu biblioteca. Muchos productores usan ambos.'
  };
  swap(gd, [
    ['Captain Plugins Epic for all-in-one songwriting', 'reMIDI 4 for turning MIDI loops into instruments'],
    ['Captain Plugins Epic para escritura de canciones todo en uno', 'reMIDI 4 para convertir loops MIDI en instrumentos'],
    ['Orb Producer Suite 3 for AI-generated musical ideas', 'Riffer 4 for generative melodies that stay in key'],
    ['Orb Producer Suite 3 para ideas musicales generadas por IA', 'Riffer 4 para melodías generativas que se mantienen en tono'],
    ['Captain Plugins Epic writes complete song sections.', 'reMIDI 4 turns MIDI loops into playable instruments.'],
    ['Captain Plugins Epic escribe secciones completas de canciones.', 'reMIDI 4 convierte loops MIDI en instrumentos tocables.'],
    ['Orb Producer Suite 3 opens creative doors with AI-generated ideas.', 'Riffer 4 writes generative melodies that stay in your scale.'],
    ['Orb Producer Suite 3 abre puertas creativas con ideas generadas por IA.', 'Riffer 4 escribe melodías generativas que se mantienen en tu escala.'],
    ['Scaler 3, Captain Plugins, Loop Engine 3, Playbeat and more', 'Scaler 3, reMIDI 4, Loop Engine 3, Playbeat and more'],
    ['Scaler 3, Captain Plugins, Loop Engine 3, Playbeat y más', 'Scaler 3, reMIDI 4, Loop Engine 3, Playbeat y más'],
    ['Mixed In Key Captain Plugins Epic', 'SongWish reMIDI 4'],
    ['Captain Plugins Epic', 'reMIDI 4'],
    ['Mixed In Key', 'SongWish'],
    ['Orb Producer Suite 3', 'Riffer 4'],
    ['Orb Plugins Orb Producer Suite 3', 'Audiomodern Riffer 4'],
    ['Orb Plugins', 'Audiomodern'],
    ['Orb Suite 3', 'Riffer 4'],
    ['Orb Suite', 'Riffer 4']
  ]);
  console.log('midi done');
})();

fs.writeFileSync(B + 'data/guides.json', JSON.stringify(guides, null, 2), 'utf8');
console.log('PART A saved');
