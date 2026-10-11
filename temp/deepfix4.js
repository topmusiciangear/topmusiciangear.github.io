var fs = require('fs');
var guides = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
var fixes = 0, warns = [];
function G(id) { var g = guides.find(function (x) { return x.id === id; }); if (!g) warns.push('NO GUIDE ' + id); return g; }
function setFlex(gid, prodSub, rowSubs, en, es) {
  var g = G(gid); if (!g || !g.productTable) { warns.push('NO TABLE ' + gid); return; }
  var cols = g.productTable.columns;
  var ci = cols.findIndex(function (c) { return (c.title + ' ' + (c.title_es || '')).toLowerCase().indexOf(prodSub.toLowerCase()) >= 0; });
  if (ci < 0) { warns.push(gid + ' NO COL ~' + prodSub); return; }
  var subs = Array.isArray(rowSubs) ? rowSubs : [rowSubs];
  var row = (g.productTable.rows || []).find(function (r) {
    var L = ((r.label || '') + ' ' + (r.label_es || '')).toLowerCase();
    return subs.some(function (s) { return L.indexOf(s.toLowerCase()) >= 0; });
  });
  if (!row) { warns.push(gid + ' NO ROW ~' + subs.join('/')); return; }
  row.values[ci] = { value: en, value_es: (es === undefined ? en : es) };
  fixes++;
}
function repText(gid, olds, news) {
  var g = G(gid); if (!g) return;
  ['conclusion', 'conclusion_es', 'verdict', 'verdict_es', 'description', 'description_es', 'intro', 'intro_es'].forEach(function (f) { if (typeof g[f] === 'string' && g[f].indexOf(olds) >= 0) { g[f] = g[f].split(olds).join(news); fixes++; } });
  Object.keys(g).forEach(function (k) { if (/^faq_(q|a)[1-5]/i.test(k) && typeof g[k] === 'string' && g[k].indexOf(olds) >= 0) { g[k] = g[k].split(olds).join(news); fixes++; } });
  (g.sections || []).forEach(function (s) { ['heading', 'heading_es', 'content', 'content_es'].forEach(function (f) { if (typeof s[f] === 'string' && s[f].indexOf(olds) >= 0) { s[f] = s[f].split(olds).join(news); fixes++; } }); });
  (g.verdictProsCons || []).forEach(function (v) {
    ['name', 'name_es'].forEach(function (f) { if (typeof v[f] === 'string' && v[f].indexOf(olds) >= 0) { v[f] = v[f].split(olds).join(news); fixes++; } });
    ['pros', 'cons', 'pros_es', 'cons_es'].forEach(function (arr) { (v[arr] || []).forEach(function (p, i) { if (typeof p === 'string' && p.indexOf(olds) >= 0) { v[arr][i] = p.split(olds).join(news); fixes++; } }); });
  });
}

