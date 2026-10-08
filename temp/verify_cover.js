const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
let bad = 0;
const ck = (c, n) => { console.log((c ? 'ok ' : 'FAIL ') + n); if (!c) bad++; };
['guides/best-drum-machine.html', 'guides/best-drum-machine_es.html'].forEach(f => {
  const h = fs.readFileSync(DIR + f, 'utf8');
  ck(h.includes('82/829101/1200/preview.jpg'), f + ' new cover');
  ck(!h.includes('60/603445/1200/preview.jpg'), f + ' old cover gone');
});
process.exit(bad ? 1 : 0);
