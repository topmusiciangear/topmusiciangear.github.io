// Patch best-nylon-guitars-for-beginners text/spec fixes (raw text, scoped to guide region)
const fs = require('fs');
const FILE = 'data/guides.json';
let raw = fs.readFileSync(FILE, 'utf8');

const start = raw.indexOf('"id": "best-nylon-guitars-for-beginners"');
if (start < 0) throw new Error('guide start not found');
// find the end of this guide object: next `"id": "` at same indent level
const endMarker = raw.indexOf('\n    {\n      "id": "', start);
const end = endMarker < 0 ? raw.length : endMarker;
if (end < 0) throw new Error('guide end not found');
let region = raw.slice(start, end);

let applied = 0;
function rep(oldVal, newVal, label) {
  const o = JSON.stringify(oldVal);
  const n = JSON.stringify(newVal);
  const count = region.split(o).length - 1;
  if (count !== 1) throw new Error(`[${label}] expected 1 match, got ${count}`);
  region = region.replace(o, n);
  applied++;
}

// ---------- title / titleTag (ES too long) ----------
rep('Mejores guitarras clásicas para principiantes: las mejores opciones de cuerdas de nylon',
  'Las mejores guitarras clásicas para principiantes', 'title_es');
rep('Mejores guitarras clásicas para principiantes: opciones de cuerdas de nylon',
  'Las mejores guitarras clásicas para principiantes', 'titleTag_es');

// ---------- intro: no product counts ----------
rep('These nine picks cover every budget and body size, from the official student standard to fractional sizes for kids.',
  'These picks cover every budget and body size, from the official student standard to fractional sizes for kids.', 'intro');
rep('Estas nueve opciones cubren cada presupuesto y tamaño de cuerpo, desde el estándar oficial de estudiante hasta tamaños fraccionarios para niños.',
  'Estas opciones cubren cada presupuesto y tamaño de cuerpo, desde el estándar oficial de estudiante hasta tamaños fraccionarios para niños.', 'intro_es');

// ---------- section 2: Ortega R121 is a laminated spruce top ----------
rep('The R121 is a complete starter pack. Solid spruce top with mahogany back and sides sounds bigger than its price',
  'The R121 is a complete starter pack. Laminated spruce top with mahogany back and sides sounds bigger than its price', 'sec2 content');
rep('La R121 es un pack de iniciación completo. Tapa sólida de abeto con fondo y aros de caoba suena más grande de lo que cuesta',
  'La R121 es un pack de iniciación completo. Tapa laminada de abeto con fondo y aros de caoba suena más grande de lo que cuesta', 'sec2 content_es');
rep('Solid spruce top at a low price', 'Spruce top and 650 mm scale at a starter price', 'sec2 pro');
rep('Tapa sólida de abeto a bajo precio', 'Tapa de abeto y escala de 650 mm a precio de iniciación', 'sec2 pro_es');

// ---------- section 3: Taylor, de-AI rewrite ----------
rep('<strong>Think of the Taylor Academy 12e-N as an anti-frustration insurance policy for new musicians.</strong> While most beginner lists only focus on low-cost options, this premium instrument flips the script by prioritizing physical ergonomics to keep you practicing longer. The highlight is the carved armrest/bevel on the upper edge, which guarantees the wood never cuts off circulation or pinches your forearm. By engineering the strings to sit exceptionally close to the ebony fingerboard, your fretting hand needs minimal squeeze to produce a pristine, buzz-free chord. Its solid torrefied spruce top generates a punchy, crisp articulation that stays balanced whether you strum heavily or practice light fingerpicking. Built-in ES-B electronics with a tuner make it stage-ready, and it retains strong resale value as a long-term musical asset.',
  '<strong>The Academy 12e-N is the beginner nylon that removes the usual friction.</strong> Most starter lists stop at the cheapest option; this one spends the extra money on comfort and electronics instead. The carved armrest on the upper edge keeps the body from digging into your forearm during long practice, and the low action means chords need very little squeeze. The solid torrefied spruce top stays crisp whether you strum hard or pick lightly, and the ES-B system with its built-in tuner takes it straight to a stage. It also holds resale value better than most beginner instruments.', 'sec3 content');
rep('<strong>La Academy 12e-N es la clásica de iniciación que quita las fricciones habituales.</strong> Casi todas las listas de iniciación se quedan en la opción más barata; esta gasta más en comodidad y electrónica. El reposabrazos tallado del borde superior evita que el cuerpo se clave en el antebrazo en sesiones largas, y la acción baja hace que los acordes pidan poca fuerza. La tapa sólida de abeto torrefactado mantiene el ataque nítido tanto al rasguear como al puntear, y el sistema ES-B de Taylor con afinador la lleva directa al escenario. Además conserva mejor el valor de reventa que la mayoría de instrumentos de iniciación.',
  null, 'sec3 content_es placeholder');

// The ES text above does not exist yet (original is the literal translation); replace the original instead.
region = region.replace(JSON.stringify(null), JSON.stringify(null)); // no-op safety
fs.writeFileSync('temp/_stage1.json', region, 'utf8');
console.log('stage1 applied, region bytes', region.length);
