var prods = require('C:/Users/Daniel/projects/topmusiciangear/data/products.json');
var guides = JSON.parse(require('fs').readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
['Scarlett 2i2', 'Volt 2', 'Pacifica 112V', 'Classic Vibe', 'Rumble 40', 'XR18', 'Ui24R', 'Ui16', 'IMP 2', 'ELX200-15P', 'PRX915', 'EVO 4', 'CE-2W', 'DD-8', 'Timeline', 'H9 Max', 'EON712', 'ICOA', 'MXL R144', 'Pro-Q', '1176', 'Puigtec', 'DM3', 'WING Compact', '32SC', 'Seiren V3 Mini', 'SoloCast', 'K669D', 'Q2U', 'Wave DX', 'Q9U', 'XM8500', 'SM57', 'e935', 'e945', 'ND86', 'D5', 'Beta 58', 'NT1 Signature', 'AT2020', 'C01 ', 'P120', 'V7 ', 'K688', 'Rokit 7', 'HS8', 'A7V', 'IN-8'].forEach(function (q) {
  var hits = prods.filter(function (p) { return (p.title || '').toLowerCase().indexOf(q.toLowerCase()) >= 0; });
  hits.slice(0, 3).forEach(function (p) { console.log('#' + p.id + ' ' + p.title + ' cat=' + p.price); });
});
var g = guides.filter(function (x) { return (x.slug || x.id) === 'portable-interfaces'; })[0];
console.log('EN-SEC1:', JSON.stringify(g.sections[1].content).slice(0, 400));
