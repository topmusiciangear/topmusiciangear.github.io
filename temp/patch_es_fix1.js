// MEGA PATCH fase fix — metáforas + fugas EN + multitrack→multipista (split/join, sin String.replace para evitar $)
const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
let hasError = false;
function err(msg) { console.error('  ✗ ' + msg); hasError = true; }

function patch(file, ops) {
  const p = B + file;
  let t = fs.readFileSync(p, 'utf8');
  console.log('== ' + file + ' (' + t.length + ' chars)');
  for (const op of ops) {
    const [needle, replacement, mode, expected] = op;
    if (mode === 'all') {
      const parts = t.split(needle);
      const n = parts.length - 1;
      if (n === 0) { err('MISS(all) «' + needle.slice(0, 70) + '»'); continue; }
      if (expected != null && n !== expected) err('COUNT(all) «' + needle.slice(0, 70) + '» esperado ' + expected + ' real ' + n);
      t = parts.join(replacement);
      console.log('   ' + n + 'x ' + needle.slice(0, 60));
    } else {
      const i = t.indexOf(needle);
      if (i < 0) { err('MISS(1) «' + needle.slice(0, 70) + '»'); continue; }
      if (t.indexOf(needle, i + 1) >= 0) { err('DUP «' + needle.slice(0, 70) + '»'); continue; }
      t = t.slice(0, i) + replacement + t.slice(i + needle.length);
      console.log('   1x ' + needle.slice(0, 60));
    }
  }
  try { JSON.parse(t); } catch (e) { err('JSON PARSE ROTO: ' + e.message); return; }
  fs.writeFileSync(p, t, 'utf8');
  console.log('   ✓ escrito + JSON.parse OK');
}

