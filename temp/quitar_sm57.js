// Quitar el Shure SM57 (id 5) de starter-studio y poner el NT1 Signature en el montaje Basico.
// Total del Basico: $485 -> $545 (precio de catalogo).
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const F = BASE + 'data/guides.json';

const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const guia = g.find(x => x.id === 'starter-studio');
const SM57 = 5;
const log = [];
function ok(m) { log.push('  ok  ' + m); }
function no(m) { log.push('  FALTA  ' + m); }

// ── 1) featuredProducts ──
const antes = guia.featuredProducts.length;
guia.featuredProducts = guia.featuredProducts.filter(id => id !== SM57);
(guia.featuredProducts.length === antes - 1 ? ok : no)('featuredProducts: ' + antes + ' -> ' + guia.featuredProducts.length);

// ── 2) quitar las dos secciones (por heading, no por indice) ──
const MUERTAS = [
  'El repuesto que te llevas en cada vuelo',
  'La decisión entre dinámico y condensador'
];
MUERTAS.forEach(h => {
  const i = guia.sections.findIndex(s => (s.heading_es || s.heading) === h);
  if (i > -1) { guia.sections.splice(i, 1); ok('seccion eliminada: "' + h + '"'); }
  else no('seccion no encontrada: "' + h + '"');
});

// ── 3) veredicto del SM57 ──
const vi = guia.verdictProsCons.findIndex(v => v.productId === SM57);
if (vi > -1) { ok('veredicto eliminado: ' + guia.verdictProsCons[vi].name); guia.verdictProsCons.splice(vi, 1); }
else no('veredicto del SM57 no encontrado');

// ── 4) tabla: microfono y total ──
const mic = guia.productTable.rows.find(r => (r.label || '').toLowerCase().includes('microphone'));
if (mic) {
  mic.values[0].value = 'Rode NT1 Signature (condenser)';
  mic.values[0].value_es = 'Rode NT1 Signature (condensador)';
  ok('tabla · microfono col 1 -> Rode NT1 Signature');
} else no('fila de microfono no encontrada');

const tot = guia.productTable.rows.find(r => (r.label || '').toLowerCase() === 'total');
if (tot) {
  tot.values[0].value = '~$545';
  tot.values[0].value_es = '~$545';
  ok('tabla · Total col 1 ~$485 -> ~$545');
} else no('fila Total no encontrada');

// ── 5) importes sueltos ──
const simples = [
  ['intro', 'intro'], ['intro_es', 'intro_es'],
  ['description', 'description'], ['description_es', 'description_es'],
  ['featuredSnippet', 'featuredSnippet']
];
simples.forEach(([campo, etiq]) => {
  const v = guia[campo];
  if (typeof v === 'string' && v.indexOf('$485') > -1) { guia[campo] = v.replace(/\$485/g, '$545'); ok(etiq + ': $485 -> $545'); }
});

