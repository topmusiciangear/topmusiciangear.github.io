const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const G = require(F);
const g = G.find(x => x.id === 'guitar-bass-amps');
const b = g.sections.find(s => s.heading === 'Bass Amps: What You Actually Need');
function rep(key, oldS, newS) {
  if (!b[key].includes(oldS)) { console.log('MISS ' + key + ': ' + oldS.slice(0, 60)); process.exitCode = 1; return; }
  b[key] = b[key].split(oldS).join(newS);
  console.log('OK ' + key + ': ' + oldS.slice(0, 50));
}
rep('content',
  'the Fender Rumble 200 V3 (1×15", 200W) and Ampeg Rocket Bass RB-115 (1×15", 200W) handle the low B with authority.',
  'the Fender Rumble 200 V3 (1×15", 200W with ext. cab / 140W standalone) and Ampeg Rocket Bass RB-115 (1×15", 200W with ext. cab / 100W standalone) handle the low B with authority.');
rep('content',
  'overdrive on demand (350W, 500W w/ ext. cab); the Fender Rumble 500 V3 brings clean, punchy modern tone with built-in overdrive for edge (350W, 500W w/ ext. cab).',
  'overdrive on demand (500W with ext. cab, 250W standalone); the Fender Rumble 500 V3 brings clean, punchy modern tone with built-in overdrive for edge (500W with ext. cab, 350W standalone).');
rep('content',
  'the Rumble 200 V3 offers the lightest 15-inch combo at 23 lbs (200W), while the Ampeg RB-115 delivers full SVT DNA in a 15-inch format (200W).',
  'the Rumble 200 V3 offers a 34.5 lb 15-inch combo (200W with ext. cab, 140W standalone), while the Ampeg RB-115 delivers full SVT DNA in a 15-inch format (200W with ext. cab, 100W standalone).');
rep('content_es',
  'el Fender Rumble 200 V3 (1×15", 200W) y el Ampeg Rocket Bass RB-115 (1×15", 200W) manejan el Si grave con autoridad.',
  'el Fender Rumble 200 V3 (1×15", 200W con cab. de extensión / 140W solo) y el Ampeg Rocket Bass RB-115 (1×15", 200W con cab. de extensión / 100W solo) manejan el Si grave con autoridad.');
rep('content_es',
  'el Rumble 200 V3 ofrece el combo de 15" más ligero con 10,4 kg (200W), mientras el Ampeg RB-115 entrega ADN SVT completo en formato 15" (200W).',
  'el Rumble 200 V3 ofrece un combo de 15" y 15,65 kg (200W con cab. de extensión / 140W solo), mientras el Ampeg RB-115 entrega ADN SVT completo en formato 15" (200W con cab. de extensión / 100W solo).');
fs.writeFileSync(F, JSON.stringify(G, null, 2));
console.log('done');