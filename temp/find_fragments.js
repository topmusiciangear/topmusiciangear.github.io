const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8'));

// BUG REAL: un pro/contra se partio en dos y la segunda mitad quedo como
// fragmento, con espacio inicial y primera letra en minuscula:
//    "... monitor alignment alone"        <- item N
//    " it costs more than the Adam T10S"  <- item N+1 (basura)
//
// Firma precisa, sin falsos positivos:
//   1) empieza por espacio en blanco
//   2) empieza por palabra en minuscula
//   3) acaba en espacio en blanco (artefacto de recorte)
//
// Los items NORMALES de esta guia son frases sueltas largas ("Rear EQ switches
// must be re-tuned when you change rooms") y NO se deben tocar: por eso los dos
// detectores anteriores por longitud y por sintaxis daban basura.

const FRAG_START = /^(it|they|we|you|this|that|these|those|its|their|so|but|and|or|then|also|which|where|when|while|because|since|although|though|if|as|for|to|with|without|in|on|at|by|from|of|after|before|not|no|only|just|very|more|less|than)\b/i;

const hits = [];
let items = 0;

guides.forEach(function (g) {
  const pc = g.verdictProsCons;
  if (!Array.isArray(pc)) return;
  pc.forEach(function (p) {
    [['pros', p.pros, p.pros_es], ['cons', p.cons, p.cons_es]].forEach(function (t) {
      const kind = t[0], list = t[1], listEs = t[2];
      if (!Array.isArray(list)) return;
      list.forEach(function (item, i) {
        if (typeof item !== 'string') return;
        items++;
        const reasons = [];
        if (/^\s/.test(item)) reasons.push('espacio inicial');
        if (/^[a-záéíóúñ]/.test(item)) reasons.push('minuscula inicial');
        if (/\s$/.test(item)) reasons.push('espacio final');
        if (!/^\s/.test(item) && !/\s$/.test(item) && FRAG_START.test(item) && item.split(/\s+/).length < 14) {
          reasons.push('posible fragmento corto');
        }
        if (reasons.length) {
          const prev = (i > 0 && typeof list[i - 1] === 'string') ? list[i - 1] : '';
          hits.push({
            id: g.id, prod: p.name, kind: kind, idx: i, reasons: reasons,
            text: item, prev: prev,
            es: (Array.isArray(listEs) && typeof listEs[i] === 'string') ? listEs[i] : ''
          });
        }
      });
    });
  });
});

console.log('items analizados: ' + items);
console.log('ITEMS CON ARTEFACTO: ' + hits.length + '  en ' +
  new Set(hits.map(h => h.id)).size + ' guias\n');

const byGuide = {};
hits.forEach(h => { byGuide[h.id] = (byGuide[h.id] || 0) + 1; });
console.log('--- por guia ---');
Object.keys(byGuide).sort().forEach(id => console.log('  ' + id.padEnd(34) + byGuide[id]));

console.log('\n--- detalle ---');
hits.forEach(function (h) {
  console.log('[' + h.id + '] ' + h.prod + ' (' + h.kind + ' #' + h.idx + ')  ' + h.reasons.join(' + '));
  console.log('   ANTERIOR : ' + JSON.stringify(h.prev.slice(-70)));
  console.log('   FRAGMENTO: ' + JSON.stringify(h.text));
  if (h.es) console.log('   ES       : ' + JSON.stringify(h.es));
  console.log('');
});