// MG10XU
setFlex('best-analog-mixers', 'MG10XU', ['weight'], '4.6 lb (2.1 kg)', '4.6 lb (2.1 kg)');
setFlex('best-analog-mixers', 'MG10XU', ['aux'], '1 AUX (FX) send', '1 envío AUX (FX)');
setFlex('best-live-sound-mixers', 'MG10XU', ['aux'], '1 AUX (FX) send', '1 envío AUX (FX)');
// SQ-5
setFlex('best-live-sound-mixers', 'SQ-5', ['weight'], '23.1 lb (10.5 kg)', '23.1 lb (10.5 kg)');
setFlex('best-live-sound-mixers', 'SQ-5', ['aux'], '12 stereo mixes + LR, 8 stereo FX engines', '12 mezclas estéreo + LR, 8 motores FX estéreo');
// MG16XU
setFlex('best-live-sound-mixers', 'MG16XU', ['channel'], '16 line (8 mono + 4 stereo), 10 mic', '16 líneas (8 mono + 4 estéreo), 10 de micro');
setFlex('best-live-sound-mixers', 'MG16XU', ['preamp'], '10x D-PRE', '10x D-PRE');
// K12.2
setFlex('best-pa-speakers', 'K12.2', ['driver'], '12" + 1.4" titanium compression driver', '12" + compresor de titanio de 1.4"');
setFlex('best-pa-speakers', 'K12.2', ['frequency'], '50 Hz – 20 kHz (-6 dB) / 45 Hz – 20 kHz (-10 dB)', '50 Hz – 20 kHz (-6 dB) / 45 Hz – 20 kHz (-10 dB)');
setFlex('best-pa-speakers', 'K12.2', ['max spl', 'spl'], '132 dB peak / 126 dB continuous', '132 dB de pico / 126 dB continuos');
setFlex('best-pa-speakers', 'K12.2', ['coverage', 'dispersion'], '75° axisymmetric DMT', '75° axisimétrico DMT');
repText('best-pa-speakers', '1.75-inch diaphragm', '1.4-inch titanium diaphragm');
// ZLX-12P-G2 (3 guides)
['best-pa-speakers', 'budget-pa-systems', 'live-sound-pa'].forEach(function (gid) {
  setFlex(gid, 'ZLX', ['power', 'watt', 'amp'], '1000W Class-D', '1000W en Clase-D');
  setFlex(gid, 'ZLX', ['max spl', 'spl'], '127 dB peak', '127 dB de pico');
  setFlex(gid, 'ZLX', ['weight'], '32.67 lb (14.82 kg)', '32.67 lb (14.82 kg)');
  setFlex(gid, 'ZLX', ['driver'], '12" WECA2128 + 1.4" titanium DECA2516', '12" WECA2128 + titanio de 1.4" DECA2516');
  setFlex(gid, 'ZLX', ['frequency'], '54 Hz – 18.5 kHz (-3 dB) / 48 Hz – 20 kHz (-10 dB)', '54 Hz – 18.5 kHz (-3 dB) / 48 Hz – 20 kHz (-10 dB)');
});
repText('best-pa-speakers', 'powered by a 2000W Class D', 'powered by a 1000W Class-D');
repText('best-pa-speakers', 'At just 30 pounds', 'At 32.67 lb (14.82 kg)');
// DXR12mkII
['best-pa-speakers', 'live-sound-pa'].forEach(function (gid) {
  setFlex(gid, 'DXR12', ['power', 'watt', 'amp'], '1100W dynamic (950W LF + 150W HF)', '1100W dinámicos (950W LF + 150W HF)');
  setFlex(gid, 'DXR12', ['max spl', 'spl'], '134 dB peak', '134 dB de pico');
});
// Thump215XT
setFlex('best-pa-speakers', 'Thump215', ['weight'], '35.1 lb (15.9 kg)', '35.1 lb (15.9 kg)');
setFlex('budget-pa-systems', 'Thump215', ['driver'], '15" + 1" compression driver', '15" + compresor de 1"');
setFlex('budget-pa-systems', 'Thump215', ['max spl', 'spl'], '129 dB', '129 dB');
setFlex('budget-pa-systems', 'Thump215', ['frequency'], '40 Hz – 23 kHz', '40 Hz – 23 kHz');
// DBR12
setFlex('budget-pa-systems', 'DBR12', ['power', 'watt', 'amp'], '1000W dynamic (800W LF + 200W)', '1000W dinámicos (800W LF + 200W)');
setFlex('budget-pa-systems', 'DBR12', ['max spl', 'spl'], '131 dB peak', '131 dB de pico');
setFlex('budget-pa-systems', 'DBR12', ['frequency'], '52 Hz – 20 kHz (-10 dB)', '52 Hz – 20 kHz (-10 dB)');
// TS412
setFlex('budget-pa-systems', 'TS412', ['power', 'watt', 'amp'], '2500W peak (1600W LF + 900W HF)', '2500W de pico (1600W LF + 900W HF)');
setFlex('budget-pa-systems', 'TS412', ['max spl', 'spl'], '132 dB peak / 129 dB continuous', '132 dB de pico / 129 dB continuos');
setFlex('budget-pa-systems', 'TS412', ['frequency'], '53 Hz – 20 kHz (±3 dB) / 44 Hz – 20 kHz (-10 dB)', '53 Hz – 20 kHz (±3 dB) / 44 Hz – 20 kHz (-10 dB)');
setFlex('budget-pa-systems', 'TS412', ['weight'], '33 lb (15 kg)', '33 lb (15 kg)');
// PXM-12MP in stage-wedges
setFlex('stage-wedges', 'PXM-12MP', ['power', 'watt', 'amp'], '700W Class-D (500W LF + 200W HF)', '700W en Clase-D (500W LF + 200W HF)');
setFlex('stage-wedges', 'PXM-12MP', ['driver'], '12" / 1.75" coaxial', '12" / coaxial de 1.75"');
setFlex('stage-wedges', 'PXM-12MP', ['frequency'], '64 Hz – 20 kHz (-3 dB) / 53 Hz – 20 kHz (-10 dB)', '64 Hz – 20 kHz (-3 dB) / 53 Hz – 20 kHz (-10 dB)');
setFlex('stage-wedges', 'PXM-12MP', ['max spl', 'spl'], '129 dB peak', '129 dB de pico');
setFlex('stage-wedges', 'PXM-12MP', ['coverage', 'dispersion'], '90° x 90° symmetrical', '90° x 90° simétricos');
setFlex('stage-wedges', 'PXM-12MP', ['weight'], '29.8 lb (13.5 kg)', '29.8 lb (13.5 kg)');
setFlex('stage-wedges', 'PXM-12MP', ['input'], '2x XLR/TRS combo + stereo RCA + XLR THRU + MIXOUT', '2x combo XLR/TRS + RCA estéreo + XLR THRU + MIXOUT');
// NX 912-SMA
setFlex('stage-wedges', 'NX 912', ['driver'], '12" (2.5" v.c.) + 1" throat compression driver', '12" (bobina 2.5") + compresor de garganta de 1"');
setFlex('stage-wedges', 'NX 912', ['frequency'], '50 Hz – 20 kHz', '50 Hz – 20 kHz');
setFlex('stage-wedges', 'NX 912', ['max spl', 'spl'], '130 dB', '130 dB');
setFlex('stage-wedges', 'NX 912', ['coverage', 'dispersion'], '100° H x 70° V', '100° H x 70° V');
setFlex('stage-wedges', 'NX 912', ['weight'], '44.09 lb (20 kg)', '44.09 lb (20 kg)');
// DHR12M
setFlex('stage-wedges', 'DHR12M', ['power', 'watt', 'amp'], '1000W dynamic (800W LF + 200W HF)', '1000W dinámicos (800W LF + 200W HF)');
setFlex('stage-wedges', 'DHR12M', ['driver'], '12" (2.5" v.c.) + 1.75" coaxial (1" throat)', '12" (bobina 2.5") + coaxial de 1.75" (garganta 1")');
setFlex('stage-wedges', 'DHR12M', ['frequency'], '55 Hz – 20 kHz (-10 dB)', '55 Hz – 20 kHz (-10 dB)');
setFlex('stage-wedges', 'DHR12M', ['max spl', 'spl'], '129 dB peak', '129 dB de pico');
setFlex('stage-wedges', 'DHR12M', ['coverage', 'dispersion'], '90° x 90°', '90° x 90°');
// DXS18XLF
setFlex('best-live-subwoofers', 'DXS18', ['power', 'watt', 'amp'], '1020W dynamic / 800W continuous', '1020W dinámicos / 800W continuos');
setFlex('best-live-subwoofers', 'DXS18', ['frequency'], '32 Hz – 120 Hz (-10 dB)', '32 Hz – 120 Hz (-10 dB)');
setFlex('best-live-subwoofers', 'DXS18', ['weight'], '110 lb (49.7 kg)', '110 lb (49.7 kg)');

fs.writeFileSync('data/guides.json', JSON.stringify(guides, null, 2));
console.log('part4 fixes=' + fixes);
warns.forEach(function (w) { console.log('WARN: ' + w); });
