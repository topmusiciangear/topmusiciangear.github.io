const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8'));

function dist(list) {
  const b = {};
  list.forEach(function (s) {
    const n = s.length;
    const k = n >= 55 ? '55-60' : n >= 50 ? '50-54' : n >= 45 ? '45-49' : n >= 40 ? '40-44' : n >= 30 ? '30-39' : '<30';
    b[k] = (b[k] || 0) + 1;
  });
  return b;
}

const enT = [], esT = [], enD = [], esD = [];
guides.forEach(function (g) {
  const t = g.titleTag || g.title;
  const te = g.titleTag_es || g.title_es;
  if (t) enT.push({ id: g.id, t: t });
  if (te) esT.push({ id: g.id, t: te });
  if (g.description) enD.push({ id: g.id, t: g.description });
  if (g.description_es) esD.push({ id: g.id, t: g.description_es });
});

console.log('=== DISTRIBUCION <title> ===');
console.log('EN:', JSON.stringify(dist(enT.map(x => x.t))));
console.log('ES:', JSON.stringify(dist(esT.map(x => x.t))));
console.log('\n=== DISTRIBUCION meta description ===');
console.log('EN:', JSON.stringify(dist(enD.map(x => x.t))));
console.log('ES:', JSON.stringify(dist(esD.map(x => x.t))));

console.log('\n=== HUECO REAL ===');
console.log('EN titulos <=52 chars (8+ libres): ' + enT.filter(x => x.t.length <= 52).length + '/' + enT.length);
console.log('ES titulos <=52 chars: ' + esT.filter(x => x.t.length <= 52).length + '/' + esT.length);
console.log('EN descs <=130 chars: ' + enD.filter(x => x.t.length <= 130).length + '/' + enD.length);
console.log('ES descs <=130 chars: ' + esD.filter(x => x.t.length <= 130).length + '/' + esD.length);

console.log('\n=== EN titulos <=52 (candidatos) ===');
enT.filter(x => x.t.length <= 52).sort((a, b) => a.t.length - b.t.length).forEach(function (x) {
  console.log('  ' + String(x.t.length).padStart(2) + '  ' + x.id.padEnd(30) + JSON.stringify(x.t));
});

console.log('\n=== ES titulos <=52 ===');
esT.filter(x => x.t.length <= 52).sort((a, b) => a.t.length - b.t.length).forEach(function (x) {
  console.log('  ' + String(x.t.length).padStart(2) + '  ' + x.id.padEnd(30) + JSON.stringify(x.t));
});