// ---------- guides.json ----------
patch('data/guides.json', [
  // estándar de oro → la referencia (11)
  ['es el estándar de oro para crear beats con su Session View', 'es la referencia para crear beats con su Session View'],
  ['busca el estándar de oro en un instrumento de cinco cuerdas', 'busca la referencia en un instrumento de cinco cuerdas'],
  ['El SM7B es el estándar de oro para podcasting.', 'El SM7B es la referencia del podcasting.'],
  ['¿Por qué es el Strymon BigSky MX el estándar de oro?', '¿Por qué es el Strymon BigSky MX la referencia?'],
  ['Ableton Live es el estándar de oro para música electrónica y actuación en vivo.', 'Ableton Live es la referencia para música electrónica y actuación en vivo.'],
  ['son el estándar de oro para EQ, compresión y limitación quirúrgica', 'son la referencia para EQ, compresión y limitación quirúrgica'],
  ['que cuentan kilos, es el estándar de oro.', 'que cuentan kilos, es la referencia.'],
  ['El Audeze LCD-X es el estándar de oro de los auriculares abiertos profesionales', 'El Audeze LCD-X es la referencia de los auriculares abiertos profesionales'],
  ['El FabFilter Total Bundle es el estándar de oro para plugins de mezcla y masterización.', 'El FabFilter Total Bundle es la referencia para plugins de mezcla y masterización.'],
  ['¿Qué hace de las DT 770 Pro el estándar de oro para auriculares cerrados de tracking?', '¿Por qué las DT 770 Pro son la referencia entre los auriculares cerrados de estudio?'],
  ['FabFilter es el estándar de oro para plugins de mezcla.', 'FabFilter es la referencia para plugins de mezcla.'],
  // gabinete → caja (best-studio-monitors-under-150)
  ['(3) Gabinete de MDF denso: una caja de madera pesada que mantiene', '(3) Caja de MDF denso: madera pesada que mantiene'],
  ['Gabinete MDF denso: sin resonancias ni vibraciones a volumen alto', 'Caja de MDF denso: sin resonancias ni vibraciones a volumen alto'],
  ['gabinete MDF denso. Si quieres punto ideal amplio, expandibilidad futura y gabinete acústico real', 'caja de MDF denso. Si quieres punto ideal amplio, expandibilidad futura y una construcción acústica real'],
  ['Gabinete de MDF denso: sin resonancias a volumen alto', 'Caja de MDF denso: sin resonancias a volumen alto'],
  // todo terreno (guides)
  ['"value_es": "Todo terreno semiabierto de estudio"', '"value_es": "Comodín semiabierto de estudio"'],
  ['"heading_es": "Mejor todo-terreno: Yamaha CSF1M"', '"heading_es": "El más versátil: Yamaha CSF1M"'],
  ['Tono dinámico especializado más que un todoterreno', 'Tono dinámico especializado más que versátil'],
  ['"Todoterreno fiable y asequible"', '"Versátil, fiable y asequible"'],
  // arma secreta (guides)
  ['"Arma secreta para ambient/cinematográfico"', '"Un as en la manga para ambient y cinematográfico"'],
  // fugas EN confirmadas
  ['"value_es": "Pocket sketching and punch-in performance FX"', '"value_es": "Bocetos rápidos de bolsillo y FX de actuación en directo"'],
  ['"value_es": "Mobile production with Stems and 3D expression"', '"value_es": "Producción móvil con Stems y expresión 3D"'],
  ['"value_es": "Analytical composition and surgical precisión"', '"value_es": "Composición analítica y precisión quirúrgica"'],
  ['"val2_es": "3-way with switchable Focus mode"', '"val2_es": "3 vías con modo Focus conmutable"'],
  ['"val2_es": "61-key Fatar with velocity/aftertouch"', '"val2_es": "61 teclas Fatar con velocity y aftertouch"'],
  ['B-roll run-and-gun es la mejora', 'B-roll al vuelo, es la mejora'],
  ['cada video run-and-gun se vea', 'cada vídeo grabado sobre la marcha se vea'],
  ['"value_es": "Video run-and-gun"', '"value_es": "Vídeo sobre la marcha"'],
  ['más Sync a negras para pumping four-on-the-floor', 'más Sync a negras para el bombeo del four-on-the-floor'],
  ['Staging de ganancia', 'Ajuste de ganancia', 'all'],
  ['8 plugins en uno: mothership más módulos', '8 plugins en uno: el núcleo central más módulos', 'all', 2],
  // multitrack → multipista (frases largas primero)
  ['grabación y reproducción multitrack', 'grabación y reproducción multipista', 'all', 4],
  ['Grabación multitrack', 'Grabación multipista', 'all', 6],
  ['grabación multitrack', 'grabación multipista', 'all', 15],
  ['graba junto al multitrack SD a bordo', 'graba junto a la grabación multipista SD a bordo'],
  ['y multitrack SQ-Drive', 'y SQ-Drive multipista'],
  ['audio USB multitrack Overbridge', 'audio USB multipista Overbridge'],
  ['grabar multitrack directo al DAW', 'grabar multipista directo al DAW'],
  ['Ambos graban multitrack a SD o USB', 'Ambos graban multipista a SD o USB'],
  ['canales de multitrack directo a un portátil', 'canales de multipista directo a un portátil'],
  ['"val_es": "Análisis multitrack"', '"val_es": "Análisis multipista"'],
  ['"val1_es": "Individual o multitrack"', '"val1_es": "Individual o multipista"'],
  ['"val2_es": "Multitrack"', '"val2_es": "Multipista"'],
  ['"val1_es": "Multitrack de 16 pistas', '"val1_es": "Multipista de 16 pistas'],
  ['detección de enmascaramiento multitrack', 'detección de enmascaramiento multipista', 'all', 2],
  ['como una grabadora multitrack', 'como una grabadora multipista'],
  ['Ambas graban multitrack por USB', 'Ambas graban multipista por USB'],
  ['en lugar de multitrack', 'en lugar de multipista', 'all', 2]
]);

