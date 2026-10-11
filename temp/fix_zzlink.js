var fs = require('fs');
var f = 'build-deals.js';
var s = fs.readFileSync(f, 'utf8');
function rep(a, b) {
  var n = s.split(a).length - 1;
  if (!n) { console.log('NOT FOUND: ' + a.slice(0, 60)); process.exit(1); }
  s = s.split(a).join(b);
  console.log('replaced x' + n + ': ' + a.slice(0, 50));
}
// single-wrap helper: zzounds strips the legacy /a--925521/ prefix then wraps ONCE;
// other stores use affWrap. (Nesting cjz(affWrap()) double-wrapped and landed on zzounds home.)
rep(
  "const cjz = (u) => /zzounds\\.com/.test(u) && u.indexOf('anrdoezrs.net') < 0 ? 'https://www.anrdoezrs.net/click-101857888-10439229?url=' + encodeURIComponent(u.replace('/a--925521', '')) : u;",
  "const cjz = (u) => /zzounds\\.com/.test(u) && u.indexOf('anrdoezrs.net') < 0 ? 'https://www.anrdoezrs.net/click-101857888-10439229?url=' + encodeURIComponent(u.replace('/a--925521', '')) : u;\n  const dealUrl = (d) => d.store === 'zzounds' ? 'https://www.anrdoezrs.net/click-101857888-10439229?url=' + encodeURIComponent(String(d.store_url || '').replace('/a--925521', '')) : affWrap(d.store, d.store_url);"
);
rep('cjz(affWrap(d.store, d.store_url))', 'dealUrl(d)');
fs.writeFileSync(f, s);
console.log('done');
