const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
let bad = 0;
const ck = (c, n) => { console.log((c ? 'ok ' : 'FAIL ') + n); if (!c) bad++; };
[['guides/guitar-bass-amps.html', 0], ['guides/guitar-bass-amps_es.html', 0]].forEach(([f]) => {
  const h = fs.readFileSync(DIR + f, 'utf8');
  let i = -1, last = '';
  while ((i = h.indexOf('<table class="guide-comp-table"', i + 1)) >= 0) last = h.slice(i, h.indexOf('</table>', i));
  const ths = (last.match(/<th>/g) || []).length;
  const tds = (last.match(/<td/g) || []).length;
  ck(ths === 12 && tds === 110, f + ' th=' + ths + ' td=' + tds);
  ck(!last.includes('undefined'), f + ' no undefined');
});
const en = fs.readFileSync(DIR + 'guides/guitar-bass-amps.html', 'utf8');
['Mustang GTX100', 'CMD 102P IV', 'Tone Master Deluxe Reverb', 'Rumble 500', 'RB-115'].forEach(n => ck(en.includes(n), 'EN has ' + n));
ck(!en.includes('RB-210') && !en.includes('Rumble 200') && !en.includes('Spark LIVE'), 'EN removed gone');
const es = fs.readFileSync(DIR + 'guides/guitar-bass-amps_es.html', 'utf8');
['Mustang GTX100', 'CMD 102P IV', 'Tone Master'].forEach(n => ck(es.includes(n), 'ES has ' + n));
process.exit(bad ? 1 : 0);