// ---------- products.json ----------
patch('data/products.json', [
  ['"es": "Todo terreno de estudio"', '"es": "Comodín de estudio"'],
  ['"es": "Todo terreno potente"', '"es": "Comodín potente"'],
  ['"es": "Todo terreno en directo"', '"es": "Tocar en directo"'],
  ['"es": "Coaxial todo terreno"', '"es": "Comodín coaxial"'],
  ['gabinete de MDF denso', 'caja de MDF denso'],
  ['"title": "Peterson StroboClip HD Clip-On Tuner",\r\n    "brand": "Peterson"', '"title": "Peterson StroboClip HD Clip-On Tuner",\r\n    "title_es": "Afinador de clip Peterson StroboClip HD",\r\n    "brand": "Peterson"'],
  ['"title": "TC Electronic Polytune Clip",\r\n    "brand": "TC Electronic"', '"title": "TC Electronic Polytune Clip",\r\n    "title_es": "Afinador de clip TC Electronic Polytune Clip",\r\n    "brand": "TC Electronic"'],
  ['"title": "Snark ST-8 Super Tight Clip-On Tuner",\r\n    "brand": "Snark"', '"title": "Snark ST-8 Super Tight Clip-On Tuner",\r\n    "title_es": "Afinador de clip Snark ST-8 Super Tight",\r\n    "brand": "Snark"']
]);

// ---------- deals.json ----------
patch('data/deals.json', [
  ['lo convierten en un todoterreno listo para la carretera', 'lo convierten en un comodín listo para la carretera'],
  ['Todoterreno de 1500 W pico y 18 pulgadas', 'Altavoz de 1500 W pico y 18 pulgadas'],
  ['Una verdadera todoterreno de estudio.', 'Un verdadero comodín de estudio.'],
  ['un verdadero arma secreta para el diseño sonoro creativo', 'un as en la manga para el diseño sonoro creativo']
]);

// ---------- manual-deals.json ----------
patch('data/manual-deals.json', [
  ['lo convierten en un todoterreno listo para la carretera', 'lo convierten en un comodín listo para la carretera'],
  ['Una verdadera todoterreno de estudio.', 'Un verdadero comodín de estudio.'],
  ['un verdadero arma secreta para el diseño sonoro creativo', 'un as en la manga para el diseño sonoro creativo']
]);

// ---------- verificación de residuos ----------
const MET = ['caballo de batalla', 'caballos de batalla', 'todo terreno', 'todo-terreno', 'todoterreno', 'todoterrenos', 'grial', 'navaja suiza', 'trabajo pesado', 'arma secreta', 'gabinete', 'gabinetes', 'punto dulce', 'estándar de oro', 'estandar de oro', 'game-changer', 'gamechanger', 'techo de graves', 'dios del muestreo'];
console.log('\n== RESIDUOS de metáforas ==');
for (const f of ['data/guides.json', 'data/products.json', 'data/deals.json', 'data/manual-deals.json']) {
  const t = fs.readFileSync(B + f, 'utf8').toLowerCase();
  const hits = MET.filter(m => t.includes(m));
  console.log(f + ': ' + (hits.length ? 'QUEDAN ' + hits.join(', ') : 'limpio'));
  if (hits.length) hasError = true;
}

// residuos ES de "multitrack" (contextos con palabra española alrededor)
console.log('\n== RESIDUOS multitrack en contexto ES ==');
for (const f of ['data/guides.json', 'data/products.json']) {
  const t = fs.readFileSync(B + f, 'utf8');
  let idx = 0, found = 0;
  while ((idx = t.indexOf('multitrack', idx)) >= 0) {
    const w = t.slice(Math.max(0, idx - 70), idx + 70).replace(/\s+/g, ' ');
    if (/grabaci|graban|grabadora|multipista|grabar/.test(w)) { console.log(f + ' SUSPECT: …' + w + '…'); found++; }
    idx += 10;
  }
  if (!found) console.log(f + ': sin residuos ES visibles');
}

console.log(hasError ? '\n✗ PATCH CON ERRORES — revisar' : '\n✓ PATCH COMPLETO');
process.exitCode = hasError ? 1 : 0;
