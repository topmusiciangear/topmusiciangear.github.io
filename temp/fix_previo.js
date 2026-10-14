const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const gj = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gj, 'utf8'));

let fixes = 0;

function fixPreviolificador(text) {
  if (!text) return text;
  let fixed = text;
  // "previolificador" -> "previo" (calco de "preamp")
  // Plural: "previolificadores" -> "previos"
  if (fixed.includes('previolificadores')) {
    fixed = fixed.replace(/previolificadores/g, 'previos');
    fixes++;
  }
  if (fixed.includes('previolificador')) {
    fixed = fixed.replace(/previolificador/g, 'previo');
    fixes++;
  }
  return fixed;
}

guides.forEach(g => {
  (g.sections || []).forEach(s => {
    if (s.content_es) s.content_es = fixPreviolificador(s.content_es);
  });
  if (g.intro_es) g.intro_es = fixPreviolificador(g.intro_es);
  if (g.verdict_es) g.verdict_es = fixPreviolificador(g.verdict_es);
  if (g.conclusion_es) g.conclusion_es = fixPreviolificador(g.conclusion_es);

  (g.verdictProsCons || []).forEach(v => {
    v.pros_es = v.pros_es.map(fixPreviolificador);
    v.cons_es = v.cons_es.map(fixPreviolificador);
  });

  if (g.productTable && g.productTable.rows) {
    g.productTable.rows.forEach(r => {
      if (r.values) r.values.forEach(v => {
        if (v.value_es) v.value_es = fixPreviolificador(v.value_es);
      });
    });
  }
});

fs.writeFileSync(gj, JSON.stringify(guides, null, 2));
console.log('Total fixes:', fixes);
console.log('Verificando que no queda ninguno:');
const allText = JSON.stringify(guides);
const remaining = (allText.match(/previolificador/g) || []).length;
console.log('Restantes:', remaining);