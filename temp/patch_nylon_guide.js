// Patch best-nylon-guitars-for-beginners: text/spec fixes + product table rebuild
const fs = require('fs');
const FILE = 'data/guides.json';
let raw = fs.readFileSync(FILE, 'utf8');

const parsedAll = JSON.parse(raw);
const G = (Array.isArray(parsedAll) ? parsedAll : parsedAll.guides).find(x => x.id === 'best-nylon-guitars-for-beginners');

const start = raw.indexOf('"id": "best-nylon-guitars-for-beginners"');
if (start < 0) throw new Error('guide start not found');
const endMarker = raw.indexOf('\n    {\n      "id": "', start);
const end = endMarker < 0 ? raw.length : endMarker;
let region = raw.slice(start, end);

let applied = 0;
// full JSON string value (handles escaping exactly like the file)
function subE(oldText, newText, label) {
  const o = JSON.stringify(oldText);
  const n = JSON.stringify(newText);
  const count = region.split(o).length - 1;
  if (count !== 1) throw new Error(`[${label}] expected 1 match, got ${count}`);
  region = region.replace(o, n);
  applied++;
}
// plain substring replacement (no double quotes inside)
function sub(oldText, newText, expected, label) {
  const count = region.split(oldText).length - 1;
  if (count !== expected) throw new Error(`[${label}] expected ${expected} matches, got ${count}`);
  region = region.split(oldText).join(newText);
  applied += count;
}

// ---------- titles (ES was 87 / 79 chars) ----------
sub('Mejores guitarras clásicas para principiantes: las mejores opciones de cuerdas de nylon',
  'Las mejores guitarras clásicas para principiantes', 1, 'title_es');
sub('Mejores guitarras clásicas para principiantes: opciones de cuerdas de nylon',
  'Las mejores guitarras clásicas para principiantes', 1, 'titleTag_es');

// ---------- intro: no product counts ----------
sub('These nine picks cover every budget and body size, from the official student standard to fractional sizes for kids.',
  'These picks cover every budget and body size, from the official student standard to fractional sizes for kids.', 1, 'intro');
sub('Estas nueve opciones cubren cada presupuesto y tamaño de cuerpo, desde el estándar oficial de estudiante hasta tamaños fraccionarios para niños.',
  'Estas opciones cubren cada presupuesto y tamaño de cuerpo, desde el estándar oficial de estudiante hasta tamaños fraccionarios para niños.', 1, 'intro_es');

// ---------- section 2: Ortega R121 has a laminated spruce top ----------
sub('Solid spruce top with mahogany back and sides sounds bigger than its price',
  'Laminated spruce top with mahogany back and sides sounds bigger than its price', 1, 'sec2 content');
sub('Tapa sólida de abeto con fondo y aros de caoba suena más grande de lo que cuesta',
  'Tapa laminada de abeto con fondo y aros de caoba suena más grande de lo que cuesta', 1, 'sec2 content_es');
sub('Solid spruce top at a low price', 'Spruce top and 650 mm scale at a starter price', 2, 'sec2 pro');
sub('Tapa sólida de abeto a bajo precio', 'Tapa de abeto y escala de 650 mm a precio de iniciación', 2, 'sec2 pro_es');

// ---------- section 3: Taylor natural rewrite (EN + ES) ----------
subE(G.sections[3].content,
  '<strong>The Academy 12e-N is the beginner nylon that removes the usual friction.</strong> Most starter lists stop at the cheapest option; this one spends the extra money on comfort and electronics instead. The carved armrest on the upper edge keeps the body from digging into your forearm during long practice, and the low action means chords need very little squeeze. The solid torrefied spruce top stays crisp whether you strum hard or pick lightly, and the ES-B system with its built-in tuner takes it straight to a stage. It also holds resale value better than most beginner instruments.', 'sec3 content');
subE(G.sections[3].content_es,
  '<strong>La Academy 12e-N es la clásica de iniciación que se quita las fricciones de en medio.</strong> Casi todas las listas de iniciación se quedan en la opción más barata; esta dedica el dinero extra a comodidad y electrónica. El reposabrazos tallado del borde superior evita que el cuerpo se clave en el antebrazo en sesiones largas, y la acción baja hace que los acordes pidan muy poca fuerza. La tapa sólida de abeto torrefactado se mantiene nítida tanto al rasguear fuerte como al puntear suave, y el sistema ES-B con afinador integrado la lleva directa al escenario. Además conserva mejor el valor de reventa que la mayoría de instrumentos de iniciación.', 'sec3 content_es');

// ---------- section 5: CG122MSH re-angle (solid spruce + nato, no "under 250") ----------
sub('Yamaha CG122MSH: best concert projection under €250',
  'Yamaha CG122MSH: best solid-spruce step up for students', 2, 'sec5 heading');
sub('Yamaha CG122MSH: mejor proyección de concierto por menos de 250 €',
  'Yamaha CG122MSH: mejor salto a tapa maciza para estudiantes', 2, 'sec5 heading_es');
