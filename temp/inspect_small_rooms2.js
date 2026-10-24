// Diagnóstico detallado: campos con _es.html, nombres con espacio, formato products.json
const fs = require('fs');
const rawG = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8');
const rawP = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/products.json', 'utf8');
const g = JSON.parse(rawG);
const gu = g.find(x => x.id === 'best-monitors-for-small-rooms');

// 1) localizar línea de inicio de la guía en el raw
const lines = rawG.split('\n');
let guideStart = -1;
for (let i = 0; i < lines.length; i++) { if (lines[i].includes('"id": "best-monitors-for-small-rooms"')) { guideStart = i + 1; break; } }
console.log('guideStart line:', guideStart);

// 2) recorrer TODOS los campos string de la guía y reportar _es.html y nombres con espacio
function walk(obj, path) {
  if (typeof obj === 'string') {
    if (obj.includes('_es.html')) console.log('ESLINK', path, '→', (obj.match(/[^ "]*_es\.html[^ " \<]*/g) || []).join(', '));
    if (obj.includes(' LP-6 V2') || obj.includes(' LP-UNF')) console.log('LPSPACE', path, '→', JSON.stringify(obj.slice(0, 80)));
  } else if (Array.isArray(obj)) obj.forEach((v, i) => walk(v, path + '[' + i + ']'));
  else if (obj && typeof obj === 'object') Object.keys(obj).forEach(k => walk(obj[k], path + '.' + k));
}
console.log('== campos con _es.html / espacio inicial ==');
walk(gu, 'guide');

// 3) products.json: formateo de los 13 productos relevantes
console.log('== products.json raw blocks ==');
const pLines = rawP.split('\n');
const ids = [116, 302, 303, 305, 306, 307, 308, 371, 372, 632, 633, 684, 117];
ids.forEach(id => {
  const re = new RegExp('"id": ' + id + '[,\\n]');
  const m = re.exec(rawP);
  if (!m) { console.log(id, 'NOT FOUND'); return; }
  const ln = rawP.slice(0, m.index).split('\n').length;
  const block = pLines.slice(ln - 1, ln + 24).join('\n');
  const score = /"score": ([0-9.]+)/.exec(block);
  const title = /"title": "([^"]*)"/.exec(block);
  const price = /"price": "?([^",]*)"?/.exec(block);
  console.log('--- id', id, '| line', ln, '| score:', score && score[1], '| title:', title && title[1], '| price:', price && price[1]);
});
