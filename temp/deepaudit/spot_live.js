var fs = require('fs');
function has(f, p) { try { return fs.readFileSync(f, 'utf8').indexOf(p) >= 0; } catch (e) { return false; } }
var ok = true;
function check(f, p, e) { var r = has(f, p); if (r !== e) { console.log((e ? 'MISSING' : 'UNEXPECTED') + ' ' + f + ' :: ' + p); ok = false; } }
check('guides/best-monitors.html', 'At around $298 a pair', true);
check('guides/best-monitors.html', 'sub-$1,000', true);
check('guides/blx288-vs-ewd.html', '($599)', true);
check('guides/blx288-vs-ewd.html', '($1,099', true);
check('guides/blx288-vs-ewd.html', 'two vocalists on stage for.', false);
check('guides/budget-monitors.html', 'At around $298 a pair — $149 each', true);
check('guides/best-pa-speakers.html', 'At $999 each', true);
check('guides/j48-vs-rndi.html', '-15dB pad', true);
check('guides/pro-daw.html', 'Perpetual', true);
check('guides/beginner-bass-guitars.html', 'active EQ', true);
var titles = fs.readdirSync('guides').filter(function (f) { return /\.html$/.test(f) && f.indexOf('_es') < 0; });
var t2026 = titles.filter(function (f) {
  var c = fs.readFileSync('guides/' + f, 'utf8');
  return /<title>[^<]*\(2026\)/.test(c) || /og:title" content="[^"]*\(2026\)/.test(c);
});
console.log('EN guides with (2026) in title/og:title: ' + t2026.length + (t2026.length ? ' -> ' + t2026.join(',') : ''));
console.log(ok ? 'ALL SPOT CHECKS PASSED' : 'SOME CHECKS FAILED');