subE(G.sections[5].content,
  "<strong>If you want a solid top without paying concert prices, the CG122MSH is the honest step up.</strong> Solid spruce over nato back and sides gives clear, articulate notes that carry across a room. The matte finish feels fast and the build is typical Yamaha reliable. It sits a clear step above laminate starters and holds its own in lessons and small performances.", 'sec5 content');
subE(G.sections[5].content_es,
  'Si quieres tapa maciza sin pagar precios de concierto, la CG122MSH es el salto honesto. Abeto macizo sobre fondo y aros de nato ofrece notas claras y articuladas que se oyen en toda la sala. El acabado mate se siente rápido y la construcción es fiable al estilo Yamaha. Está claramente un paso por encima de las laminadas de iniciación y se defiende en clases y pequeñas actuaciones.', 'sec5 content_es');
sub('Rosewood back and sides for clarity', 'Nato back and sides for a clear, balanced voice', 2, 'sec5 pro');
sub('Fondo y aros de palisandro para claridad', 'Fondo y aros de nato para una voz clara y equilibrada', 2, 'sec5 pro_es');
sub('Price pushes the sub-€250 target in some markets', 'Costs noticeably more than laminate starters', 2, 'sec5 con');
sub('El precio roza el límite de 250 € en algunos mercados', 'Cuesta bastante más que una laminada de iniciación', 2, 'sec5 con_es');
sub('Standard classical neck can be wide', '52 mm nut is wide for small hands', 2, 'sec5 con2');
sub('Mástil clásico estándar puede resultar ancho', 'Cejuela de 52 mm ancha para manos pequeñas', 2, 'sec5 con2_es');
sub('Rosewood requires care', 'Matte finish shows fingerprints', 2, 'sec5 con3');
sub('El palisandro requiere cuidado', 'El acabado mate marca las huellas', 2, 'sec5 con3_es');

// ---------- section 7: Ibanez back and sides are sapele ----------
sub('spruce top and mahogany back and sides, 46 mm nut width',
  'spruce top and sapele back and sides, 46 mm nut width', 1, 'sec7 content');
sub('tapa de abeto, fondo y aros de caoba, cejuela de 46 mm',
  'tapa de abeto, fondo y aros de sapele, cejuela de 46 mm', 1, 'sec7 content_es');

// ---------- section 9: Admira cons wording ----------
sub('Laminate construction limits projection', 'Laminated back and sides limit projection', 2, 'sec9 con');
sub('Construcción laminada limita proyección', 'Fondo y aros laminados limitan la proyección', 2, 'sec9 con_es');

