var fs = require('fs');
var g = JSON.parse(fs.readFileSync('data/guides.json','utf8'));
var fixed = 0;

function fix(from, to) {
  g.forEach(guide => {
    ['intro_es', 'conclusion_es'].forEach(f => {
      if (guide[f] && guide[f].includes(from)) {
        guide[f] = guide[f].split(from).join(to);
        fixed++;
      }
    });
    guide.sections.forEach((s, i) => {
      if (s.content_es && s.content_es.includes(from)) {
        guide.sections[i].content_es = s.content_es.split(from).join(to);
        fixed++;
      }
    });
  });
}

// 1. "increíble" (28) → variedad
fix('increíble', 'notable');

// 2. "A más que" (20) → "Más que"
fix('A más que', 'Más que');
fix('a más que', 'más que');

// 3. "he usado" (9) → "tras usar"
fix('He usado', 'Tras usar');
fix('he usado', 'tras usar');

// 4. "impresionante" (11) → variedad
fix('impresionante', 'destacada');

// 5. "he probado" (4) → "tras probar"
fix('He probado', 'Tras probar');
fix('he probado', 'tras probar');

// 6. "ya sea que" (2) → "Ya sea"
fix('ya sea que', 'Ya sea');

// 7. "de verdad" (1) → eliminar
fix(' de verdad', '');

// 8. "realmente" (1) → eliminar
fix(' realmente', '');
fix('realmente', '');

// 9. "en serio" (1) → eliminar
fix(' en serio', '');

// 10. "sin duda" (1) → eliminar
fix(' sin duda', '');

// 11. "revolucionar" / "revolucionario" → "innovar" / "innovador"
fix('revolucionar', 'innovar');
fix('revolucionario', 'innovador');
fix('revolucionaria', 'innovadora');

// 12. "te sorprenderá" → eliminar
fix('te sorprenderá', '');

// 13. "no busques más" → eliminar
fix('No busques más', '');
fix('no busques más', '');

// 14. "no puedes equivocarte" → "es una opción sólida"
fix('no puedes equivocarte', 'es una opción sólida');

// 15. "el definitivo" → "el más completo"
fix('el definitivo', 'el más completo');

// 16. "incomparable" → "destacado"
fix('incomparable', 'destacado');

// 17. "contrapartida" → "contra"
fix('contrapartida', 'contra');

fs.writeFileSync('data/guides.json', JSON.stringify(g, null, 2), 'utf8');
console.log('Fixes applied: ' + fixed);
