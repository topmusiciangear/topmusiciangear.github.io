const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
let bad = 0;
const ck = (c, n) => { console.log((c ? 'ok ' : 'FAIL ') + n); if (!c) bad++; };
['guides/best-drum-machine.html', 'guides/best-samplers-drum-computers.html'].forEach(f => {
  const h = fs.readFileSync(DIR + f, 'utf8');
  const t = h.indexOf('MPC One G2');
  const region = h.slice(t, t + 15000);
  ['1389725/1200/preview.jpg', '719', '829'].forEach(n => ck(region.includes(n), f.split('/')[1] + ' G2 has ' + n));
});
process.exit(bad ? 1 : 0);
