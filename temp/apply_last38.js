const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const G = require(DIR + 'data/guides.json');
const P = require(DIR + 'data/products.json');
const gapset = new Set(require(DIR + 'temp/gapset.json'));
const batch = require(DIR + 'temp/rw_last38.js');
let ok = 0; const miss = [];
const seen = new Set();
for (const e of batch) {
  const g = G.find(x => x.id === e.g);
  if (!g) { miss.push('NOGUIDE ' + e.g); continue; }
  const s = e.sec;
  const pid = s.products[0];
  if (!P.some(p => p.id === pid)) { miss.push('NOPROD ' + e.g + ' ' + pid); continue; }
  const txt = s.content + ' ' + s.content_es;
  if (/\$\d|€\d|£\d/.test(txt)) { miss.push('PRICE ' + e.g + ' ' + pid); continue; }
  if (/I've|I have |My |He [a-záé]| he [a-záé]|Mi banda|mi banda|Me he |Se la he|Se lo he|Lo he |La he /.test(txt)) { miss.push('FIRSTP ' + e.g + ' ' + pid); continue; }
  const key = e.g + '|' + pid;
  if (!gapset.has(key)) { miss.push('NOGAP ' + key); continue; }
  if (seen.has(key)) { miss.push('DUPBATCH ' + key); continue; }
  seen.add(key);
  g.sections.push({ heading: s.heading, heading_es: s.heading_es, content: s.content, content_es: s.content_es, products: s.products });
  ok++;
}
fs.writeFileSync(DIR + 'data/guides.json', JSON.stringify(G, null, 2));
console.log('APPLIED: ' + ok + ' MISS: ' + miss.length);
miss.forEach(m => console.log('MISS ' + m));