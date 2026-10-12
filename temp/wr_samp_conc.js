var fs = require('fs');
var P = 'C:/Users/Daniel/projects/topmusiciangear/';
var guides = JSON.parse(fs.readFileSync(P + 'data/guides.json', 'utf8'));
function bySlug(s) { return guides.filter(function (x) { return (x.slug || x.id) === s; })[0]; }
var g = bySlug('best-hardware-samplers');
function rep(path, a, b) {
  var parts = path.replace(/\[(\d+)\]/g, '.$1').split('.');
  var o = g;
  for (var i = 0; i < parts.length - 1; i++) o = o[parts[i]];
  var k = parts[parts.length - 1];
  var c = o[k].split(a).length - 1;
  if (c !== 1) { console.log('COUNT ' + c + ': ' + path); process.exit(1); }
  o[k] = o[k].split(a).join(b);
}
rep('conclusion', 'Choose by how you work: loops and portability, or full-song production.',
  'Choose by how you work: loops and portability, or full-song production. Beyond the core four, the Teenage Engineering EP-133 K.O. II is instant sketching fun, the Akai MPC Live III is no-compromise portable power, and the Polyend Tracker Mini is surgical tracker composition.');
rep('conclusion_es', 'loops y portabilidad, o producción de canciones completas.',
  'loops y portabilidad, o producción de canciones completas. Más allá de las cuatro centrales, la Teenage Engineering EP-133 K.O. II es diversión instantánea para bocetos, la Akai MPC Live III es potencia portátil sin concesiones y la Polyend Tracker Mini es composición tracker quirúrgica.');
rep('verdict', 'Choose how hands-on you want to be.',
  'Choose how hands-on you want to be. The EP-133 is instant sketching fun, the Live III is portable power with no compromises, and the Tracker Mini is surgical tracker composition.');
rep('verdict_es', 'Elige qué tan manual quieres ser.',
  'Elige qué tan manual quieres ser. La EP-133 es diversión instantánea para bocetos, la Live III es potencia portátil sin concesiones y la Tracker Mini es composición tracker quirúrgica.');
fs.writeFileSync(P + 'data/guides.json', JSON.stringify(guides, null, 2));
console.log('conclusion extended');
