const fs = require('fs');

const OLD = 'best-home-studio-speakers';
const NEW = 'best-studio-monitors-under-150';

/* 1. guides.json: id + titulos + descripciones */
const gf = 'data/guides.json';
const gs = JSON.parse(fs.readFileSync(gf, 'utf8'));
const g = gs.find(x => x.id === OLD);
if (!g) throw new Error('guide not found');
g.id = NEW;
g.title = 'Best Studio Monitors Under $150';
g.title_es = 'Mejores monitores de estudio por menos de $150';
g.description = 'Studio monitors under $150 compared: Mackie, PreSonus, M-Audio, Behringer and Alesis, with measured bass and honest picks.';
g.description_es = 'Monitores de estudio por menos de $150 comparados: Mackie, PreSonus, M-Audio, Behringer y Alesis, con graves medidos y compras honestas.';
fs.writeFileSync(gf, JSON.stringify(gs, null, 2));

/* 2. js/guide-scores.js: renombrar la clave */
const sf = 'js/guide-scores.js';
let scores = fs.readFileSync(sf, 'utf8');
const before = (scores.match(new RegExp('"' + OLD + '"', 'g')) || []).length;
scores = scores.split('"' + OLD + '"').join('"' + NEW + '"');
fs.writeFileSync(sf, scores);
console.log('guide-scores: claves renombradas =', before);

console.log('guide id:', g.id, '| title:', g.title, '(' + g.title.length + ')', '| ES:', g.title_es, '(' + g.title_es.length + ')');
