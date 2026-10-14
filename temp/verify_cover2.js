const fs = require('fs');
const files = ['guides/budget-bass-like-expensive.html', 'guides/budget-bass-like-expensive_es.html'];
let ok = 0, total = 0;
files.forEach(f => {
  const h = fs.readFileSync(f, 'utf8');
  const k = '272942/1200/preview.jpg';
  const a = h.includes(k);
  const b = !h.includes('468749/1200/preview.jpg');
  total += 2; if (a) ok++; if (b) ok++;
  console.log((a ? 'OK  ' : 'FALLO ') + f + ' -> portada BB434');
  console.log((b ? 'OK  ' : 'FALLO ') + f + ' -> fuera portada anterior');
});
const h = fs.readFileSync(files[0], 'utf8');
['og:image', 'twitter:image'].forEach(k => {
  const m = new RegExp('<meta (?:property|name)="' + k + '" content="([^"]+)"').exec(h);
  const v = m ? m[1] : 'NO';
  console.log(k + ' = ' + (v.includes('272942') ? 'OK BB434' : 'FALLO -> ' + v));
});
console.log(ok + '/' + total);