// Final natural-language polish for best-nylon-guitars-for-beginners (EN + ES)
const fs = require('fs');
const FILE = 'data/guides.json';
let raw = fs.readFileSync(FILE, 'utf8');

const start = raw.indexOf('"id": "best-nylon-guitars-for-beginners"');
if (start < 0) throw new Error('guide not found');
const endMarker = raw.indexOf('\n    {\n      "id": "', start);
const end = endMarker < 0 ? raw.length : endMarker;
let region = raw.slice(start, end);

let n = 0;
function sub(oldText, newText, label, expected) {
  const want = expected || 1;
  const c = region.split(oldText).length - 1;
  if (c !== want) throw new Error(`[${label}] expected ${want}, got ${c}`);
  region = region.split(oldText).join(newText);
  n += c;
}

// A) ES intro: "cantable" / "práctica nocturna" were literal
sub('dan un tono cálido y cantable que funciona para estudios clásicos y práctica nocturna.',
  'dan un tono cálido y lleno que funciona tanto para estudios clásicos como para practicar por la noche.',
  'intro_es');

// B) §0 ES: "la guitarra que te entregan los profesores" → natural phrasing
sub('<strong>La C40II es la guitarra que te entregan los profesores.</strong>',
  '<strong>La C40II es la guitarra que te ponen los profesores en las primeras clases.</strong>',
  'sec0 intro_es');
sub('Es el punto de referencia contra el que se miden las demás nylon de iniciación.',
  'Es el punto de referencia contra el que se miden las demás guitarras de nylon de iniciación.',
  'sec0 close_es');

// C) §1 ES heading: "actualización" was a literal translation of "upgrade"
sub('Cordoba C5: mejor tono tradicional y actualización con tapa maciza',
  'Cordoba C5: mejor tono tradicional y salto a tapa maciza',
  'sec1 heading_es', 2);

// D) §1 opening repeated the same idea as §5 ("solid top without concert prices")
sub('<strong>If you want a solid top without jumping to concert prices, the C5 gets you there.</strong> Solid cedar over laminated mahogany gives a soft attack and warm midrange',
  '<strong>Solid cedar is the reason the C5 sounds older than its price.</strong> Laminated mahogany back and sides keep a soft attack and warm midrange',
  'sec1 content');
sub('<strong>Si quieres tapa maciza sin saltar a precios de concierto, la C5 te lleva ahí.</strong> Cedro macizo sobre caoba laminada da un ataque suave y un medio cálido',
  '<strong>La tapa de cedro macizo es la razón de que la C5 suene más madura de lo que cuesta.</strong> El fondo y los aros de caoba laminada mantienen un ataque suave y un medio cálido',
  'sec1 content_es');
sub('Es más ligera de lo que muchos esperan y el acabado se siente adulto. Pruébala si quieres más profundidad que una iniciación laminada.',
  'Es más ligera de lo que muchos esperan y el acabado se siente serio. Pruébala si buscas más profundidad que una guitarra laminada de iniciación.',
  'sec1 close_es');

// E) §4 ES: article + "tapa sólida" → "tapa maciza" (consistent terminology)
sub('No es tan refinada como Taylor o Yamaha de tapa sólida,',
  'No es tan refinada como las Taylor o las Yamaha de tapa maciza,',
  'sec4 content_es');

// F) §7 ES: "para clásicos que tocan en directo" was ambiguous
sub('Es una herramienta práctica de escenario para clásicos que tocan en directo.',
  'Es una herramienta práctica de escenario para guitarristas clásicos que tocan en directo.',
  'sec7 content_es');

raw = raw.slice(0, start) + region + raw.slice(end);
fs.writeFileSync(FILE, raw, 'utf8');

const arr = JSON.parse(fs.readFileSync(FILE, 'utf8'));
const g = (Array.isArray(arr) ? arr : arr.guides).find(x => x.id === 'best-nylon-guitars-for-beginners');
console.log('replacements:', n);
console.log('sections:', g.sections.length, 'faq:', g.faq.length, 'verdicts:', g.verdictProsCons.length);
g.verdictProsCons.forEach(v => console.log(' -', v.pros.length, 'pros /', v.cons.length, 'cons |', v.name.slice(0, 55)));
console.log('intro_es:', g.intro_es);
console.log('sec1 heading_es:', g.sections[1].heading_es);
