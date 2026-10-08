const fs = require('fs');
const h = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/best-drum-machine.html', 'utf8');
const es = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/best-drum-machine_es.html', 'utf8');
let bad = 0;
const ck = (c, n) => { console.log((c ? 'ok ' : 'FAIL ') + n); if (!c) bad++; };
[h, es].forEach((page, idx) => {
  const t = page.indexOf('Syntakt');
  const region = page.slice(t, t + 15000);
  const aRow = region.indexOf('Andertons');
  const chunk = region.slice(Math.max(0, aRow - 200), aRow + 500);
  ck(!/Out of stock|Agotado/i.test(chunk), (idx ? 'ES' : 'EN') + ' andertons row white');
  ck(chunk.includes('799'), (idx ? 'ES' : 'EN') + ' andertons price 799');
});
process.exit(bad ? 1 : 0);
