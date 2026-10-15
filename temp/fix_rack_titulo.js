const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const s = g.find(x => x.id === 'best-compact-mixers');

const antes = [s.title, s.titleTag, s.title_es, s.titleTag_es];
s.title = s.title.replace('Rack-Mount digital Mixers', 'Rack-Mount Digital Mixers');
s.titleTag = s.titleTag.replace('Rack-Mount digital Mixers', 'Rack-Mount Digital Mixers');
s.title_es = s.title_es.replace('mezcladores digitales de rack', 'mezcladores Digitales de rack');
s.titleTag_es = s.titleTag_es.replace('mezcladores digitales de rack', 'mezcladores Digitales de rack');
const despues = [s.title, s.titleTag, s.title_es, s.titleTag_es];

antes.forEach((a, i) => console.log((a !== despues[i] ? 'ok   ' : 'IGUAL') + ' :: ' + a + '\n   -> ' + despues[i]));
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
console.log('longitudes: EN ' + s.title.length + '/' + s.titleTag.length + '  ES ' + s.title_es.length + '/' + s.titleTag_es.length);
