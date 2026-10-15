// 1) El "punto fuerte" del Nivel 2 sugeria saltarse la propia interfaz de $249
// 2) El panel G4M esta especificado de 200 Hz a 4 kHz: no toca el grave del HS8 (38 Hz)
const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const s = g.find(x => x.id === 'starter-studio');
let ok = 0; const fallos = [];
function set(i, campo, v) {
  s.productTable.rows[i].values[campo] = v; ok++;
}
function swap(i, k, de, a, et) {
  if (!s.sections[i][k].includes(de)) { fallos.push(et); return; }
  s.sections[i][k] = s.sections[i][k].split(de).join(a); ok++;
}

/* ── 1) PUNTOS FUERTES DEL NIVEL 2 ──
   El texto anterior ("el USB-C graba en cualquier sitio sin interfaz")inuxilaba la
   interfaz SSL que el propio nivel compra. Ahora se resuelve: en el estudio el micro
   entra por XLR a la SSL, y el USB-C es para grabar fuera del escritorio. */
set(6, 1, {
  value: '32-bit float rescues a take that would have clipped, and the same microphone runs XLR into the SSL in the studio — USB-C is what you use when you record away from the desk',
  value_es: 'Los 32 bits en coma flotante salvan una toma que se habría saturado, y en el estudio el mismo micrófono entra por XLR a la SSL: el USB-C es para cuando grabas fuera del escritorio'
});
console.log('  ok    fila Puntos fuertes · Nivel 2 (ya no contradice la interfaz del nivel)');

/* ── 2) TRATAMIENTO ACÚSTICO DEL NIVEL 3 ──
   G4M especifica estos paneles de 200 Hz a 4 kHz. Con un Yamaha HS8 (38 Hz a -10 dB,
   10.2 kg, 250 x 390 x 334 mm) cuatro paneles de espuma no controlan ese grave.
   Se dice en la celda, que es donde el comprador mira. */
set(5, 2, {
  value: 'G4M Squarewave panels (4-pack) — rated 200 Hz–4 kHz, so the HS8 low end still needs corner bass traps',
  value_es: 'Paneles G4M Squarewave (paquete de 4) — especificados de 200 Hz a 4 kHz, así que al grave del HS8 le siguen haciendo falta trampas de esquinas'
});
console.log('  ok    fila Tratamiento acústico · Nivel 3 (aviso del rango real del panel)');

/* ── 3) SECCIONES 8 y 18: el dato verificado del rango, no solo "no son trampas" ── */
swap(8, 'content',
  'Fourteen centimetres of foam is not bass trapping.',
  'Fourteen centimetres of foam is not bass trapping: G4M rates these panels from 200 Hz to 4 kHz, which is precisely the range they handle well and the bottom two octaves they never touch.', '8 EN rango');
swap(8, 'content_es',
  'Catorce centímetros de espuma no son trampas de graves.',
  'Catorce centímetros de espuma no son trampas de graves: G4M especifica estos paneles de 200 Hz a 4 kHz, que es justo el rango donde funcionan bien y los dos octavos de abajo que nunca tocan.', '8 ES rango');

swap(18, 'content',
  'Fourteen centimetres of foam is not bass trapping,',
  'Fourteen centimetres of foam is not bass trapping — G4M rates them from 200 Hz to 4 kHz —,', '18 EN rango');
console.log('  ok    seccion [18] EN: rango (verificar abajo, puede quedar con doble coma)');

fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\n  cambios: ' + ok + (fallos.length ? '  |  NO APLICADOS: ' + fallos.join(', ') : '  |  ninguno fallido'));

/* CONTROL */
const s2 = JSON.parse(fs.readFileSync(F, 'utf8')).find(x => x.id === 'starter-studio');
console.log('\n=== TABLA · filas tocadas ===');
[5, 6].forEach(i => {
  console.log('  ' + s2.productTable.rows[i].label);
  s2.productTable.rows[i].values.forEach((v, j) => console.log('      N' + (j + 1) + ': ' + v.value));
});
console.log('\n=== SECCION 18 EN · frase del panel ===');
const m = s2.sections[18].content.match(/What they will not do is fix bass[^.]*\.[^.]*\./);
console.log('  ' + (m ? m[0] : '(no encontrada)'));
console.log('\n  celdas vacias: ' + (s2.productTable.rows.every(r => r.values.every(v => (v.value || '').trim() && (v.value_es || '').trim())) ? 'ninguna' : 'SI, HAY'));
console.log('  mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
