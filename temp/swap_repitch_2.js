const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
const g = guides.find(x => x.id === 'autotune-vs-melodyne');
if (!g) { console.log('GUIA NO ENCONTRADA'); process.exit(1); }

g.id = 'repitch-vs-melodyne';
g.title = 'RePitch 2 vs Melodyne 5: Which Pitch Editor to Buy?';
g.title_es = 'RePitch 2 vs Melodyne 5: ¿Qué editor de afinación comprar?';
g.metaDesc = 'RePitch 2 Standard vs Melodyne 5 Essential: two surgical pitch editors compared on workflow, timing tools, price and best uses so you buy right.';
g.metaDesc_es = 'RePitch 2 Standard vs Melodyne 5 Essential: dos editores de afinación comparados en flujo, herramientas de tiempo, precio y usos para comprar bien.';
g.intro = 'If you record vocals, you will eventually need pitch correction. The two most respected surgical editors are Synchro Arts RePitch 2 and Celemony Melodyne 5. Both work offline, note by note, and both can make a vocal sound perfectly tuned without anyone noticing. The difference is workflow: RePitch 2 is built for speed, with multi-track editing, tuning macros and timing tools in one window, while Melodyne 5 goes deeper, with polyphonic editing and formant control that no rival matches. This guide compares them head to head so you can buy the right editor first.';
g.intro_es = 'Si grabas voces, eventualmente necesitarás corrección de tono. Los dos editores quirúrgicos más respetados son Synchro Arts RePitch 2 y Celemony Melodyne 5. Ambos trabajan offline, nota por nota, y ambos pueden hacer que una voz suene perfectamente afinada sin que nadie lo note. La diferencia es el flujo: RePitch 2 está hecho para velocidad, con edición multipista, macros de afinación y herramientas de tiempo en una ventana, mientras Melodyne 5 va más hondo, con edición polifónica y control de formantes que ningún rival iguala. Esta guía los compara frente a frente para que compres el editor correcto primero.';

g.sections[0] = {
  heading: 'RePitch 2 Standard: Fast, Natural Tuning With Multi-Track Editing',
  heading_es: 'RePitch 2 Standard: Afinación Natural y Veloz Con Edición Multipista',
  products: [1040],
  content: '<p><strong>RePitch 2 Standard tunes vocals fast without ever sounding processed.</strong> Its pitch engine keeps the natural character of the performance while you drag notes, reshape vibrato and fix timing with macros that handle repetitive moves in one click. Multi-track editing shows every take side by side in a single view, so comping and matching doubles takes minutes instead of an hour.</p><p>SmartAttack snaps vocals to your DAW grid or to another track for pocket-perfect timing, and SynchroLink keeps tuning in sync with VocAlign and Revoice Pro if you own them. For engineers who tune vocals every day and bill by the hour, RePitch 2 pays for itself in the first week.</p>',
  content_es: '<p><strong>RePitch 2 Standard afina voces rápido sin sonar procesado nunca.</strong> Su motor de tono conserva el carácter natural de la interpretación mientras arrastras notas, remodelas vibrato y corriges tiempo con macros que resuelven movimientos repetitivos en un clic. La edición multipista muestra cada toma lado a lado en una sola vista, así compear e igualar dobles toma minutos en lugar de una hora.</p><p>SmartAttack ajusta voces a la rejilla de tu DAW o a otra pista para un tiempo perfecto, y SynchroLink mantiene la afinación sincronizada con VocAlign y Revoice Pro si los tienes. Para ingenieros que afinan voces cada día y cobran por hora, RePitch 2 se amortiza en la primera semana.</p>',
  pros: ['Transparent tuning that keeps the performance character', 'Multi-track editing shows every take in one view', 'Tuning macros and SmartAttack timing save hours', 'SynchroLink syncs with VocAlign and Revoice Pro'],
  pros_es: ['Afinación transparente que conserva el carácter de la toma', 'La edición multipista muestra cada toma en una vista', 'Macros de afinación y tiempo SmartAttack ahorran horas', 'SynchroLink sincroniza con VocAlign y Revoice Pro'],
  cons: ['No polyphonic pitch editing like Melodyne Studio', 'No real-time or live performance mode', 'Standard tier costs more than Melodyne Essential', 'Fewer third-party tutorials than Melodyne'],
  cons_es: ['Sin edición polifónica como Melodyne Studio', 'Sin modo en tiempo real ni para directo', 'El nivel Standard cuesta más que Melodyne Essential', 'Menos tutoriales de terceros que Melodyne']
};

