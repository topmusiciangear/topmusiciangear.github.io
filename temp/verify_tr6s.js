const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
let bad = 0;
const ck = (c, n) => { console.log((c ? 'ok ' : 'FAIL ') + n); if (!c) bad++; };
['guides/compact-rhythm-devices.html', 'guides/compact-rhythm-devices_es.html'].forEach(f => {
  const h = fs.readFileSync(DIR + f, 'utf8');
  const t = h.indexOf('TR-6S');
  const region = h.slice(t, t + 15000);
  ['469', '369'].forEach(n => ck(region.includes(n), f.split('/')[1] + ' TR-6S has ' + n));
});
process.exit(bad ? 1 : 0);
