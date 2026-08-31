var fs = require('fs');
var g = JSON.parse(fs.readFileSync('data/guides.json','utf8'));

var esPatterns = [
  ' de verdad', ' en serio', ' realmente',
  'he usado', 'he probado', 'he testado',
  'mi escritorio', 'mi estudio', 'mi habitación', 'mi setup',
  'increíble', 'impresionante',
  'revolucionar', 'revolucionario', 'revolucionaria',
  'te sorprenderá', 'no busques más', 'no puedes equivocarte',
  'el definitivo', 'incomparable', 'sin duda',
  'ya sea que', 'auténticamente', 'honestamente'
];

var total = 0;
g.forEach(guide => {
  ['intro_es', 'conclusion_es'].forEach(f => {
    if (!guide[f]) return;
    esPatterns.forEach(p => {
      if (guide[f].includes(p)) {
        console.log(guide.id + ' ' + f + ': ' + p);
        total++;
      }
    });
  });
  guide.sections.forEach((s, i) => {
    if (!s.content_es) return;
    esPatterns.forEach(p => {
      if (s.content_es.includes(p)) {
        console.log(guide.id + ' sec' + i + ': ' + p);
        total++;
      }
    });
  });
});

console.log();
console.log('Total ES AI patterns: ' + total);
if (total === 0) console.log('ESPANOL LIMPIO');
