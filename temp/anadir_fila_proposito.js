// Reponer "Para que sirve cada montaje" como primera fila, con contenido corregido
// para la nueva estructura (los tres niveles llevan monitores alimentados)
const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const guia = g.find(x => x.id === 'starter-studio');
const t = guia.productTable;

const col = (en, es) => ({ value: en, value_es: es });
const nueva = {
  label: 'What Each Build Is For',
  label_es: 'Para qué sirve cada montaje',
  values: [
    col('Record and mix in a small room, with real powered speakers from day one.',
      'Grabar y mezclar en una habitación pequeña, con altavoces alimentados de verdad desde el primer día.'),
    col('Record vocals properly and mix what you capture, with real stereo image instead of a guess.',
      'Grabar voz en condiciones y mezclar lo que capturas, con imagen estéreo real en vez de suposiciones.'),
    col('Judge low end physically and master for streaming without leaving the house.',
      'Juzgar el grave de forma física y masterizar para plataformas sin salir de casa.')
  ]
};

// quitar si ya existe
t.rows = t.rows.filter(r => r.label !== 'What Each Build Is For' && r.label_es !== 'Para qué sirve cada montaje');
t.rows.unshift(nueva);

fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');

const t2 = JSON.parse(fs.readFileSync(F, 'utf8')).find(x => x.id === 'starter-studio').productTable;
console.log('=== TABLA FINAL (' + t2.rows.length + ' filas) ===\n');
t2.rows.forEach((r, i) => console.log('  [' + i + '] ' + (r.label_es || r.label)));
console.log('\nceldas por fila: ' + t2.rows.map(r => r.values.length).join(', '));
console.log('columnas: ' + t2.columns.length);
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
