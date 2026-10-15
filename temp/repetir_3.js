const { execFileSync } = require('child_process');
const fs = require('fs');
const p = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/products.json', 'utf8'));
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36';

[57, 59, 468].forEach(id => {
  const x = p.find(y => y.id === id);
  console.log('\n=== ' + id + '  ' + x.title + ' ===');
  console.log('  ' + x.img);
  for (let intento = 1; intento <= 3; intento++) {
    const r = execFileSync('curl.exe', ['-s', '-L', '-o', 'NUL', '--max-time', '40',
      '-w', '%{http_code}|%{content_type}|%{size_download}', '-A', UA, x.img],
      { windowsHide: true }).toString();
    const [c, t, s] = r.split('|');
    const bien = /^2/.test(c) && /^image\//i.test(t);
    console.log('    intento ' + intento + ': ' + (c + ' ' + t + ' ' + s + 'b').padEnd(34) + (bien ? 'OK' : 'FALLO'));
    if (bien) break;
  }
});
