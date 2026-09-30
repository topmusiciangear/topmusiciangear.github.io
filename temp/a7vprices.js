const fs = require('fs');
const g = fs.readFileSync('data/guides.json', 'utf8');
console.log('=== importes cited cerca de "A7V" (ventana 400 chars) ===');
const seen = new Set();
let n = 0;
const re = /A7V/g;
let m;
while ((m = re.exec(g)) !== null) {
  const w = g.slice(Math.max(0, m.index - 400), m.index + 400);
  // pares: "2 x $X" / "$X per pair" / "$X el par"
  const figs = w.match(/\$\s?\d[\d,]*(?:\.\d\d)?|\u20ac\s?\d[\d,]*(?:\.\d\d)?|\u00a3\s?\d[\d,]*(?:\.\d\d)?/g) || [];
  if (!figs.length) continue;
  const key = figs.join('|') + '@' + Math.floor(m.index / 500);
  if (seen.has(key)) continue;
  seen.add(key);
  n++;
  const line = g.slice(0, m.index).split('\n').length;
  console.log(' L' + line + ' -> ' + [...new Set(figs)].join(' '));
}
console.log('ventanas con importe: ' + n);
