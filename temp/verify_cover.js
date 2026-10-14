const fs = require('fs');
const files = ['guides/beginner-bass-guitars.html', 'guides/beginner-bass-guitars_es.html', 'sitemap-images.xml'];
const target = '272785';
const checks = [];
files.forEach(f => {
  const s = fs.readFileSync(f, 'utf8');
  checks.push([f + ' -> BB234 cover', s.includes(target)]);
  checks.push([f + ' -> sin TRBX cover', !f.includes('sitemap') && !s.includes('67660/1200/preview_1')]);
});
let ok = 0;
checks.forEach(([n, v]) => { if (v) ok++; console.log((v ? 'OK  ' : 'FALLO ') + n); });
console.log(ok + '/' + checks.length);
const h = fs.readFileSync('guides/beginner-bass-guitars.html', 'utf8');
['og:image', 'twitter:image'].forEach(k => {
  const m = new RegExp('<meta (?:property|name)="' + k + '" content="([^"]+)"').exec(h);
  console.log(k + ' = ' + (m ? m[1] : 'NO'));
});
const sc = /"image":\s*"([^"]+)"/.exec(h);
console.log('schema ImageObject = ' + (sc ? sc[1] : 'NO'));