// ── 6) prosa de secciones ──
const s1 = guia.sections.find(s => (s.heading_es || '').indexOf('Los tres presupuestos') > -1);
if (s1) {
  s1.content = s1.content
    .replace('The Budget Essentials at $485', 'The Budget Essentials at $545')
    .replace('a Scarlett 2i2 to capture, an SM57 to capture with,', 'a Scarlett 2i2 to capture, an NT1 Signature condenser to capture with,')
    .replace('Every part is the entry model in its category, and five of them fitting under five hundred dollars is the only way this tier reaches the number without cutting the acoustic treatment.',
      'Every part is the entry model in its category, and keeping four panels of treatment in this tier is what pushes it past five hundred: cut the panels and you save a hundred dollars you would only spend again fixing the room.')
    .replace('The Pro Producer at $816</strong> swaps the dynamic for a quiet condenser and adds the ATH-M50x.',
      'The Pro Producer at $816</strong> moves up to the NT1 5th Generation — the quietest large-diaphragm condenser available new — and adds the ATH-M50x.')
    .replace('The Ultimate Powerhouse at $905</strong> is the same interface, the NT1 Signature condenser, the broadcast-standard MDR-7506, and real monitors',
      'The Ultimate Powerhouse at $905</strong> is the same interface, keeps the NT1 Signature, swaps the headphones for the broadcast-standard MDR-7506, and adds real monitors');
  s1.content_es = s1.content_es
    .replace('El Básico Esencial por $485', 'El Básico Esencial por $545')
    .replace('una Scarlett 2i2 para capturar, un SM57 con el que capturar,', 'una Scarlett 2i2 para capturar, un condensador NT1 Signature con el que capturar,')
    .replace('Cada pieza es el modelo de entrada de su categoría, y conseguir que cinco quepan por menos de quinientos dólares es lo único que permite que este nivel llegue a la cifra sin recortar el tratamiento acústico.',
      'Cada pieza es el modelo de entrada de su categoría, y mantener los cuatro paneles de tratamiento en este nivel es lo que lo pasa de los quinientos: quítalos y ahorras cien dólares que volverás a gastar en arreglar la sala.')
    .replace('El Productor Profesional por $816</strong> cambia el dinámico por un condensador silencioso y añade los ATH-M50x.',
      'El Productor Profesional por $816</strong> sube al NT1 5th Generation —el condensador de diafragma grande más silencioso que hay nuevo— y añade los ATH-M50x.')
    .replace('El Definitivo por $905</strong> da el salto a la SSL 2+ MKII —la misma del nivel intermedio—, cambia el condensador por el NT1 Signature, cambia los auriculares por el MDR-7506 estándar de radiodifusión y añade monitores de verdad',
      'El Definitivo por $905</strong> da el salto a la SSL 2+ MKII —la misma del nivel intermedio—, mantiene el NT1 Signature, cambia los auriculares por el MDR-7506 estándar de radiodifusión y añade monitores de verdad');
  ok('seccion de presupuestos reescrita (EN + ES)');
} else no('no encontre la seccion de presupuestos');

// seccion de accesorios: "You already own an SM57 or an NT1"
guia.sections.forEach(s => {
  ['content', 'content_es'].forEach(k => {
    if (!s[k]) return;
    const v = s[k];
    let n = s[k];
    n = n.replace('You already own an SM57 or an NT1', 'You already own an NT1 Signature or an NT1 5th Generation');
    n = n.replace('Ya tienes un SM57 o un NT1', 'Ya tienes un NT1 Signature o un NT1 5th Generation');
    if (n !== v) { s[k] = n; ok('accesorios · "' + (k === 'content' ? 'You already own an SM57' : 'Ya tienes un SM57') + '" corregido'); }
  });
});

// ── 7) conclusion ──
if (guia.conclusion) {
  guia.conclusion = guia.conclusion.replace('Start with the Budget build and the SM57.', 'Start with the Budget build.');
  ok('conclusion EN: quitada la mention al SM57');
}
if (guia.conclusion_es) {
  guia.conclusion_es = guia.conclusion_es.replace('Empieza por el montaje Básico y el SM57.', 'Empieza por el montaje Básico.');
  ok('conclusion ES: quitada la mencion al SM57');
}

// ── 8) FAQ propias de la guia ──
const faqCam = [
  ['faq_a2_es', 'Empieza con el SM57.', 'Empieza con el NT1 Signature.'],
  ['faq_a2_en', 'Start with the SM57', 'Start with the NT1 Signature']
];
faqCam.forEach(([campo, viejo, nuevo]) => {
  if (guia[campo] && guia[campo].indexOf(viejo) > -1) {
    guia[campo] = guia[campo].replace(viejo, nuevo);
    ok(campo + ': "' + viejo + '" -> "' + nuevo + '"');
  }
});

fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');

console.log(log.join('\n'));
console.log('\n=== RESULTADO ===');
console.log('  featuredProducts: ' + guia.featuredProducts.length);
console.log('  secciones:        ' + guia.sections.length);
console.log('  veredictos:       ' + guia.verdictProsCons.length);
console.log('  mojibake:         ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
