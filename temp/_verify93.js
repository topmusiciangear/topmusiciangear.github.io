const fs = require('fs');
let currencyFiles = 0;
for (const f of fs.readdirSync('guides')) {
  const h = fs.readFileSync('guides/' + f, 'utf8');
  const m = h.match(/href="[€£$][^"]{0,24}/);
  if (m) { currencyFiles++; console.log(f, JSON.stringify(m[0])); }
}
console.log('FILES WITH CURRENCY HREFS:', currencyFiles);
for (const f of ['ew100-vs-ulxd.html', 'ew100-vs-ulxd_es.html']) {
  const h = fs.readFileSync('guides/' + f, 'utf8');
  const r = h.match(/\$1,099.{0,12}/);
  const rz = h.indexOf('SENEWDME2835S') >= 0 ? 'zzounds-ok' : 'NO-zzounds';
  const na = h.indexOf('B094279V73') >= 0 ? 'amazon-new-ok' : 'no-amazon-new';
  const oa = h.indexOf('B0BJ62PZV2') >= 0 ? 'OLD-AMAZON!!' : 'no-old-amazon';
  const big = h.match(/\$2,499/);
  console.log(f, '| range:', r ? r[0] : 'NONE', '|', rz, '|', na, '|', oa, '| $2,499:', big ? 'PRESENT' : 'absent');
}