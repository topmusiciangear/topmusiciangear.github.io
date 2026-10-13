var fs = require('fs');
function chk(n, c) { console.log((c ? 'PASS' : 'FAIL') + ' ' + n); }
var en = fs.readFileSync('guides/monitor-setup.html', 'utf8');
var es = fs.readFileSync('guides/monitor-setup_es.html', 'utf8');
var sf = fs.readFileSync('guides/studio-furniture_es.html', 'utf8');
var sfEn = fs.readFileSync('guides/studio-furniture.html', 'utf8');

// 1. errors gone
chk('no mid EQ EN', en.indexOf('mid EQ') === -1 && en.indexOf('midrange EQ') === -1);
chk('no ecualizador medios ES', es.indexOf('ecualizador de medios') === -1 && es.indexOf('EQ de medios') > -1);
chk('no spikes monitor', en.indexOf('spike') === -1 && es.indexOf('punta') === -1);
chk('no spikes studio-furn', sf.indexOf('puntas ajustables') === -1 && sfEn.indexOf('adjustable spikes') === -1);
// 2. corrections present
chk('Room Control 500Hz EN', en.indexOf('below 500 Hz') > -1);
chk('High Trim 2kHz EN', en.indexOf('above 2 kHz') > -1);
chk('rear port 30-50 EN', en.indexOf('30–50 cm') > -1);
chk('Room Control ES', es.indexOf('bajo 500 Hz') > -1);
chk('26722 present', en.indexOf('26722') > -1 && es.indexOf('26722') > -1);
chk('26780 gone', en.indexOf('26780') === -1 && es.indexOf('26780') === -1);
chk('Focal front-port', en.indexOf('front') > -1 && en.indexOf('Focal Alpha 65 Evo') > -1);
chk('Class D 55+30', en.indexOf('55 W') > -1 && en.indexOf('104 dB') > -1);
chk('GLM SAM-only', en.indexOf('ONLY works with Genelec SAM') > -1);
chk('MoPADs 39.99', en.indexOf('39.99') > -1);
chk('MS-100 599.99', en.indexOf('599.99') > -1);
chk('MS-100 fixed 38', en.indexOf('38-inch') > -1 || en.indexOf('38 inch') > -1);
chk('K&M 78 unit', en.indexOf('€78') > -1 && en.indexOf('€156') > -1);
// 3. blue names
var pnEn = (en.match(/class="product-name"/g) || []).length;
var pnEs = (es.match(/class="product-name"/g) || []).length;
console.log('product-name spans EN=' + pnEn + ' ES=' + pnEs);
chk('blue names EN>=15', pnEn >= 15);
chk('blue names ES>=15', pnEs >= 15);
// 4. white prices: no gray price spans in OOS rows
var grayEn = (en.match(/font-weight:700;color:#a8a8a8/g) || []).length;
console.log('gray price spans monitor EN=' + grayEn);
chk('no gray prices', grayEn === 0);
// 5. invented data gone
var all = en + es;
chk('no TEST urls', all.indexOf('/TEST') === -1 && all.indexOf('B0TEST') === -1);
chk('no invented imgs', all.indexOf('110/1101234') === -1 && all.indexOf('111/1115678') === -1);
var allGuides = fs.readdirSync('guides').filter(function (f) { return f.endsWith('.html'); });
var bad = allGuides.filter(function (f) { return fs.readFileSync('guides/' + f, 'utf8').indexOf('1302301') > -1 || fs.readFileSync('guides/' + f, 'utf8').indexOf('/TEST') > -1; });
chk('no invented/Test refs site-wide', bad.length === 0);
if (bad.length) console.log('BAD: ' + bad.join(','));
// 6. Focal card + K&M title
chk('Focal G4M 277', en.indexOf('277') > -1);
chk('K&M Each title', en.indexOf('K&M 26722 Monitor Stands (Each)') > -1);
// 7. title
chk('EN title new', en.indexOf('<title>How to Set Up Studio Monitors So Your Mixes Translate Well (Pros, Cons & Buying Guide 2026)</title>') > -1);
chk('ES title intact', es.indexOf('para que tus mezclas traduzcan bien') > -1);
// 8. FAQ fixes
chk('FAQ 30cm ES', es.indexOf('al menos a 30 cm de la pared') > -1);
chk('FAQ 26722 ES', es.indexOf('K&M 26722') > -1);
console.log('done');
