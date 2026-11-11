const fs = require('fs');
const p = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
let s = fs.readFileSync(p, 'utf8');
s = s.replace(
  'We tested the tools that professional engineers rely on: iZotope RX 12 Standard for spectral repair, Waves Clarity Vx Pro for real-time AI voice isolation, Sonible smart:deess for intelligent de-essing, Acon Digital Restoration Suite 2 as an affordable cleanup option, and Zynaptiq Unveil for rescuing overly reverberant audio.',
  'These are the ones I believe in and that some professional engineers trust: iZotope RX 12 Standard for spectral repair, Waves Clarity Vx Pro for real-time AI voice isolation, Sonible smart:deess for intelligent de-essing, Acon Digital Restoration Suite 2 as an affordable cleanup option, and Zynaptiq Unveil for rescuing overly reverberant audio.'
);
fs.writeFileSync(p, s);
console.log('done');
