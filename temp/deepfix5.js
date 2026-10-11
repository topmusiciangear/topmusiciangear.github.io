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

setFlex('best-acoustic-guitars-for-beginners', 'FG800', ['back', 'side', 'wood'], 'Nato/Okoume', 'Nato/okoume');
setFlex('best-electric-guitar', 'Eclipse', ['neck'], 'Mahogany, Thin U', 'Caoba, Thin U');
setFlex('best-electric-guitar', 'Eclipse', ['pickup'], 'Active EMG 57TW/66TW (coil-split)', 'EMG activas 57TW/66TW (coil-split)');
repText('best-electric-guitar', 'EMG 81/60', 'EMG 57TW/66TW');
setFlex('best-beginner-electric-guitar', 'JS-300', ['body', 'wood'], 'Roasted poplar', 'Álamo tostado');
setFlex('fender-guide', 'Player II Telecaster', ['neck', 'fret'], 'Modern C, 22 medium-jumbo frets', 'Modern C, 22 trastes medium-jumbo');
setFlex('fender-guide', 'CD-60S', ['fret', 'board'], '20, walnut', '20, nogal');
setFlex('beginner-guitar', 'CD-60S', ['fret', 'board'], '20, walnut', '20, nogal');
setFlex('beginner-bass-guitars', 'Ray4', ['body', 'wood'], 'Basswood', 'Tilo');
['beginner-bass-guitars', 'best-bass-under-700', 'budget-bass-like-expensive'].forEach(function (gid) {
  setFlex(gid, 'TRBX304', ['body', 'wood'], 'Mahogany', 'Caoba');
});
setFlex('beginner-bass-guitars', 'SR300E', ['fret', 'board'], '24, jatoba', '24, jatoba');
repText('guitar-bass-amps', 'Speaker out, no FX loop', 'Speaker outs + true-bypass FX loop');
setFlex('best-overdrive-distortion', 'BD-2', ['bypass'], 'Buffered bypass', 'Bypass con buffer');
setFlex('best-overdrive-distortion', 'BD-2', ['current', 'draw', 'power'], '20 mA', '20 mA');
setFlex('best-overdrive-distortion', 'TS9', ['bypass'], 'Buffered (FET electronic switching)', 'Con buffer (conmutación electrónica FET)');
setFlex('best-reverb-delay', 'DD-8', ['bypass'], 'Buffered bypass', 'Bypass con buffer');
setFlex('best-reverb-delay', 'DD-8', ['current', 'draw', 'power'], '100 mA', '100 mA');
setFlex('guitar-pedals', 'DD-8', ['current', 'draw', 'power'], '100 mA', '100 mA');
setFlex('best-amp-modelers', 'HX Stomp', ['simultaneous', 'block'], '8', '8');
setFlex('best-multi-effects-pedals', 'HX Stomp', ['simultaneous', 'block'], '8', '8');
setFlex('best-amp-modelers', 'POD Go', ['looper'], 'Yes (40 s mono / 20 s stereo)', 'Sí (40 s mono / 20 s estéreo)');
setFlex('best-synthesizers', 'Subsequent 37', ['key'], '37 semi-weighted with aftertouch', '37 semipesadas con aftertouch');
setFlex('best-synthesizers', 'Subsequent 37', ['weight'], '22 lb (10 kg)', '22 lb (10 kg)');
setFlex('best-synthesizers', 'OB-6', ['preset', 'program', 'memory'], '1000 programs (500 factory + 500 user)', '1000 programas (500 de fábrica + 500 de usuario)');
['best-plugins', 'vocal-plugins', 'channel-strip-plugins'].forEach(function (gid) {
  setFlex(gid, 'Total Bundle', ['type', 'count', 'included'], '14 plug-ins', '14 plug-ins');
});
repText('best-plugins', '30+ plug-ins', '14 plug-ins');
repText('vocal-plugins', '30+ plug-ins', '14 plug-ins');
repText('channel-strip-plugins', '30+ plug-ins', '14 plug-ins');
['best-plugins', 'vocal-plugins'].forEach(function (gid) {
  setFlex(gid, 'Melodyne', ['format'], 'VST3/AU/AAX + standalone (ARA)', 'VST3/AU/AAX + standalone (ARA)');
});
['daw-guide', 'best-daw-for-beginners'].forEach(function (gid) {
  setFlex(gid, 'Cubase', ['trial', 'free'], '60 days', '60 días');
});

fs.writeFileSync('data/guides.json', JSON.stringify(guides, null, 2));
console.log('part5 fixes=' + fixes);
warns.forEach(function (w) { console.log('WARN: ' + w); });
