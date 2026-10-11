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

// ---- small-rooms ----
setFlex('best-monitors-for-small-rooms', 'Micro Monitor Pro', ['woofer'], '3" composite cellulose fiber', '3" de fibra de celulosa compuesta');
setFlex('best-monitors-for-small-rooms', 'Micro Monitor Pro', ['tweeter'], '1" silk dome', 'Cúpula de seda de 1"');
setFlex('best-monitors-for-small-rooms', 'Micro Monitor Pro', ['power'], '50W RMS per speaker (30W LF + 20W HF)', '50W RMS por monitor (30W LF + 20W HF)');
setFlex('best-monitors-for-small-rooms', 'Micro Monitor Pro', ['frequency'], '42 Hz – 22 kHz (-10 dB)', '42 Hz – 22 kHz (-10 dB)');
setFlex('best-monitors-for-small-rooms', 'Micro Monitor Pro', ['max spl', 'spl'], '94 dB continuous / 107.3 dB peak', '94 dB continuos / 107.3 dB de pico');
setFlex('best-monitors-for-small-rooms', 'Micro Monitor Pro', ['dimension'], '4.17 x 8.11 x 6.22 in / 106 x 206 x 158 mm', '4.17 x 8.11 x 6.22 in / 106 x 206 x 158 mm');
setFlex('best-monitors-for-small-rooms', '8010A', ['reflex', 'port'], 'Rear', 'Trasero');
setFlex('best-monitors-for-small-rooms', 'D3V', ['reflex', 'port'], 'Dual passive radiators (no port)', 'Radiadores pasivos duales (sin puerto)');
repText('best-monitors-for-small-rooms', '50W Class-D with 56-bit DSP reaches 45Hz', '50W RMS per speaker with 56-bit DSP reaches down to 42 Hz');
repText('best-monitors-for-small-rooms', 'de 50W en Clase-D con DSP de 56 bits llega a 45 Hz', 'de 50W RMS por monitor con DSP de 56 bits baja hasta 42 Hz');

// ---- tracking-headphones ----
setFlex('tracking-headphones', 'K371', ['driver'], '50 mm titanium-coated', '50 mm con recubrimiento de titanio');
setFlex('tracking-headphones', 'K371', ['frequency'], '5 Hz – 40 kHz', '5 Hz – 40 kHz');
setFlex('tracking-headphones', 'K371', ['cable'], 'Detachable (1.2 m + 3 m straight + 3 m coiled)', 'Desmontable (1.2 m + 3 m recto + 3 m en espiral)');
setFlex('tracking-headphones', 'SRH440A', ['impedance'], '40 Ω', '40 Ω');
setFlex('tracking-headphones', 'SRH440A', ['sensitivity'], '97 dB/mW', '97 dB/mW');
setFlex('tracking-headphones', 'SRH440A', ['frequency'], '10 Hz – 22 kHz', '10 Hz – 22 kHz');
setFlex('tracking-headphones', 'SRH440A', ['weight'], '268 g', '268 g');
setFlex('tracking-headphones', 'SRH440A', ['cable'], '3 m straight, detachable', '3 m recto, desmontable');
setFlex('tracking-headphones', 'Listen Professional', ['driver'], '40 mm Mylar/Titanium', '40 mm Mylar/titanio');
setFlex('tracking-headphones', 'Listen Professional', ['impedance'], '32 Ω', '32 Ω');
setFlex('tracking-headphones', 'Listen Professional', ['sensitivity'], '122 dB SPL @1 kHz/1 Vrms', '122 dB SPL @1 kHz/1 Vrms');
setFlex('tracking-headphones', 'Listen Professional', ['weight'], '280 g', '280 g');
setFlex('tracking-headphones', 'HD 280', ['frequency'], '8 Hz – 25 kHz', '8 Hz – 25 kHz');
setFlex('tracking-headphones', 'HD 280', ['sensitivity'], '113 dB max (102 dB nominal)', '113 dB máx. (102 dB nominal)');
setFlex('tracking-headphones', 'HD 280', ['weight'], '285 g w/o cable', '285 g sin cable');
setFlex('tracking-headphones', 'HD 280', ['cable'], 'Coiled 1–3 m, fixed', 'En espiral 1–3 m, fijo');
setFlex('tracking-headphones', 'DT 770', ['cable'], '3 m straight, fixed', '3 m recto, fijo');

// ---- best-headphones ----
setFlex('best-headphones', 'NDH 30', ['sensitivity'], '104 dB SPL @1 kHz/1 Vrms', '104 dB SPL @1 kHz/1 Vrms');
setFlex('best-headphones', 'NDH 30', ['frequency'], '12 Hz – 34 kHz', '12 Hz – 34 kHz');
setFlex('best-headphones', 'LCD-X', ['frequency'], '10 Hz – 50 kHz', '10 Hz – 50 kHz');
setFlex('best-headphones', 'LCD-X', ['driver'], '106 mm planar', 'Planar de 106 mm');
setFlex('best-headphones', 'DT 770', ['cable'], '3 m straight, fixed', '3 m recto, fijo');
setFlex('best-headphones', 'HD 600', ['cable'], 'Detachable dual-entry (both earcups)', 'Desmontable de doble entrada (ambas copas)');

// ---- open-headphones ----
setFlex('open-headphones', 'NDH 30', ['sensitivity'], '104 dB SPL @1 kHz/1 Vrms', '104 dB SPL @1 kHz/1 Vrms');
setFlex('open-headphones', 'NDH 30', ['frequency'], '12 Hz – 34 kHz', '12 Hz – 34 kHz');
setFlex('open-headphones', 'LCD-X', ['frequency'], '10 Hz – 50 kHz', '10 Hz – 50 kHz');
setFlex('open-headphones', 'LCD-X', ['driver'], '106 mm planar', 'Planar de 106 mm');
setFlex('open-headphones', 'HD 600', ['cable'], 'Detachable dual-entry (both earcups)', 'Desmontable de doble entrada (ambas copas)');
setFlex('open-headphones', 'LCD-X', ['cable'], 'Detachable dual mini-XLR (both earcups)', 'Desmontable mini-XLR dual (ambas copas)');
setFlex('open-headphones', 'DT 990', ['cable'], '3 m coiled, fixed', '3 m en espiral, fijo');

// ---- studio-subwoofers ----
setFlex('studio-subwoofers', 'S10.4', ['frequency'], '30 Hz – 110 Hz (±3 dB)', '30 Hz – 110 Hz (±3 dB)');

// ---- wireless IEM range ----
setFlex('best-wireless-iems', 'XSW IEM', ['range'], '328 ft / 100 m', '100 m');
setFlex('best-in-ear-monitors', 'XSW IEM', ['range'], '100 m', '100 m');
repText('best-wireless-iems', "Official 164 ft range trails the EW IEM G4's 300 ft", "Official 328 ft range trails the EW IEM G4's 300+ ft pro range");
repText('best-wireless-iems', '164 ft', '328 ft');

fs.writeFileSync('data/guides.json', JSON.stringify(guides, null, 2));
console.log('part2 fixes=' + fixes);
warns.forEach(function (w) { console.log('WARN: ' + w); });
