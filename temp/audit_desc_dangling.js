const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';

// Descripciones cortadas a media frase por el recorte automatico: el problema
// es que terminen en un sustantivo suelto o en una conjuncion ("y.", "o.",
// "para.", "con.", "no por"). Una meta description debe cerrar una frase.
const DANGLING = [
  /[\s,;:—-]*\b(y|e|o|u|ni|que|de|del|la|el|los|las|para|por|con|sin|desde|como|más|mas|not|no|the|and|for|with|from|than|that|which|with)\s*[.…]?\s*$/i,
  /\b(a|al|to|at|in|on|of|or|is|are|as|by)\s*\.\s*$/i
];

const guides = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8'));
let bad = 0, cnt = 0;

guides.forEach(function (g) {
  ['description', 'description_es'].forEach(function (k) {
    if (!g[k]) return;
    cnt++;
    const d = g[k];
    const hit = DANGLING.some(re => re.test(d));
    const num = /\b(\d{1,2})\s+(best|mejores|top|modelos|premium|interfaces|mics|microfonos)\b/i.test(d);
    if (hit || num) {
      bad++;
      const why = [];
      if (hit) why.push('termina en fragmento');
      if (num) why.push('conteo de productos');
      console.log('[' + g.id + '] ' + k + '  (' + why.join(' + ') + ')');
      console.log('   ' + d);
      console.log('');
    }
  });
});

console.log('descripciones revisadas: ' + cnt + '   con problema: ' + bad);