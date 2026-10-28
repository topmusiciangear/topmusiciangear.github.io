const fs = require('fs');
const arr = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const g = (Array.isArray(arr) ? arr : arr.guides).find(x => x.id === 'best-nylon-guitars-for-beginners');
const needle = 'Tapa sólida de abeto torrefactado con tono claro y punchy';
function walk(o, path) {
  if (typeof o === 'string') { if (o.includes(needle)) console.log('FOUND at', path, '|', o.slice(0, 90)); return; }
  if (Array.isArray(o)) { o.forEach((v, i) => walk(v, path + '[' + i + ']')); return; }
  if (o && typeof o === 'object') { Object.entries(o).forEach(([k, v]) => walk(v, path + '.' + k)); }
}
walk(g, 'g');
console.log('---- count in file ----');
const raw = fs.readFileSync('data/guides.json', 'utf8');
console.log(raw.split(needle).length - 1);
