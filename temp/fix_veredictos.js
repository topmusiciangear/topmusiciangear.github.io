// Auditoria de veredictos + conclusion. 12 correcciones, todas sobre specs o logica
// verificadas. Lo que no he podido verificar se quita el numero, no se inventa otro.
const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const s = g.find(x => x.id === 'starter-studio');
let ok = 0; const fallos = [];
function swap(de, a, et) {
  if (typeof de !== 'string') { fallos.push('parametro'); return; }
  const t0 = JSON.stringify(s);
  if (!t0.includes(de)) { fallos.push(et + '  <<  ' + de.slice(0, 60)); return; }
  const cuenta = t0.split(de).length - 1;
  (function rec(o) {
    if (typeof o === 'string') return o.split(de).join(a);
    if (Array.isArray(o)) return o.map(rec);
    if (o && typeof o === 'object') { Object.keys(o).forEach(k => { o[k] = rec(o[k]); }); }
    return o;
  })(s);
  ok += cuenta;
  console.log('  ok (' + cuenta + ')  ' + et);
}

/* ── 1) VEREDICTO NT1 SIGNATURE: reescrito entero. Decía USB, 32 bits y RODE-LINK ── */
const iSig = s.verdictProsCons.findIndex(v => v.name === 'Rode NT1 Signature Series');
if (iSig < 0) { console.log('  NO ENCONTRADO el veredicto del NT1 Signature'); }
else {
  s.verdictProsCons[iSig] = {
    name: 'Rode NT1 Signature Series', name_es: 'Rode NT1 Signature Series',
    pros: [
      'The same 4 dBA self-noise as the NT1 5th Generation, which is the number that decides whether your room noise floor is audible under a quiet take',
      'Shock mount, pop filter and XLR cable in the box, so nothing else has to be bought before the first recording',
      'One less thing to configure than the 5th Gen: XLR into the interface, and there is no app and no firmware',
      'Around a hundred and ten dollars less than the 5th Generation, which is what pays for a pair of monitors in this tier'
    ],
    cons: [
      'XLR only, so it needs an interface — there is no USB fallback if you end up recording away from your desk',
      'No 32-bit float, so a loud take clips and cannot be repaired after the fact',
      'No digital output at all, which means it cannot double as a USB microphone',
      'Same HF6 capsule as the 5th Generation, so upgrading to that model buys convenience rather than sound'
    ],
    pros_es: [
      'El mismo ruido propio de 4 dBA que el NT1 5th Generation, que es la cifra que decide si el ruido de fondo de tu sala se oye debajo de una toma tranquila',
      'Soporte, filtro antipop y cable XLR en la caja, así que no hay que comprar nada más antes de la primera grabación',
      'Una cosa menos que configurar que el 5th Gen: XLR a la interfaz, sin app y sin firmware',
      'Ciento diez dólares menos que el 5th Generation, que es lo que paga el par de monitores de este nivel'
    ],
    cons_es: [
      'Solo XLR, así que necesita interfaz: no hay alternativa por USB si acabas grabando lejos de tu escritorio',
      'Sin coma flotante de 32 bits, así que una toma fuerte satura y no se puede arreglar después',
      'Sin salida digital de ningún tipo, así que no puede hacer de micrófono USB',
      'Misma cápsula HF6 que el 5th Generation: subir a ese modelo compra comodidad, no sonido'
    ]
  };
  console.log('  ok        VEREDICTO NT1 Signature reescrito (decía USB, 32 bits y RODE-LINK)');
  ok++;
}

/* ── 2) KRK: decía 140W y woofer de 4 pulgadas; es 145W y de 7 ── */
swap('Bi-amped at 140W with a 4-inch woofer — punchy without a sub',
  'Bi-amped at 145W — 97W low, 48W high — and a 7-inch cone is punchy without a sub', 'KRK pros[3] EN: 4 pulgadas -> 7, 140W -> 145W');
