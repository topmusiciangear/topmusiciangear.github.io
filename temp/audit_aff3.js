const fs = require('fs');
const t = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/best-reverb-delay.html', 'utf8');
const i = t.indexOf('Twelve Machines, Endless Echoes');
const seg = t.slice(i, i + 20000);
const re = /data-store="([a-z]+)"[^>]*?data-aff="([^"]*)"/g;
let m; const rows = [];
while ((m = re.exec(seg)) && rows.length < 7) {
  const a = m[2];
  const ok = a.includes('awin1.com') ? 'awin-OK' : (a.includes('pxf.io') ? 'pxf-OK' : (a.includes('anrdoezrs.net') ? 'cj-OK' : (a.includes('tag=topmusicg-20') ? 'amz-OK' : (a === '' ? 'EMPTY' : 'BARE:' + a.slice(0, 70)))));
  rows.push(m[1] + '=' + ok);
}
console.log('TimeLine: ' + rows.join(' | '));
const re2 = /data-aff="/g;
console.log('total data-aff in page:', (t.match(re2) || []).length);
