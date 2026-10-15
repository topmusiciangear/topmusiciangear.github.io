// Añadir ATH-M20x al tier Budget: tabla + veredicto 4+4 EN/ES + featuredProducts + recalcular total
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const gf = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gf, 'utf8'));
const g = guides.find(x => x.id === 'starter-studio');

// ═══ 1) Veredicto del M20x ═══
const V_M20X = {
  name: 'Audio-Technica ATH-M20x',
  name_es: 'Audio-Technica ATH-M20x',
  productId: 609,
  pros: [
    'Flat, honest tuning from the M-Series lineage at a price that leaves room for the rest of the kit',
    'Closed-back isolation keeps the mix out of the microphone while you record',
    '47 ohm impedance runs from a laptop, a phone or a proper interface',
    'The build quality is a step above every other headphone at this price'
  ],
  cons: [
    'Fixed 3 m cable — a frayed wire means a new pair, and there is no locking connector to save it',
    'No folding frame: it does not collapse flat for a backpack',
    'Flat tuning has no bass punch for casual listening on its own',
    'Only 30 mm of padding around the ears — long sessions get warm'
  ],
  pros_es: [
    'Afinación plana y honesta de la línea M-Series a un precio que deja hueco para el resto del equipo',
    'El aislamiento cerrado mantiene la mezcla fuera del micrófono mientras grabas',
    '47 ohmios de impedancia: funciona desde un portátil, un móvil o una interfaz de verdad',
    'La calidad de construcción es un escalón por encima de cualquier otro auricular a este precio'
  ],
  cons_es: [
    'Cable fijo de 3 m — un cable pelado significa un par nuevo, y no hay conector de bloqueo que lo salve',
    'Sin chasis plegable: no se colapsa plano para una mochila',
    'La afinación plana no tiene pegada de graves para escuchar solo por gusto',
    'Solo 30 mm de acolchado alrededor de la oreja — las sesiones largas se calientan'
  ]
};
const idx = g.verdictProsCons.findIndex(v => v.name === 'Audio-Technica ATH-M20x');
if (idx > -1) { g.verdictProsCons[idx] = V_M20X; console.log('veredicto M20x reemplazado'); }
else { g.verdictProsCons.push(V_M20X); console.log('veredicto M20x añadido'); }

// ═══ 2) Fila Headphones: col0 ahora lleva M20x ═══
const fila = g.productTable.rows.find(r => r.label === 'Headphones');
fila.values[0] = { value: 'Audio-Technica ATH-M20x', value_es: 'Audio-Technica ATH-M20x' };
console.log('fila Headphones col0: ' + fila.values[0].value);

// ═══ 3) Recalcular el total del Budget ═══
// Budget: 2i2 $199 + SM57 $99 + K&M $49 + G4M $79 + M20x $59
const BUDGET = 199 + 99 + 49 + 79 + 59;
console.log('\nBudget recalculado: $' + BUDGET);
const totalRow = g.productTable.rows.find(r => r.label === 'Total');
totalRow.values[0].value = '~$' + BUDGET;
totalRow.values[0].value_es = '~$' + BUDGET;
console.log('total col0: ' + totalRow.values[0].value);

// ═══ 4) featuredProducts ═══
if (!g.featuredProducts.includes(609)) {
  // insertarlo tras el M50x para no romper el orden tematico
  const posM50 = g.featuredProducts.indexOf(25);
  g.featuredProducts.splice(posM50 > -1 ? posM50 + 1 : g.featuredProducts.length, 0, 609);
}
console.log('featuredProducts: ' + g.featuredProducts.join(', '));

// ═══ 5) Actualizar la seccion que menciona el total del Budget ═══
const sec = g.sections.find(s => /Three Budgets/.test(s.heading));
if (sec) {
  sec.content = sec.content.replace('~$426', '~$' + BUDGET);
  sec.content_es = sec.content_es.replace('~$426', '~$' + BUDGET);
  console.log('seccion "Three Budgets" actualizada a $' + BUDGET);
}
const secEs = g.sections.find(s => /tres presupuestos/i.test(s.heading));
if (secEs && secEs !== sec) {
  secEs.content = secEs.content.replace('~$426', '~$' + BUDGET);
  secEs.content_es = secEs.content_es.replace('~$426', '~$' + BUDGET);
}
// conclusion
if (g.conclusion) g.conclusion = g.conclusion.replace('$426', '$' + BUDGET);
if (g.conclusion_es) g.conclusion_es = g.conclusion_es.replace('$426', '$' + BUDGET);
if (g.intro) g.intro = g.intro.replace('$426', '$' + BUDGET);
if (g.intro_es) g.intro_es = g.intro_es.replace('$426', '$' + BUDGET);
if (g.description) g.description = g.description.replace('$426', '$' + BUDGET);
if (g.description_es) g.description_es = g.description_es.replace('$426', '$' + BUDGET);

fs.writeFileSync(gf, JSON.stringify(guides, null, 2), 'utf8');

// ═══ VERIFICACION ═══
console.log('\n=== TABLA ===');
g.productTable.rows.forEach(r=>{
  console.log('  ' + r.label.padEnd(24));
  r.values.forEach((v,i)=>console.log('      ' + g.productTable.columns[i].title.padEnd(26) + v.value));
});
console.log('\n=== VEREDICTOS (' + g.verdictProsCons.length + ') ===');
let fallos = 0;
g.verdictProsCons.forEach(v=>{
  const a = [v.pros.length, v.cons.length, v.pros_es.length, v.cons_es.length];
  if (Math.min(...a) < 4) fallos++;
  console.log('  ' + (Math.min(...a)>=4?'OK ':'!! ') + a.join('/') + '  ' + v.name);
});
console.log('veredictos <4: ' + fallos);
let des = 0;
g.productTable.rows.forEach(r=>{ if(r.values.length !== g.productTable.columns.length) des++; });
console.log('celdas desajustadas: ' + des);
console.log('longitud desc EN: ' + g.description.length + ' | ES: ' + g.description_es.length);
const cjk = (JSON.stringify(guides).match(/[\u4e00-\u9fff]/g)||[]);
console.log('CJK: ' + (cjk.length ? [...new Set(cjk)].join('') : 'ninguno'));