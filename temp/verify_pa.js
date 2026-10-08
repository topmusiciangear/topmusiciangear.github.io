const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
let bad = 0;
const ck = (c, n) => { console.log((c ? 'ok ' : 'FAIL ') + n); if (!c) bad++; };
[['guides/live-sound-pa.html', 0], ['guides/live-sound-pa_es.html', 0]].forEach(([f]) => {
  const h = fs.readFileSync(DIR + f, 'utf8');
  let i = -1, last = '';
  while ((i = h.indexOf('<table class="guide-comp-table"', i + 1)) >= 0) last = h.slice(i, h.indexOf('</table>', i));
  const ths = (last.match(/<th>/g) || []).length;
  const tds = (last.match(/<td/g) || []).length;
  ck(ths === 10 && tds === 120, f + ' th=' + ths + ' td=' + tds);
  ck(!last.includes('undefined'), f + ' no undefined');
});
const en = fs.readFileSync(DIR + 'guides/live-sound-pa.html', 'utf8');
['QSC K12.2', 'TS412', 'EVERSE 12', '524280/1200/preview.jpg'].forEach(n => ck(en.includes(n), 'EN has ' + n));
ck(!en.includes('830727/1200/preview.jpg'), 'EN old ICOA photo gone');
const es = fs.readFileSync(DIR + 'guides/live-sound-pa_es.html', 'utf8');
['QSC K12.2', 'TS412', 'EVERSE 12'].forEach(n => ck(es.includes(n), 'ES has ' + n));
process.exit(bad ? 1 : 0);
