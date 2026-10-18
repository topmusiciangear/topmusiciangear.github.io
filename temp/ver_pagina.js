const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const s = fs.readFileSync(B + 'guides/best-home-studio-speakers.html', 'utf8')
  + fs.readFileSync(B + 'guides/best-home-studio-speakers_es.html', 'utf8');
['that translate', 'que traslade', 'only one here', 'el único de esta lista',
 'We measured', 'knob', 'One caveat', 'twenty thousand', 'an inch more cone',
 'lists at', 'aparece a $199'].forEach(k =>
  console.log('  "' + k + '": ' + (s.indexOf(k) >= 0 ? 'AUN PRESENTE' : 'fuera')));
console.log('');
console.log('preguntas FAQ en la pagina EN+ES: ' + (s.match(/guide-faq-question/g) || []).length / 2);