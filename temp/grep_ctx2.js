// grep_ctx2.js — segunda tanda de contextos
const fs = require('fs');
const raw = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8');

const NEEDLES = [
  'Great all-round',
  'AmpliTube 5 es',
  'El RCF es',
  'On stage, the SM57',
  'For professionals,',
  'Ideal for all',
  'first serious',
  'travelers and intimate',
  'Los estudios',
  'C414 XLII is the',
  'desde 1991',
  'broadcast voice tool',
  'Dante/AES67',
  'Asistentes',
  'AT2020 is the',
  'RX 12 is the',
  'Truco',
  'es el verdadero MVP',
  'Clásico vocal en vivo',
  'heavy lifting',
];

NEEDLES.forEach(n => {
  let i = -1, count = 0;
  while ((i = raw.indexOf(n, i + 1)) >= 0) {
    count++;
    if (count <= 4) {
      console.log('=== [' + n + '] @' + i + ' ===');
      console.log(raw.slice(Math.max(0, i - 200), i + n.length + 300).replace(/\\n/g, ' '));
      console.log('');
    }
  }
  if (count > 4) console.log('   (' + n + ': ' + count + ' ocurrencias, mostradas 4)\n');
  if (count === 0) console.log('=== [' + n + '] SIN OCURRENCIAS ===\n');
});