g.sections[1].products = [1032];
// adjust Melodyne section mentions of Auto-Tune
let s1 = JSON.stringify(g.sections[1]);
[['You cannot use Melodyne on stage because it requires offline analysis. Auto-Tune processes audio in real time with minimal latency, making it the standard for broadcast, live sound, and quick turnaround sessions.',
  'Neither editor works live: both need offline analysis. Where they differ is depth. RePitch 2 wins on speed for everyday vocal tuning, while Melodyne goes further with polyphonic material.'],
 ['No puedes usar Melodyne en escenario porque requiere análisis offline. Auto-Tune procesa audio en tiempo real con latencia mínima, lo que lo hace el estándar para broadcast, sonido en vivo y sesiones de entrega rápida.',
  'Ningún editor funciona en vivo: ambos necesitan análisis offline. Donde difieren es en profundidad. RePitch 2 gana en velocidad para afinación vocal diaria, mientras Melodyne llega más lejos con material polifónico.']
].forEach(([a, b]) => { s1 = s1.split(a).join(b); });
g.sections[1] = JSON.parse(s1);

g.verdictProsCons[0] = { name: 'RePitch 2 Standard', name_es: 'RePitch 2 Standard',
  pros: ['Fast transparent tuning', 'Multi-track editing in one view', 'Macros + SmartAttack timing', 'SynchroLink to VocAlign/Revoice'],
  pros_es: ['Afinación transparente y veloz', 'Edición multipista en una vista', 'Macros + tiempo SmartAttack', 'SynchroLink a VocAlign/Revoice'],
  cons: ['No polyphonic editing', 'No live mode', 'Costs more than Essential', 'Fewer tutorials'],
  cons_es: ['Sin edición polifónica', 'Sin modo en vivo', 'Cuesta más que Essential', 'Menos tutoriales'] };

g.faq = [
  { q: 'Can RePitch 2 do what Melodyne does?',
    q_es: '¿Puede RePitch 2 hacer lo que hace Melodyne?',
    a: 'For monophonic vocals, yes, and usually faster. RePitch 2 matches Melodyne on transparent note-by-note tuning, timing correction and vibrato shaping, with multi-track editing and macros that speed up daily work. What it cannot do is polyphonic editing: Melodyne Studio can retune individual notes inside chords and mixed audio, which RePitch cannot.',
    a_es: 'Para voces monofónicas, sí, y normalmente más rápido. RePitch 2 iguala a Melodyne en afinación transparente nota por nota, corrección de tiempo y modelado de vibrato, con edición multipista y macros que aceleran el trabajo diario. Lo que no puede es edición polifónica: Melodyne Studio puede reafinar notas individuales dentro de acordes y audio mezclado, lo que RePitch no puede.' },
  { q: 'Is Melodyne worth the learning curve over RePitch 2?',
    q_es: '¿Merece Melodyne su curva de aprendizaje frente a RePitch 2?',
    a: 'It depends on your material. If you tune pop, hip-hop and singer-songwriter vocals all day, RePitch 2 gets you to finished faster with less study. If you edit choirs, polyphonic instruments or productions where formant character must be reshaped, Melodyne depth justifies the learning time.',
    a_es: 'Depende de tu material. Si afinas voces pop, hip-hop y cantautor todo el día, RePitch 2 llega al terminado más rápido con menos estudio. Si editas coros, instrumentos polifónicos o producciones donde el carácter de formantes debe remodelarse, la profundidad de Melodyne justifica el tiempo de aprendizaje.' },
  { q: 'Should I buy RePitch 2 or Melodyne 5 Essential first?',
    q_es: '¿Debería comprar RePitch 2 o Melodyne 5 Essential primero?',
    a: 'Buy Melodyne 5 Essential first if budget is tight: at $99 it handles transparent vocal tuning and costs $50 less. Buy RePitch 2 Standard first if you tune vocals daily and value speed: multi-track editing, macros and SynchroLink with VocAlign pay back the $149 quickly. Many engineers end up owning both.',
    a_es: 'Compra Melodyne 5 Essential primero si el presupuesto es justo: a $99 maneja afinación vocal transparente y cuesta $50 menos. Compra RePitch 2 Standard primero si afinas voces a diario y valoras la velocidad: la edición multipista, las macros y SynchroLink con VocAlign amortizan los $149 rápido. Muchos ingenieros terminan con ambos.' },
  { q: 'Do I still need Auto-Tune if I own RePitch or Melodyne?',
    q_es: '¿Sigo necesitando Auto-Tune si tengo RePitch o Melodyne?',
    a: 'Only for two cases: live performance and the hard-tuned robotic effect. Neither RePitch nor Melodyne works in real time, so stage tuning and the T-Pain sound still need Auto-Tune. For studio correction that sounds untouched, RePitch or Melodyne alone is enough.',
    a_es: 'Solo para dos casos: directo y el efecto robótico de afinación dura. Ni RePitch ni Melodyne funcionan en tiempo real, así que la afinación en escenario y el sonido T-Pain siguen necesitando Auto-Tune. Para corrección de estudio que suene intacta, RePitch o Melodyne solos bastan.' }
];