// ---------- product table rebuild (columns were 9, rows have 10) ----------
const table = {
  title: 'Best Classical Guitars for Beginners Compared',
  title_es: 'Comparativa de las mejores guitarras clásicas para principiantes',
  columns: [
    { title: 'Yamaha C40II', title_es: 'Yamaha C40II' },
    { title: 'Cordoba C5', title_es: 'Cordoba C5' },
    { title: 'Ortega R121', title_es: 'Ortega R121' },
    { title: 'Taylor Academy 12e-N', title_es: 'Taylor Academy 12e-N' },
    { title: 'Takamine GC1CE', title_es: 'Takamine GC1CE' },
    { title: 'Yamaha CG122MSH', title_es: 'Yamaha CG122MSH' },
    { title: 'Fender CN-60S', title_es: 'Fender CN-60S' },
    { title: 'Ibanez GA35TCE', title_es: 'Ibanez GA35TCE' },
    { title: 'Cordoba Protege C1 3/4', title_es: 'Cordoba Protege C1 3/4' },
    { title: 'Admira Alba 4/4', title_es: 'Admira Alba 4/4' }
  ],
  rows: [
    {
      label: 'Best For',
      label_es: 'Ideal para',
      values: [
        { value: 'Official student standard', value_es: 'Estándar oficial de estudiante' },
        { value: 'Traditional solid-top upgrade', value_es: 'Salto a tapa maciza tradicional' },
        { value: 'Budget pack with gig bag', value_es: 'Pack económico con funda' },
        { value: 'Comfort and electronics', value_es: 'Comodidad y electrónica' },
        { value: 'Affordable electro-classical with cutaway', value_es: 'Electroclásica asequible con cutaway' },
        { value: 'Solid-spruce step up', value_es: 'Salto a tapa maciza' },
        { value: 'Crossover for small hands', value_es: 'Crossover para manos pequeñas' },
        { value: 'Thin-body electro stage', value_es: 'Electro de cuerpo fino para escenario' },
        { value: 'Fractional size for kids', value_es: 'Tamaño fraccionario para niños' },
        { value: 'Ultra-budget traditional', value_es: 'Tradicional ultra económica' }
      ]
    },
    {
      label: 'Top',
      label_es: 'Tapa',
      values: [
        { value: 'Spruce', value_es: 'Abeto' },
        { value: 'Solid cedar', value_es: 'Cedro macizo' },
        { value: 'Laminated spruce', value_es: 'Abeto laminado' },
        { value: 'Solid torrefied spruce', value_es: 'Abeto torrefactado macizo' },
        { value: 'Spruce', value_es: 'Abeto' },
        { value: 'Solid spruce', value_es: 'Abeto macizo' },
        { value: 'Solid spruce', value_es: 'Abeto macizo' },
        { value: 'Spruce', value_es: 'Abeto' },
        { value: 'Laminated spruce', value_es: 'Abeto laminado' },
        { value: 'Oregon pine', value_es: 'Pino de Oregón' }
      ]
    },
    {
      label: 'Back & sides',
      label_es: 'Aros y fondo',
      values: [
        { value: 'Meranti', value_es: 'Meranti' },
        { value: 'Laminated mahogany', value_es: 'Caoba laminada' },
        { value: 'Mahogany', value_es: 'Caoba' },
        { value: 'Layered walnut', value_es: 'Nogal laminado' },
        { value: 'Mahogany', value_es: 'Caoba' },
        { value: 'Nato', value_es: 'Nato' },
        { value: 'Mahogany', value_es: 'Caoba' },
        { value: 'Sapele', value_es: 'Sapele' },
        { value: 'Mahogany', value_es: 'Caoba' },
        { value: 'Sapelli', value_es: 'Sapelli' }
      ]
    },
    {
      label: 'Scale length',
      label_es: 'Escala',
      values: [
        { value: '650 mm', value_es: '650 mm' },
        { value: '650 mm', value_es: '650 mm' },
        { value: '650 mm', value_es: '650 mm' },
        { value: '648 mm', value_es: '648 mm' },
        { value: '650 mm', value_es: '650 mm' },
        { value: '650 mm', value_es: '650 mm' },
        { value: '643 mm', value_es: '643 mm' },
        { value: '648 mm', value_es: '648 mm' },
        { value: '615 mm', value_es: '615 mm' },
        { value: '650 mm', value_es: '650 mm' }
      ]
    },
    {
      label: 'Nut width',
      label_es: 'Cejuela',
      values: [
        { value: '52 mm', value_es: '52 mm' },
        { value: '52 mm', value_es: '52 mm' },
        { value: '52 mm', value_es: '52 mm' },
        { value: '47.6 mm', value_es: '47,6 mm' },
        { value: '50.8 mm', value_es: '50,8 mm' },
        { value: '52 mm', value_es: '52 mm' },
        { value: '43 mm', value_es: '43 mm' },
        { value: '46 mm', value_es: '46 mm' },
        { value: '48 mm', value_es: '48 mm' },
        { value: '52 mm', value_es: '52 mm' }
      ]
    }
  ]
};

const tKey = '"productTable":';
const tKeyIdx = region.indexOf(tKey);
if (tKeyIdx < 0) throw new Error('productTable not found');
const valStart = region.indexOf('{', tKeyIdx);
let depth = 0, inStr = false, esc = false, valEnd = -1;
for (let i = valStart; i < region.length; i++) {
  const c = region[i];
  if (inStr) {
    if (esc) esc = false;
    else if (c === '\\') esc = true;
    else if (c === '"') inStr = false;
  } else {
    if (c === '"') inStr = true;
    else if (c === '{') depth++;
    else if (c === '}') { depth--; if (depth === 0) { valEnd = i + 1; break; } }
  }
}
if (valEnd < 0) throw new Error('productTable end not found');
const newTableText = JSON.stringify(table, null, 2).split('\n').map((l, i) => (i === 0 ? l : '    ' + l)).join('\n');
region = region.slice(0, valStart) + newTableText + region.slice(valEnd);

raw = raw.slice(0, start) + region + raw.slice(end);
fs.writeFileSync(FILE, raw, 'utf8');

const arr = JSON.parse(fs.readFileSync(FILE, 'utf8'));
const g = (Array.isArray(arr) ? arr : arr.guides).find(x => x.id === 'best-nylon-guitars-for-beginners');
if (!g) throw new Error('guide missing after write');
const bad = (g.productTable.rows || []).filter(r => r.values.length !== g.productTable.columns.length);
const s = JSON.stringify(g);
console.log('replacements:', applied);
console.log('columns:', g.productTable.columns.length, 'rows:', g.productTable.rows.length, 'mismatched:', bad.length);
console.log('title(', g.title.length, '):', g.title);
console.log('titleTag(', g.titleTag.length, '):', g.titleTag);
console.log('title_es(', g.title_es.length, '):', g.title_es);
console.log('titleTag_es(', g.titleTag_es.length, '):', g.titleTag_es);
console.log('leftover "250":', /250/.test(s));
console.log('leftover Ortega solid top:', s.includes('Solid spruce top with mahogany back and sides sounds'));
console.log('leftover AI phrases:', /anti-frustration|flips the script|pristine|seguro anti-frustración/i.test(s));
console.log('leftover mahogany Ibanez/rosewood Yamaha:', s.includes('tapa de abeto, fondo y aros de caoba, cejuela de 46'), s.includes('Rosewood back and sides for clarity'));
