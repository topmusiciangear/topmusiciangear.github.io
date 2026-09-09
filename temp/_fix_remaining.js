const fs = require('fs');
let t = fs.readFileSync('data/guides.json', 'utf8');

const fixes = [
  // TYPO introduced by agent chunk (missing space)
  ['maneja interpretaciones fuertesin esfuerzo', 'maneja interpretaciones fuertes sin esfuerzo'],
  // remaining true clichés (each old string verified unique via counter below)
  ['es el caballo de batalla versátil con pad de -10 dB', 'es el versátil de uso diario con pad de -10 dB'],
  ['Uno es el caballo de batalla, otro el arma secreta.', 'Uno es el de siempre; el otro, el arma secreta.'],
  ['la Thump215XT es el caballo de batalla económico', 'la Thump215XT es la opción económica de diario'],
  ['caballo de batalla pasivo probado en la carretera', 'pasivo probado en la carretera, el de todas las noches'],
  ['el caballo de batalla plug-and-play de muchos estudios', 'el plug-and-play de confianza en muchos estudios'],
  ['the versatile studio workhorse with a -10 dB pad', 'the versatile everyday studio mic with a -10 dB pad'],
  ['One is the workhorse, one is the secret weapon.', 'One is the everyday pick, one is the secret weapon.'],
  ['the Thump215XT is the budget workhorse.', 'the Thump215XT is the budget everyday option.'],
  ['road-tested passive workhorse', 'road-tested passive mainstay'],
  ['the set-and-forget workhorse trusted by many studios', 'the set-and-forget option many studios trust'],
  ['con una respuesta visual sin igual', 'con una respuesta visual excepcional'],
  ['32 MIDAS-designed preamps at this price is unmatched', '32 MIDAS-designed preamps at this price is hard to beat'],
  ['Elevate Your Sound: K&M Monitor Stands', 'Better Monitor Stands, Better Sound: K&M'],
  ['bulletproof dynamics for guitars', 'road-tough dynamics for guitars'],
  ['dinámicos a prueba de balas para guitarras', 'dinámicos a toda prueba para guitarras'],
  ['tienes una máquina de blues que rivaliza con cualquier Les Paul', 'tienes una bluesera que rivaliza con cualquier Les Paul'],
  ['la convierten en la máquina de batería más intuitiva jamás creada', 'la hacen una de las cajas de ritmos más intuitivas que existen'],
  ['el estándar de la industria brutalmente honesto que revela', 'el monitor más honesto del sector, que revela'],
  ['Estándar de la industria directo que revela cada defecto de tu mezcla', 'Honesto y directo, revela cada defecto de tu mezcla'],
  ['Micrófono vocal estándar de la industria, con unos medios', 'Micrófono vocal de referencia, con unos medios'],
  ['Industry standard for professional sound', 'The standard for professional sound'],
  ['Straightforward industry standard that reveals every flaw in your mix', 'Straightforward and honest, it reveals every flaw in your mix'],
];

let applied = 0, notFound = 0, multiple = 0;
fixes.forEach(function ([oldS, newS]) {
  const parts = t.split(oldS);
  if (parts.length === 1) { console.log('NOT FOUND: ' + oldS); notFound++; return; }
  if (parts.length > 2) { console.log('MULTIPLE (' + (parts.length - 1) + '): ' + oldS); multiple++; return; }
  t = parts.join(newS);
  applied++;
});
fs.writeFileSync('data/guides.json', t);
console.log('\napplied: ' + applied + ' | notFound: ' + notFound + ' | multiple: ' + multiple);