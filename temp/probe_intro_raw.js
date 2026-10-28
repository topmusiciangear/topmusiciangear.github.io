const fs = require('fs');
const raw = fs.readFileSync('data/guides.json', 'utf8');
const gstart = raw.indexOf('"id": "best-nylon-guitars-for-beginners"');
const key = '"intro_es": "';
const k = raw.indexOf(key, gstart);
const from = k + key.length;
let to = from;
while (raw[to] !== '"' || raw[to - 1] === '\\') to++;
const val = raw.slice(from, to);
console.log('len', val.length);
console.log(JSON.stringify(val));
const odd = [];
for (let i = 0; i < val.length; i++) {
  const c = val.charCodeAt(i);
  if (c > 126) odd.push(i + ':' + c + ':' + val[i]);
}
console.log('non-ascii:', odd.join(' | '));
const mine = 'Las cuerdas de nylon son más suaves para las yemas y dan un tono cálido y cantable que funciona para estudios clásicos y práctica nocturna.';
console.log('equal to mine:', val === mine, val.length, mine.length);
for (let i = 0; i < Math.min(val.length, mine.length); i++) {
  if (val[i] !== mine[i]) { console.log('first diff at', i, JSON.stringify(val[i]), val.charCodeAt(i), JSON.stringify(mine[i]), mine.charCodeAt(i)); break; }
}
