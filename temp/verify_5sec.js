const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/guides/';
const h = fs.readFileSync(B + 'beginner-guitar.html', 'utf8');
const he = fs.readFileSync(B + 'beginner-guitar_es.html', 'utf8');
const checks = [
  ['EN FG800', h.includes('Solid-Top Dreadnought Everyone Recommends')],
  ['EN CD-60S', h.includes('Campfire Dreadnought That Started Millions')],
  ['EN C40', h.includes('Classroom Classical for Sore-Free Fingers')],
  ['EN Sonic', h.includes('Real Fender for Small Hands')],
  ['EN GC1', h.includes('Tank-Built Classical With a Truss Rod')],
  ['ES FG800', he.includes('tapa sólida que todos recomiendan')],
  ['ES CD-60S', he.includes('fogata de millones')],
  ['ES C40', he.includes('dedos sin dolor')],
  ['ES Sonic', he.includes('Fender de verdad para manos')],
  ['ES GC1', he.includes('blindada con alma ajustable')],
  ['ES roughly', !he.includes('roughly')],
];
let ok = 0;
checks.forEach(([n, v]) => { if (v) ok++; console.log((v ? 'OK  ' : 'FALTA ') + n); });
console.log(ok + '/' + checks.length);