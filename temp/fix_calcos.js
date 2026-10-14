const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const gj = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gj, 'utf8'));

let fixes = 0;

function fixText(text) {
  if (!text) return text;
  let fixed = text;

  // "suena como" -> "suena a" (calco de "sounds like")
  if (fixed.includes('suena como ')) {
    fixed = fixed.replace(/suena como ([aeiou])/g, 'suena a $1');
    fixed = fixed.replace(/suena como ([bcdfghjklmnpqrstvwxyz])/g, 'suena a $1');
    fixes++;
  }

  // "lo que hace que" -> "asi que" or context-dependent
  if (fixed.includes('lo que hace que ')) {
    fixed = fixed.replace(/lo que hace que /g, 'asi que ');
    fixes++;
  }

  // "punto justo" -> "punto ideal" (calco de "sweet spot")
  if (fixed.includes('punto justo')) {
    fixed = fixed.replace(/punto justo/g, 'punto ideal');
    fixes++;
  }

  // "es el mejor para" -> "es ideal para"
  if (fixed.includes('es el mejor para ')) {
    fixed = fixed.replace(/es el mejor para /g, 'es ideal para ');
    fixes++;
  }

  // "atrás" -> context-dependent
  // "la parte de atrás" -> "la parte trasera"
  if (fixed.includes('de atrás')) {
    fixed = fixed.replace(/de atrás/g, 'de detras');
    fixes++;
  }

  return fixed;
}

guides.forEach(g => {
  (g.sections || []).forEach(s => {
    if (s.content_es) s.content_es = fixText(s.content_es);
  });
  if (g.intro_es) g.intro_es = fixText(g.intro_es);
  if (g.verdict_es) g.verdict_es = fixText(g.verdict_es);
  if (g.conclusion_es) g.conclusion_es = fixText(g.conclusion_es);

  (g.verdictProsCons || []).forEach(v => {
    v.pros_es = v.pros_es.map(fixText);
    v.cons_es = v.cons_es.map(fixText);
  });

  if (g.productTable && g.productTable.rows) {
    g.productTable.rows.forEach(r => {
      if (r.values) r.values.forEach(v => {
        if (v.value_es) v.value_es = fixText(v.value_es);
      });
    });
  }
});

fs.writeFileSync(gj, JSON.stringify(guides, null, 2));
console.log('Calcos corregidos:', fixes);