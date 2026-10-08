const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
let bad = 0;
const ck = (c, n) => { console.log((c ? 'ok ' : 'FAIL ') + n); if (!c) bad++; };
function lastTable(f) {
  const h = fs.readFileSync(DIR + f, 'utf8');
  let i = -1, last = '';
  while ((i = h.indexOf('<table class="guide-comp-table"', i + 1)) >= 0) {
    last = h.slice(i, h.indexOf('</table>', i));
  }
  return last;
}
[['guides/best-samplers-drum-computers.html', 11, 110], ['guides/best-samplers-drum-computers_es.html', 11, 110],
 ['guides/compact-rhythm-devices.html', 11, 99], ['guides/compact-rhythm-devices_es.html', 11, 99]].forEach(([f, eth, etd]) => {
  const t = lastTable(f);
  const ths = (t.match(/<th>/g) || []).length;
  const tds = (t.match(/<td/g) || []).length;
  ck(ths === eth && tds === etd, f + ' th=' + ths + ' td=' + tds);
  ck(!t.includes('undefined'), f + ' no undefined');
});
const en = lastTable('guides/best-samplers-drum-computers.html');
['400 MB RAM / 20 GB storage', '8 GB RAM / 128 GB storage', '41 multi-FX + 17 input FX', '228 s per pack', '2.5 kg', '128 MB internal (999 slots)', '$269', '48 samples (8 banks x 6 pads)'].forEach(c => ck(en.includes(c), 'cell: ' + c));
const es = lastTable('guides/best-samplers-drum-computers_es.html');
ck(es.includes('Caja de ritmos estéreo'), 'ES natural drum computer');
ck(es.includes('2,1 kg') && es.includes('1,48 kg'), 'ES decimal commas');
process.exit(bad ? 1 : 0);