g.featuredProducts = [1040, 1032];
g.productTable = {
  title: 'RePitch 2 vs Melodyne 5 Compared',
  title_es: 'RePitch 2 vs Melodyne 5 comparados',
  columns: [
    { title: 'Synchro Arts RePitch 2 Standard', title_es: 'Synchro Arts RePitch 2 Standard' },
    { title: 'Celemony Melodyne 5 Essential', title_es: 'Celemony Melodyne 5 Essential' }
  ],
  rows: [
    { label: 'Best For', label_es: 'Ideal para',
      values: [
        { value: 'Fast daily vocal tuning', value_es: 'Afinación vocal diaria y veloz' },
        { value: 'Budget transparent correction', value_es: 'Corrección transparente con presupuesto' }
      ] },
    { label: 'Editing', label_es: 'Edición',
      values: [
        { value: 'Note-by-note + multi-track view', value_es: 'Nota por nota + vista multipista' },
        { value: 'Note-by-note, monophonic', value_es: 'Nota por nota, monofónico' }
      ] },
    { label: 'Timing Tools', label_es: 'Herramientas de tiempo',
      values: [
        { value: 'SmartAttack + tuning macros', value_es: 'SmartAttack + macros de afinación' },
        { value: 'Manual note timing', value_es: 'Tiempo de notas manual' }
      ] },
    { label: 'Ecosystem', label_es: 'Ecosistema',
      values: [
        { value: 'SynchroLink to VocAlign/Revoice', value_es: 'SynchroLink a VocAlign/Revoice' },
        { value: 'Standalone, ARA in most DAWs', value_es: 'Independiente, ARA en la mayoría de DAW' }
      ] },
    { label: 'Price', label_es: 'Precio',
      values: [
        { value: '$149', value_es: '$149' },
        { value: '$99', value_es: '$99' }
      ] }
  ]
};

g.verdict = 'Buy Synchro Arts RePitch 2 Standard for fast daily vocal tuning: multi-track editing, macros and SmartAttack finish vocals in minutes. Buy Celemony Melodyne 5 Essential to start cheaper or to go deeper later with polyphonic editing and formant control. For bread-and-butter vocal work, RePitch is the quicker tool; for ultimate depth, Melodyne remains the reference.';
g.verdict_es = 'Compra Synchro Arts RePitch 2 Standard para afinación vocal diaria y veloz: edición multipista, macros y SmartAttack terminan voces en minutos. Compra Celemony Melodyne 5 Essential para empezar más barato o ir más hondo después con edición polifónica y control de formantes. Para trabajo vocal de todos los días, RePitch es la herramienta más rápida; para profundidad máxima, Melodyne sigue siendo la referencia.';

// conclusion related links: swap any autotune self-refs
let concl = JSON.stringify({ c: g.conclusion, ce: g.conclusion_es });
concl = concl.split('autotune-vs-melodyne').join('repitch-vs-melodyne');
concl = concl.split('Auto-Tune vs Melodyne').join('RePitch 2 vs Melodyne 5');
concl = concl.split('Auto-Tune vs Melodyne for pitch').join('RePitch 2 vs Melodyne 5 for pitch');
const cj = JSON.parse(concl);
g.conclusion = cj.c; g.conclusion_es = cj.ce;

fs.writeFileSync(B + 'data/guides.json', JSON.stringify(guides, null, 2), 'utf8');
console.log('GUIA reescrita: ' + g.id);

// ============ 3. LINKER: vocalign-vs-revoice-pro ============
const v = guides.find(x => x.id === 'vocalign-vs-revoice-pro');
let vs = JSON.stringify(v);
let n = 0;
[['/guides/autotune-vs-melodyne.html', '/guides/repitch-vs-melodyne.html'],
 ['Auto-Tune vs Melodyne for pitch', 'RePitch 2 vs Melodyne 5 for pitch']
].forEach(([a, b]) => {
  while (vs.includes(a)) { vs = vs.split(a).join(b); n++; }
});
const v2 = JSON.parse(vs);
Object.keys(v).forEach(k => delete v[k]);
Object.assign(v, v2);
fs.writeFileSync(B + 'data/guides.json', JSON.stringify(guides, null, 2), 'utf8');
console.log('linker swaps: ' + n);
