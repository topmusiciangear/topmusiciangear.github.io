// 1) K&M 210/2: precio de catalogo $49 -> $108.99 (verificado; $49 estaba por debajo de TODAS las tiendas)
// 2) tabla: el soporte entra en los tres montajes (los tres usan condensador)
// 3) totales recalculados, prosa y titulos sin la promesa de $1.000
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const log = [];
const ok = m => log.push('  ok  ' + m);
const no = m => log.push('  FALTA  ' + m);

// ═══ 1) products.json ═══
const PF = BASE + 'data/products.json';
const arr = JSON.parse(fs.readFileSync(PF, 'utf8'));
const list = Array.isArray(arr) ? arr : arr.products;
const km = list.find(p => p.id === 58);
if (km.price === 49) { km.price = 108.99; ok('products.json · K&M 210/2: $49 -> $108.99'); }
else ok('products.json · K&M ya estaba en $' + km.price);
fs.writeFileSync(PF, JSON.stringify(Array.isArray(arr) ? list : arr, null, 2) + '\n', 'utf8');

// ═══ 2) tabla ═══
const GF = BASE + 'data/guides.json';
const g = JSON.parse(fs.readFileSync(GF, 'utf8'));
const guia = g.find(x => x.id === 'starter-studio');
const t = guia.productTable;
const byId = {}; list.forEach(p => byId[p.id] = p);

const stand = km.price;
const M = {
  'Interfaz': { 0: [15, 1], 1: [18, 1], 2: [18, 1] },
  'Micrófono': { 0: [297, 1], 1: [3, 1], 2: [3, 1] },
  'Auriculares': { 0: [609, 1], 1: [25, 1], 2: [26, 1] },
  'Monitores': { 2: [20, 2] },
  'Accesorios': { 0: [58, 1], 1: [58, 1], 2: [58, 1] },
  'Tratamiento acústico': { 0: [170, 1], 1: [170, 1], 2: [170, 1] }
};

// el soporte entra en las tres columnas de Accesorios
const acc = t.rows.find(r => (r.label_es || r.label) === 'Accesorios');
acc.values.forEach((v, c) => {
  v.value = 'K&M 210/2 Mic Stand';
  v.value_es = 'Soporte K&M 210/2';
});
ok('tabla · Accesorios = soporte K&M en los tres montajes');

// microfono del definitivo (por si no se aplico antes)
const mic = t.rows.find(r => (r.label_es || r.label) === 'Micrófono');
if (mic.values[2].value.indexOf('5th') < 0) {
  mic.values[2].value = 'Rode NT1 5th Generation (condenser)';
  mic.values[2].value_es = 'Rode NT1 5th Generation (condensador)';
  ok('tabla · microfono del Definitivo -> 5th Generation');
} else ok('tabla · microfono del Definitivo ya era 5th Generation');

// totales
const filaT = t.rows.find(r => r.label === 'Total');
const nuevos = [];
for (let c = 0; c < t.columns.length; c++) {
  let s = 0;
  Object.keys(M).forEach(label => {
    if (!M[label][c]) return;
    s += byId[M[label][c][0]].price * M[label][c][1];
  });
  nuevos.push(Math.round(s));
  filaT.values[c].value = '~$' + Math.round(s);
  filaT.values[c].value_es = '~$' + Math.round(s);
}
ok('tabla · totales -> $' + nuevos.join(' / $'));

// ═══ 3) titulos ═══
const TITULOS = [
  ['titleTag', 'Home Studio Under $1,000: 3 Setups That Actually Work', 'Home Studio in Three Tiers: $605, $925 and $1,393'],
  ['title_es', 'Home studio por menos de $1.000, en tres niveles', 'Home studio en tres niveles: $605, $925 y $1.393'],
  ['titleTag_es', 'Home studio por menos de $1.000, en tres niveles', 'Home studio en tres niveles: $605, $925 y $1.393']
];
TITULOS.forEach(([campo, viejo, nuevo]) => {
  if (guia[campo] === viejo) { guia[campo] = nuevo; ok(campo + ' -> "' + nuevo + '" (' + nuevo.length + 'c)'); }
  else no(campo + ': "' + String(guia[campo]).slice(0, 50) + '"');
});

