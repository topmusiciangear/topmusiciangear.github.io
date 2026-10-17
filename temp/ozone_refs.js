const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const raw = fs.readFileSync(B + 'data/guides.json', 'utf8');
const guides = JSON.parse(raw);
const g = guides.find(x => x.id === 'ozone-vs-fabfilter');
console.log('guia ozone-vs-fabfilter, claves: ' + Object.keys(g).join(', '));
const hits = [];
JSON.stringify(g, (k, v) => { if (v === 1033) hits.push(k); return v; });
console.log('posiciones donde aparece el id 1033: ' + JSON.stringify(hits));
// en TODO el corpus
const globalHits = [];
guides.forEach(x => {
  JSON.stringify(x, (k, v) => { if (v === 1033) globalHits.push(x.id + ' -> ' + k); return v; });
});
console.log('\n1033 en todo guides.json:\n  ' + globalHits.join('\n  '));
// otras guias que citan Ozone por nombre
const citan = guides.filter(x => /Ozone 12/.test(JSON.stringify(x))).map(x => x.id);
console.log('\nguias que citan "Ozone 12": ' + citan.join(', '));