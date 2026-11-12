// Reemplazos finales de notas musicales (regla RAE: nota en minúscula) + restos de colisiones
const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const p = B + 'data/guides.json';
const raw = fs.readFileSync(p, 'utf8');
fs.copyFileSync(p, 'C:/Users/Daniel/AppData/Local/Temp/opencode/guides.before_si_grave.json');

const fixes = [
  // [label, needle, replacement, replaceAllPlain]
  ['Si grave -> si grave (notas, global, también cubre "Si graves")', 'Si grave', 'si grave', true],
  ['el Si y el Mi graves -> minúsculas', 'el Si y el Mi graves', 'el si y el mi graves', true],
  ['cross-link mezcladores (2 enlaces internos)', '>Mejores mezcladores Digitales de rack con control tablet<', '>Mejores mezcladores digitales de rack con control tablet<', true],
  ['at2020 title_es + titleTag_es + sección heredada', '"Audio-Technica AT2020 vs AKG P120: Condensador barato"', '"Audio-Technica AT2020 vs AKG P120: condensador barato"', true],
];

let out = raw;
let ok = 0;
for (const [label, needle, after] of fixes) {
  const n = out.split(needle).length - 1;
  if (n === 0) { console.log('SIN OCURRENCIAS (ya aplicado?): ' + label); continue; }
  out = out.split(needle).join(after);
  ok++;
  console.log('OK (' + n + 'x): ' + label);
}
JSON.parse(out); // validación
fs.writeFileSync(p, out, 'utf8');
console.log('ESCRITO. Reemplazos: ' + ok);

// verificación final
const chk = fs.readFileSync(p, 'utf8');
console.log('Si grave restantes: ' + (chk.split('Si grave').length - 1));
console.log('Mi graves cap restantes: ' + (chk.split('el Mi graves').length - 1));
console.log('mezcladores Digitales restantes: ' + (chk.split('mezcladores Digitales').length - 1));
console.log('Condensador barato cap restantes: ' + (chk.split('Condensador barato').length - 1));
