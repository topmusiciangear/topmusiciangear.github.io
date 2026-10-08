const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
let bad = 0;
const ck = (c, n) => { console.log((c ? 'ok ' : 'FAIL ') + n); if (!c) bad++; };
['guides/best-samplers-drum-computers.html', 'guides/compact-rhythm-devices.html'].forEach(f => {
  const h = fs.readFileSync(DIR + f, 'utf8');
  ['681637/1200/preview.jpg', '360', '430', '375', 'NOVCIRCUITRHYTHM', 'SYN0007908', '3V5S'].forEach(n => ck(h.includes(n), f.split('/')[1] + ' has ' + n));
});
process.exit(bad ? 1 : 0);
