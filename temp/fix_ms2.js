const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'monitor-setup');
let S = JSON.stringify(gg);
function swap(de, a) {
  if (!S.includes(de)) { console.log('  FALLA ' + de.slice(0, 60)); return; }
  S = S.split(de).join(a);
  console.log('  ok ' + a.slice(0, 60));
}
swap('<strong>Forma primero un triángulo equilátero.</strong> Tu cabeza y los dos monitores deben estar en los puntos de un triángulo de lados iguales',
  '<strong>Empieza formando un triángulo equilátero:</strong> tu cabeza y los dos monitores deben ocupar los vértices de un triángulo de lados iguales');
swap('<strong>Saca los monitores de la pared.</strong> Los altavoces con puerto trasero necesitan espacio para respirar detrás',
  '<strong>Separa los monitores de la pared:</strong> los altavoces con puerto trasero necesitan aire detrás');
swap('<strong>El trato honesto.</strong> Un cono de 6,5 pulgadas mueve menos aire',
  '<strong>Las pegas honestas:</strong> un cono de 6,5 pulgadas mueve menos aire');
swap('<strong>La contrapartida.</strong> Es una herramienta de medición, no un micrófono de grabación: plano, omnidireccional y completamente antimusical',
  '<strong>La contrapartida:</strong> es una herramienta de medición, no un micrófono de grabación: plana, omnidireccional y completamente aséptica');
swap('La traducción es una cadena: el <strong>Yamaha HS8</strong> dice la verdad hasta 38 Hz si respetas su puerto trasero con 30–50 cm de aire, mientras el Focal Alpha 65 Evo sigue traduciendo cuando el escritorio va pegado a la pared gracias a su puerto frontal',
  'Que una mezcla se traslade es una cadena: el <strong>Yamaha HS8</strong> dice la verdad hasta 38 Hz si le das a su puerto trasero 30–50 cm de aire, mientras el Focal Alpha 65 Evo sigue trasladando bien cuando el escritorio va pegado a la pared gracias a su puerto frontal');
swap('Levanta cualquiera en <strong>Soportes de Monitor K&M 26722 (Unidad)</strong>',
  'Súbelos a unos <strong>soportes de monitor K&M 26722 (unidad)</strong>');
swap('o desacopla en la mesa con el <strong>IsoAcoustics ISO-200 (Par)</strong> .',
  'o desacopla en la mesa con el <strong>IsoAcoustics ISO-200 (par)</strong>.');
swap('Después mide: <strong>Sonarworks SoundID Reference</strong> con su micrófono calibrado, o el MiniDSP UMIK-1 de $79 con REW, aplanan lo que colocación y tratamiento no pueden',
  'Después mide: <strong>Sonarworks SoundID Reference</strong> con su micrófono calibrado, o el MiniDSP UMIK-1 de $79 con REW, dejan plano lo que colocación y tratamiento no pueden');
swap('El <strong>Genelec GLM Kit</strong> se queda en territorio solo-SAM',
  'El <strong>Genelec GLM Kit</strong> se limita a territorio SAM');
swap('y el Ultimate Support MS-100 (Par) carga el hierro pesado por $599,99',
  'y el Ultimate Support MS-100 (par) carga con los pesos pesados por $599,99');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
