const fs = require('fs');
const P = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const guides = JSON.parse(fs.readFileSync(P, 'utf8'));
const g = guides.find(x => x.id === 'best-interface');
const s = ' Si grabas guitarra o bajo, empieza con la AXE I/O: afinador, salida de reamp y software de amplis incluidos.';
if (!g.conclusion_es.endsWith(s)) { console.log('!! no esta al final'); process.exit(1); }
g.conclusion_es = g.conclusion_es.slice(0, -s.length);
const marker = '<a href="/guides/';
const i = g.conclusion_es.indexOf(marker);
if (i === -1) { console.log('!! sin links'); process.exit(1); }
g.conclusion_es = g.conclusion_es.slice(0, i) + s + ' ' + g.conclusion_es.slice(i);
fs.writeFileSync(P, JSON.stringify(guides, null, 2));
console.log('OK reubicada');
console.log('cola: ...' + g.conclusion_es.slice(-250));