// ═══ 4) prosa ═══
const REEMPL = [
  // importes
  [/\$545/g, '$605'], [/\$816/g, '$925'], [/\$905/g, '$1.393'], [/\$1,284/g, '$1.393'],
  // la promesa del limite
  [/Three complete home studio builds under \$1,000, priced from our catalogue\. What \$605, \$925 and \$1\.393 actually buy/,
   'Three complete home studio builds, priced from our catalogue. What $605, $925 and $1,393 actually buy'],
  [/Tres montajes de estudio doméstico por menos de \$1\.000, con precios de nuestro catálogo\. Qué compran \$605, \$925 y \$1\.393/,
   'Tres montajes de estudio doméstico con precios de nuestro catálogo. Qué compran $605, $925 y $1.393'],
  [/All three stay under \$1,000 with the room treatment already paid for, which is the part most "under \$1,000" lists leave out\./,
   'The first two sit under $1,000 and the third does not, because a pair of nearfield monitors plus everything else simply costs more than that. What all three have in common is the room treatment already paid for, which is the part most budget lists leave out.'],
  [/Los tres se quedan por debajo de \$1\.000 con el tratamiento de sala ya pagado, que es justo la parte que casi todas las listas de "menos de \$1\.000" se dejan\./,
   'Los dos primeros se quedan por debajo de $1.000 y el tercero no, porque un par de monitores de estudio cerca más todo lo demás. Lo que comparten los tres es el tratamiento de sala ya pagado, que es justo la parte que casi todas las listas economical se dejan.'],
  // el definitivo ya no "mantiene" el Signature
  [/<strong>The Ultimate Powerhouse at \$1\.393<\/strong> is the same interface, keeps the NT1 Signature, swaps the headphones for the broadcast-standard MDR-7506, and adds real monitors — a KRK Rokit 7 G5 pair\./,
   '<strong>The Ultimate Powerhouse at $1,393</strong> is the same interface and the same microphone, swaps the headphones for the broadcast-standard MDR-7506, and adds real monitors — a KRK Rokit 7 G5 pair, which is where most of the extra $468 goes.'],
  [/<strong>El Definitivo por \$1\.393<\/strong> da el salto a la SSL 2\+ MKII —la misma del nivel intermedio—, mantiene el NT1 Signature, cambia los auriculares por el MDR-7506 estándar de radiodifusión y añade monitores de verdad: un par de KRK Rokit 7 G5\./,
   '<strong>El Definitivo por $1.393</strong> usa la misma interfaz y el mismo micrófono, cambia los auriculares por el MDR-7506 estándar de radiodifusión y añade monitores de verdad: un par de KRK Rokit 7 G5, que es donde se van casi los $468 de diferencia.'],
  // el "past five hundred" ya no aplica
  [/Every part is the entry model in its category, and keeping four panels of treatment in this tier is what pushes it past five hundred: cut the panels and you save a hundred dollars you would only spend again fixing the room\./,
   'Every part is the entry model in its category, and the acoustic treatment is the one line here that is not optional: cut the panels and you save eighty dollars you would only spend again fixing the room.'],
  [/Cada pieza es el modelo de entrada de su categoría, y mantener los cuatro paneles de tratamiento en este nivel es lo que lo pasa de los quinientos: quítalos y ahorras cien dólares que volverás a gastar en arreglar la sala\./,
   'Cada pieza es el modelo de entrada de su categoría, y el tratamiento acústico es la única línea de aquí que no es opcional: quítalos y ahorras ochenta dólares que volverás a gastar en arreglar la sala.'],
  // el profesional ya no es solo "subir de micro"
  [/<strong>The Pro Producer at \$925<\/strong> moves up to the NT1 5th Generation — the quietest large-diaphragm condenser available new — and adds the ATH-M50x\. This is the tier most people should buy: the NT1 5th Generation is the quietest large-diaphragm condenser available new, and the M50x will not lie to you about what you mixed\./,
   '<strong>The Pro Producer at $925</strong> swaps the Scarlett for the SSL 2+ MKII, moves up to the NT1 5th Generation — the quietest large-diaphragm condenser available new — and adds the ATH-M50x. This is the tier most people should buy: nothing in that list is a luxury, and the M50x will not lie to you about what you mixed.'],
  [/<strong>El Productor Profesional por \$925<\/strong> sube al NT1 5th Generation —el condensador de diafragma grande más silencioso que hay nuevo— y añade los ATH-M50x\. Este es el nivel que debería comprar la mayoría: el NT1 5th Generation es el condensador de diafragma grande más silencioso que hay nuevo, y el M50x no te va a mentir sobre lo que has mezclado\./,
   '<strong>El Productor Profesional por $925</strong> cambia la Scarlett por la SSL 2+ MKII, sube al NT1 5th Generation —el condensador de diafragma grande más silencioso que hay nuevo— y añade los ATH-M50x. Este es el nivel que debería comprar la mayoría: nada de esa lista es un lujo, y el M50x no te va a mentir sobre lo que has mezclado.']
];

function aplicar(txt) {
  let n = txt;
  REEMPL.forEach(([rx, rep]) => { n = n.replace(rx, rep); });
  return n;
}

['intro', 'intro_es', 'description', 'description_es', 'conclusion', 'conclusion_es', 'verdict', 'verdict_es'].forEach(campo => {
  if (typeof guia[campo] !== 'string') return;
  const antes = guia[campo];
  guia[campo] = aplicar(guia[campo]);
  if (guia[campo] !== antes) ok(campo + ' actualizado');
});
guia.sections.forEach((s, i) => {
  ['content', 'content_es'].forEach(k => {
    if (typeof s[k] !== 'string') return;
    const antes = s[k];
    s[k] = aplicar(s[k]);
    if (s[k] !== antes) ok('sections[' + i + '].' + k + ' actualizado');
  });
});

fs.writeFileSync(GF, JSON.stringify(g, null, 2) + '\n', 'utf8');

console.log(log.join('\n'));
console.log('\n=== TOTALES FINALES ===');
console.log('  ' + t.columns.map((c, i) => c.title_es + ' ~$' + nuevos[i]).join('  |  '));
console.log('  por debajo de $1.000: ' + nuevos.filter(v => v < 1000).length + ' de 3');
console.log('  mojibake guides.json: ' + (fs.readFileSync(GF, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
console.log('  mojibake products.json: ' + (fs.readFileSync(PF, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
