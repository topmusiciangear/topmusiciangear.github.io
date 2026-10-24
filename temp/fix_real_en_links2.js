const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
let raw = fs.readFileSync(B + 'data/guides.json', 'utf8');
const lines = raw.split('\n');
let changes = 0;
const targets = [
  '/guides/player-strat-vs-pacifica_es.html',
  '/guides/american-pro-vs-les-paul_es.html',
  '/guides/scarlett-vs-ssl_es.html',
  '/guides/scarlett-vs-volt_es.html',
  '/guides/best-monitors-for-small-rooms_es.html',
  '/guides/pro-plugins_es.html',
  '/guides/best-daw-for-beginners_es.html',
  '/guides/ableton-vs-logic_es.html',
  '/guides/ableton-vs-fl-studio_es.html',
  '/guides/pro-tools-vs-cubase_es.html',
  '/guides/hd490-pro-vs-dt990_es.html',
  '/guides/audient-vs-motu_es.html'
];
for (let li = 0; li < lines.length; li++) {
  let line = lines[li];
  if (!line.includes('_es.html')) continue;
  const cm = line.match(/^\s*"([^" ]+)":\s*"(.*)"\s*,?\s*$/);
  if (!cm) continue;
  const key = cm[1];
  if (key.endsWith('_es')) continue;
  let newLine = line;
  targets.forEach(t => { newLine = newLine.split(t).join(t.replace('_es.html', '.html')); });
  if (newLine !== line) {
    console.log('L' + (li + 1) + ' key=' + key + ' corregido');
    lines[li] = newLine;
    changes++;
  }
}
raw = lines.join('\n');
const parsed = JSON.parse(raw);
let rem = 0;
parsed.forEach(gu => {
  if (gu.id === 'best-monitors-for-small-rooms') return;
  const scan = (o, p) => {
    if (typeof o === 'string') { if (!p.endsWith('_es') && o.includes('_es.html')) { rem++; console.log('REMANENTE', gu.id, p); } }
    else if (Array.isArray(o)) o.forEach((v, i) => scan(v, p + '[' + i + ']'));
    else if (o && typeof o === 'object') Object.keys(o).forEach(k => scan(o[k], p + '.' + k));
  };
  scan(gu, gu.id);
});
if (rem > 0) throw new Error('quedan ' + rem + ' links _es.html en campos EN');
fs.writeFileSync(B + 'data/guides.json', raw);
console.log('OK: ' + changes + ' líneas corregidas, 0 remanentes');
