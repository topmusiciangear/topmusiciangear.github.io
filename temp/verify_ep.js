const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
let bad = 0;
const ck = (c, n) => { console.log((c ? 'ok ' : 'FAIL ') + n); if (!c) bad++; };
['guides/best-samplers-drum-computers.html', 'guides/compact-rhythm-devices.html'].forEach(f => {
  const h = fs.readFileSync(DIR + f, 'utf8');
  const t = h.indexOf('EP-133');
  const region = h.slice(t, t + 15000);
  ['1329204/1200/preview.jpg', '289', '329', '349', 'TEEEP133KOII', 'SYN0009460', '7TH8'].forEach(n => ck(region.includes(n), f.split('/')[1] + ' EP has ' + n));
});
process.exit(bad ? 1 : 0);
