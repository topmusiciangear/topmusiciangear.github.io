var fs = require('fs');
function walk(d, cb) { fs.readdirSync(d, { withFileTypes: true }).forEach(function (e) { var p = d + '/' + e.name; if (e.isDirectory()) walk(p, cb); else if (/\.html$/.test(e.name)) cb(p); }); }
function scan(pat) { var hits = 0; walk('guides', function (p) { if (fs.readFileSync(p, 'utf8').indexOf(pat) > -1) hits++; }); return hits; }

console.log('--- NEW prices present (pages) ---');
[
  ['$438.50', 'Rodecaster amazon'], ['$488.00', 'Rodecaster zzounds'], ['£434.00', 'Rodecaster g4m'], ['€398.00', 'Rodecaster MS'],
  ['$4,399.99', 'Prophet amazon/zzounds'], ['£4,337.00', 'Prophet g4m'], ['€4,679.00', 'Prophet MS'],
  ['$1,049.99', 'M160 zzounds'], ['£788.00', 'M160 g4m'], ['€798.00', 'M160 MS'], ['$507.99', 'M160 amazon'],
  ['$3,849.00', 'SUB8004 zzounds'], ['$3,499.00', 'SUB8004 amazon'],
  ['£504.00', 'BLX288 g4m'], ['€635.00', 'BLX288 MS'], ['$659.00', 'BLX288 amazon'], ['$599.00', 'BLX288 zzounds'],
  ['€1,349.00', 'EW IEM MS'], ['€1,049.00', 'SE846 MS'],
  ['$899.00', 'ELX200 zzounds'], ['$999.00', 'ELX200 amazon'], ['€1,069.00', 'ELX200 MS'], ['£899.00', 'ELX200 g4m'],
  ['€199.00', 'Xvive U4 MS'], ['€239.00', 'VideoMic NTG MS'], ['€360.00', 'e604 MS'], ['€489.00', 'iLoud Pro MS'],
  ['£819.00', 'PSM300 g4m'], ['€215.00', 'ListenPro MS'], ['$749.00', 'Thunderbird amazon'], ['€419.00', 'T10S MS'],
  ['£128.00', 'H3000 g4m'], ['€849.00', 'MPC One MS'], ['€399.00', 'MTM MKII MS']
].forEach(function (x) { console.log(x[1].padEnd(22), scan(x[0])); });

console.log('--- absurd leftovers (pages) ---');
[
  ['$50.00', 'Rodecaster old $50'], ['€639.00', 'Xvive U4 old'], ['€529.00', 'VideoMic old'], ['€217.60', 'T10S/DJI old'],
  ['€1,349.00', 'Xvive U4R4 old MS'], ['$1,839.99', 'BLX288 old US'], ['£1,549.00', 'BLX288 old g4m'], ['€66.00', 'CD-60S old MS'],
  ['€65.00', 'ELX old MS'], ['$73.00', 'RCF old US'], ['$69.00', 'ELX old US'], ['£1,867.23', 'SE846/Apollo old MS'],
  ['€699.00', 'EW IEM old MS'], ['€1,349.00x', 'unused'], ['£112.75', 'e604 single g4m old'], ['€604', 'checksum-e604']
].forEach(function (x) { var n = scan(x[0]); if (n) console.log('LEFTOVER', x[1], n); });

console.log('--- OOS product links present (pages) ---');
[
  ['ASTSWIFTSHIELD', '39 zzounds OOS url'], ['KMS26754', '59 zzounds OOS url'], ['EPIEBTV', '162 zzounds OOS url'],
  ['TAYGSMINI', '271 zzounds OOS url'], ['GEN7050CPM', '338 zzounds OOS url'], ['MARTIN-D-28', '452 g4m OOS url'],
  ['B079V26HMV', '453 amazon OOS url'], ['GEAR4MUSIC-SEARCH?', 'na search'], ['SOUSIG12MTK', '487 zzounds OOS url']
].forEach(function (x) { console.log(x[1].padEnd(22), scan(x[0])); });
console.log('done');