const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const p = B + 'data/guides.json';
let t = fs.readFileSync(p, 'utf8');

// 1. Squier Affinity: alnico → ceramic (pros EN)
const old1 = 'Slim C-shaped neck, sealed tuners and surprisingly good alnico pickups';
const new1 = 'Slim C-shaped neck, sealed tuners and surprisingly good ceramic pickups';
if (t.includes(old1)) { t = t.split(old1).join(new1); console.log('✓ Fix 1a: alnico → ceramic (pros EN)'); } else console.log('✗ Fix 1a NOT FOUND');

// 2. Squier Affinity: alnico → cerámicas (pros ES)
const old2 = 'Mástil en C delgado, afinadores sellados y pastillas alnico sorprendentemente buenas';
const new2 = 'Mástil en C delgado, afinadores sellados y pastillas cerámicas sorprendentemente buenas';
if (t.includes(old2)) { t = t.split(old2).join(new2); console.log('✓ Fix 1b: alnico → cerámicas (pros ES)'); } else console.log('✗ Fix 1b NOT FOUND');

// 3. Jet JS-300: materiales y pastillas (EN)
const old3 = 'Basswood body, Modern C and 9.5-inch radius keep it friendly while three ceramic single-coils do their Strat thing.';
const new3 = 'Poplar body, Slim GRG maple neck and 9.5-inch radius keep it friendly while two IBZ-6 humbuckers do their rock thing.';
if (t.includes(old3)) { t = t.split(old3).join(new3); console.log('✓ Fix 2a: Jet JS-300 materiales (EN)'); } else console.log('✗ Fix 2a NOT FOUND');

// 4. Jet JS-300: materiales y pastillas (ES)
const old4 = 'Un mástil y diapasón de arce canadiense tostado, cejuela de hueso y tres single coils cerámicas en un cuerpo de estilo S clásico.';
const new4 = 'Un mástil Slim GRG de arce, cejuela de hueso y dos humbuckers IBZ-6 en un cuerpo de álamo clásico.';
if (t.includes(old4)) { t = t.split(old4).join(new4); console.log('✓ Fix 2b: Jet JS-300 materiales (ES)'); } else console.log('✗ Fix 2b NOT FOUND');

// 5. Enlaces rotos (EN): reparar texto del enlace de amplificadores
const old5 = 'See <a href=\"/guides/guitar-bass-amps.html\" class=\"guide-link-btn\">best guitar amps guide</a> <a href=\"/guides/beginner-guitar.html\" class=\"guide-link-btn\">beginner guitar guide</a> detailed recommendations.';
const new5 = 'See our <a href=\"/guides/guitar-bass-amps.html\" class=\"guide-link-btn\">best guitar amps guide</a> and <a href=\"/guides/beginner-guitar.html\" class=\"guide-link-btn\">beginner guitar guide</a> for detailed recommendations.';
if (t.includes(old5)) { t = t.split(old5).join(new5); console.log('✓ Fix 3a: enlace amplificadores (EN)'); } else console.log('✗ Fix 3a NOT FOUND');

// 6. Enlaces rotos (ES)
const old6 = 'Consulta nuestra <a href=\"/guides/guitar-bass-amps_es.html\" class=\"guide-link-btn\">Mejores amplificadores de guitarra y bajo: guía completa</a> <a href=\"/guides/beginner-guitar_es.html\" class=\"guide-link-btn\">Mejores guitarras para principiantes: guía para empezar</a> para recomendaciones más detalladas.';
const new6 = 'Consulta nuestra <a href=\"/guides/guitar-bass-amps_es.html\" class=\"guide-link-btn\">Mejores amplificadores de guitarra y bajo: guía completa</a> y nuestra <a href=\"/guides/beginner-guitar_es.html\" class=\"guide-link-btn\">Mejores guitarras para principiantes: guía para empezar</a> para recomendaciones más detalladas.';
if (t.includes(old6)) { t = t.split(old6).join(new6); console.log('✓ Fix 3b: enlace amplificadores (ES)'); } else console.log('✗ Fix 3b NOT FOUND');

try { JSON.parse(t); console.log('✓ JSON parse OK'); } catch(e) { console.error('✗ JSON roto: ' + e.message); process.exit(1); }
fs.writeFileSync(p, t, 'utf8');
console.log('✓ data/guides.json actualizado');
