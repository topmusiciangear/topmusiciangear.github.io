var fs = require('fs');
var guides = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
var g = guides.find(function (x) { return x.id === 'budget-mics'; });
var map = [
  ['Shure Beta 58A: A Closer Look', 'Neodymium Punch: Why the Beta 58A Wins Loud Stages', 'Shure Beta 58A: análisis detallado', 'Pegada de neodimio: por qué el Beta 58A gana en escenarios ruidosos'],
  ['Sennheiser e935: A Closer Look', 'Forgiving and Loud: The e935 for Working Vocalists', 'Sennheiser e935: análisis detallado', 'Tolerante y potente: el e935 para vocalistas de batalla'],
  ['Sennheiser e945: A Closer Look', 'Supercardioid Precision: The e945 for Front Voices', 'Sennheiser e945: análisis detallado', 'Precisión supercardioide: el e945 para voces solistas'],
  ['AKG D5: A Closer Look', 'Varimotion on a Budget: How the AKG D5 Cuts Through', 'AKG D5: análisis detallado', 'Varimotion económico: cómo el AKG D5 se abre paso en la mezcla'],
  ['Electro-Voice ND86: A Closer Look', 'Arena Authority: The EV ND86 for Big Rooms', 'Electro-Voice ND86: análisis detallado', 'Autoridad de arena: el EV ND86 para salas grandes'],
  ['sE Electronics V7: A Closer Look', 'Modern Muscle: The sE V7 Takes On the SM58', 'sE Electronics V7: análisis detallado', 'Músculo moderno: el sE V7 desafía al SM58'],
  ['Elgato Wave DX: A Closer Look', 'Lewitt Brains at a Streamer Price: The Elgato Wave DX', 'Elgato Wave DX: análisis detallado', 'Cerebro Lewitt a precio streamer: el Elgato Wave DX'],
  ['AKG P120: A Closer Look', 'Your First Real Condenser: The AKG P120', 'AKG P120: análisis detallado', 'Tu primer condensador de verdad: el AKG P120'],
  ['MAONO PD100 Gen2: A Closer Look', 'One Mic, Two Futures: The MAONO PD100 Gen2 Goes USB+XLR', 'MAONO PD100 Gen2: análisis detallado', 'Un micro, dos futuros: el MAONO PD100 Gen2 con USB+XLR'],
  ['Samson Q9U: A Closer Look', 'Hardware Tone Shaping: The Samson Q9U Broadcast Controls', 'Samson Q9U: análisis detallado', 'Modela tu voz sin software: los controles broadcast del Samson Q9U'],
  ['Behringer B 906: A Closer Look', 'Three Mics in One: The Behringer B 906 Switchable Voicings', 'Behringer B 906: análisis detallado', 'Tres micros en uno: las voces conmutables del Behringer B 906'],
  ['FIFINE K669D: A Closer Look', 'XLR Discipline at a USB Price: The FIFINE K669D', 'FIFINE K669D: análisis detallado', 'Disciplina XLR a precio USB: el FIFINE K669D'],
  ['Samson C01: A Closer Look', 'A Window Into Condensers: The Samson C01 Experiment', 'Samson C01: análisis detallado', 'Una ventana al mundo condensador: el experimento Samson C01'],
  ['Maono PD200X: A Closer Look', 'Stream Today, XLR Tomorrow: The Maono PD200X Hybrid', 'Maono PD200X: análisis detallado', 'Streaming hoy, XLR mañana: el híbrido Maono PD200X']
];
var fails = [];
map.forEach(function (m) {
  var s = g.sections.find(function (x) { return x.heading === m[0]; });
  if (!s) { fails.push(m[0]); return; }
  s.heading = m[1];
  if (s.heading_es === m[2]) s.heading_es = m[3];
  else fails.push('ES mismatch: ' + m[2]);
});
if (fails.length) { console.log('FAILS:'); fails.forEach(function (f) { console.log(' ! ' + f); }); process.exit(1); }
fs.writeFileSync('data/guides.json', JSON.stringify(guides, null, 2));
console.log('14 headings rewritten');
// confirm zero template headings left in this guide
var left = g.sections.filter(function (x) { return /A Closer Look/.test(x.heading); });
console.log('template headings left: ' + left.length);
