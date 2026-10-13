const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const gj = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gj, 'utf8'));
const g = guides.find(x => x.id === 'usb-mics');
const f = g.featuredSnippet;

// ---------- FIX 1: ES FAQ questions were shuffled vs the English ones ----------
// The render pairs faq_qN_en with faq_qN_es and faq_aN_en with faq_aN_es by index,
// so mismatched questions made EN and ES answer different questions.
f.faq_q2_es = '¿Qué micrófono USB es mejor para una habitación ruidosa?';
f.faq_q3_es = '¿Qué micrófono USB tiene los mejores controles físicos?';
f.faq_q4_es = '¿Puedo usar estos micrófonos con un brazo articulado?';
f.faq_q5_es = '¿Cuál es mejor para podcasting y cuál para streaming?';

// ---------- FIX 2: absorb the three orphaned ES angles into the answers ----------
f.faq_a2_en = 'Dynamic mics reject room noise better than condensers, so start there. The <strong>Shure MV7+</strong> and <strong>Audio-Technica AT2040USB</strong> are the top picks, both dynamics with tight polar patterns, and the <strong>Samson Q2U</strong> is the cheapest way into that category. If your room is quiet and you want condenser detail instead, the <strong>sE Electronics NEOM USB</strong> is the one to take: its cardioid capsule and generous gain headroom still cope better than most condensers in an untreated space.';
f.faq_a2_es = 'Los micrófonos dinámicos rechazan el ruido de la sala mejor que los condensadores, así que conviene empezar por ahí. El <strong>Shure MV7+</strong> y el <strong>Audio-Technica AT2040USB</strong> son las mejores opciones, ambos dinámicos con patrones polares cerrados, y el <strong>Samson Q2U</strong> es la forma más barata de entrar en esa categoría. Si tu habitación es tranquila y prefieres el detalle de un condensador, entonces el <strong>sE Electronics NEOM USB</strong> es el indicado: su cápsula cardioide y su amplio margen de ganancia se manejan mejor que la mayoría de condensadores en un espacio sin tratar.';

// Do I need an audio interface? (was an orphaned ES question)
f.faq_a3_en = 'The <strong>Sennheiser Profile Streaming Set</strong> has physical gain, mix and headphone knobs plus a mute button with LED ring. The <strong>sE Electronics NEOM USB</strong> goes further with three independent analog knobs: Gain, Headphone Volume and Playback Mix. The <strong>Rode NT-USB+</strong> has gain and headphone volume, and the <strong>Audio-Technica AT2020USB-X</strong> has a headphone level knob plus a mix knob. The <strong>Samson Q2U</strong> has no hardware controls at all beyond a mute switch. And no, you do not need an interface with any of these: if you later want one, the <strong>Rode PodMic USB</strong> and the <strong>Samson Q2U</strong> both carry an XLR output you can move to a preamp without buying a new mic.';
f.faq_a3_es = 'El <strong>Sennheiser Profile Streaming Set</strong> tiene perillas físicas de ganancia, mezcla y auriculares más un botón de mute con anillo LED. El <strong>sE Electronics NEOM USB</strong> va más allá con tres perillas analógicas independientes: Ganancia, Volumen de Auriculares y Mezcla de Reproducción. El <strong>Rode NT-USB+</strong> tiene ganancia y volumen de auriculares, y el <strong>Audio-Technica AT2020USB-X</strong> tiene perilla de nivel de auriculares y perilla de mezcla. El <strong>Samson Q2U</strong> no tiene ningún control físico más allá del interruptor de mute. Y no, no necesitas interfaz con ninguno: si más adelante quieres una, el <strong>Rode PodMic USB</strong> y el <strong>Samson Q2U</strong> llevan ambos salida XLR para que pases a un preamp sin comprar otro micrófono.';

// Voice + instrument at the same time? (was an orphaned ES question)
f.faq_a5_en = 'Not as a single take, not with any mic in this guide. Every one of them is a single-channel USB microphone, so there is no second input for a guitar or bass. To record voice and instrument together you need an audio interface with two inputs, or a recorder that accepts a second channel. What this guide does cover is the upgrade path: the <strong>Samson Q2U</strong> and the <strong>Rode PodMic USB</strong> both keep an XLR output, so when you are ready for a two-input interface your microphone still works. For podcasting versus streaming, prioritize voice clarity with the <strong>Shure MV7+</strong>, <strong>Rode NT1 5th Generation</strong> or <strong>Audio-Technica AT2020USB-X</strong>, and hardware controls plus low latency with the <strong>Sennheiser Profile Streaming Set</strong>, <strong>sE Electronics NEOM USB</strong> or <strong>Elgato Wave:3</strong>.';
f.faq_a5_es = 'No como una sola toma, y no con ningún micrófono de esta guía. Todos son micrófonos USB de un solo canal, así que ninguno tiene una segunda entrada para una guitarra o un bajo. Para grabar voz e instrumento a la vez necesitas una interfaz de audio con dos entradas, o un grabador que acepte un segundo canal. Lo que sí ofrece esta guía es la vía deupgrade: el <strong>Samson Q2U</strong> y el <strong>Rode PodMic USB</strong> conservan ambos su salida XLR, así que cuando estés listo para una interfaz de dos entradas tu micrófono sigue sirviendo. Para podcasting frente a streaming, prioriza la claridad de voz con el <strong>Shure MV7+</strong>, el <strong>Rode NT1 5th Generation</strong> o el <strong>Audio-Technica AT2020USB-X</strong>, y los controles físicos con baja latencia con el <strong>Sennheiser Profile Streaming Set</strong>, el <strong>sE Electronics NEOM USB</strong> o el <strong>Elgato Wave:3</strong>.';

// ---------- FIX 3: stale G-Track Pro comparisons in VPC 6 and 7 ----------
g.verdictProsCons[6].cons[0] = 'Cardioid only — no omnidirectional, figure-8 or stereo mode, and every mic in this guide is the same, so multi-pattern capture simply is not on the table here';
g.verdictProsCons[6].cons_es[0] = 'Solo cardioide: sin modo omnidireccional, figura-8 ni estéreo, y todos los micrófonos de esta guía son igual de cardioides, así que la captación multipatrón simplemente no está sobre la mesa aquí';

g.verdictProsCons[7].cons[0] = 'Cardioid only, so a two-person interview or a room-sounding source will not capture the way a multi-pattern mic would; the <strong>Samson Q2U</strong> is cardioid too';
g.verdictProsCons[7].cons_es[0] = 'Solo cardioide, así que una entrevista a dos o una fuente que suena mucho en la sala no se captará como lo haría un micrófono multipatrón; el <strong>Samson Q2U</strong> también es cardioide';

fs.writeFileSync(gj, JSON.stringify(guides, null, 2));

// ---------- verify ----------
const t = JSON.stringify(g);
console.log('G-Track Pro refs left:', (t.match(/G-Track Pro/g) || []).length);
console.log('Yeti refs left (not in guide):', (t.match(/\bYeti\b/g) || []).length);
[1, 2, 3, 4, 5].forEach(i => {
  console.log('\nQ' + i + ' EN: ' + f['faq_q' + i + '_en']);
  console.log('Q' + i + ' ES: ' + f['faq_q' + i + '_es']);
  console.log('A' + i + ' EN len=' + f['faq_a' + i + '_en'].length + ' | ES len=' + f['faq_a' + i + '_es'].length);
});
// empty-tag bug in the new ES text
console.log('\nliteral <strong> in a5_es:', /<strong>/.test(f.faq_a5_es));