const fs = require('fs');
const P = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const guides = JSON.parse(fs.readFileSync(P, 'utf8'));
const g = guides.find(x => x.id === 'best-microphone');

const renames = [
  ['Shure SM7B: A Closer Look',
   'Shure SM7B: The Dark Dynamic Broadcast Keeps Coming Back To',
   'Shure SM7B: el dinámico oscuro al que vuelve el broadcast'],
  ['Rode NT1 5th Generation: A Closer Look',
   'Rode NT1 5th Generation: Silence Plus 32-Bit Float That Never Clips',
   'Rode NT1 5th Generation: silencio más 32 bits flotantes que nunca saturan'],
  ['Audio-Technica AT2020: A Closer Look',
   'Audio-Technica AT2020: The Engineers’ Pick for a First Condenser',
   'Audio-Technica AT2020: la elección de los técnicos para el primer condensador'],
  ['AKG C414 XLII: A Closer Look',
   'AKG C414 XLII: One Locker Mic Instead of Three Specialists',
   'AKG C414 XLII: un solo micrófono en vez de tres especialistas'],
  ['MXL R144: A Closer Look',
   'MXL R144: Real Ribbon Warmth Without the Price of Admission',
   'MXL R144: calidez de cinta real sin el precio de entrada'],
  ['Shure SM7dB: A Closer Look',
   'Shure SM7dB: The SM7B With the Preamp Already Inside',
   'Shure SM7dB: el SM7B con el previo ya dentro'],
  ['Rode NT1 Signature Series: A Closer Look',
   'Rode NT1 Signature Series: Flagship Silence Without the Flagship Bundle',
   'Rode NT1 Signature Series: silencio insignia sin bundle insignia'],
];

renames.forEach(([oldH, newEn, newEs]) => {
  const s = g.sections.find(x => x && x.heading === oldH);
  if (!s) { console.log('!! no encontrada: ' + oldH); process.exit(1); }
  s.heading = newEn;
  s.heading_es = newEs;
});

// Verificar unicidad en la guia
const heads = g.sections.map(s => s.heading);
const dup = heads.filter((x, i, a) => a.indexOf(x) !== i);
console.log('duplicados EN:', dup.length ? [...new Set(dup)].join(' | ') : 'ninguno');
const headsEs = g.sections.map(s => s.heading_es);
const dupEs = headsEs.filter((x, i, a) => a.indexOf(x) !== i);
console.log('duplicados ES:', dupEs.length ? [...new Set(dupEs)].join(' | ') : 'ninguno');

fs.writeFileSync(P, JSON.stringify(guides, null, 2));
console.log('7 headings reescritos');