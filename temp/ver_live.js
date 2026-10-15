const { execFileSync } = require('child_process');
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36';
function get(u) {
  return execFileSync('curl.exe', ['-s', '-L', '--max-time', '60', '-A', UA, u], { windowsHide: true, maxBuffer: 1 << 27 }).toString();
}

console.log('=== PAGINA EN VIVO ===');
const es = get('https://topmusiciangear.com/guides/best-monitors-for-small-rooms_es.html');
console.log('  Eris Studio 5, menciones : ' + (es.match(/Eris Studio 5/g) || []).length);
console.log('  tarjeta del 684         : ' + (es.includes('openReviewModal(684)') ? 'SI' : 'NO'));
console.log('  veredictos 4+4          : ' + es.split('<div class="verdict-product-name">').length);
const p4 = es.split('<div class="verdict-product-name">').slice(1).filter(b =>
  ((b.split('verdict-pros-list')[1] || '').split('</ul>')[0].match(/<li>/g) || []).length >= 4 &&
  ((b.split('verdict-cons-list')[1] || '').split('</ul>')[0].match(/<li>/g) || []).length >= 4).length;
console.log('  veredictos completos    : ' + p4);
console.log('  mojibake                : ' + (es.match(/â‚¬|Â£|Â°/g) || []).length);

console.log('\n=== LAS 5 FOTOS, en la pagina viva ===');
const checks = [
  ['sE Electronics X1 R', 'https://topmusiciangear.com/guides/best-microphone_es.html', /r2\.gear4music\.com\/media\/26\/260432/],
  ['AT875R', 'https://topmusiciangear.com/guides/best-shotgun-mics_es.html', /cf1\.zzounds\.com.*at875r_1_sq/]
];
checks.forEach(([n, u, re]) => console.log('  ' + (get(u).match(re) ? 'OK  ' : 'NO  ') + n));

// comprueba que las URLs de imagen responden de verdad desde el sitio
console.log('\n=== las URLs de imagen responden? ===');
const p = JSON.parse(require('fs').readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/products.json', 'utf8'));
[675, 595, 667, 358, 360].forEach(id => {
  const x = p.find(y => y.id === id);
  const r = execFileSync('curl.exe', ['-s', '-L', '-o', 'NUL', '--max-time', '30', '-w', '%{http_code}|%{content_type}', '-A', UA, x.img], { windowsHide: true }).toString();
  console.log('  ' + String(id).padStart(4) + '  ' + r.padEnd(22) + (x.title || '').slice(0, 44));
});
