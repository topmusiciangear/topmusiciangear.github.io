const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/guides/';
// 1. Contenido clave presente en working tree
const checks = [
  ['stream-controllers.html', 'What Six Faders'],
  ['beginner-guitar.html', 'Tank-Built Classical'],
  ['beginner-guitar_es.html', 'blindada con alma'],
  ['starter-studio_es.html', 'previos'],
  ['best-interface.html', '1176 Compressor Built In'],
  ['best-pa-speakers.html', '1000W'],
];
checks.forEach(([f, mark]) => {
  const h = fs.readFileSync(B + f, 'utf8');
  console.log((h.includes(mark) ? 'OK   ' : 'FALTA ') + f + ' :: ' + mark.slice(0, 30));
});
// 2. El diff de guides/ es solo churn de IDs? comparar una pagina ignorando ids glg/flgc
const { execSync } = require('child_process');
const d = execSync('git diff -- guides/ableton-vs-fl-studio.html', { cwd: 'C:/Users/Daniel/projects/topmusiciangear', encoding: 'utf8', maxBuffer: 20 * 1024 * 1024 });
const lines = d.split('\n').filter(l => (l.startsWith('+') || l.startsWith('-')) && !l.startsWith('+++') && !l.startsWith('---'));
console.log('\nlineas +/- en ableton:', lines.length);
// quitar ids variables y comparar
const norm = (s) => s.replace(/glg\d+/g, 'GLG').replace(/glc\d+/g, 'GLC').replace(/flgc\d+/g, 'FLGC').replace(/flgd\d+/g, 'FLGD');
const minus = lines.filter(l => l.startsWith('-')).map(l => norm(l.slice(1))).join('\n');
const plus = lines.filter(l => l.startsWith('+')).map(l => norm(l.slice(1))).join('\n');
console.log('diff real tras normalizar IDs:', minus === plus ? 'SOLO CHURN DE IDS' : 'HAY CAMBIOS REALES');