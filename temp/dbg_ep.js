const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
['guides/best-samplers-drum-computers.html', 'guides/compact-rhythm-devices.html'].forEach(f => {
  const h = fs.readFileSync(DIR + f, 'utf8');
  console.log('== ' + f);
  ['1329204', 'TEEEP133KOII', 'SYN0009460', '7TH8'].forEach(n => console.log(' ', n, h.includes(n) ? 'PRESENT' : 'ABSENT'));
});
