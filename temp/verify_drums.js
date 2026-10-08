const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
let bad = 0;
function ck(c, n) { console.log((c ? 'ok ' : 'FAIL ') + n); if (!c) bad++; }
const en = fs.readFileSync(DIR + 'guides/best-drum-machine.html', 'utf8');
const es = fs.readFileSync(DIR + 'guides/best-drum-machine_es.html', 'utf8');
['AIRA Compact T-8', 'Circuit Tracks', 'DrumBrute Impact', 'TR-8S', 'MPC One+', 'Digitakt II', 'Syntakt', 'Pērkons'].forEach(n => {
  ck(en.includes(n) && es.includes(n), n);
});
['Volca Beats', 'RD-8', 'Analog Rytm', 'Polyend Tracker', 'MPC One G2', 'TR-6S'].forEach(n => {
  ck(!en.includes(n) && !es.includes(n), 'gone: ' + n);
});
process.exit(bad ? 1 : 0);
