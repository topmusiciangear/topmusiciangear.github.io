// 1) Titulo de seccion: "¿Qué compra de verdad $1.000?" -> gramatical
// 2) Correccion de conteo: el Basico tiene 5 piezas, no 4
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const gf = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gf, 'utf8'));
const g = guides.find(x => x.id === 'starter-studio');
const sec = g.sections.find(s => /Three Budgets/.test(s.heading));

console.log('ANTES:');
console.log('  EN heading: ' + sec.heading);
console.log('  ES heading: ' + sec.heading_es);

const ANTES_EN_FRASE = 'Every part is the entry model in its category, which is the only way four of them fit under five hundred dollars.';
const ANTES_ES_FRASE = 'Cada pieza es el modelo de entrada de su categoría, que es la única forma de que quepan cuatro por menos de quinientos dólares.';

// ═══ 1) TITULOS ═══
// EN: la construccion con gerundio ("What $1,000 Actually Buys") ya es correcta y natural
// ES: "¿Qué compra de verdad $1.000?" no es gramatical
sec.heading_es = 'Los tres presupuestos: qué se compra de verdad con $1.000';

// ═══ 2) CONTEO: el Basico tiene 5 piezas ═══
sec.content = sec.content.replace(ANTES_EN_FRASE,
  'Every part is the entry model in its category, and five of them fitting under five hundred dollars is the only way this tier reaches the number without cutting the acoustic treatment.');
sec.content_es = sec.content_es.replace(ANTES_ES_FRASE,
  'Cada pieza es el modelo de entrada de su categoría, y que cinco quepan por menos de quinientos dólares es lo único que permite que este tier llegue a la cifra sin recortar el tratamiento acústico.');

fs.writeFileSync(gf, JSON.stringify(guides, null, 2), 'utf8');

console.log('\nDESPUES:');
console.log('  EN heading: ' + sec.heading);
console.log('  ES heading: ' + sec.heading_es);

const clean = h => String(h).replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
console.log('\n--- EN ---\n' + clean(sec.content));
console.log('\n--- ES ---\n' + clean(sec.content_es));

// ═══ VERIFICACION ═══
const s = JSON.stringify(guides);
console.log('\nrestos de "¿Qué compra de verdad": ' + (s.indexOf('¿Qué compra de verdad')>-1?'SI':'no'));
console.log('restos de "cuatro por menos de quinientos": ' + (s.indexOf('cuatro por menos de quinientos')>-1?'SI':'no'));
console.log('"cinco quepan por menos de quinientos" presente: ' + (s.indexOf('cinco quepan por menos de quinientos')>-1?'SI':'no'));
// contar las piezas del Basico segun la tabla
const tabla = g.productTable;
const piezas = {};
['Interface','Microphone','Headphones','Studio Monitors','Accessories','Acoustic Treatment'].forEach(label=>{
  const f = tabla.rows.find(r=>r.label===label);
  if(!f) return;
  const v = f.values[0].value;
  if (/Not included|Headphones only/i.test(v)) return;
  piezas[label] = v;
});
console.log('\n=== piezas reales del Basico segun la tabla: ' + Object.keys(piezas).length + ' ===');
Object.keys(piezas).forEach(k=>console.log('  ' + k + ': ' + piezas[k]));
const cjk = (s.match(/[\u4e00-\u9fff]/g)||[]);
console.log('CJK: ' + (cjk.length ? [...new Set(cjk)].join('') : 'ninguno'));