swap('Biamplificado a 140 W con woofer de 4 pulgadas: con punch sin sub',
  'Biamplificado a 145 W —97 graves, 48 agudos— y un cono de 7 pulgadas: con punch sin sub', 'KRK pros_es[3] ES');

/* ── 3) Scarlett: "bus power limita la ganancia" (ya corregido en la seccion, no en el veredicto) ── */
swap('Bus power can limit gain with heavy condenser mics on some laptops',
  'Bus power can leave output voltage short, so a demanding condenser may not see stable 48V phantom from some laptops', 'Scarlett cons[4] EN');
swap('La alimentación por bus puede limitar la ganancia con condensadores pesados en algunos portátiles',
  'Con solo alimentación por bus puede faltar voltaje de salida, así que un condensador exigente puede no ver un phantom de 48 V estable desde algunos portátiles', 'Scarlett cons_es[4] ES');

/* ── 4) Scarlett cons[3]: comparar 120 dB de rango dinamico con el ruido de un micro no tiene sentido ── */
swap('120dB is measured, not listened to; the NT1 at the same price is quieter in the room',
  '120 dB is a measured figure, not a listened one — it tells you nothing about how the room sounds through the interface', 'Scarlett cons[3] EN');
swap('Los 120 dB son medidos, no escuchados; el NT1 al mismo precio hace menos ruido en la sala',
  'Los 120 dB son una cifra medida, no escuchada: no dicen nada de cómo suena la sala a través de la interfaz', 'Scarlett cons_es[3] ES');

/* ── 5) ATH-M50x: la spec oficial dice 38 ohmios, no 49 ── */
swap('49 ohm impedance wants a real headphone output, not a phone dongle',
  '38 ohm impedance is easy to drive, but a real headphone output still beats a phone dongle', 'M50x cons[3] EN: 49 -> 38 ohmios');
swap('La impedancia de 49 ohmios pide una salida de auriculares real, no un dongle de móvil',
  'La impedancia de 38 ohmios es fácil de alimentar, pero una salida de auriculares real sigue siendo mejor que un dongle de móvil', 'M50x cons_es[3] ES: 49 -> 38');
swap('Forty-nine ohms wants a real headphone output, not a phone dongle.',
  'Thirty-eight ohms is easy to drive, but a real headphone output still beats a phone dongle.', 'M50x seccion[14] EN: 49 -> 38');
swap('49 ohmios piden una salida de auriculares real, no un dongle de móvil.',
  '38 ohmios son fáciles de alimentar, pero una salida de auriculares real sigue siendo mejor que un dongle de móvil.', 'M50x seccion[14] ES: 49 -> 38');

/* ── 6) M20x: los "30 mm" no son verificables ── */
swap('Only 30 mm of padding around the ears — long sessions get warm',
  'Thin pads around a closed cup, which get warm over a long session', 'M20x cons[4] EN: fuera 30 mm');
swap('Solo 30 mm de acolchado alrededor de la oreja — las sesiones largas se calientan',
  'Almohadillas finas alrededor de una copa cerrada, que se calientan en sesiones largas', 'M20x cons_es[4] ES: fuera 30 mm');

/* ── 7) NT1 5th Gen: el "mas silencioso" esta empatado con el Signature ── */
swap('4 dBA self-noise — the quietest large-diaphragm condenser you can buy new',
  '4 dBA self-noise, matched by the NT1 Signature — so the extra money over Tier 1 buys USB and float, not quietness', 'NT1 5G pros[1] EN');
swap('4 dBA de ruido propio: el condensador de diafragma grande más silencioso que puedes comprar nuevo',
  '4 dBA de ruido propio, empatado con el NT1 Signature: el dinero extra sobre el Nivel 1 compra USB y coma flotante, no silencio', 'NT1 5G pros_es[1] ES');
swap('Its own USB output is 24-bit/192 kHz but the internal conversion is the weaker half of the package',
  'The 32-bit float only helps if the software at the other end was built to take advantage of it',
  'NT1 5G cons[1] EN: 24-bit -> 32 bits float');
