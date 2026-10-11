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
function setCellES(gid, prodSub, rowSubs, esOnly) {
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
  row.values[ci].value_es = esOnly;
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

// ---- best-condenser-mics ----
setFlex('best-condenser-mics', 'AT2020', ['self-noise', 'self noise', 'noise'], '20 dB SPL', '20 dB SPL');
setFlex('best-condenser-mics', 'NT1 Signature', ['sensitivity'], '-32 dB re 1 V/Pa (25 mV @ 94 dB SPL)', '-32 dB re 1 V/Pa (25 mV @ 94 dB SPL)');
setFlex('best-condenser-mics', 'LCT 440', ['sensitivity'], '27.4 mV/Pa (-31.2 dBV/Pa)', '27.4 mV/Pa (-31.2 dBV/Pa)');
setFlex('best-condenser-mics', 'TLM 102', ['sensitivity'], '11 mV/Pa (≈ -39.2 dBV)', '11 mV/Pa (≈ -39.2 dBV)');
setFlex('best-condenser-mics', 'TLM 102', ['self-noise', 'self noise', 'noise'], '12 dB-A', '12 dB-A');
setFlex('best-condenser-mics', 'TLM 103', ['sensitivity'], '23 mV/Pa (-32.5 dBV ±1 dB)', '23 mV/Pa (-32.5 dBV ±1 dB)');
setFlex('best-condenser-mics', 'U 87', ['sensitivity'], '28 mV/Pa cardioid (-31 dBV)', '28 mV/Pa en cardioide (-31 dBV)');
setFlex('best-condenser-mics', 'U 87', ['max spl', 'spl'], '117 dB cardioid (127 dB with -10 dB pad)', '117 dB en cardioide (127 dB con pad de -10 dB)');
setFlex('best-condenser-mics', 'WA-8000', ['type', 'pattern', 'polar'], 'Tube condenser, cardioid + omni', 'Condensador de válvulas, cardioide + omni');
setFlex('best-condenser-mics', 'WA-8000', ['frequency'], '20 Hz – 20 kHz', '20 Hz – 20 kHz');
setFlex('best-condenser-mics', 'WA-8000', ['sensitivity'], '-33 dB/Pa cardioid, -36 dB/Pa omni', '-33 dB/Pa en cardioide, -36 dB/Pa en omni');
setFlex('best-condenser-mics', 'WA-8000', ['self-noise', 'self noise', 'noise'], '15 dB(A) cardioid, 17 dB(A) omni', '15 dB(A) en cardioide, 17 dB(A) en omni');
setFlex('best-condenser-mics', 'WA-8000', ['max spl', 'spl'], '131 dB cardioid, 134 dB omni', '131 dB en cardioide, 134 dB en omni');

// ---- best-shotgun-mics: NTG5 ----
setFlex('best-shotgun-mics', 'NTG5', ['output', 'connector', 'connection'], 'XLR (3-pin, balanced, P48)', 'XLR (3 pines, balanceado, P48)');
setFlex('best-shotgun-mics', 'NTG5', ['power', 'phantom', 'battery'], 'P48 phantom only (2 mA)', 'Solo phantom P48 (2 mA)');
setFlex('best-shotgun-mics', 'NTG5', ['max spl', 'spl'], '130 dB SPL', '130 dB SPL');
setFlex('best-shotgun-mics', '416', ['weight'], '175 g', '175 g');
repText('best-shotgun-mics', '120 dB', '130 dB SPL');
repText('best-shotgun-mics', '3.5 mm TRS', 'XLR');
repText('best-shotgun-mics', 'USB-C', 'P48 phantom');

// ---- best-instrument-mics ES-only ----
setCellES('best-instrument-mics', '4038', ['frequency'], '30 Hz – 15 kHz');
setCellES('best-instrument-mics', 'OC818', ['sensitivity'], '13 mV/Pa (todas direcciones)');
setCellES('best-instrument-mics', 'KM 184', ['impedance', 'output'], '50 Ω (impedancia nominal; carga ≥1 kΩ)');
setCellES('best-instrument-mics', 'M 201', ['sensitivity'], '1.2 mV/Pa (-58 dBV)');
setCellES('best-instrument-mics', 'RE20', ['sensitivity'], '1.5 mV/Pa (≈ -56.5 dBV)');

// ---- best-mic-for-podcasting ----
setFlex('best-mic-for-podcasting', 'PodMic', ['frequency'], '50 Hz – 15 kHz', '50 Hz – 15 kHz');
setFlex('best-mic-for-podcasting', 'SM58', ['sensitivity'], '-56.0 dBV/Pa (1.6 mV)', '-56.0 dBV/Pa (1.6 mV)');

// ---- mics-for-creators: PodMic USB ----
setFlex('mics-for-creators', 'PodMic USB', ['recording', 'bit', 'float'], '24-bit / 48 kHz', '24-bit / 48 kHz');
setFlex('mics-for-creators', 'PodMic USB', ['frequency'], '20 Hz – 20 kHz', '20 Hz – 20 kHz');
repText('mics-for-creators', '32-bit float', '24-bit / 48 kHz');

// ---- stage-mics SM58 ES typo ----
setCellES('stage-mics', 'SM58', ['sensitivity'], '-54.5 dBV/Pa (1.85 mV)');

// ---- budget-mics MAONO PD100 ----
setFlex('budget-mics', 'PD100', ['connection', 'connector', 'output'], 'USB-C + XLR', 'USB-C + XLR');

fs.writeFileSync('data/guides.json', JSON.stringify(guides, null, 2));
console.log('part3 fixes=' + fixes);
warns.forEach(function (w) { console.log('WARN: ' + w); });
