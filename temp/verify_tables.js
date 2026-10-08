const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
let bad = 0;
const ck = (c, n) => { console.log((c ? 'ok ' : 'FAIL ') + n); if (!c) bad++; };
[['guides/best-samplers-drum-computers.html', 'EN samplers'], ['guides/best-samplers-drum-computers_es.html', 'ES samplers'],
 ['guides/compact-rhythm-devices.html', 'EN compact'], ['guides/compact-rhythm-devices_es.html', 'ES compact']].forEach(([f, n]) => {
  const h = fs.readFileSync(DIR + f, 'utf8');
  const m = h.match(/<table class="guide-comp-table"[\s\S]*?<\/table>/);
  const ths = m ? (m[0].match(/<th>/g) || []).length : 0;
  const tds = m ? (m[0].match(/<td/g) || []).length : 0;
  const undef = m ? m[0].includes('undefined') : true;
  console.log(n, '| th:', ths, '| td:', tds, '| undefined:', undef);
  if (!(ths >= 10 && tds >= 80 && !undef)) bad++;
});
// spot-check corrected cells
const en = fs.readFileSync(DIR + 'guides/best-samplers-drum-computers.html', 'utf8');
ck(en.includes('400 MB RAM / 20 GB storage'), 'DT2 memory cell');
ck(en.includes('8 GB RAM / 128 GB storage'), 'Live3 memory cell');
ck(en.includes('41 multi-FX + 17 input FX'), 'SP404 41 FX cell');
ck(en.includes('16 GB internal + SD card'), 'SP404 memory cell');
ck(en.includes('$999') || en.includes('999'), 'Maschine price cell');
const es = fs.readFileSync(DIR + 'guides/best-samplers-drum-computers_es.html', 'utf8');
ck(es.includes('Caja de ritmos estéreo'), 'ES drum computer natural');
ck(!es.includes('computadora de batería') && !es.includes('ordenadores de batería'), 'ES no literal battery-computer');
process.exit(bad ? 1 : 0);
