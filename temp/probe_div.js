const fs = require('fs');
const raw = fs.readFileSync('data/guides.json', 'utf8');
const start = raw.indexOf('"id": "best-nylon-guitars-for-beginners"');
const region = raw.slice(start);
const oldText = 'Las cuerdas de nylon son más suaves para las yemas y dan un tono cálido y cantable que funciona para estudios clásicos y práctica nocturna.';
const o = JSON.stringify(oldText);
const k = region.indexOf('"Las cuerdas de nylon son más suaves');
const rs = region.slice(k, k + o.length);
console.log('k', k, 'o len', o.length, 'rs len', rs.length);
for (let i = 0; i < o.length; i++) {
  if (o[i] !== rs[i]) {
    console.log('diff at', i);
    console.log('mine:', JSON.stringify(o.slice(Math.max(0, i - 15), i + 15)), Array.from(o.slice(i, i + 6)).map(c => c.codePointAt(0)));
    console.log('file:', JSON.stringify(rs.slice(Math.max(0, i - 15), i + 15)), Array.from(rs.slice(i, i + 6)).map(c => c.codePointAt(0)));
    break;
  }
}
