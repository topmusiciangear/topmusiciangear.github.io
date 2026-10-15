// Correcciones verificadas tras revision de traduccion y de hardware
const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const s = g.find(x => x.id === 'starter-studio');
let ok = 0; const fallos = [];

function swap(i, campo, de, a, etiqueta) {
  const sec = s.sections[i];
  if (!sec[campo].includes(de)) { fallos.push('sec[' + i + '].' + campo + ' :: ' + etiqueta); return; }
  sec[campo] = sec[campo].split(de).join(a); ok++;
}
const H = (i, campo, de, a) => {
  if (!s.sections[i][campo].includes(de)) { fallos.push('HEADING sec[' + i + '].' + campo + ' :: ' + de.slice(0, 40)); return; }
  s.sections[i][campo] = a; ok++;
};

/* ─── S4 · Apollo: era "Apollo 6110", es el UA 610 ─── */
swap(4, 'content', 'Unison circuitry is a reworking of the Apollo 6110, which is a much more expensive preamp,',
  'Unison circuitry is a reworking of Universal Audio’s own UA 610 valve preamp, which is a much more expensive thing to emulate', 'UA 610 EN');
swap(4, 'content_es', 'El circuitry Unison es una rediseño del Apollo 6110, que es un previo mucho más caro,',
  'Los circuitos Unison son un rediseño del propio UA 610 de Universal Audio, el previo de válvulas que cuesta mucho más caro,', 'UA 610 + circuitry + genero EN->ES');

/* ─── S10 · Scarlett 2i2: sin MIDI y sin DIN; y la alimentacion por bus ─── */
swap(10, 'content', 'No MIDI, so a controller needs a DIN adapter.',
  'No MIDI at all, and no DIN socket to plug one into either — a five-pin controller needs a USB-to-MIDI cable running to the computer, not an adaptor into this box.', 'DIN EN');
swap(10, 'content_es', 'Sin MIDI, así que un controlador necesita un adaptador DIN.',
  'Sin MIDI, y sin conector DIN donde enchufar uno: un controlador de 5 pines necesita un cable USB-a-MIDI hasta el ordenador, no un adaptador a esta caja.', 'DIN ES');
swap(10, 'content', 'And bus power can run short of gain with a heavy condenser on a laptop with no second power source.',
  'And on bus power alone it is output voltage that runs short, so a demanding condenser may not see a stable 48V phantom from a laptop with no second power source — the preamp gain itself is unaffected.', 'bus power EN');
swap(10, 'content_es', 'Y la alimentación por bus puede quedarse corta de ganancia con un condensador pesado en un portátil sin otra fuente.',
  'Y con solo alimentación por bus lo que se queda corto es el voltaje de salida, así que un condensador exigente puede no recibir un phantom de 48 V estable de un portátil sin otra fuente: la ganancia del preamplificador no se ve afectada.', 'bus power ES');

/* ─── S13 · NT1 Signature · REESCRITURA COMPLETA (era falso: no tiene USB ni 32 bits) ─── */
H(13, 'heading', 'One Body, Two Outputs: The NT1 Signature as XLR and USB', 'The NT1 Signature Is XLR Only, and That Is the Point');
H(13, 'heading_es', 'Un cuerpo, dos salidas: el NT1 Signature como XLR y USB', 'El NT1 Signature es solo XLR, y ese es el punto');
s.sections[13].content =
  '<p><strong>The NT1 Signature is the NT1 you plug into an interface and nothing else.</strong> It is a purely analogue XLR microphone: no USB port, no 32-bit float conversion, no RØDE-LINK app and no second output of any kind. What a hundred and ten dollars buys you against the 5th Generation is the same 4 dBA self-noise and the same one-inch HF6 cardioid capsule, in a box that ships with a shock mount, an integrated pop filter and an XLR cable.</p>' +
  '<p>The NT1 5th Generation is the one with USB-C alongside XLR and 32-bit float capture, driven through RØDE-LINK. That is genuinely useful when you record away from your desk, because the microphone becomes the interface. It is also most of the reason the Signature costs less: the conversion hardware is exactly what you are not paying for.</p>' +
  '<p>In this build the Signature is the right one. Every tier already includes an audio interface, so a USB output would duplicate hardware you own. Spend the difference on the capsule and the quietness instead of on a converter nothing in this chain needs. The moment you start recording somewhere other than this desk — a live room, a rehearsal space, someone else’s studio — the 5th Generation becomes the better buy.</p>';
