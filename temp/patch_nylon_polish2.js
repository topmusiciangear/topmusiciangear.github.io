// Polish #2: unify ES guitar terminology + natural FAQ wording
const fs = require('fs');
const FILE = 'data/guides.json';
let raw = fs.readFileSync(FILE, 'utf8');

const start = raw.indexOf('"id": "best-nylon-guitars-for-beginners"');
if (start < 0) throw new Error('guide not found');
const endMarker = raw.indexOf('\n    {\n      "id": "', start);
const end = endMarker < 0 ? raw.length : endMarker;
let region = raw.slice(start, end);

function sub(oldText, newText, label, expected) {
  const c = region.split(oldText).length - 1;
  if (expected !== undefined && c !== expected) throw new Error(`[${label}] expected ${expected}, got ${c}`);
  if (c === 0) throw new Error(`[${label}] not found`);
  region = region.split(oldText).join(newText);
  console.log(`  ${label}: ${c}`);
}

console.log('--- verdict phrasing ---');
sub('Mejor paso a tapa sólida para tradicionalistas.',
  'Mejor paso a tapa maciza para tradicionalistas.', 'verdict C5');
sub('Mejor relación calidad-precio en tono de concierto tapa sólida.',
  'Mejor relación calidad-precio con tapa maciza y tono de concierto.', 'verdict CG122MSH');

console.log('--- anglicisms ---');
sub('Tapa sólida de abeto torrefactado con tono claro y punchy',
  'Tapa maciza de abeto torrefactado con tono claro y definido', 'Taylor pro_es', 2);
sub('Fender Classic Design CN-60S: mejor híbrida crossover para manos pequeñas',
  'Fender Classic Design CN-60S: mejor crossover para manos pequeñas', 'CN-60S heading_es', 2);

console.log('--- FAQ ES ---');
sub('¿Debería un principiante empezar con cuerdas de nylon o de acero?',
  '¿Es mejor empezar con cuerdas de nylon o de acero?', 'faq0 q_es');
sub('¿Qué tamaño de guitarra clásica debería elegir un principiante?',
  '¿Qué tamaño de guitarra clásica es el adecuado para empezar?', 'faq1 q_es');
sub('La mayoría de adultos empieza con tamaño 4/4 completo, escala 650 mm y cejuela 52 mm. Los niños de 7-11 suelen encajar mejor con tamaño 3/4, escala 615 mm.',
  'La mayoría de los adultos empieza con el tamaño 4/4 completo, escala de 650 mm y cejuela de 52 mm. Los niños de 7 a 11 años suelen encajar mejor con el 3/4, de 615 mm.', 'faq1 a_es');
sub('No para aprender. Cutaway y electrónica suman coste y complejidad. Concéntrate primero en comodidad al tocar y tono, y añade electrónica más adelante.',
  'Para aprender, no. El cutaway y la electrónica encarecen la guitarra y añaden complicaciones. Céntrate primero en que sea cómoda y suene bien, y deja la electrónica para más adelante.', 'faq2 a_es');
sub('¿Tapa sólida versus laminada para principiantes?',
  '¿Mejor tapa maciza o laminada para empezar?', 'faq3 q_es');
sub('Las tapas macizas suenan más expresivas y mejoran con el tiempo. El laminado es más estable y económico. Una tapa maciza merece la pena si piensas continuar.',
  'Las tapas macizas responden mejor y ganan con el tiempo. El laminado es más estable y más barato. Merece la pena la tapa maciza si crees que vas a seguir tocando.', 'faq3 a_es');
sub('Cada 3-6 meses con práctica regular. El nylon pierde brillo más rápido que el acero y las cuerdas nuevas mejoran la entonación.',
  'Cada 3 o 6 meses si practicas con regularidad. El nylon pierde brillo antes que el acero, y unas cuerdas nuevas afinan mejor.', 'faq4 a_es');

console.log('--- terminology sweep ---');
for (const [from, to] of [['Tapa sólida', 'Tapa maciza'], ['tapa sólida', 'tapa maciza']]) {
  const c = region.split(from).length - 1;
  if (c) { region = region.split(from).join(to); console.log(`  ${from} -> ${to}: ${c}`); }
}

raw = raw.slice(0, start) + region + raw.slice(end);
fs.writeFileSync(FILE, raw, 'utf8');

const arr = JSON.parse(fs.readFileSync(FILE, 'utf8'));
const g = (Array.isArray(arr) ? arr : arr.guides).find(x => x.id === 'best-nylon-guitars-for-beginners');
const s = JSON.stringify(g);
console.log('leftover "tapa sólida":', (s.match(/tapa sólida/gi) || []).length);
console.log('leftover "punchy":', (s.match(/punchy/gi) || []).length);
console.log('faq0 q_es:', g.faq[0].q_es);
console.log('JSON valid, sections:', g.sections.length);
