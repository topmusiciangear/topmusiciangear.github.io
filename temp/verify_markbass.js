const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
let bad = 0;
const ck = (c, n) => { console.log((c ? 'ok ' : 'FAIL ') + n); if (!c) bad++; };
['guides/guitar-bass-amps.html', 'guides/guitar-bass-amps_es.html'].forEach(f => {
  const h = fs.readFileSync(DIR + f, 'utf8');
  ck(h.includes('CMD 102 P V'), f + ' has P V');
  ck(!h.includes('102P IV'), f + ' no IV left');
  ck(h.includes('1087484/1200/preview.jpg'), f + ' new photo');
  ck(h.includes('928'), f + ' has 928');
  ck(h.includes('989'), f + ' has 989');
});
process.exit(bad ? 1 : 0);
