const fs = require('fs');

const FILES = ['data/guides.json', 'data/products.json'];

const R = [
  // elección calques (order: specific first)
  ['sigue siendo la elección del profesional para grabación', 'sigue siendo la opción de los profesionales para grabación'],
  ['sigue siendo la elección', 'sigue siendo una opción'],
  ['es la elección principal', 'es la opción principal'],
  ['es la elección versátil', 'es la opción versátil'],
  ['es la elección icónica', 'es la opción icónica'],
  ['es la elección clásica', 'es la opción clásica'],
  ['es la elección para', 'es la mejor opción para'],
  // vía calques
  ['es la vía más rápida', 'es el camino más rápido'],
  ['sigue siendo la vía más fluida', 'sigue siendo la opción más fluida'],
  ['es la vía más fluida', 'es la opción más fluida'],
  // paso adelante calques
  ['es el gran paso adelante del AT2020', 'es un gran salto frente al AT2020'],
  ['es el paso adelante del AT2020', 'es un gran salto frente al AT2020'],
  ['el clásico paso adelante de Squier sobre la Debut', 'la clásica mejora de Squier frente a la Debut'],
  ['es el paso adelante de la Debut', 'es la evolución de la Debut'],
  ['es un paso adelante respecto a la e825', 'es una mejora clara frente a la e825'],
  ['es un verdadero paso adelante frente a una Player o Am Pro', 'es un salto real frente a una Player o Am Pro'],
  ['¿Quieres un paso que dure? La Yamaha Revstar RSE20 lo cubre.', '¿Quieres un siguiente paso que dure? La Yamaha Revstar RSE20 es tu guitarra.'],
  ['Para el paso siguiente, la Yamaha Revstar RSE20 dura años.', 'Para el siguiente paso, la Yamaha Revstar RSE20 dura años.'],
  // source typos / garbles
  ['cambian el grabación', 'cambian la grabación'],
  ['salasin tratar', 'salas sin tratar'],
  ['bateríasin inmutarse', 'batería sin inmutarse'],
  ['Las notason definidas', 'Las notas son definidas'],
  ['coordinar con otrosistemas inalámbricosin problemas', 'coordinar con otros sistemas inalámbricos sin problemas'],
  ['cualquiera de las dos guitarraservirá', 'cualquiera de las dos guitarras servirá'],
  ['los meten fundas aún calientes', 'los meten en fundas aún calientes'],
  ['que tras usar en escenarios reales', 'que he probado en escenarios reales'],
  ['la fuente que  grabas', 'la fuente que grabas'],
];

const counts = {}; R.forEach(([o]) => counts[o] = 0);

function fixStrings(obj) {
  if (!obj || typeof obj !== 'object') return;
  if (Array.isArray(obj)) { obj.forEach(fixStrings); return; }
  for (const k of Object.keys(obj)) {
    const v = obj[k];
    if (typeof v === 'string') {
      let s = v;
      for (const [old, neu] of R) {
        if (s.includes(old)) {
          const n = s.split(old).length - 1;
          counts[old] += n;
          s = s.split(old).join(neu);
        }
      }
      if (s !== v) obj[k] = s;
    } else if (v && typeof v === 'object') {
      fixStrings(v);
    }
  }
}

for (const f of FILES) {
  const data = JSON.parse(fs.readFileSync(f, 'utf8'));
  fixStrings(data);
  fs.writeFileSync(f, JSON.stringify(data, null, 2) + '\n');
}

console.log('=== REPLACEMENTS APPLIED ===');
let total = 0;
R.forEach(([old, neu]) => {
  if (counts[old] > 0) { total += counts[old]; console.log(counts[old] + 'x  ' + old + '  ->  ' + neu); }
});
console.log('TOTAL:', total);