// Correcciones de traduccion ES en starter-studio (bloque "accessories")
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const F = BASE + 'data/guides.json';

const raw = fs.readFileSync(F, 'utf8');
const g = JSON.parse(raw);
const guia = g.find(x => x.id === 'starter-studio');
const sec = guia.sections.find(s => (s.content_es || '').indexOf('Cada montaje deja dinero en la mesa') > -1);
if (!sec) { console.log('bloque no encontrado'); process.exit(1); }

const antes = sec.content_es;

const CAMBIOS = [
  // 1+2  calco de "leaves money on the table" + "depends on what you record"
  ['<p>Cada montaje deja dinero en la mesa, y qué haces con él depende de qué grabes.</p>',
   '<p>En cada montaje te sobra algo de presupuesto, y en qué lo gastas depende estrictamente de lo que vayas a grabar.</p>'],

  // 3+4  "plosives" no es "explosivas" en español + concordancia de EQ
  ['Un micrófono condensador cerca de una boca sin filtro graba cada explosiva — la ráfaga de aire de una P o una B — como un golpe que ningún EQ limpia bien.',
   'Un micrófono condensador cerca de una boca sin filtro graba cada consonante oclusiva — la ráfaga de aire de una P o una B — como un golpe que ningún ecualizador puede corregir de forma limpia.'],

  // 5+6  "un segundo" ambiguo + "fighting over inputs" + DI sin especificar
  ['El NT1 es para la voz; un segundo te deja microfonear la guitarra a la vez sin DI ni pelear por las dos entradas que ya tienes.',
   'El NT1 es para la voz; un segundo micrófono te deja captar la guitarra a la vez, sin caja DI y sin tener que sacrificar ni disputar las dos entradas que ya tienes.'],

  // 7  "loud sources"
  ['<strong>Si grabas fuentes fuertes:</strong>', '<strong>Si grabas fuentes de gran volumen:</strong>'],

  // 8  "un cable que zumba"
  ['un cable que zumba o atenúa los agudos arruina el rendimiento',
   'un cable defectuoso que genera zumbidos o atenúa los agudos arruina el rendimiento'],

  // 9  objeto directo: "guárdalo" no se sabe si es el dinero o los auriculares
  ['<p><strong>Si sigues con auriculares por la noche:</strong> guárdalo. El MDR-7506 ya cerró el círculo. Pon ese dinero en un segundo pack de paneles acústicos: mueve más la sala que cualquier mejora suelta.</p>',
   '<p><strong>Si sigues con auriculares por la noche:</strong> guarda ese dinero. El MDR-7506 ya cerró el círculo. Ponlo en un segundo pack de paneles acústicos: cambiará e impactará mucho más la acústica de tu sala que cualquier otra actualización de hardware suelta.</p>']
];

let t = antes;
CAMBIOS.forEach(([v, n], i) => {
  if (t.indexOf(v) < 0) { console.log((i + 1) + ') NO ENCONTRADO: "' + v.slice(0, 60) + '..."'); return; }
  t = t.replace(v, n);
  console.log((i + 1) + ') aplicado  "' + v.slice(0, 52) + '"');
});

sec.content_es = t;

// conservar el formato del fichero (2 espacios) y el salto de linea final
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');

// verificacion
const g2 = JSON.parse(fs.readFileSync(F, 'utf8'));
const s2 = g2.find(x => x.id === 'starter-studio').sections
  .find(s => (s.content_es || '').indexOf('te sobra algo de presupuesto') > -1);
console.log('\n=== TEXTO FINAL ===\n');
console.log(s2.content_es.replace(/<\/p>/g, '</p>\n'));

// comprobar que no quedan las frases viejas
const viejas = ['Cada montaje deja dinero en la mesa', 'depende de qué grabes', 'graba cada explosiva',
  'ningún EQ limpia bien', 'un segundo te deja microfonear', 'sin DI ni pelear',
  'Si grabas fuentes fuertes', 'un cable que zumba', 'guárdalo. El MDR-7506', 'mueve más la sala'];
console.log('\n=== RESTOS DE LAS FRASES VIEJAS ===');
viejas.forEach(v => {
  const n = (fs.readFileSync(F, 'utf8').match(new RegExp(v.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
  console.log((n ? ' MAL ' : ' ok  ') + v + (n ? '  x' + n : ''));
});
console.log('\nmojibake en guides.json: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