swap('Su salida USB es de 24 bits/192 kHz, pero la conversión interna es la parte más débil del paquete',
  'La coma flotante de 32 bits solo ayuda si el software del otro extremo está pensado para aprovecharla',
  'NT1 5G cons_es[1] ES: 24 bits -> 32 bits float');

/* ── 8) dB-A -> dBA (la guia ya usa dBA 12 veces) ── */
swap('12 dB-A of self-noise', '12 dBA of self-noise', 'dB-A -> dBA (x2 EN)');
swap('12 dB-A de ruido propio', '12 dBA de ruido propio', 'dB-A -> dBA (x2 ES)');

/* ── 9) Seccion 5: el microfono de "3.000 dolares" no es verificable ── */
swap('The Cheapest Neumann: Why a Transformerless 102 Outlasts a $3,000 Mic',
  'The Cheapest Neumann: Why a Transformerless 102 Outlasts Its Own Flagship', 'seccion[5] EN: fuera $3,000');
swap('El Neumann más barato: por qué un 102 sin transformador dura más que un micrófono de 3.000',
  'El Neumann más barato: por qué un 102 sin transformador dura más que su propio producto insignia', 'seccion[5] ES: fuera 3.000');
swap('The only microphone here with a Neumann capsule on it, at a third of what the flagship costs',
  'The only microphone here with a Neumann capsule on it, and it costs a fraction of the flagship U-booms', 'TLM 102 pros[1] EN: fuera "un tercio"');
swap('El único micrófono de aquí con una cápsula Neumann, por un tercio de lo que cuesta el insignia',
  'El único micrófono de aquí con cápsula Neumann, y cuesta una fracción de losELO insignia', 'TLM 102 pros_es[1] ES: fuera "un tercio"');

fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\n  reemplazos: ' + ok);
if (fallos.length) { console.log('  NO APLICADOS (' + fallos.length + '):'); fallos.forEach(f => console.log('    - ' + f)); }
else console.log('  ninguno fallido');

/* CONTROL */
const s2 = JSON.parse(fs.readFileSync(F, 'utf8')).find(x => x.id === 'starter-studio');
const t = JSON.stringify(s2);
console.log('\n=== CONTROL ===');
[['4-inch woofer|woofer de 4 pulgadas', 'KRK woofer de 4"'], ['140W|140 W', 'KRK 140 W'],
 ['limit gain|limitar la ganancia', 'bus power limita ganancia'], ['49 ohm|49 ohmios', '49 ohmios'],
 ['30 mm|30 mm', '30 mm'], ['dB-A', 'dB-A'], ['$3,000|3.000', 'micro de 3.000'],
 ['Signature runs USB|Signature hace el USB|RODE-LINK', 'RODE-LINK en el Signature'],
 ['same 32-bit/192 kHz digital output|32 bits/192 kHz integrada', '32 bits en el Signature'],
 ['Both XLR and USB on one body', 'XLR y USB en el Signature'],
 ['5th Generation replaces it', 'el 5th lo sustituye'],
 ['quietest large-diaphragm|más silencioso que puedes comprar', 'el 5th Gen es "el más silencioso"']
].forEach(([re, et]) => console.log('  ' + String((t.match(new RegExp(re, 'g')) || []).length).padStart(3) + '  ' + et));

const v = s2.verdictProsCons.find(x => x.name === 'Rode NT1 Signature Series');
console.log('\n=== VEREDICTO NT1 Signature (nuevo) ===');
v.pros.forEach((x, i) => console.log('  P' + (i + 1) + ' ' + x));
v.cons.forEach((x, i) => console.log('  C' + (i + 1) + ' ' + x));
console.log('\n  veredictos 4+4 EN y ES: ' + s2.verdictProsCons.filter(x => x.pros.length >= 4 && x.cons.length >= 4 && x.pros_es.length >= 4 && x.cons_es.length >= 4).length + '/' + s2.verdictProsCons.length);
console.log('  mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
