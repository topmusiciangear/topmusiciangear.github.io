const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const G = JSON.parse(fs.readFileSync(DIR + 'data/guides.json', 'utf8'));
const g = G.find(v => v.id === 'best-looper-pedals');
if (!g) throw new Error('guide not found');

const RH = (oldEn, newEn, oldEs, newEs) => {
  const sec = g.sections.find(s => s.heading === oldEn);
  if (!sec) throw new Error('heading not found: ' + oldEn);
  sec.heading = newEn;
  const secEs = g.sections.find(s => s.heading_es === oldEs);
  if (!secEs) throw new Error('heading_es not found: ' + oldEs);
  secEs.heading_es = newEs;
};
RH('Is the Boss RC-5 Loop Station the Best Pedal for Your Pedalboard?', '13 Hours of Stereo: RC-5 Loop Station',
  '¿Es el Boss RC-5 Loop Station el mejor pedal para tu pedalera?', '13 horas en estéreo: RC-5 Loop Station');
RH('Is the TC Electronic Ditto Looper the Best Pedal for Your Pedalboard?', 'One Knob, Zero Menus: Ditto Looper',
  '¿Es el TC Electronic Ditto Looper el mejor pedal para tu pedalera?', 'Un mando, cero menús: Ditto Looper');
console.log('existing headings rewritten');

const SEC = (heading, heading_es, content, content_es, products) => ({ heading, heading_es, content, content_es, products });
g.sections.push(SEC(
  'Two Tracks, One Mic, Zero Excuses: RC-500',
  'Dos pistas, un micro, cero excusas: RC-500',
  '<strong>Two tracks change everything: the RC-500 pairs looping with a real mic input.</strong> 13 hours of 32-bit stereo recording across 99 memories, 57 rhythms with 16 kits, Loop FX and reverse cover writing and gigging, with TRS MIDI, USB backup and WAV import. It runs 4xAA or adapter at 240mA. Singer-songwriters and arrangers who outgrew single-track loopers live here. Just know it has more menu depth than the simple RC-5.',
  '<strong>Dos pistas lo cambian todo: el RC-500 suma una entrada de micro de verdad.</strong> 13 horas estéreo a 32 bits en 99 memorias, 57 ritmos con 16 kits, Loop FX y reverse cubren composición y directo, con MIDI TRS, backup USB e importación WAV. Funciona con 4xAA o adaptador a 240 mA. Aquí viven cantautores y arreglistas que superaron los loopers de una pista. Solo ten en cuenta más menús que el simple RC-5.',
  [586]
));
g.sections.push(SEC(
  'Verse and Chorus in Two Loops: Ditto X4',
  'Estrofa y estribillo en dos loops: Ditto X4',
  '<strong>Songs have verses and choruses: the X4 gives each its own stereo loop.</strong> 5 minutes of 24-bit audio across two tracks with sync or serial modes, 7 loop FX, decay control and MIDI sync keep arrangements tight, plus USB backup and true bypass. Power supply included, no battery option. Songwriters building full structures live will feel at home. Only note the larger footprint next to single loopers.',
  '<strong>Los temas tienen estrofa y estribillo: el X4 da a cada parte su loop estéreo.</strong> 5 minutos a 24 bits en dos pistas con modos sync o serial, 7 efectos, decay y MIDI sync mantienen los arreglos firmes, más backup USB y true bypass. Fuente incluida, sin opción a pila. Compositores que arman estructuras completas en vivo se sentirán en casa. Solo nota su mayor tamaño frente a un looper simple.',
  [587]
));
g.sections.push(SEC(
  'Twelve Minutes, Ten Loops, No Fuss: EHX 720',
  'Doce minutos, diez loops, sin líos: EHX 720',
  '<strong>Twelve minutes, ten loops, two switches: the 720 keeps stereo looping stupid simple.</strong> Undo/redo, reverse, half-speed and fadeout trails cover the essentials, with 24-bit audio, expandable footswitch control, 9V battery or included adapter. Players who want dependable stereo looping fast should start here. The trade-offs: no MIDI and no built-in rhythms.',
  '<strong>Doce minutos, diez loops, dos pulsadores: el 720 mantiene el looping estéreo facilísimo.</strong> Undo/redo, reverse, half-speed y fadeout cubren lo esencial, con audio 24 bits, control ampliable por footswitch, pila 9V o adaptador incluido. Quienes quieren looping estéreo fiable ya deberían empezar aquí. Las renuncias: sin MIDI ni ritmos integrados.',
  [588]
));
g.sections.push(SEC(
  'Flip Between Two Loops Mid-Song: Infinity 2',
  'Alterna dos loops en pleno tema: Infinity 2',
  '<strong>Two loops, zero gaps: the Infinity 2 flips parts exactly at the cycle end.</strong> Hi-fi 24-bit/48kHz stereo audio, five selectable modes, USB backup, buffered bypass, 9V at 100mA. Ambient dreamers and verse/chorus loopers who hate dropouts, this is your tool. Just expect fewer onboard extras than workstation loopers.',
  '<strong>Dos loops, cero cortes: el Infinity 2 cambia de parte justo al final del ciclo.</strong> Audio estéreo hi-fi 24 bits/48 kHz, cinco modos, backup USB, bypass con buffer, 9V a 100 mA. Ambient soñador y loopers de estrofa/estribillo que odian los huecos, esta es vuestra herramienta. Solo esperad menos extras que las estaciones looper.',
  [589]
));
g.sections.push(SEC(
  'Six Hi-Fi Minutes in a Mini Box: Clone Looper',
  'Seis minutos hi-fi en caja mini: Clone Looper',
  '<strong>Six hi-fi minutes in an MXR mini box: the Clone proves size is not sound.</strong> Unlimited overdubs, half/double speed, reverse and Play Once mode, with expression/tap control and switchable true/buffered bypass. Adapter included, no battery. Pedalboards where every centimeter counts need this. Single-track limits versus multi-track stations remain.',
  '<strong>Seis minutos hi-fi en caja mini MXR: el Clone demuestra que el tamaño no es el sonido.</strong> Overdubs ilimitados, half/double speed, reverse y modo Play Once, con control por expresión/tap y true/buffered conmutable. Adaptador incluido, sin pila. Las pedaleras donde cada centímetro cuenta lo necesitan. Sigue el límite de una pista frente a estaciones multipista.',
  [590]
));
console.log('5 sections added');

