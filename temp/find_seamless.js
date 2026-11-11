const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const raw = fs.readFileSync(B + 'data/guides.json', 'utf8');
['seamless transitions, and Nord', 'dedicated piano/organ/synth engines and seamless', 'phase/crossover controls for seamless'].forEach(function (needle) {
  const idx = raw.indexOf(needle);
  console.log('=== ' + needle.slice(0, 40) + ' @' + idx + ' ===');
  if (idx >= 0) {
    // mostrar contexto amplio
    const s = Math.max(0, idx - 400);
    console.log(raw.slice(s, idx + needle.length + 400).replace(/\\n/g, ' '));
    console.log('');
  }
});
