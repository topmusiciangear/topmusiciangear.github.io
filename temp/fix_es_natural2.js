const fs = require('fs');
let s = fs.readFileSync('data/guides.json', 'utf8');
const R = [
  ['Un bajo de 34" con pala supera 45 pulgadas de palanca junto a tus monitores.', 'Un bajo de 34" con pala son más de 45 pulgadas de palanca junto a tus monitores.'],
  ['lleva dos single-coils — brillantes y abiertas, pero sin cancelación de hum', 'lleva dos single-coils — brillantes y abiertos, pero sin cancelación de hum'],
  ['La corta 30" (o menos) acorta trastes para manos pequeñas', 'La corta de 30" (o menos) acerca los trastes para manos pequeñas'],
  ['Guitarristas doblando bajo empiezan en 30" o menos; bajistas de carrera mantienen 34" headless o multiescala.', 'Los guitarristas que también tocan el bajo empiezan en 30" o menos; los bajistas profesionales mantienen 34" headless o multiescala.'],
  ['Arce 1 pieza speed, amaranto 12", 22 jumbo', 'Mástil speed arce 1 pieza, amaranto 12", 22 jumbo'],
  ['Familiar escala media 32"', 'Escala media de 32", familiar']
];
let fails = [];
R.forEach(([a, b]) => {
  const ae = a.split('"').join('\\"'), be = b.split('"').join('\\"');
  if (!s.includes(ae)) { fails.push(a.slice(0, 50)); return; }
  s = s.split(ae).join(be);
});
fs.writeFileSync('data/guides.json', s);
console.log('fails: ' + fails.length);
fails.forEach(f => console.log('  MISS: ' + f));
console.log('doblando check:', /doblando bajo/.test(s) ? 'TODAVIA HAY' : 'limpio');
console.log('Olvida check:', /Olvida amplis/.test(s) ? 'TODAVIA HAY' : 'limpio');
