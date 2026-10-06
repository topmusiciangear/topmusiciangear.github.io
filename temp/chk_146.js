const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const raw = fs.readFileSync(DIR + 'data/guides.json', 'utf8');
const G = JSON.parse(raw);
const g = G.find(x => x.id === 'best-digital-pianos');
const gs = JSON.stringify(g);
const kw = (gs.match(/kawai|kdp120/gi) || []).length;
console.log('Kawai/KDP120 refs in guide data:', kw);
for (const f of ['guides/best-digital-pianos.html', 'guides/best-digital-pianos_es.html']) {
  const h = fs.readFileSync(DIR + f, 'utf8');
  console.log(f, '| kawai refs:', (h.match(/kawai|kdp120/gi) || []).length,
    '| YDP-146 blocks:', (h.match(/YDP-146/g) || []).length,
    '| verdict cols:', (h.match(/verdict-col">/g) || []).length,
    '| 1299:', /1,299/.test(h) ? 'OK' : 'FALTA',
    '| GHS:', h.includes('GHS') ? 'OK' : 'FALTA');
}
