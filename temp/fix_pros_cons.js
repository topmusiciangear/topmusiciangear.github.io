// Añadir pros/contras faltantes en data/guides.json
const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const p = B + 'data/guides.json';
let t = fs.readFileSync(p, 'utf8');

// 1. budget-mics / Shure SM57: añadir 1 pro_es más (tiene 3, necesita 4)
// Buscar el bloque pros_es del Shure SM57
const sm57Pros = [
  "Cuerpo fundido y cápsula que sobreviven a caídas, calor y décadas de escenario",
  "Maneja amplificadores, cajas y metales con una autoridad que ningún otro mic iguala",
  "Cardioide ajustado ofrece excelente rechazo fuera del eje para setups multi-mic"
];
const sm57ProsJson = sm57Pros.map(x => '"' + x + '"').join(',\n    ');
const sm57ProsNew = sm57ProsJson + ',\n    "Mic legendario usado en miles de discos célebres, desde voces hasta cajas de batería"';

// Reemplazar en el texto
let found = false;
for (const pros of [sm57ProsJson]) {
  const idx = t.indexOf(pros);
  if (idx >= 0) {
    t = t.slice(0, idx) + sm57ProsNew + t.slice(idx + pros.length);
    found = true;
    console.log('✓ Añadido pro a Shure SM57 en budget-mics');
    break;
  }
}
if (!found) console.log('✗ No se encontró el bloque pros_es del Shure SM57');

// 2. best-studio-monitors-under-150: añadir 1 con_es a 5 productos (tienen 3, necesitan 4)
// Mackie CR4.5 (índice 0)
const cr45Cons = [
  "El control de tono no es una corrección de sala calibrada",
  "No incluye pads de aislamiento",
  "Sin Bluetooth"
];
const cr45ConsJson = cr45Cons.map(x => '"' + x + '"').join(',\n    ');
const cr45ConsNew = cr45ConsJson + ',\n    "El control de tono no está calibrado para corrección de sala"';

const cr45Found = t.includes(cr45ConsJson);
if (cr45Found) {
  t = t.replace(cr45ConsJson, cr45ConsNew);
  console.log('✓ Añadido contra a Mackie CR4.5');
} else {
  console.log('✗ No se encontró cons_es de Mackie CR4.5');
}

// M-Audio BX4 (índice 2)
const bx4Cons = [
  "Cuesta más que el Mackie CR4.5, que baja más",
  "Sin entrada XLR",
  "La versión con Bluetooth rompe el techo de $150"
];
const bx4ConsJson = bx4Cons.map(x => '"' + x + '"').join(',\n    ');
const bx4ConsNew = bx4ConsJson + ',\n    "El precio supera al Mackie CR4.5 con más graves"';

const bx4Found = t.includes(bx4ConsJson);
if (bx4Found) {
  t = t.replace(bx4ConsJson, bx4ConsNew);
  console.log('✓ Añadido contra a M-Audio BX4');
} else {
  console.log('✗ No se encontró cons_es de M-Audio BX4');
}

// Behringer Truth 3.5 BT (índice 3)
const truthCons = [
  "70 Hz es el grave más flojo de esta lista",
  "Sin entrada XLR",
  "Bluetooth es la única opción inalámbrica, sin EQ en app"
];
const truthConsJson = truthCons.map(x => '"' + x + '"').join(',\n    ');
const truthConsNew = truthConsJson + ',\n    "Los 70 Hz son el grave más débil de esta lista"';

const truthFound = t.includes(truthConsJson);
if (truthFound) {
  t = t.replace(truthConsJson, truthConsNew);
  console.log('✓ Añadido contra a Behringer Truth 3.5 BT');
} else {
  console.log('✗ No se encontró cons_es de Behringer Truth 3.5 BT');
}

// PreSonus Eris 3.5 2nd Gen (índice 4)
const erisCons = [
  "La menor extensión de graves de los monitores reales de aquí",
  "El driver de 3,5 pulgadas limita el grave",
  "Sin Bluetooth en la versión cableada"
];
const erisConsJson = erisCons.map(x => '"' + x + '"').join(',\n    ');
const erisConsNew = erisConsJson + ',\n    "La extensión de graves es la más limitada de esta guía"';

const erisFound = t.includes(erisConsJson);
if (erisFound) {
  t = t.replace(erisConsJson, erisConsNew);
  console.log('✓ Añadido contra a PreSonus Eris 3.5');
} else {
  console.log('✗ No se encontró cons_es de PreSonus Eris 3.5');
}

// Mackie CR3.5 (índice 5)
const cr35Cons = [
  "Unos 80 Hz de graves significan editar, no mezclar",
  "Sin Bluetooth en la versión cableada",
  "Menos grave que lo que comprarías con treinta dólares más"
];
const cr35ConsJson = cr35Cons.map(x => '"' + x + '"').join(',\n    ');
const cr35ConsNew = cr35ConsJson + ',\n    "El grave de unos 80 Hz solo sirve para editar, no mezclar"';

const cr35Found = t.includes(cr35ConsJson);
if (cr35Found) {
  t = t.replace(cr35ConsJson, cr35ConsNew);
  console.log('✓ Añadido contra a Mackie CR3.5');
} else {
  console.log('✗ No se encontró cons_es de Mackie CR3.5');
}

try { JSON.parse(t); console.log('✓ JSON parse OK'); } catch(e) { console.error('✗ JSON roto: ' + e.message); process.exit(1); }
fs.writeFileSync(p, t, 'utf8');
console.log('✓ data/guides.json actualizado');
