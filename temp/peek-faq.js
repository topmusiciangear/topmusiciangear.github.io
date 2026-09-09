var f = require('fs').readFileSync('data/guides.json', 'utf8');
var si = f.indexOf('"id": "best-microphone"');
var ei = f.indexOf('"id": "best-monitors"', si);
var seg = f.slice(si, ei);
function show(tag, s, n) {
  console.log('== ' + tag + ' ==');
  console.log(JSON.stringify(seg.slice(s, s + n)));
}
var g = seg.indexOf('"faq_a3_es"');
show('faq_a3_es start', g, 500);
var h = seg.indexOf('"verdict"');
show('verdict', h - 10, 400);
var c = seg.indexOf('Dynamic mics like the SM57 and SM58 are indestructible workhorses for amps, drums, and live vocals.');
console.log('conclusion EN at', c);
var ce = seg.indexOf('Los dinámicos como el SM57 y SM58 son trabajadores indestructibles para amplificadores, batería y voces en vivo.');
console.log('conclusion ES at', ce);
var i = seg.indexOf('"verdict_es"');
show('verdict_es', i - 10, 350);