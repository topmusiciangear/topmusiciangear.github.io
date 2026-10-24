// Escaneo previo: menciones de ganador/8030C y scores hardcodeados en el bloque de la guía
const fs = require('fs');
const raw = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8');
const lines = raw.split('\n');
const gStart = lines.findIndex(l => l.includes('"id": "best-monitors-for-small-rooms"'));
const gEnd = lines.findIndex(l => l.includes('"id": "best-multi-effects-pedals"'));
const block = lines.slice(gStart, gEnd).join('\n');
console.log('block lines:', gStart + 1, '→', gEnd, '(count ' + (gEnd - gStart) + ')');

['8030C', 'KH 80', 'iLoud Micro'].forEach(term => {
  const re = new RegExp(term, 'g');
  let m, c = 0;
  console.log('== "' + term + '" ==');
  while ((m = re.exec(block)) && c < 20) {
    const ln = gStart + 1 + block.slice(0, m.index).split('\n').length - 1;
    const line = block.slice(0, m.index).split('\n').pop();
    console.log('  L' + ln + ' field≈', line.trim().slice(0, 40));
    c++;
  }
  console.log('  total:', (block.match(re) || []).length);
});

// números de score hardcodeados tipo "9.8", "9.6" en textos
console.log('== score numbers in block ==');
['score of 9', '9.8/10', '9.6/10', '9.8 out', '9.6 out', 'nota de 9', '9,8', '9,6'].forEach(p => {
  const c = (block.split(p).length - 1);
  if (c) console.log(' "' + p + '":', c);
});
