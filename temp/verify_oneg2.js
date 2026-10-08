const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
let bad = 0;
const ck = (c, n) => { console.log((c ? 'ok ' : 'FAIL ') + n); if (!c) bad++; };
['guides/best-drum-machine.html', 'guides/best-drum-machine_es.html'].forEach(f => {
  const h = fs.readFileSync(DIR + f, 'utf8');
  ck(h.includes('MPC One G2'), f + ' has G2');
  ck(!h.includes('MPC One+') , f + ' no One+ left');
  ck(!h.includes('One%2B') && !h.includes('One&#43;'), f + ' no encoded One+');
});
process.exit(bad ? 1 : 0);
