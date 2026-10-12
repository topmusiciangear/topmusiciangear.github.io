var fs = require('fs');
var p = 'data/guides.json';
var d = JSON.parse(fs.readFileSync(p, 'utf8'));
var g = d.find(function (x) { return x.id === 'best-stage-keyboards'; });
console.log('BEFORE title_es: ' + g.title_es);
console.log('BEFORE tag_es: ' + g.titleTag_es);
if (g.title.indexOf('synth') > -1 || g.title.indexOf('Synth') > -1) {
  console.log('EN MENTIONS SYNTH - abort, check with user'); process.exit(1);
}
g.title_es = 'Mejores teclados para directo: pianos de escenario';
g.titleTag_es = 'Mejores teclados para directo: pianos de escenario (pros, contras y guía de compra 2026)';
fs.writeFileSync(p, JSON.stringify(d, null, 2));
console.log('AFTER title_es: ' + g.title_es);
console.log('AFTER tag_es: ' + g.titleTag_es);
