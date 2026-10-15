// Verificar los 10 cambios ES en el HTML generado (EN y ES)
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';

const es = fs.readFileSync(BASE + 'guides/starter-studio_es.html', 'utf8');
const en = fs.readFileSync(BASE + 'guides/starter-studio.html', 'utf8');

const VIEJAS = [
  'Cada montaje deja dinero en la mesa',
  'depende de qué grabes',
  'graba cada explosiva',
  'ningún EQ limpia bien',
  'un segundo te deja microfonear',
  'sin DI ni pelear',
  'Si grabas fuentes fuertes',
  'un cable que zumba',
  'guárdalo. El MDR-7506',
  'mueve más la sala'
];
const NUEVAS = [
  'En cada montaje te sobra algo de presupuesto',
  'depende estrictamente de lo que vayas a grabar',
  'graba cada consonante oclusiva',
  'ningún ecualizador puede corregir de forma limpia',
  'un segundo micrófono te deja captar la guitarra',
  'sin caja DI y sin tener que sacrificar ni disputar las dos entradas',
  'Si grabas fuentes de gran volumen',
  'un cable defectuoso que genera zumbidos',
  'guarda ese dinero',
  'cambiará e impactará mucho más la acústica de tu sala'
];

console.log('=== 10 CAMBIOS EN starter-studio_es.html ===\n');
let ok = 0;
NUEVAS.forEach((n, i) => {
  const hay = es.indexOf(n) > -1;
  const vieja = es.indexOf(VIEJAS[i]) > -1;
  if (hay && !vieja) ok++;
  console.log('  ' + String(i + 1).padStart(2) + '. ' + (hay ? 'aplicado ' : 'FALTA    ') +
    (vieja ? ' [LA VIEJA SIGUE AHÍ] ' : ' ') + '"' + n.slice(0, 58) + '"');
});
console.log('\n  ' + ok + '/10 aplicados y limpios');

// el EN debe seguir intacto
console.log('\n=== EL INGLES NO SE HA TOCADO ===');
['leaves money on the table', 'depends on what you', 'plosives', 'no EQ cleans', 'second condenser lets you',
  'without a DI', 'loud sources', 'hum-prone cable', 'save it', 'moves the room']
  .forEach(f => console.log('  ' + (en.indexOf(f) > -1 ? 'ok  ' : 'CAMBIO ') + '"' + f + '"'));