s.sections[13].content_es =
  '<p><strong>El NT1 Signature es el NT1 que enchufas a una interfaz y nada más.</strong> Es un micrófono de XLR puramente analógico: sin puerto USB, sin conversión en coma flotante de 32 bits, sin app RØDE-LINK y sin segunda salida de ningún tipo. Lo que compras con esos ciento diez dólares frente al 5th Generation es el mismo ruido propio de 4 dBA y la misma cápsula cardioide HF6 de una pulgada, en una caja que incluye soporte, filtro antipop integrado y cable XLR.</p>' +
  '<p>El NT1 5th Generation es el que tiene USB-C junto al XLR y captura en coma flotante de 32 bits, gestionada con RØDE-LINK. Eso es útil de verdad cuando grabas lejos de tu escritorio, porque el micrófono se convierte en la interfaz. Y también es la mayor parte de la razón por la que el Signature cuesta menos: el hardware de conversión es precisamente lo que no estás pagando.</p>' +
  '<p>En este montaje el Signature es el correcto. Los tres niveles ya incluyen una interfaz de audio, así que una salida USB duplicaría un equipo que ya tienes. Gasta la diferencia en la cápsula y en el silencio, no en un convertidor que nada de esta cadena necesita. En cuanto empieces a grabar en otro sitio que no sea este escritorio —una sala en directo, un local de ensayo, el estudio de otro— el 5th Generation pasa a ser la mejor compra.</p>';
ok += 4;

/* ─── S14 ES · "Las pajas" y "el escurrido" ─── */
swap(14, 'content_es', 'Las pajas son prácticas, no tonales.', 'Las concesiones son prácticas, no tonales.', 'pajas');
swap(14, 'content_es', 'el escurrido adelgaza antes que el driver', 'las almohadillas de piel sintética se gastan antes que el driver', 'escurrido');

/* ─── S15 · los "30 mm" de acolchado no son verificables ─── */
swap(15, 'content', 'Padding is thirty millimetres, which gets warm over a long session.', 'The ear pads are thin, which gets warm over a long session.', '30mm EN');
swap(15, 'content_es', 'El acolchado es de treinta milímetros, que se calienta en sesiones largas.', 'Las almohadillas son finas, lo que se calienta en sesiones largas.', '30mm ES');

/* ─── S17 · "EQ Doppler" no existe: es el filtro de escritorio del DSP trasero ─── */
swap(17, 'content', 'The Doppler EQ and the room calibration presets handle the desk you are actually sitting at, which saves buying acoustic panels you do not need yet.',
  'The rear-panel DSP carries a desk filter — a wide-Q parametric cut centred at 200 Hz — that handles the low-mid build-up the desk in front of you creates, plus boundary EQ for when the speakers end up against a wall. That saves buying panels you do not need yet.', 'Doppler EN');
swap(17, 'content_es', 'El EQ Doppler y los presets de calibración de sala se ocupan del escritorio en el que realmente te sientas, lo que te ahorra comprar paneles que todavía no necesitas.',
  'El DSP del panel trasero lleva un filtro de escritorio: un corte paramétrico de Q ancha centrado en 200 Hz que corrige el exceso de medios graves que crea el escritorio que tienes delante, además de un EQ de contorno para cuando los monitores acaban pegados a una pared. Eso te ahorra comprar paneles que todavía no necesitas.', 'Doppler ES');

/* ─── S8 y S18 · fisica del filtrado en peine y grosor real del panel (14 cm) ─── */
swap(8, 'content', 'the direct sound of your voice arrives at the same instant as a reflection off the wall behind you, and the two partially cancel. Bass disappears first because it is the easiest thing to cancel.',
  'a reflection off the wall behind you arrives a fraction of a millisecond after the direct sound, and wherever the two meet out of phase that frequency is cancelled. Because those wavelengths are short, the notches land in the mids and highs — which is exactly where a first reflection point does the most damage.', 'pein EN');
swap(8, 'content_es', 'el sonido directo de tu voz llega en el mismo instante que un rebote de la pared de detrás, y los dos se cancelan parcialmente. El bajo desaparece primero porque es lo más fácil de cancelar.',
  'un rebote de la pared de detrás llega una fracción de milisegundo después del sonido directo, y allí donde los dos se encuentran fuera de fase se cancela esa frecuencia. Como esas longitudes de onda son cortas, los nulos caen en los medios y los agudos, que es justo donde un punto de primera reflexión hace más daño.', 'pein ES');
swap(8, 'content', 'Absorb them and the comb filtering goes with them.', 'Absorb those reflections and the comb filtering goes with them.', 'absorbe EN');
swap(8, 'content_es', 'Absórbelos y el filtrado se va con ellos.', 'Absorbe esos rebotes y el filtrado se va con ellos.', 'absorbe ES');
swap(8, 'content', 'Ten centimetres of foam are not bass traps.', 'Fourteen centimetres of foam are not bass traps.', '10cm EN');
swap(8, 'content_es', 'Diez centímetros de espuma no son trampas de graves.', 'Catorce centímetros de espuma no son trampas de graves.', '10cm ES');
swap(8, 'content_es', 'el empastre de medios que hace que cada micrófono barato suene peor', 'el barro en los medios que hace que cada micrófono barato suene peor', 'empastre S8');

