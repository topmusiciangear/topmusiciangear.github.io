var fs = require('fs');
var g = JSON.parse(fs.readFileSync('data/guides.json','utf8'));

var enPatterns = [
  ' actually', ' genuinely', ' simply', ' honestly', ' literally',
  'countless', 'thousands of', 'hundreds of', 'dozens of',
  'I use', 'I used', 'I have used', 'I own', 'I tested', 'I have tested',
  'my setup', 'my desk', 'my studio', 'my room'
];

var esPatterns = [
  ' de verdad', ' en serio', ' realmente',
  'he usado', 'he probado', 'he testado',
  'mi escritorio', 'mi estudio', 'mi habitación', 'mi setup',
  'increíble', 'impresionante',
  'revolucionar', 'revolucionario', 'revolucionaria',
  'te sorprenderá', 'no busques más', 'no puedes equivocarte',
  'el definitivo', 'incomparable', 'sin duda',
  'ya sea que', 'auténticamente', 'honestamente',
  'miles de', 'cientos de', 'decenas de', 'incontables'
];

var enTotal = 0, esTotal = 0;

g.forEach(guide => {
  ['intro', 'conclusion'].forEach(f => {
    if (!guide[f]) return;
    enPatterns.forEach(p => {
      if (guide[f].includes(p)) { console.log('EN ' + guide.id + ' ' + f + ': ' + p); enTotal++; }
    });
  });
  ['intro_es', 'conclusion_es'].forEach(f => {
    if (!guide[f]) return;
    esPatterns.forEach(p => {
      if (guide[f].includes(p)) { console.log('ES ' + guide.id + ' ' + f + ': ' + p); esTotal++; }
    });
  });
  guide.sections.forEach((s, i) => {
    ['content'].forEach(f => {
      if (!s[f]) return;
      enPatterns.forEach(p => {
        if (s[f].includes(p)) { console.log('EN ' + guide.id + ' sec' + i + ': ' + p); enTotal++; }
      });
    });
    ['content_es'].forEach(f => {
      if (!s[f]) return;
      esPatterns.forEach(p => {
        if (s[f].includes(p)) { console.log('ES ' + guide.id + ' sec' + i + ': ' + p); esTotal++; }
      });
    });
  });
});

console.log();
console.log('EN: ' + enTotal);
console.log('ES: ' + esTotal);
if (enTotal === 0 && esTotal === 0) console.log('TODOS LIMPIOS');
