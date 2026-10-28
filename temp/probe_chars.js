const fs = require('fs');
const raw = fs.readFileSync('data/guides.json', 'utf8');
const mine = 'Las cuerdas de nylon son más suaves para las yemas y dan un tono cálido y cantable que funciona para estudios clásicos y práctica nocturna.';
const i = raw.indexOf('cantable');
const fromFile = raw.slice(i - 330, i + 30);
// locate 'Las cuerdas' inside
const fileStr = fromFile.slice(fromFile.indexOf('Las cuerdas'), fromFile.indexOf('Las cuerdas') + mine.length);
console.log('len mine', mine.length, 'len file', fileStr.length);
console.log('equal:', mine === fileStr);
for (let k = 0; k < Math.max(mine.length, fileStr.length); k++) {
  if (mine[k] !== fileStr[k]) {
    console.log('diff at', k, JSON.stringify(mine[k]), mine.charCodeAt(k), 'vs', JSON.stringify(fileStr[k]), fileStr.charCodeAt(k));
  }
}