swap(18, 'content_es', 'Diez centímetros de espuma no son trampas de graves', 'Catorce centímetros de espuma no son trampas de graves', '10cm S18');
swap(18, 'content_es', 'el empastre de medios que hace que cada micrófono barato suene peor', 'el barro en los medios que hace que cada micrófono barato suene peor', 'empastre S18');

/* ─── S20 · "plosivas" y "filtro antiviento" ─── */
H(20, 'heading_es', 'HexTech: matar las explosivas sin matar el tono', 'HexTech: matar las plosivas sin matar el tono');
swap(20, 'content_es', 'graba cada ráfaga de aire de una P o una B como un golpe grave.',
  'graba cada ráfaga de aire de una P o una B como un golpe grave, que es lo que en el taller llaman una plosiva.', 'plosiva 1');
swap(20, 'content_es', 'La solución más barata es un antiviento de espuma, y lo peor de ella es que embota el micrófono mientras resuelve el problema.',
  'La solución más barata es un filtro antiviento de espuma, y lo peor es que apaga los agudos del micrófono mientras resuelve el problema.', 'embota');
swap(20, 'content_es', 'lo que ya dice lo bien que funciona con las explosivas', 'lo que ya dice lo bien que funciona con las plosivas', 'plosiva 2');

/* ─── S21 · el cable: fisica del star-quad y "depurar" ─── */
H(21, 'heading', 'The Cable You Stop Debugging', 'The Cable You Stop Fault-Finding');
H(21, 'heading_es', 'El cable que dejas de depurar', 'El cable que dejas de diagnosticar');
swap(21, 'content', 'uses a quad-conductor Neglex layout, which means the signal runs twice and cancels its own interference on the way.',
  'uses a four-conductor Neglex star-quad layout: the audio runs along two conductors in opposite phase, so any electromagnetic noise the cable picks up from the room is induced equally on both and cancels out at the input, while the audio itself arrives intact.', 'starquad EN');
swap(21, 'content_es', 'usa un diseño cuadruple de conductor Neglex, lo que significa que la señal viaja dos veces y se cancela a sí misma por el camino.',
  'usa un diseño de cuatro conductores Neglex en configuración de par cuadripolar: el audio viaja por dos conductores en fase opuesta, así que cualquier ruido electromagnético que el cable capte de la sala se induce por igual en ambos y se cancela en la entrada, mientras que la señal llega intacta.', 'starquad ES');
swap(21, 'content_es', 'nada de zumbido por una sala mal puesta a tierra', 'nada de zumbido por una instalación sin toma de tierra', 'tierra');
swap(21, 'content_es', 'la primera toma apagada resulta ser oxidación', 'la primera toma sorda resulta ser oxidación', 'apagada');

/* ─── S19 · comping ─── */
swap(19, 'content_es', 'acabas compingando tomas que nunca fueron inconsistentes', 'acabas haciendo el comping de unas tomas que nunca fueron inconsistentes', 'comping');

fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('  aplicadas: ' + ok);
if (fallos.length) { console.log('\n  NO APLICADAS (' + fallos.length + '):'); fallos.forEach(f => console.log('    - ' + f)); }
else console.log('  ninguna fallo');

/* CONTROL */
const s2 = JSON.parse(fs.readFileSync(F, 'utf8')).find(x => x.id === 'starter-studio');
const t = JSON.stringify(s2);
const malas = [
  ['6110', /6110/], ['circuitry', /circuitry/], ['una rediseño', /una rediseño/],
  ['Doppler', /Doppler/i], ['adaptador DIN', /adaptador DIN|DIN adapter/],
  ['pajas', /Las pajas/], ['escurrido', /escurrido/],
  ['30 mm acolchado', /thirty millimetres|treinta milímetros/],
  ['10 cm espuma', /Ten centimetres|Diez centímetros/],
  ['empastre', /empastre/], ['explosivas', /explosivas/],
  ['depurar', /depurar/], ['Debugging', /Debugging/],
  ['se cancela a sí misma', /cancels its own interference|se cancela a sí misma/],
  ['bajo desaparece primero', /Bass disappears first|bajo desaparece primero/],
  ['32 bits en el Signature', /same 32-bit|same salida digital de 32 bits/],
  ['RODE-LINK en el Signature', /Signature runs USB|Signature hace el USB/]
];
console.log('\n=== CONTROL (0 = limpio) ===');
let sucios = 0;
malas.forEach(([nombre, re]) => { const n = (t.match(new RegExp(re.source, 'g')) || []).length; if (n) sucios += n; console.log('  ' + String(n).padStart(3) + '  ' + nombre); });
console.log('\n  mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
console.log('  total de residuos: ' + sucios);
