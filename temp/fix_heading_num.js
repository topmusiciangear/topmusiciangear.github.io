const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const die = (m) => { console.log('!! ' + m); process.exit(1); };
const gj = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gj, 'utf8'));
const g = guides.find(x => x.id === 'budget-bass-like-expensive');

const s = g.sections.find(x => /^(Ten|Twelve) Basses, One Idea/.test(x.heading || ''));
if (!s) die('no encuentro la seccion de apertura');
console.log('antes:  "' + s.heading + '" / "' + s.heading_es + '"');
s.heading = 'One Idea: Spend on the Right Parts';
s.heading_es = 'Una idea: gasta en las piezas correctas';
console.log('despues: "' + s.heading + '" / "' + s.heading_es + '"');
// comprobar que el heading nuevo no choca con otro
const hs = g.sections.map(x => x.heading);
if (new Set(hs).size !== hs.length) die('heading duplicado');
console.log('sin duplicados (' + hs.length + ' secciones)');

fs.writeFileSync(gj, JSON.stringify(guides, null, 2));