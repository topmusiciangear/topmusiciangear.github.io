const fs = require('fs');
const h = fs.readFileSync('guides/budget-bass-like-expensive.html', 'utf8');
const he = fs.readFileSync('guides/budget-bass-like-expensive_es.html', 'utf8');
const strip = (s) => s.replace(/<[^>]+>/g, ' ');
const seg = (t, a, b) => { const i = t.indexOf(a), j = t.indexOf(b); return { i, j, ok: i > -1 && j > -1 && j > i }; };
console.log('EN "best live alternatives" antes de "plug-and-play": ' + JSON.stringify(seg(h, 'best live alternatives', 'plug-and-play bass')));
console.log('ES "mejores alternativas vivas" antes de "enchufar y tocar": ' + JSON.stringify(seg(he, 'mejores alternativas vivas', 'enchufar y tocar')));
console.log("EN 'Editor's note:' x" + (h.match(/Editor's note:/g) || []).length);
console.log("ES 'Nota del editor:' x" + (he.match(/Nota del editor:/g) || []).length);
console.log("ES 'nota del editor' (sin mayus) x" + (he.match(/[Nn]ota del editor/g) || []).length);
// el bloque concreto
const i = he.indexOf('G&L Tribute L-2000: pastillas de Fullerton');
const j = he.indexOf('Fender Player II Precision Bass', i);
console.log('\n--- ultimos 400 chars de la review ES ---\n' + strip(he.slice(j - 1200, j)).trim());