g.featuredProducts = [200, 201, 586, 587, 588, 589, 590];
console.log('featured extended');

// Table fixes (verified: Boss/EHX/official specs + zzounds)
const row = label => {
  const r = g.productTable.rows.find(rr => rr.label === label);
  if (!r) throw new Error('no row ' + label);
  return r;
};
const setCell = (label, i, from, to) => {
  const r = row(label);
  if (r.values[i].value !== from) throw new Error(label + ' [' + i + '] EN unexpected: ' + r.values[i].value);
  r.values[i].value = to; r.values[i].value_es = to;
};
setCell('Estimated Price', 2, '$319.99–$349.99', '$319.99–$351.99');
setCell('Current Draw', 2, '200 mA', '240 mA');
setCell('Size', 2, '173 x 138 x 57 mm', '170 x 138 x 60 mm');
setCell('Current Draw', 5, '250 mA', '100 mA');
{
  const r = row('Power');
  if (r.values[2].value !== '9V DC (PSA adapter included)') throw new Error('power RC500 unexpected: ' + r.values[2].value);
  r.values[2].value = '4x AA (adapter optional)'; r.values[2].value_es = '4x AA (adaptador opcional)';
  if (r.values[5].value_es !== r.values[5].value) throw new Error('power es mismatch');
}
{
  const r = row('Bypass');
  if (r.values[5].value !== 'True Bypass') throw new Error('bypass inf unexpected: ' + r.values[5].value);
  r.values[5].value = 'Buffered'; r.values[5].value_es = 'Buffered';
}
console.log('table cells fixed');

fs.writeFileSync(DIR + 'data/guides.json', JSON.stringify(G, null, 2) + '\n');
console.log('guides.json written');
