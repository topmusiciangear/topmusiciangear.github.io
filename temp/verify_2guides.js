const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/guides/';
const bg = fs.readFileSync(B + 'beginner-guitar.html', 'utf8');
const bge = fs.readFileSync(B + 'beginner-guitar_es.html', 'utf8');
const dm = fs.readFileSync(B + 'best-digital-mixers.html', 'utf8');
const dme = fs.readFileSync(B + 'best-digital-mixers_es.html', 'utf8');
const checks = [
  ['BG C40 EN', bg.includes('Yamaha C40 Classical')],
  ['BG C40 ES', bge.includes('Yamaha C40 Classical')],
  ['BG Sonic EN', bg.includes('Squier Sonic Mustang')],
  ['BG Enya EN', bg.includes('Nova Go Sonic')],
  ['BG Enya peso', bg.includes('6.6 lb')],
  ['DM Ui24R', dm.includes('Soundcraft Ui24R')],
  ['DM 32SC', dm.includes('StudioLive 32SC')],
  ['DM Ui16', dm.includes('Soundcraft Ui16')],
  ['DM DM3S', dm.includes('Yamaha DM3S')],
  ['DM WING', dm.includes('WING Compact')],
  ['DM WING peso', dm.includes('15.9 kg') || dm.includes('35.1 lb')],
  ['DM 32SC peso', dm.includes('10,5 kg') || dm.includes('23.2 lb')],
  ['Enya HH EN', bg.includes('Alnico II')],
];
checks.forEach(([n, ok]) => console.log((ok ? 'OK  ' : 'FALTA ') + n));