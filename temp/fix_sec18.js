// Seccion 18: los mismos errores que la 8, en los dos idiomas
const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const s = g.find(x => x.id === 'starter-studio');
let ok = 0; const fallos = [];

function swap(i, campo, de, a, et) {
  const sec = s.sections[i];
  if (!sec[campo].includes(de)) { fallos.push('sec[' + i + '].' + campo + ' :: ' + et); return; }
  sec[campo] = sec[campo].split(de).join(a); ok++;
}

// S8 EN: mi busqueda anterior fallaba porque decia "is not bass trapping", no "are not bass traps"
swap(8, 'content', 'Ten centimetres of foam is not bass trapping.', 'Fourteen centimetres of foam is not bass trapping.', '8 EN 10cm');

// S18 EN: fisica del filtrado en peine + grosor + "Absorb them"
swap(18, 'content', 'Direct sound from your voice arrives at the same instant as a reflection off the wall behind you, and the two partially cancel. Low frequencies disappear first, because they are the easiest to cancel.',
  'A reflection off the wall behind you arrives a fraction of a millisecond after the direct sound, and wherever the two meet out of phase that frequency is cancelled. Because those wavelengths are short, the notches land in the mids and highs — which is exactly where a first reflection point does the most damage.', '18 EN pein');
swap(18, 'content', 'Absorb them and the comb filtering goes with them.', 'Absorb those reflections and the comb filtering goes with them.', '18 EN absorbe');
swap(18, 'content', 'Ten centimetres of foam is not bass trapping', 'Fourteen centimetres of foam is not bass trapping', '18 EN 10cm');

// S18 ES: misma fisica + "Absórbelos"
swap(18, 'content_es', 'El sonido directo de tu voz llega en el mismo instante que un rebote de la pared de detrás, y los dos se cancelan parcialmente. Las frecuencias graves desaparecen primero, porque son lo más fácil de cancelar.',
  'Un rebote de la pared de detrás llega una fracción de milisegundo después del sonido directo, y allí donde los dos se encuentran fuera de fase se cancela esa frecuencia. Como esas longitudes de onda son cortas, los nulos caen en los medios y los agudos, que es justo donde un punto de primera reflexión hace más daño.', '18 ES pein');
swap(18, 'content_es', 'Absórbelos y el filtrado se va con ellos.', 'Absorbe esos rebotes y el filtrado se va con ellos.', '18 ES absorbe');

fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('  aplicadas: ' + ok);
if (fallos.length) { console.log('  NO APLICADAS:'); fallos.forEach(f => console.log('    - ' + f)); }
else console.log('  ninguna fallo');

/* CONTROL FINAL */
const s2 = JSON.parse(fs.readFileSync(F, 'utf8')).find(x => x.id === 'starter-studio');
const t = JSON.stringify(s2);
console.log('\n=== CONTROL FINAL ===');
[['6110', 'Apollo 6110'], ['\bDoppler\b', 'EQ Doppler'], ['\bTen centimetres\b', '10 cm EN'],
 ['Diez centímetros', '10 cm ES'], ['adaptador DIN', 'adaptador DIN'], ['Las pajas', 'pajas'],
 ['escurrido', 'escurrido'], ['empastre', 'empastre'], ['explosivas', 'explosivas'],
 ['depurar', 'depurar'], ['Bass disappears first|bajo desaparece primero|desaparecen primero', 'el bajo desaparece primero'],
 ['Absórbelos', 'Absórbelos'], ['cancels its own interference|se cancela a sí misma', 'el cable se cancela a si mismo'],
 ['same 32-bit|misma salida digital de 32', '32 bits en el Signature'],
 ['Signature runs USB|Signature hace el USB', 'USB en el Signature']
].forEach(([re, et]) => console.log('  ' + String((t.match(new RegExp(re, 'g')) || []).length).padStart(3) + '  ' + et));

console.log('\n  "Fourteen centimetres" EN: ' + (t.match(/Fourteen centimetres/g) || []).length + ' (deben ser 2)');
console.log('  "Catorce centímetros"   ES: ' + (t.match(/Catorce centímetros/g) || []).length + ' (deben ser 2)');
console.log('  mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
