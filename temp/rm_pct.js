var fs = require('fs');
var f = 'build-deals.js';
var s = fs.readFileSync(f, 'utf8');
function rep(a, b) {
  var n = s.split(a).length - 1;
  if (!n) { console.log('NOT FOUND: ' + a.slice(0, 70)); process.exit(1); }
  s = s.split(a).join(b);
  console.log('ok x' + n + ': ' + a.slice(0, 50));
}
// remove the "· X% dto." fragment (badge + old price already show the saving)
rep(
  "const pctLabel = pct > 0 ? ` <span class=\"deal-sep\">·</span> <span class=\"deal-percent\">${pct}% ${t('off', 'dto.')}</span>` : '';",
  "const pctLabel = '';"
);
fs.writeFileSync(f, s);
console.log('done');
